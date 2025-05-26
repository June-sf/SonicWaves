import sounddevice as sd
import numpy as np
import speech_recognition as sr
import spacy
import json

# 加载中文模型
nlp = spacy.load("zh_core_web_sm")

# 假设标签数据从 API 获取并存储在 musicData.json 中
with open('musicData.json', 'r', encoding='utf-8') as file:
    music_data = json.load(file)

# 预设标签
labels = {artist['name']: artist['style'] for artist in music_data}

# 音频缓冲区
audio_buffer = []
recording_duration = 5  # 录音时长（秒）

# 音频回调
def audio_callback(indata, frames, time, status):
    if status:
        print(status)
    audio_buffer.append(indata.copy())

# 语音识别函数
def recognize_audio(audio_data):
    recognizer = sr.Recognizer()
    with sr.AudioData(audio_data, 44100, 1) as source:
        try:
            text = recognizer.recognize_google(source, language='zh-CN')
            return text
        except sr.UnknownValueError:
            return None
        except sr.RequestError as e:
            print(f"语音识别服务出错: {e}")
            return None

# 语义分割与指令匹配
def match_command(text):
    doc = nlp(text)
    for token in doc:
        if token.text in labels:
            return labels[token.text]
    return None

# 设置音频流
def start_audio_recognition():
    global audio_buffer
    try:
        with sd.InputStream(callback=audio_callback, channels=1, samplerate=44100):
            print("开始语音识别...")
            sd.sleep(recording_duration * 1000)  # 运行指定时长（毫秒）
            print("录音结束")

        # 合并音频数据
        audio_data = np.concatenate(audio_buffer, axis=0).flatten().astype(np.float32)
        audio_buffer.clear()

        # 语音识别
        recognized_text = recognize_audio(audio_data)
        if recognized_text:
            print(f"识别出的文字: {recognized_text}")

            # 匹配指令
            command = match_command(recognized_text)
            if command:
                print(f"匹配到的指令: {command}")
                return command
            else:
                print("未匹配到指令")
        else:
            print("未能识别任何文字")

    except Exception as e:
        print(f"无法启动音频流: {e}")

'''
if __name__ == "__main__":
    start_audio_recognition() # 启动测试
'''
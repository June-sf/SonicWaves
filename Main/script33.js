const fileInput = document.getElementById('fileInput');
const audioPlayer = document.getElementById('audioPlayer');
const playlist = document.getElementById('playlist');
const playPauseBtn = document.getElementById('playPauseBtn');

let songs = [];
let currentSongIndex = 0;

fileInput.addEventListener('change', function () {
    const files = Array.from(this.files).filter(file => file.type === 'audio/mpeg');
    if (files.length === 0) return;

    songs = files.map(file => URL.createObjectURL(file));
    currentSongIndex = 0;
    loadCurrentSong();
    updatePlaylist();
});


function loadCurrentSong() {
    if (songs.length === 0) return;
    audioPlayer.src = songs[currentSongIndex];
    updatePlaylist();
}

function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = "暂停";
        
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = "播放";

    }
}

function nextSong() {
    if (songs.length === 0) return;
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadCurrentSong();
    audioPlayer.play();
    playPauseBtn.textContent = "暂停";
    startVisualizer(audioPlayer);
}

function prevSong() {
    if (songs.length === 0) return;
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadCurrentSong();
    audioPlayer.play();
    playPauseBtn.textContent = "暂停";
    startVisualizer(audioPlayer);
}

function filterPlaylist() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const items = playlist.getElementsByTagName('li');
    
    Array.from(items).forEach(item => {
        const songName = item.textContent.toLowerCase();
        if (songName.includes(query)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}
function startSpeechRecognition() {
    const recognition = new webkitSpeechRecognition || new SpeechRecognition;
    recognition.lang = 'zh-CN';
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('searchBar').value = transcript;
        filterPlaylist();
    };
    recognition.start();
}
function updatePlaylist() {
    playlist.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `歌曲 ${index + 1}`;
        if (index === currentSongIndex) {
            li.classList.add('active');
        }
        li.onclick = () => {
            currentSongIndex = index;
            loadCurrentSong();
            audioPlayer.play();
            playPauseBtn.textContent = "暂停";
            startVisualizer(audioPlayer);
        };
        playlist.appendChild(li);
    });
}
/*手势识别时的小提示*/
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    setTimeout(() => {
        toast.classList.remove('show');
        document.body.removeChild(toast);
    }, 2000);
}
window.addEventListener('swipeLeft', () => {
    nextSong();
    showToast("下一首");
});

window.addEventListener('swipeRight', () => {
    prevSong();
    showToast("上一首");
});
audioPlayer.addEventListener('ended', nextSong);
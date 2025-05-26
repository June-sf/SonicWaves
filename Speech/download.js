import axios from 'axios';
import fs from 'fs';

async function fetchMusicData() {
    const response = await axios.get('API_URL'); // 替换为实际 API 地址
    const data = response.data;

    // 假设数据格式如下
    const artists = data.artists.map(artist => ({
        name: artist.name,
        style: artist.style,
    }));

    // 将数据保存到本地 JSON 文件
    fs.writeFileSync('musicData.json', JSON.stringify(artists, null, 2));
}

// 运行函数
fetchMusicData().catch(console.error);
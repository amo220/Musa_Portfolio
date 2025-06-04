import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';

const downloadImage = async (url, filepath) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        const buffer = await response.arrayBuffer();
        await fs.writeFile(filepath, Buffer.from(buffer));
        console.log(`Successfully downloaded: ${filepath}`);
    } catch (error) {
        console.error(`Error downloading ${filepath}:`, error);
    }
};

const images = [
    {
        url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80',
        path: './src/assets/images/hero-bg.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80',
        path: './src/assets/images/portfolio/music-1.jpg'
    }
];

// Download all images
Promise.all(images.map(img => downloadImage(img.url, img.path)))
    .then(() => console.log('All downloads completed'))
    .catch(error => console.error('Error in download process:', error));

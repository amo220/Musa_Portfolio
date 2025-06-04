import fetch from 'node-fetch';
import fs from 'fs';
import { pipeline } from 'stream/promises';

const downloadImage = async () => {
    const response = await fetch('https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&h=768&q=80');
    await pipeline(
        response.body,
        fs.createWriteStream('./src/assets/images/developer.jpg')
    );
};

downloadImage().catch(console.error);

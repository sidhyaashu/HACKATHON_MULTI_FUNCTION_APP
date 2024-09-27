import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url'; 

// Setup __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const take_ss = async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        const browser = await puppeteer.launch({
            headless: true, 
            args: ['--no-sandbox', '--disable-setuid-sandbox'], 
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        const screenshotPath = path.join(__dirname, 'screenshot.png');
        await page.screenshot({ path: screenshotPath });
        await browser.close();

        res.download(screenshotPath, 'screenshot.png', (err) => {
            if (err) {
                console.error('Error sending screenshot:', err);
            }
            fs.unlinkSync(screenshotPath);
        });
    } catch (err) {
        console.error('Error taking screenshot:', err);
        res.status(500).send('Error taking screenshot');
    }
};

export default take_ss;

const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const W = 7568;
  const H = 1548;

  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-web-security',
      '--disable-gpu',
      '--font-render-hinting=none',
      '--force-device-scale-factor=1',
      '--disable-lcd-text',
    ],
    defaultViewport: { width: W, height: H, deviceScaleFactor: 1 },
  });

  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });

  const fileUrl = 'file://' + path.resolve(__dirname, 'vwall.html');
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 120000 });

  // Ensure fonts are loaded before screenshot
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
  });
  // A small settle delay for filter rendering
  await new Promise(r => setTimeout(r, 500));

  await page.screenshot({
    path: path.resolve(__dirname, 'vwall-amir-cup-final-2026.png'),
    type: 'png',
    omitBackground: false,
    clip: { x: 0, y: 0, width: W, height: H },
    captureBeyondViewport: false,
  });

  await browser.close();
  console.log('Rendered vwall-amir-cup-final-2026.png');
})();

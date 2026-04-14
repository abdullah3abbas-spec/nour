const sharp = require('sharp');
const path = require('path');

(async () => {
  const src = path.resolve(__dirname, 'vwall-amir-cup-final-2026.png');
  const W = 7568, H = 1548;

  // Full image downscaled to a reasonable width for preview
  await sharp(src).resize({ width: 2000 }).png().toFile('preview-full.png');

  // Left third (Al Gharafa)
  await sharp(src)
    .extract({ left: 0, top: 0, width: Math.round(W / 3), height: H })
    .resize({ width: 1400 })
    .png()
    .toFile('preview-left.png');

  // Center third (cup title + VS badge)
  await sharp(src)
    .extract({ left: Math.round(W / 3), top: 0, width: Math.round(W / 3), height: H })
    .resize({ width: 1400 })
    .png()
    .toFile('preview-center.png');

  // Right third (Al Sadd)
  await sharp(src)
    .extract({ left: Math.round((2 * W) / 3), top: 0, width: Math.round(W / 3), height: H })
    .resize({ width: 1400 })
    .png()
    .toFile('preview-right.png');

  console.log('Previews created');
})();

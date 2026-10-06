import { Jimp } from 'jimp';

async function removeBackground() {
  try {
    const image = await Jimp.read('public/zagora-name.jpeg');
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      if (r < 25 && g < 25 && b < 25) {
        this.bitmap.data[idx + 3] = 0;
      }
    });

    await new Promise((resolve, reject) => {
      image.write('public/zagora-name-transparent.png', (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('Background removed successfully.');
  } catch (err) {
    console.error(err);
  }
}

removeBackground();

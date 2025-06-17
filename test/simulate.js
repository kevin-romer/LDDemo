const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });

  for (let i = 1; i <= 100; i++) {
    const page = await browser.newPage();

    console.log(`Run ${i}: Visiting home page...`);
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    await new Promise(resolve => setTimeout(resolve, 3000));

    if (Math.random() < 0.5) {
      console.log(`Run ${i}: Visiting disasters page...`);
      await page.goto('http://localhost:3000/disasters', { waitUntil: 'domcontentloaded' });
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    await page.close();
  }

  console.log('Done.');
  await browser.close();
})();

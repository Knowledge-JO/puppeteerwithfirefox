const {Client } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const puppeteer = require('puppeteer')
const firefoxPath = '/usr/bin/firefox'

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
});
  
const firefoxOptions = {
    product: 'firefox',
    executablePath: firefoxPath,
  };

const client = new Client({
    puppeteer: {
        product: 'firefox',
    }
})

// client.initialize()

puppeteer.launch(firefoxOptions).then(async (browser) => {
    const page = await browser.newPage()
    await client.initialize({
        puppeteer: {
            browser,
            userAgent: await page.browser().userAgent()
        }
    }).catch(err => console.log(err))
})

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true})
})

client.on('ready', () => {
    console.log('Client is ready!')
})

client.on('message', (message) => {
    console.log(message)
})

// client.initialize()
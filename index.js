const puppeteer = require('puppeteer');
var browser;
var page;

const theil = '491792444982';
const msg = 'bing bong2';

puppeteer.launch({ headless: false, executablePath: 'C:\\Users\\Chris\\AppData\\Local\\Chromium\\Application\\chrome.exe' }).then(async bs => {

    browser = bs;
    page = await bs.newPage();
    await page.goto('https://web.whatsapp.com/');
    await page.waitForNavigation(); //Wait for QR-Code activation

    main();
});

//_2wP_Y == chat

async function sendMsg(number, msg) {
    await page.goto('https://web.whatsapp.com/send?phone=+' + number + '&text=' + msg);
    await page.waitForNavigation();

    await page.evaluate(() => {
        document.getElementsByClassName("_35EW6")[0].click();
    })
}

async function NumberNewMessages() {
    return await page.evaluate(_ => {
        return document.getElementsByClassName("OUeyt").length;
    })
}

async function main() {
    while (await NumberNewMessages() == 0) {
        setTimeout(_ => {
            console.log('Waiting');
        },1000)
    }
    console.log('New Message');
    
}
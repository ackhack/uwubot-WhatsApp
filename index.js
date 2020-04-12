const puppeteer = require('puppeteer');
var browser;
var page;

puppeteer.launch({ headless: false, executablePath: 'C:\\Users\\Chris\\AppData\\Local\\Chromium\\Application\\chrome.exe' }).then(async bs => {

    browser = bs;
    page = await bs.newPage();
    await page.goto('https://web.whatsapp.com/');
    await page.waitForNavigation(); //Wait for QR-Code activation

    console.log(await nm());
});

//_2wP_Y == chat
//_21sW0 _1ecJY == chats

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

async function nm() {
    return await page.evaluate(async _ => {

        return await new Promise(resolve => {
            var ret = {};
            let x = document.getElementsByClassName("_21sW0 _1ecJY");
            for (let y = 0; y < x[0].childNodes.length; y++) {
                ret[y] = x[0].childNodes[y].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].innerText; //ChatNames
            }
            resolve(ret);
        })
    })
}

async function main() {
    while (await NumberNewMessages() == 0) {
        setTimeout(_ => {
            console.log('Waiting');
        }, 1000)
    }
    console.log('New Message');
}
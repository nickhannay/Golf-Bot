const puppeteer = require('puppeteer')


async function main(){

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('console', message => {
        console.log(`Browser Console: ${message.text()}`);
    });

    await page.goto('https://golfburnaby.cps.golf/onlineresweb/search-teetime?TeeOffTimeMin=0&TeeOffTimeMax=23');
    await page.waitForTimeout(5000)

    const sessionId = await page.evaluate(() => {
        return sessionStorage.getItem('SessionId');
    })

    console.log(`Sesssion id is: ${sessionId}`);
    await browser.close()
}

main();


const puppeteer = require('puppeteer')
const debug = require('debug')('golf-bot:retrieveSessionId')


const getSessionId = async () => {

    debug('launching headless session')
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('console', message => {
        console.log(`Browser Console: ${message.text()}`);
    });

    debug('waiting for page to load')
    await page.goto('https://golfburnaby.cps.golf/onlineresweb/search-teetime?TeeOffTimeMin=0&TeeOffTimeMax=23');
    await page.waitForTimeout(5000)

    const sessionId = await page.evaluate(() => {
        return sessionStorage.getItem('SessionId');
    })
    debug(`retrieved session id: ${sessionId}`);


    await browser.close()
    debug('terminated headless session')

    return sessionId
}

module.exports  = getSessionId

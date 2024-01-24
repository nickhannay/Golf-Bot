const debug = require('debug')('golf-bot:server')

class GOLF_BOT{
    static #auth_endpoint = 'https://golfburnaby.cps.golf/identityapi/connect/token';
    static #base_endpoint = 'https://golfburnaby.cps.golf/onlineres/onlineapi/api/v1/onlinereservation/'
    static #teeTimes_endpoint = this.#base_endpoint + 'TeeTimes?'
    static #x_apiKey = '8ea2914e-cac2-48a7-a3e5-e0f41350bf3a'


    static async getToken(email, password ){
        debug(`email: ${email} - pass: ${password}`);
        const res = await fetch(this.#auth_endpoint, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer null',
            },
            body: `grant_type=password&scope=openid%20profile%20onlinereservation%20sale%20inventory%20sh%20customer%20email%20recommend%20references&username=${email}&password=${password}&client_id=js1&client_secret=v4secret`
        });
        const json = await res.json();
        return json.access_token || null;
    }

    static async getTeeTimes(date, token = 'null', holes = '0', players = '0'){

        let params = {
            searchDate: date,
            holes: holes,
            numberOfPlayer: players,
            courseIds:'2',
            searchTimeType:'0',
            teeOffTimeMin:'0',
            teeOffTimeMax:'23',
            isChangeTeeOffTime:'true',
            teeSheetSearchView:'5',
            classCode:'R',
            defaultOnlineRate:'N',
            isUseCapacityPricing:'false',
            memberStoreId:'1',
            searchType:'1',
        }
        const url = this.#teeTimes_endpoint + new URLSearchParams(params)

        const res = await fetch(url, {
            headers: {
                'x-apiKey' : this.#x_apiKey,
                'x-componentId': '1',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
                'x-ismobile': 'false',
                'x-productid': '1',
                'x-requestid': '3a4e1ebb-4041-9595-8589-ec0aaf8ef193',
                'x-siteid' : '1',
                'X-TerminalId': '3',
                'x-timezone-offset': '480',
                'x-timezoneid':  'America/Vancouver',
                // needed to get 2 player only courses, but restricts access to 5 days in advance  -> 'x-websiteid': '68ffa70d-4c31-4511-f6c6-08db3507e474',
                'Referer': 'https://golfburnaby.cps.golf/onlineresweb/search-teetime?TeeOffTimeMin=0&TeeOffTimeMax=23.999722222222225',
                'Host': 'golfburnaby.cps.golf',
                'Authorization': `Bearer ${token}`
            },
        })
        const times = await res.json()

        return times
    }

    static async getUserInfo(token){
        const req = await fetch('https://golfburnaby.cps.golf/identityapi/connect/userinfo', {
            headers: {
                'x-componentId' : '1',
                'x-apiKey' : '8ea2914e-cac2-48a7-a3e5-e0f41350bf3a',
                'Authorization' : `Bearer ${token}`
            }
        })

        const json = await req.json()

        return json
    }
}


module.exports = GOLF_BOT;
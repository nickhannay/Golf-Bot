const debug = require('debug')('golf-bot:Golf-Bot')

class GOLF_BOT{
    
    static #auth_endpoint = 'https://golfburnaby.cps.golf/identityapi/connect/token';
    static #base_endpoint = 'https://golfburnaby.cps.golf/onlineres/onlineapi/api/v1/onlinereservation/'
    static #teeTimes_endpoint = this.#base_endpoint + 'TeeTimes?'
    static #calculatePrice_endpoint = this.#base_endpoint + 'TeeTimePricesCalculation'
    static #x_apiKey = '8ea2914e-cac2-48a7-a3e5-e0f41350bf3a'
    static #componentId = '1'


    static async getToken(email, password ){
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



    static async getTeeTimes(date, holes = '0', players = '0', token = 'null'){

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
        const headers = this.#createHeader(token)

        const res = await fetch(url, {
            headers: headers,
        })
        const times = await res.json()

        return times
    }



    static async getUserInfo(token){
        const headers = this.#createHeader(token)

        const res = await fetch('https://golfburnaby.cps.golf/identityapi/connect/userinfo', {
            headers: headers
        })
        
        const json = await res.json()
        

        return json
    }



    static async calculatePrice(teeSheetId, token, golferId, acctNum, numGolfers){
        

        const headers = this.#createHeader(token)
        headers["Content-Type"] =  'application/json'
        const golfers = new Array(numGolfers)

        for(let i = 0; i < numGolfers; i++){
            golfers[i] = this.#createGolfer(teeSheetId, i + 1, golferId, acctNum)
        }
        
        const body = {
            "selectedTeeSheetId": teeSheetId,
            "holes": 18,
            "numberOfPlayer": numGolfers,
            "numberOfRider": 0,
            "cartType": 0,
            "coupon": null,
            "depositType": 0,
            "depositAmount": 0,
            "selectedValuePackageCode": null,
            "isUseCapacityPricing": false,
            "thirdPartyId": null,
            "ibxCardOnFile": null,
            "transactionId": null,
            "bookingList" : golfers
        }
        //debug(JSON.stringify(body, null, 2))
        let jsonBody = JSON.stringify(body)
        const res = await fetch(this.#calculatePrice_endpoint, {
            headers: headers,
            method: 'POST',
            body: jsonBody
        })

        const jsonResponse = await res.json()

        return jsonResponse
    }



    // --------------------- PRIVATE METHODS --------------------------

    static #createHeader(token){
        const header = {
            'x-apiKey' : this.#x_apiKey,
            'x-componentId': this.#componentId,
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
        }

        return header
    }

    static #createGolfer(teeSheetId, golferNum, golferId, acctNum){
        const golfer = {
            "advancedBookingFee": null,
            "groupNo": null,
            "teeSheetId": teeSheetId,
            "holes": 18,
            "participantNo": golferNum,
            "golferId": golferId,
            "rateCode": "AD RW",
            "isUnAssignedPlayer": true,
            "memberClassCode": "AD",
            "memberStoreId": "1",
            "packageCode": null,
            "greenFeeCode": null,
            "otherFeeCode": null,
            "caddieAmount": 0,
            "caddieCode": null,
            "rentalType": 0,
            "rentalClubCode": null,
            "cartType": 0,
            "cartCode": null,
            "estimatePrice": 0,
            "couponCode": null,
            "playerId": "0",
            "dependentId": "0",
            "acct": acctNum,
            "isGuestOf": false,
            "bookingTypeId": 2,
            "auctionPrice": 0,
            "auctionGreenFeePrice": 0,
            "auctionCartFeePrice": 0,
            "dynamicPrice": 0,
            "auctionDiscountType": null,
            "valuePackageCode": null,
            "isUseCapacityPricing": false,
            "capacityPricingId": 0,
            "capacityPrice": null,
            "capacityStartPrice": null,
            "nextCrossOverTeeSheetId": null,
            "startPlayingTime": "2023-12-22T14:18:00"
        }

        return golfer
    }


    
}


module.exports = GOLF_BOT;
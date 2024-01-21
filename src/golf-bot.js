const debug = require('debug')('golf-bot:server')

class GOLF_BOT{
    auth_endpoint = 'https://golfburnaby.cps.golf/identityapi/connect/token';
    #email = null;
    #password = null;
    #token = null;


    constructor(email, password){
        this.#email = email;
        this.#password = password;
    }

    async getToken(){
        debug(`email: ${this.#email} - pass: ${this.#password}`);
        const res = await fetch(this.auth_endpoint, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer null',
            },
            body: `grant_type=password&scope=openid%20profile%20onlinereservation%20sale%20inventory%20sh%20customer%20email%20recommend%20references&username=${this.#email}&password=${this.#password}&client_id=js1&client_secret=v4secret`
        });
        const json = await res.json();
        debug(json);
        this.#token = json.access_token || null;
        debug(this.#token)
        return this.#token;
    }
}


module.exports = GOLF_BOT;
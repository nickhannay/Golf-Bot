const convert12hr = (timeStamp) => {
    // time : year-month-dayThour:minute:second
    const time24hr = timeStamp.split('T')[1]

    const hour_int = parseInt(time24hr.split(':')[0], 10)
    const minute = time24hr.split(':')[1]
    let am_pm = 'am'
    let hour12 = ''

    if(hour_int <= 12){
        hour12 = hour_int.toString()
    }
    else {
        hour12 = (hour_int % 12 ).toString()
        am_pm = 'pm'
    }

    return `${hour12}:${minute} ${am_pm}`
}

const formatPrice = (price) => {
    let str = price.toString()
    let strTok = str.split('.')

    if(str === strTok[0]){
        str = str + '.00'
    }
    else{
        str = strTok[1].length === 1 ? `${str}0` : str
    }

    return str
}



module.exports = { convert12hr, formatPrice }
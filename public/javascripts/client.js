

let pageReady = (cb) => {
    document.readyState === 'complete' || document.readyState === 'interactive' ? cb() : document.addEventListener('DOMContentLoaded', cb)
}

pageReady(() => {
    console.log("test")
    document.body.style.visibility = 'visible'
})

document.addEventListener('DOMContentLoaded', () => {
    let today = new Date();
    let month_offset = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    let calender = document.getElementById('cal-dates')
    let daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    document.getElementById('current-month').innerHTML = `${months[today.getMonth()]}  ${today.getFullYear()}`


    for (let i = 0; i < month_offset; i++){
        let day = document.createElement('div')
        day.classList.add('day')
        day.innerText = ""
        calender.appendChild(day)
    }

    for(let i = 1; i <= daysInMonth; i++){
        let day = document.createElement('div')
        day.classList.add('day')

        if(today.getDate() === i){
            day.classList.add('selected')
        }
        day.innerText = i
        calender.appendChild(day)
    }
    
})


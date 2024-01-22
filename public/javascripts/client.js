

let pageReady = (cb) => {
    document.readyState === 'complete' || document.readyState === 'interactive' ? cb() : document.addEventListener('DOMContentLoaded', cb)
}

pageReady(() => {
    console.log("test")
    document.body.style.visibility = 'visible'
})

document.addEventListener('DOMContentLoaded', () => {
    createCalender()

    focusDefaultPlayers()

    watchCalender()
    
})



function createCalender(){
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


    // start 1st of month on proper day of week
    for (let i = 0; i < month_offset; i++){
        let day = document.createElement('div')
        day.classList.add(['day', 'day-label'])
        day.innerText = ""
        calender.appendChild(day)
    }

    for(let i = 1; i <= daysInMonth; i++){
        let day = document.createElement('div')
        day.classList.add('day')

        if(i < today.getDate()){
            day.classList.add('previous-day')
        }

        if(today.getDate() === i){
            day.classList.add('calender-selected')
        }
        day.innerText = i
        calender.appendChild(day)
    }
}


function focusDefaultPlayers(){
    let defaultPlayers = document.getElementById('default-players')
    defaultPlayers.classList.add('players-selected')
}

function watchCalender(){
    const cal = document.getElementById('cal-dates')

    cal.addEventListener('click', (ev) => {
        const selectedDay = ev.target.innerText
        const today = new Date()
        const month = today.getMonth() + 1 
        const selectedDate = today.getFullYear() + '-' + month + '-' + selectedDay

        console.log(selectedDate)
    })

}
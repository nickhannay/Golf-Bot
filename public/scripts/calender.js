const GOLF_BOT = require('../../src/shared/golf-bot.js')

let previousDate = null
let selectedDate = null
let today = new Date()
selectedDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()


// generates the dates for a given month of a given year and highlights the given day
const createCalender = (date) => {
    let firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    let calender = document.getElementById('cal-dates')
    let daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

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
    document.getElementById('current-month').innerHTML = `${months[date.getMonth()]}  ${date.getFullYear()}`


    // start 1st of month on proper day of week
    for (let i = 0; i < firstOfMonth; i++){
        let day = document.createElement('div')
        day.classList.add("day")
        day.classList.add("day-label")
        calender.appendChild(day)
    }

    for(let i = 1; i <= daysInMonth; i++){
        let day = document.createElement('div')
        day.classList.add('day')
        
        if((i < date.getDate() && date.getMonth() <= today.getMonth() ) || date.getFullYear() < today.getFullYear()){
            day.classList.add('previous-day')
        }

        if(date.getDate() === i){
            day.classList.add('calender-selected')
            previousDate = day
            selectedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        }
        day.innerText = i
        calender.appendChild(day)
    }
}



const watchCalender = () => {
    const cal = document.getElementById('cal-dates')

    cal.addEventListener('click', async (ev) => {

        // disable clicks for header row and previous days
        if(ev.target.classList.contains('day-label') || ev.target.classList.contains('previous-day')){
            return
        }

        // remove styling from previous date
        previousDate.classList.remove('calender-selected')

        const selection = ev.target
        selection.classList.add('calender-selected')
        previousDate = selection
        
        const selectedDay = selection.innerText
        const selectedMonth = selectedDate.split('-')[1]
        const selectedYear = selectedDate.split('-')[0]
        const searchDate = selectedYear + '-' + selectedMonth + '-' + selectedDay
        selectedDate = searchDate

        const dropdown = document.getElementById('hole-select')
        const selectedOption = dropdown.options[dropdown.selectedIndex]

        const holes = selectedOption.innerText === 'Any' ? '0' : selectedOption.innerText.slice(0,2)

       
        
        const times = await GOLF_BOT.getTeeTimes(searchDate, holes)
        
        const updateTeeTimesEvent = new CustomEvent('updateTeeTimes', {detail : {times}})
        document.dispatchEvent(updateTeeTimesEvent)
    })

}

const getSelectedDate = () => {
    return selectedDate
}


const watchToggle = () => {
    const leftToggle = document.getElementById('cal-toggle-left')
    const rightToggle = document.getElementById('cal-toggle-right')

    leftToggle.addEventListener('click', async (event) => {
        // previous month - last day
        const prevMonth = getPreviousMonth()
        document.getElementById('cal-dates').innerHTML = ''
        generateCalHeaders()
        prevMonth.getMonth() === today.getMonth() ?  createCalender(today): createCalender(prevMonth)
        

        const times = await GOLF_BOT.getTeeTimes(selectedDate)
        const updateTeeTimesEvent = new CustomEvent('updateTeeTimes', {detail : {times}})
        document.dispatchEvent(updateTeeTimesEvent)
    })

    rightToggle.addEventListener('click', async (event) => {
        // next month - first day
        console.log('next month')
        const nextMonth = getNextMonth()
        document.getElementById('cal-dates').innerHTML = ''
        generateCalHeaders()
        nextMonth.getMonth() === today.getMonth() ?  createCalender(today): createCalender(nextMonth)

        const times = await GOLF_BOT.getTeeTimes(selectedDate)

        const updateTeeTimesEvent = new CustomEvent('updateTeeTimes', {detail : {times}})
        document.dispatchEvent(updateTeeTimesEvent)

    })
}


const getNextMonth = () => {
    const currentMonth = selectedDate.split('-')[1]
    const nextMonth = new Date(selectedDate.split('-')[0], currentMonth, 1)
    return nextMonth
}

const getPreviousMonth = () => {
    const currentMonth = selectedDate.split('-')[1]
    const lastMonth = new Date(selectedDate.split('-')[0], currentMonth - 1, 0)
    return lastMonth
}


const generateCalHeaders = () => {
    document.getElementById('cal-dates').innerHTML = `<div class="day day-label">SUN</div>
                                                      <div class="day day-label">MON</div>
                                                      <div class="day day-label">TUE</div>
                                                      <div class="day day-label">WED</div>
                                                      <div class="day day-label">THU</div>
                                                      <div class="day day-label">FRI</div>
                                                      <div class="day day-label">SAT</div>`
}

module.exports = {createCalender, watchCalender, getSelectedDate, watchToggle}
let previousDate = null
let selectedDate = null
let today = new Date()
selectedDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()


function createCalender(){
    let today = new Date();
    let firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
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
    for (let i = 0; i < firstOfMonth; i++){
        let day = document.createElement('div')
        day.classList.add("day")
        day.classList.add("day-label")
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
            previousDate = day
        }
        day.innerText = i
        calender.appendChild(day)
    }
}



function watchCalender(){
    const cal = document.getElementById('cal-dates')

    cal.addEventListener('click', async (ev) => {

        // disable clicks for day labels
        if(ev.target.classList.contains('day-label') || ev.target.classList.contains('previous-day')){
            return
        }

        // remove styling from previous date
        previousDate.classList.remove('calender-selected')

        const selection = ev.target
        selection.classList.add('calender-selected')
        previousDate = selection
        
        const selectedDay = selection.innerText
        const today = new Date()
        const month = today.getMonth() + 1
        const searchDate = today.getFullYear() + '-' + month + '-' + selectedDay
        selectedDate = searchDate

        const dropdown = document.getElementById('hole-select')
        const selectedOption = dropdown.options[dropdown.selectedIndex]

        const holes = selectedOption.innerText === 'Any' ? '0' : selectedOption.innerText.slice(0,2)

        console.log(searchDate)
        

        const params = {
            searchDate: searchDate,
            holes: holes,
            numberOfPlayer: '0',
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
        const res = await fetch('https://golfburnaby.cps.golf/onlineres/onlineapi/api/v1/onlinereservation/TeeTimes?' + new URLSearchParams(params),{
            headers: {
                'x-apiKey' : '8ea2914e-cac2-48a7-a3e5-e0f41350bf3a',
                'x-componentId': '1',
                'x-ismobile': 'false',
                'x-productid': '1',
                'x-requestid': '3a4e1ebb-4041-9595-8589-ec0aaf8ef193',
                'x-siteid' : '1',
                'X-TerminalId': '3',
                'x-timezone-offset': '480',
                'x-timezoneid':  'America/Vancouver',
                'Referer': 'https://golfburnaby.cps.golf/onlineresweb/search-teetime?TeeOffTimeMin=0&TeeOffTimeMax=23.999722222222225',
                'Host': 'golfburnaby.cps.golf',
                'Authorization': `Bearer null`
            }
        })

        const times = await res.json()
        console.log(times)
        updateTeeTimes(times)
    })

}
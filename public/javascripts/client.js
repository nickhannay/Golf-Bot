

let pageReady = (cb) => {
    document.readyState === 'complete' || document.readyState === 'interactive' ? cb() : document.addEventListener('DOMContentLoaded', cb)
}

pageReady(() => {
    console.log("test")
    document.body.style.visibility = 'visible'
})


let previousDate = null
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
            previousDate = day
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

    cal.addEventListener('click', async (ev) => {
        // remove styling from previous date
        previousDate.classList.remove('calender-selected')

        const selection = ev.target
        selection.classList.add('calender-selected')
        previousDate = selection
        
        const selectedDay = selection.innerText
        const today = new Date()
        const month = today.getMonth() + 1 
        const searchDate = today.getFullYear() + '-' + month + '-' + selectedDay

        const dropdown = document.getElementById('hole-select')
        const selectedOption = dropdown.options[dropdown.selectedIndex]

        const holes = selectedOption.innerText === 'Any' ? '0' : selectedOption.innerText.slice(0,2)
        

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
        updateTeeTimes(times)
    })

}


function updateTeeTimes(times){
    const teetimeDiv = document.getElementById('right-teetimes')
    teetimeDiv.innerHTML = '' 

    if( Array.isArray(times) && times.length > 0){
        for(let i = 0; i < times.length; i+=4 ){
            let sub_times = times.slice(i, i + 4)

            const row = document.createElement('div')
            row.classList.add('teetime-row')
            console.log(`times subarray = ${sub_times}`)

            sub_times.forEach((time) => {
                const container = document.createElement('div')
                container.classList.add('teetime-container')
                container.innerText = time.startTime
                row.appendChild(container)
            })
            
            teetimeDiv.appendChild(row)

        }
    }
    else{
        const container = document.createElement('div')
        container.classList.add('missingTeeTimes')
        container.innerHTML = "NO TEE TIMES AVAILABLE"
        teetimeDiv.appendChild(container)
    }
}


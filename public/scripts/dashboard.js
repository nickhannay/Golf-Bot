const utils = require('../../src/shared/utils.js')
const cal = require('./calender.js')

document.addEventListener('DOMContentLoaded', () => {
    const today = new Date()
    cal.createCalender(today)

    cal.watchCalender()

    cal.watchToggle()


    document.addEventListener('updateTeeTimes', (event) => {
        updateTeeTimes(event.detail.times)
    })
    watchPlayerToggle()
})


function updateTeeTimes(times){
    const teetimeDiv = document.getElementById('right-teetimes')
    teetimeDiv.innerHTML = ''

    if( Array.isArray(times) && times.length > 0){
        for(let i = 0; i < times.length; i+=4 ){
            let sub_times = times.slice(i, i + 4)

            const row = document.createElement('div')
            row.classList.add('teetime-row')

            sub_times.forEach((time) => {
                const teeTime = utils.convert12hr(time.startTime)
                console.log(teeTime)

                const container = document.createElement('button')
                container.setAttribute('id', time.teeSheetId)
                console.log(time.teeSheetId)
                container.classList.add('teetime-container')
                container.innerHTML =   `
                                        <div class="teetime-TimeLabel">
                                            <span style="margin-bottom: 1.5rem">${teeTime}</span>
                                            <span class="start-hole">Tee ${time.startingTee}</span>
                                            <span style="color:#C48A1C" class="start-hole">${time.courseName}</span>
                                        </div>
                                        <div class="teetime-footer">
                                            <span>${time.holesDisplay} HOLES | ${time.playersDisplay}</span>
                                            <span style="font-size:large;">CA$${utils.formatPrice(time.shItemPrices[0].price)}</span>
                                        </div>
                                        `
                container.addEventListener('click', clickTeeTime)
                
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




let clickTeeTime = async (ev) => {
    const button = ev.target.closest('.teetime-container');
    const selectedTeeTime = button.getAttribute('id')
    console.log(`tee sheet id: ${selectedTeeTime}`)
    window.sessionStorage.setItem('teeSheetId', selectedTeeTime)

    const teeTime = button.querySelector('span:first-child').innerText

    const selectedDate = cal.getSelectedDate()
    console.log(`selected date: ${selectedDate}`)


    const res = await fetch('/dashboard',
    {
        method : "POST",
        body: JSON.stringify({
             teeSheetId : selectedTeeTime,
             numPlayers : prevNumPlayers.innerText === 'Any' ? 4 : prevNumPlayers.innerText,
             teeTime: teeTime,
             teeDate: selectedDate
            }),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const json = await res.json()
    if (json.redirect){
        window.location.href = json.redirect
    }
}



let prevNumPlayers = document.getElementById('any-players');
function watchPlayerToggle(){
    

    const playerToggle = document.getElementById('num-players')

    playerToggle.addEventListener('click', (event) => {
        prevNumPlayers.classList.remove('players-selected')

        const newNumPlayers = event.target.closest('.num-players-toggle')
        newNumPlayers.classList.add('players-selected')
        prevNumPlayers = newNumPlayers
    })
}


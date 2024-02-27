

document.getElementById('reserve-button').addEventListener('click', (event) => {
    reserveTeeTime()
})

const reserveTeeTime = (async () => {
    
    const teeSheetId = window.sessionStorage.getItem('teeSheetId')
    console.log(`reserving ${teeSheetId}`)

    const numPlayers = document.getElementById('num-players-selected').innerText
    const date = sessionStorage.getItem('selectedDate')
    
    const reserveObject = {
        teeSheetId: teeSheetId,
        numGolfers: numPlayers,
        teeDate: date,
    }


    const res = await fetch('/reserve', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(reserveObject)
    })

    const json = await res.json()

    console.log(json)
    if(json.error){
        window.sessionStorage.setItem('reserve_error', json.error)
        window.location.href = json.redirect
        
    }
    else{
        window.sessionStorage.removeItem('reserve_error')
        window.location.href = json.redirect
    }
    


})
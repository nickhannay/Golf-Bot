const reserveTeeTime = (async () => {
    
    const teeSheetId = window.sessionStorage.getItem('teeSheetId')
    console.log(`reserving ${teeSheetId}`)

    const numPlayers = document.getElementById('num-players-selected').innerText
    
    const reserveObject = {
        teeSheetId: teeSheetId,
        numGolfers: numPlayers
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
    window.location.href = json.redirect


})
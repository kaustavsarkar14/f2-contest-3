const hourInput = document.getElementById('hourInput')
const minuteInput = document.getElementById('minuteInput')
const secondInput = document.getElementById('secondInput')
const setButton = document.getElementById('setButton')
const timers = document.getElementById('timers')
const audio = new Audio('./audio/alarm.mp3')
let index = 0
const timerIntervals = []
function addTimer(totalSeconds) {
    const card = document.createElement('div')
    card.className = "card"
    card.id = index
    index++
    timers.appendChild(card)
    const timerInterval = setInterval(() => {
        if (totalSeconds == 0) {
            clearInterval(timerInterval)
            card.innerHTML = `
            <h3>Time's Up!</h3>
            <button id="completedtimerButton" onclick="stopTimer(this)" >Stop</button>
            `
            card.className = "time-up"
            audio.play()
        }
        else {
            const hours = Math.floor(totalSeconds/3600)
            const minutes = Math.floor((totalSeconds-hours*3600)/60)
            const seconds = Math.floor((totalSeconds-hours*3600-minutes*60))
            card.innerHTML = `
            <h4>Time Left:</h4>
            <h2>${hours}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2, "0")}</h2>
            <button id="timerButton" onclick="stopTimer(this)" >Stop</button>
            `
            totalSeconds--
        }
    }, 1000);
    timerIntervals.push(timerInterval)
}

function stopTimer(currentTimer){
    clearInterval(timerIntervals[currentTimer.parentNode.id])
    currentTimer.parentNode.remove()
}

setButton.addEventListener('click', () => {
    const hour = hourInput.value === "" ? 0 : parseInt(hourInput.value);
    const minute = minuteInput.value === "" ? 0 : parseInt(minuteInput.value);
    const second = secondInput.value === "" ? 0 : parseInt(secondInput.value);
    
    const totalSeconds = hour * 3600 + minute * 60 + second;
    console.log(totalSeconds)
    if (isNaN(totalSeconds) || totalSeconds == 0) {
        alert("Enter a valid time")
        return
    }
    hourInput.value = ""
    minuteInput.value = ""
    secondInput.value = ""
    addTimer(totalSeconds)
})

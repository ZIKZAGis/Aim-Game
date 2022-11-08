const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timelist = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let time = 0;
let score = 0

const generateRandomColor = () => {
    const hexCodes = '0123456789ABCDEF'

    let color = ''

    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}

board.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('circle')) {
        score++
        evt.target.remove()
        createRandomCircle()
    }
})

const getRandomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const createRandomCircle = () => {
    const circle = document.createElement('div')

    const size = getRandomNumber(10, 45)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    const color = generateRandomColor()

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.background = color
    circle.style.boxShadow = `0 0 4px ${color}, 0 0 10px ${color}`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

const setTime = (value) => {
    timeEl.innerHTML = `00:${value}`
}

const finishGame = () => {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
}

const decreaseTime = () => {
    if (time === 0) {
        finishGame()
        // const btnEnd = document.createElement('button')
        // btnEnd.style.width = '200px'
        // btnEnd.style.height = '80px'
        // btnEnd.style.color = 'black'
        // btnEnd.innerHTML = 'Начать сначала'
        // screens[2].append(btnEnd)
    } else {
        let current = --time

        if (current < 10) {
            current = `0${current}`
        }
    
        setTime(current)
    }
}

const startGame = () => {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

startBtn.addEventListener('click', (evt) => {
    evt.preventDefault()
    screens[0].classList.add('up')
})

timelist.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('time-btn')) {
        time = parseInt(evt.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})
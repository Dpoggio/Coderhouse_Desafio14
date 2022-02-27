const cfg = require('../config.js')

const getRandomNumber = (maxValue = cfg.RANDOM_MAX_VALUE) => {
        return Math.floor(Math.random()*maxValue)+1
    }

const getRandoms = (cant = cfg.RANDOM_DEFAULT_CANT) => {
        const numbers = {}
        for (let i = 0; i<cant; i++){
            const number = getRandomNumber()
            if (!numbers[number]) {
                numbers[number] = 1
            } else {
                numbers[number]++
            }
        }
        return numbers
    }

process.on('message', msg => {
    const listaRandom = getRandoms(msg.cant)
    process.send(listaRandom)
})
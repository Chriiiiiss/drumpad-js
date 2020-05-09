let _w = window.innerWidth
let _h = window.innerHeight
const container = document.querySelector(".container")
const buttons = container.querySelectorAll("div[class^='button'")
let currentAudio
let amplitude
let soundList
let radius = 0
const MAX_DEGREE = 360
const LINE_MAX_HEIGHT = 400
const LINE_MIN_HEIGHT = 150

class sound {
    constructor(id, url) {
        this.id = id,
        this.url = url
    }
}
let historyBeats  = []

function playAudio(audio) {
    audio.play()
}

window.addEventListener("resize", () => {
    _w = window.innerWidth
    _h = window.innerHeight
    resizeCanvas(_w, _h)
})

function preload() {
    soundList = [
        new sound(0,loadSound("./sounds/aweyeah.mp3")),
        new sound(1,loadSound("./sounds/drake-ugh.mp3")),
        new sound(2,loadSound("./sounds/drake-yeauh.mp3")),
        new sound(3,loadSound("./sounds/ha.mp3")),
        new sound(4,loadSound("./sounds/hey.mp3")),
        new sound(5,loadSound("./sounds/holdup.mp3")),
        new sound(6,loadSound("./sounds/huh.mp3")),
        new sound(7,loadSound("./sounds/jyea.mp3")),
        new sound(8,loadSound("./sounds/khaled.mp3")),
        new sound(9,loadSound("./sounds/ugh.mp3")),
        new sound(10,loadSound("./sounds/moonlight.mp3"))
    ]
}

function setup() {
    createCanvas(_w, _h)
    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault     
            button.classList.remove("click_anim")
            void button.offsetWidth // makes the button to reflow and reset the animation
            button.classList.add("click_anim")
            currentAudio = soundList[button.attributes[1].value].url
            if (currentAudio.isPlaying() === false && isLoop(button) === true) {
                currentAudio.loop()
            } else {
                currentAudio.stop()
            }
            if (currentAudio.isPlaying() === false && isLoop(button) === false) {
                playAudio(currentAudio)
            }        
        })
    })
    amplitude = new p5.Amplitude()
}

function isLoop(button) {
    return app = (button.classList[1] === "loop") ? true : false
}

function draw() {
    background(0)
    colorMode(HSB)
    angleMode(DEGREES)
    let vol = amplitude.getLevel()
    historyBeats.push(vol)
    // fill(Math.random() * 255, Math.random() * 255, 0)
    // noFill()
    translate(width / 2, height / 2)
    if (radius > 350) {
        background(270, 100, 37)
        
    }
    beginShape()
    for (let i = 0; i < MAX_DEGREE ; i++) {
        if (historyBeats[i]) {
            radius = map(historyBeats[i], 0, 0.5, LINE_MIN_HEIGHT, LINE_MAX_HEIGHT)
        } else {
            radius = map(0, 0, 0.5, LINE_MIN_HEIGHT, LINE_MAX_HEIGHT)
        }

        let x = radius * cos(i)
        let y = radius * sin(i)
        stroke(i, 255, 255)
        fill(i, 255, 255)
        line(0,0, x, y)
    }
    endShape()
    
    if (historyBeats.length > 360) {
        historyBeats.splice(0 , 1)
    }
}

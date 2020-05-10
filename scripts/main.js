// DOM ELEM

const containerElem = document.querySelector(".container_pads")
const buttonsElem = containerElem.querySelectorAll("div[class^='button'")
const switchElem = document.querySelector(".checkbox")

// UGLY GLOBAL VARS

let _w = window.innerWidth
let _h = window.innerHeight
let currentAudio
let amplitude
let historyBeats  = []
let vol 
let fft
let spectrum
let soundList
let radius = 0

// SOME CONST (HAVE FUN 🥳)

const MAX_DEGREE = 360
const LINE_MAX_HEIGHT = 400
const LINE_MIN_HEIGHT = 150

// SOUND OBJECT

class sound {
    constructor(id, url) {
        this.id = id,
        this.url = url
    }
}


// AUTO RESIZE CANVAS

window.addEventListener("resize", () => {
    _w = window.innerWidth
    _h = window.innerHeight
    resizeCanvas(_w, _h)
})


// PRELOAD P5 FUNCTION USED TO PRELOAD SOUNDS

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

// SETUP FUNCTION TO SETUP THE CANVAS
// ADD A CLICK EVENT LISTENER TO PLAY SONGS (PERSONAL CHOICE TO NOT APPLY A KEYDOWN EVENT LISTENER)
// USING offset.Width MAKES REFLOW THE BUTTONS AND RESET THE ANIMATION
// USING A isLoop FUNCTION DESCRIBED LATER

function setup() {
    createCanvas(_w, _h)
    buttonsElem.forEach(button => {
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
                currentAudio.play()
            }        
        })
    })
    fft = new p5.FFT(0, 256)
    amplitude = new p5.Amplitude()
}

// DRAW P5 LOOP FUNCTION
// USING P5 FFT AND AMPLITUDE OBJECT

function draw() {
    background(0)
    spectrum = fft.analyze()
    colorMode(HSB)
    angleMode(DEGREES)
    vol = amplitude.getLevel()
    historyBeats.push(vol)
    fill(Math.random() * 255, Math.random() * 255, 0)
    noFill()
    translate(width / 2, height / 2)
    if (radius > 350) {
        background(270, 100, 37)
        
    }
    beginShape()
    if (switchElem.checked) {
        fftRadial()
        
    } else {
        ampRadial()
    }
    endShape()
    
    if (historyBeats.length > 360) {
        historyBeats.splice(0 , 1)
    }
}


// FFT RADIAL CIRCLE FUNCTION 

function fftRadial() {
    for (let i = 0; i < spectrum.length ; i++) {
        let amp = spectrum[i]
        let angle = map(i, 0, spectrum.length, 0,  MAX_DEGREE)
        if (spectrum[i]) {
            radius = map(amp, 0, 256, LINE_MIN_HEIGHT, LINE_MAX_HEIGHT) 
        } else {
            radius = map(0, 0, 256, LINE_MIN_HEIGHT, LINE_MAX_HEIGHT) 
        }
        let x = radius * cos(angle)
        let y = radius * sin(angle)
        stroke(i, 255, 255)
        fill(i, 255, 255)
        line(0, 0, x, y)
    }
}

// AMPLITUDE RADIAL CIRCLE FUNCTION

function ampRadial() {
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
        line (0,0, x, y)
    }
}


// TERNARY FUNCTION THAT RETURNS A BOOLEAN

function isLoop(button) {
    return app = (button.classList[1] === "loop") ? true : false
}
let _w = window.innerWidth
let _h = window.innerHeight
const container = document.querySelector(".container")
const buttons = container.querySelectorAll("div[class^='button'")
let currentAudio
let amplitude
let soundList
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
        new sound(9,loadSound("./sounds/ugh.mp3"))
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
            playAudio(currentAudio)
        })
    })
    amplitude = new p5.Amplitude()
}

function draw() {
    background(0)
    let vol = amplitude.getLevel()
    historyBeats.push(vol)
    stroke(255)
    noFill()
    beginShape()
    for (let i = 0; i < historyBeats.length; i++) {
        let y = map(historyBeats[i], 0, 0.5, _h / 2, 0)
        vertex(i, y)
    }
    endShape()

    if (historyBeats.length > _w) {
        historyBeats.splice(0 , 1)
    }

    stroke(255, 0, 0)
    line(historyBeats.length, 0, historyBeats.length, _h)
}
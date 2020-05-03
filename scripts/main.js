let _w = window.innerWidth
let _h = window.innerHeight
const container = document.querySelector(".container")
const buttons = container.querySelectorAll("div[class^='button'")

class sound {
    constructor(id, url) {
        this.id = id,
        this.url = url
    }
}

const soundList = [
    new sound(0,"../sounds/aweyeah.mp3"),
    new sound(1,"../sounds/drake-ugh.mp3"),
    new sound(2,"../sounds/drake-yeauh.mp3"),
    new sound(3,"../sounds/ha.mp3"),
    new sound(4,"../sounds/hey.mp3"),
    new sound(5,"../sounds/holdup.mp3"),
    new sound(6,"../sounds/huh.mp3"),
    new sound(7,"./sounds/jyea.mp3"),
    new sound(8,"./sounds/khaled.mp3"),
    new sound(9,"./sounds/ugh.mp3")
]

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault
        button.classList.remove("click_anim")
        void button.offsetWidth // makes the button to reflow and reset the animation
        button.classList.add("click_anim")
        playAudio(soundList[button.attributes[1].value].url)
        
    })
})

function playAudio(url) {
    const audio = new Audio(url)
    audio.play()
}

window.addEventListener("resize", () => {
    _w = window.innerWidth
    _h = window.innerHeight
    resizeCanvas(_w, _h)
})

function setup() {
    createCanvas(_w, _h)
}

function draw() {
    background(0)
}
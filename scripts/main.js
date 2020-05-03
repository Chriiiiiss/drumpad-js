let _w = window.innerWidth
let _h = window.innerHeight
const container = document.querySelector(".container")
let buttons = container.querySelectorAll("div[class^='button'")

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault
        button.classList.remove("click_anim")
        void button.offsetWidth // makes the button to reflow and reset the animation
        button.classList.add("click_anim")
    })
})

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
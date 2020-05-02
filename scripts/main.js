import anime from 'animejs/lib/anime.es.js'
let _w = window.innerWidth
let _h = window.innerHeight
const buttons = [...document.querySelectorAll("div[class^='button'")]


buttons.forEach(button => {
    button.addEventListener("click", () => {
        console.log("click")
    })
});

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

anime({
    targets: 'div',
    translateX: 250,
    rotate: '1turn',
    backgroundColor: '#FFF',
    duration: 800
  });
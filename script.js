const toggleBurger = () => {
  document.querySelector(".burger").classList.toggle("open")
  document.querySelector(".nav").classList.toggle("open")
  document.querySelector(".mobile-nav-bg").classList.toggle("open")
}

gsap.registerPlugin(ScrollTrigger)
let tl = gsap.timeline()

tl.from(".name-wrapper", {
  y: "-300%",
  opacity: 0,
  duration: 2,
  ease: Power4.easeOut,
})

tl.from(
  ".stagger1",
  {
    opacity: 0,
    y: -50,
    stagger: 0.3,
    ease: Power4.easeOut,
    duration: 2,
  },
  "-=1.5"
)
tl.from(
  ".stagger2",
  {
    opacity: 0,
    y: 50,
    stagger: 0.3,
    ease: Power4.easeOut,
    duration: 2,
  },
  "-=2"
)

gsap.from(".transition2", {
  scrollTrigger: {
    trigger: ".transition2",
    start: "top bottom",
  },
  y: 50,
  opacity: 0,
  duration: 1.2,
  stagger: 0.3,
})
gsap.from(".transition3", {
  scrollTrigger: {
    trigger: ".transition3",
    start: "top bottom",
  },
  y: 50,
  opacity: 0,
  duration: 1.2,
  stagger: 0.3,
})
gsap.from(".transition4", {
  scrollTrigger: {
    trigger: ".transition4",
    start: "top bottom",
  },
  y: 50,
  opacity: 0,
  duration: 1.2,
  stagger: 0.3,
})

gsap.from(".transition5", {
  scrollTrigger: {
    trigger: ".transition5",
    start: "top bottom",
  },
  y: 50,
  opacity: 0,
  duration: 1.2,
  stagger: 0.3,
})

gsap.from(".transition6", {
  scrollTrigger: {
    trigger: ".transition6",
    start: "top center",
  },
  x: 50,
  opacity: 0,
  duration: 2,
  stagger: 0.75,
  ease: Power4.easeOut,
})

gsap.from(".transition7", {
  scrollTrigger: {
    trigger: ".transition7",
    start: "top bottom",
  },
  x: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.1,
  ease: Sine.easeOut,
})

gsap.from(
  ".transition9",
  {
    scrollTrigger: {
      trigger: ".transition9",
      start: "top center",
    },
    x: 50,
    opacity: 0,
    duration: 1,
    ease: Sine.easeOut,
  },
  "+2"
)

gsap.from(".left", {
  scrollTrigger: {
    trigger: ".left",
    start: "top bottom",
  },
  x: -100,
  opacity: 0,
  duration: 1,
  ease: Sine.easeOut,
})

// gsap.from(
//   ".transition8",
//   {
//     scrollTrigger: {
//       trigger: ".transition8",
//       start: "top bottom",
//     },
//     y: 50,
//     opacity: 0,
//     duration: 1,
//     stagger: 0.4,
//     ease: Power4.easeOut,
//   },
//   "-=3"
// )

tl.from(".transition8", {
  opacity: 0,
  y: -50,
  stagger: 0.3,
  ease: Power4.easeOut,
  duration: 2,
})

// gsap.to(".move", {
//   scrollTrigger: {
//     trigger: ".move",
//     start: "top top",
//   },
//   x: 400,
//   ease: Power4.easeOut,
// })

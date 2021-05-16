const toggleBurger = () => {
  let burger = document.querySelector(".burger")
  burger.classList.toggle("open")
  let nav = document.querySelector(".nav")
  nav.classList.toggle("open")
  let mobileNav = document.querySelector(".mobile-nav-bg")
  mobileNav.classList.toggle("open")
  let navItems = document.querySelectorAll(".click")
  Array.from(navItems).forEach((item) => {
    item.addEventListener("click", () => {
      nav.classList.remove("open")
      mobileNav.classList.remove("open")
      burger.classList.remove("open")
    })
  })
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

tl.from(".transition8", {
  opacity: 0,
  y: -50,
  stagger: 0.3,
  ease: Power4.easeOut,
  duration: 2,
})

gsap.from(".showProject1", {
  scrollTrigger: {
    trigger: ".showProject1",
    start: "top center",
  },
  x: 80,
  opacity: 0,
  duration: 3,
  ease: Power4.easeOut,
})
gsap.from(".showProject2", {
  scrollTrigger: {
    trigger: ".showProject2",
    start: "top center",
  },
  x: 80,
  opacity: 0,
  duration: 3,
  ease: Power4.easeOut,
})
gsap.from(".showProject3", {
  scrollTrigger: {
    trigger: ".showProject3",
    start: "top center",
  },
  x: 80,
  opacity: 0,
  duration: 3,
  ease: Power4.easeOut,
})
gsap.from(".showProject4", {
  scrollTrigger: {
    trigger: ".showProject4",
    start: "top center",
  },
  x: 80,
  opacity: 0,
  duration: 3,
  ease: Power4.easeOut,
})
gsap.from(".showProject5", {
  scrollTrigger: {
    trigger: ".showProject5",
    start: "top center",
  },
  x: 80,
  opacity: 0,
  duration: 3,
  ease: Power4.easeOut,
})

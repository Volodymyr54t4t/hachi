// Particle Canvas Animation
const canvas = document.getElementById("particles-canvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const particles = []
const particleCount = 100

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.color = Math.random() > 0.5 ? "rgba(255, 77, 109, 0.5)" : "rgba(0, 217, 255, 0.5)"
    }

    update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
    }
}

function init() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()

        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
                ctx.strokeStyle = `rgba(255, 77, 109, ${0.2 - distance / 500})`
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.moveTo(particles[i].x, particles[i].y)
                ctx.lineTo(particles[j].x, particles[j].y)
                ctx.stroke()
            }
        }
    }

    requestAnimationFrame(animate)
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

init()
animate()

// Navbar scroll effect
let lastScroll = 0
const navbar = document.querySelector(".navbar")

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 100) {
        navbar.style.padding = "15px 0"
        navbar.style.background = "rgba(10, 14, 39, 0.95)"
    } else {
        navbar.style.padding = "20px 0"
        navbar.style.background = "rgba(10, 14, 39, 0.85)"
    }

    lastScroll = currentScroll
})

// Mobile menu toggle functionality
const mobileMenuToggle = document.getElementById("mobileMenuToggle")
const navMenu = document.getElementById("navMenu")

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", () => {
        mobileMenuToggle.classList.toggle("active")
        navMenu.classList.toggle("active")
    })

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-menu a")
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenuToggle.classList.remove("active")
            navMenu.classList.remove("active")
        })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove("active")
            navMenu.classList.remove("active")
        }
    })
}

// Counter animation for stats
const statNumbers = document.querySelectorAll(".stat-number[data-target]")

const animateCounter = (element) => {
    const target = Number.parseInt(element.getAttribute("data-target"))
    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0

    const updateCounter = () => {
        current += increment
        if (current < target) {
            element.textContent = Math.floor(current)
            requestAnimationFrame(updateCounter)
        } else {
            element.textContent = target
        }
    }

    updateCounter()
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px",
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            animateCounter(entry.target)
            observer.unobserve(entry.target)
        }
    })
}, observerOptions)

statNumbers.forEach((stat) => {
    observer.observe(stat)
})

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
    })
})

// Add fade-in animation on scroll
const fadeElements = document.querySelectorAll(".manifesto-card, .team-card, .stat-item")

const fadeObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1"
                entry.target.style.transform = "translateY(0)"
            }
        })
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    },
)

fadeElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    fadeObserver.observe(element)
})
// Smooth Scrolling
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

// Animated Counter
function animateCounter(element) {
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains("stat-number")) {
                animateCounter(entry.target)
                observer.unobserve(entry.target)
            }
        }
    })
}, observerOptions)

document.querySelectorAll(".stat-number").forEach((stat) => {
    observer.observe(stat)
})

// Add scroll effect to navbar
let lastScroll = 0
const navbar = document.querySelector(".navbar")

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 100) {
        navbar.style.padding = "15px 0"
        navbar.style.background = "rgba(10, 14, 39, 0.98)"
    } else {
        navbar.style.padding = "20px 0"
        navbar.style.background = "rgba(10, 14, 39, 0.95)"
    }

    lastScroll = currentScroll
})

// Team card 3D effect
document.querySelectorAll(".team-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = (y - centerY) / 20
        const rotateY = (centerX - x) / 20

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`
    })

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)"
    })
})
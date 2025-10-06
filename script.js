const canvas = document.getElementById("particles-canvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25

        const colors = [
            "rgba(255, 77, 109, 0.6)",
            "rgba(255, 107, 157, 0.5)",
            "rgba(0, 217, 255, 0.4)",
            "rgba(255, 77, 109, 0.3)",
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
    }

    update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width || this.x < 0) {
            this.speedX = -this.speedX
        }
        if (this.y > canvas.height || this.y < 0) {
            this.speedY = -this.speedY
        }
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
    }
}

const particlesArray = []
const numberOfParticles = 80

for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle())
}

function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            const dx = particlesArray[a].x - particlesArray[b].x
            const dy = particlesArray[a].y - particlesArray[b].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 120) {
                const opacity = 1 - distance / 120
                ctx.strokeStyle = `rgba(255, 77, 109, ${opacity * 0.2})`
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
                ctx.stroke()
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
    }

    connectParticles()
    requestAnimationFrame(animate)
}

animate()

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

function animateCounter(element) {
    if (element.classList.contains("infinity")) {
        return
    }

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

const photoInput = document.getElementById("photo")
const photoUploadArea = document.getElementById("photoUploadArea")
const uploadPlaceholder = document.getElementById("uploadPlaceholder")
const photoPreview = document.getElementById("photoPreview")
const previewImage = document.getElementById("previewImage")
const removePhotoBtn = document.getElementById("removePhoto")

photoUploadArea.addEventListener("click", (e) => {
    if (e.target !== removePhotoBtn && !e.target.closest(".remove-photo")) {
        photoInput.click()
    }
})

photoInput.addEventListener("change", (e) => {
    handleFile(e.target.files[0])
})

photoUploadArea.addEventListener("dragover", (e) => {
    e.preventDefault()
    photoUploadArea.classList.add("dragover")
})

photoUploadArea.addEventListener("dragleave", () => {
    photoUploadArea.classList.remove("dragover")
})

photoUploadArea.addEventListener("drop", (e) => {
    e.preventDefault()
    photoUploadArea.classList.remove("dragover")

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
        handleFile(file)
    }
})

function handleFile(file) {
    if (!file || !file.type.startsWith("image/")) {
        alert("Будь ласка, виберіть файл зображення")
        return
    }

    if (file.size > 5 * 1024 * 1024) {
        alert("Файл занадто великий. Максимальний розмір: 5MB")
        return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
        previewImage.src = e.target.result
        uploadPlaceholder.style.display = "none"
        photoPreview.style.display = "block"
    }
    reader.readAsDataURL(file)
}

removePhotoBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    photoInput.value = ""
    previewImage.src = ""
    uploadPlaceholder.style.display = "flex"
    photoPreview.style.display = "none"
})

const joinForm = document.getElementById("joinForm")
joinForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const btnText = document.querySelector(".btn-text")
    const btnLoader = document.querySelector(".btn-loader")
    const submitBtn = document.querySelector(".btn-submit")

    btnText.style.display = "none"
    btnLoader.style.display = "inline"
    submitBtn.disabled = true

    setTimeout(() => {
        alert("Дякуємо за заявку! Ми зв'яжемося з тобою найближчим часом 🚀")

        joinForm.reset()
        photoInput.value = ""
        previewImage.src = ""
        uploadPlaceholder.style.display = "flex"
        photoPreview.style.display = "none"

        btnText.style.display = "inline"
        btnLoader.style.display = "none"
        submitBtn.disabled = false
    }, 2000)
})


const toast = (message) => {

    const body              = document.querySelector("body")

    const container         = document.createElement("div")
    container.classList     = "toast-container"

    const p                 = document.createElement("p")
    p.classList             = "text-3"
    p.innerText             = message

    container.append(p)
    body.appendChild(container)
}

export {toast}
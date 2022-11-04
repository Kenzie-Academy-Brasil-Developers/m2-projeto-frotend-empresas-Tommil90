

const toast = (message) => {

    const body              = document.querySelector("body")

    const container         = document.createElement("div")
    container.classList     = "toast-container"

    const p                 = document.createElement("p")
    p.classList             = "text-3"
    p.innerText             = message

    if (message == "Usuario ja existe") {
        container.classList.add("errorToast")
    } else {
        container.classList.add("successToast")
    }
    container.append(p)
    body.appendChild(container)
}

export {toast}

function spinner() {
    const button = document.querySelector(".spinner")
    button.innerHTML = ""

    const img = document.createElement("img")
    img.src   = "/src/assets/icons/spinner.svg"
    img.alt   = "spinner"
    img.classList.add("loading")

    button.appendChild(img)
}


export {spinner}
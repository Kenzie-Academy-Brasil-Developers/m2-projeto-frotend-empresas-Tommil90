
function openModal(content){

    const body = document.querySelector("body")

    const backgroundContainer       = document.createElement("section")
    backgroundContainer.classList   = "modal-background"

    const mainContainer             = document.createElement("section")
    mainContainer.classList         = "modal-container"

    const closeModalButton          = document.createElement("button")
    closeModalButton.classList      = "modal-close"
    closeModalButton.innerText      = "X"


    closeModalButton.addEventListener("click", ()=>{
        backgroundContainer.remove()
    })
    // backgroundContainer.addEventListener("click", e => {
    //     const {className} = e.target

    //     if(className === "modal-background" || "modal-close"){
    //          backgroundContainer.remove()
    //     }
        
    // })

    mainContainer.appendChild(closeModalButton)
    mainContainer.append(content)
    backgroundContainer.appendChild(mainContainer)
    body.appendChild(backgroundContainer)

} 

export {openModal}
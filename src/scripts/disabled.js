

function inputDisabled (){

    const form      = document.querySelector("form")
    const elements  = [...form.elements]
    const button    = elements[2]


    form.addEventListener("input", e => {
        
        e.preventDefault()

        if (elements[0].value !== "" && elements[1].value !== ""){
                
                button.disabled = false
                button.style.opacity = "100%"
        }
        
    })
}

function inputDisabledRegister (){

    const form      = document.querySelector("form")
    const elements  = [...form.elements]
    const button    = elements[4]


    form.addEventListener("input", e => {
        
        e.preventDefault()

        if (elements[0].value !== "" && elements[1].value !== "" && elements[2].value !== "" && elements[3].value !== ""){
                
                button.disabled = false
                button.style.opacity = "100%"
        }
        
    })
}

export {inputDisabled, inputDisabledRegister}

// elements.forEach(element => {
//     if(element.tagName == "INPUT" && element.value !== "") {
//        console.log("2")
//        // button.disabled = false
//        // button.style.opacity = "100%"
//        }
//    })
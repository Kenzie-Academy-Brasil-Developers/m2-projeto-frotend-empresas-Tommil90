import {requestLoginUser} from "/src/scripts/requests.js"
import {showButtons} from "/src/scripts/mobile.js"
import {inputDisabledRegister} from "/src/scripts/disabled.js"


async function loginUser (){

    const form      = document.querySelector("form")
    const elements  = [...form.elements]

    form.addEventListener("submit", async e => {
        e.preventDefault()

        const body = {}

        elements.forEach(element => {
            
            if (element.tagName == "INPUT" && element.value !== ""){

                body[element.name] = element.value
            }
        })
        console.log(body)
         await requestLoginUser(body)
        
    })
}

showButtons()
loginUser ()
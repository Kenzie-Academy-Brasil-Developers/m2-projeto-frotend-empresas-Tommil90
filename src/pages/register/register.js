import {requestCreateUser} from "/src/scripts/requests.js"
import {showButtons} from "/src/scripts/mobile.js"
import {inputDisabledRegister} from "/src/scripts/disabled.js"

async function registerUser (){

    const form      = document.querySelector("form")
    const elements  = [...form.elements]

    inputDisabledRegister()
    form.addEventListener("submit", async e => {
        e.preventDefault()

        const body = {}

        elements.forEach(element => {
            
            if ((element.tagName == "INPUT" || element.tagName == "SELECT") && element.value !== ""){

                body[element.name] = element.value
            }
        })
        console.log(body)
        await requestCreateUser(body)
    })
}

showButtons()
registerUser ()
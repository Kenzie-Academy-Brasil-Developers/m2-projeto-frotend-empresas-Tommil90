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

function goHome(){

    const btngoHome = document.querySelectorAll(".goHome")

    btngoHome.forEach(btn => {
        
        btn.addEventListener("click", e=> {
        
            e.preventDefault()
            window.location.replace("/index.html")
        })
    })
}

function goRegister(){

    const btngoRegister = document.querySelectorAll(".goRegister")

    btngoRegister.forEach(btn => {
        
        btn.addEventListener("click", e=> {
        
            e.preventDefault()
            window.location.replace("/src/pages/register/register.html")
        })
    })
}

showButtons()
loginUser ()
goHome()
goRegister()
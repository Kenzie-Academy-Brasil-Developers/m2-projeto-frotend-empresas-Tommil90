import {requestSectors, requestCompaniesBySector, requestCompanies} from "./requests.js";
import { showButtons } from "./mobile.js";

// const form = document.querySelector("form")
const select = document.querySelector("select")
const ul = document.querySelector("ul")

function RedirectPages(){

   const btnRedirect = document.querySelectorAll("button")
    
    btnRedirect.forEach( button => {
        button.addEventListener("click", e=> {

            if (button.innerText == "Login"){
                window.location.replace("/src/pages/login/login.html")
            }else{
                window.location.replace("/src/pages/register/register.html")
            }
        })
    })
}

async function renderSectors(){

    const list = await requestSectors()

    list.forEach(({uuid, description}) => {

        select.insertAdjacentHTML("beforeend", `
        <option id="${uuid}" value="${description}">${description}</option>
        `)
    })
}


async function renderListCompanies(){

    const list = await requestCompanies()

    list.forEach(({name, opening_hours, sectors}) => {
            
        ul.insertAdjacentHTML("beforeend", `
        <li>
        <h3>${name}</h3>
        <p>${opening_hours}</p>
        <p>${sectors.description}</p>
        </li>       
        `)
    });
}

async function renderListCompaniesBySector () {

    select.addEventListener("change", async () => {
        ul.innerHTML = ""
        const value = select.value
        const list = await requestCompaniesBySector (value)

        list.forEach(({name, opening_hours, sectors}) => {
            
            ul.insertAdjacentHTML("beforeend", `
            <li>
            <h3>${name}</h3>
            <p>${opening_hours}</p>
            <p>${sectors.description}</p>
            </li>       
            `)
        });
    })
}

showButtons()
renderSectors()
renderListCompanies()
renderListCompaniesBySector()
RedirectPages()

export {renderSectors}

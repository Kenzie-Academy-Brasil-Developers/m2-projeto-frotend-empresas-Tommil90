import { requestInfoUser, requestDepertamentUser, requestSameDepartamentUsers, requestUpdateUser } from "../../scripts/requests.js";
import {openModal} from "../../scripts/modal.js"


let tokenUser = JSON.parse(localStorage.getItem("@KenzieEmpresas:user"))



async function renderUserInfo(){

    const {uuid, username, email, professional_level, kind_of_work, department_uuid} = await requestInfoUser(tokenUser)

    const section = document.getElementById("user-info")
    section.classList = "flex justify-between p-2 border"
    section.innerHTML = ""

    const div1 = document.createElement("div")
    div1.classList = "flex flex-col gap"

    const h1 = document.createElement("h1")
    h1.classList = "title-2"
    h1.innerText = username

    const div2 = document.createElement("div")
    div2.classList = "flex gap-5"

    const p1 = document.createElement("p")
    p1.classList = ""
    p1.innerText = `Email: ${email}`

    const p2 = document.createElement("p")
    p2.classList = ""
    p2.innerText = professional_level

    const p3 = document.createElement("p")
    p3.classList = ""
    p3.innerText = kind_of_work

    const editIcon = document.createElement("img")
    editIcon.classList = ""
    editIcon.src = "/src/assets/icons/black_pencil.svg"
    editIcon.alt = "editIcon"

    editIcon.addEventListener("click", () => {

        const sectionModal = document.createElement("section")
        sectionModal.classList= "p-2"

        const h1 = document.createElement("h1")
        h1.classList = "title-1"
        h1.innerText = "Editar Perfil"

        const form = document.createElement("form")
        form.classList = "flex flex-col gap"

        form.addEventListener("submit", async (e) => {

             e.preventDefault()
    
            // const form      = document.querySelector("form")
            const elements  = [...form.elements]
    
            const body = {}
    
            elements.forEach(element => {
                if(element.tagName == "INPUT" && element.value !== "") {
                    body[element.name] = element.value
                }
            })
                console.log(body)
                await requestUpdateUser (tokenUser , body)
                section.innerHTML = ""
                renderUserInfo()
    
            let tag = e.target;
    
            if (tag.tagName == "FORM") {
             //ACESSANDO ELEMENTO PAI
            let section = tag.closest(".modal-background");
    
             //REMOVENDO ELEMENTO
              section.remove()
            }
        })

        const inputName = document.createElement("input")
        inputName.classList = "input-default"
        inputName.type = "text"
        inputName.name = "username"
        inputName.value = username

        const inputEmail = document.createElement("input")
        inputEmail.classList = "input-default"
        inputEmail.type = "email"
        inputEmail.name = "email"
        inputEmail.value = email 

        const inputPassword = document.createElement("input")
        inputPassword.classList = "input-default"
        inputPassword.type = "text"
        inputPassword.name = "password" 
        inputPassword.placeholder = "Digite sua senha ou nova senha"

        const buttonPatch = document.createElement("button")
        buttonPatch.classList = "button-default"
        buttonPatch.type="submit"
        buttonPatch.innerText = "Editar perfil"
        
        form.append(inputName, inputEmail, inputPassword, buttonPatch)
        sectionModal.append(h1, form)
        openModal(sectionModal)
    })

    div2.append(p1, p2, p3)
    div1.append(h1, div2)
    section.append(div1, editIcon)

}
renderUserInfo()

async function renderDepertamentUser (){

    const h3 = document.getElementById("titles-company")
    const {department_uuid} = await requestInfoUser(tokenUser)
    const {name, departments} = await requestDepertamentUser(tokenUser) 

    const departament = departments.filter(e => e.uuid == department_uuid)

    h3.innerText= `${name} - ${departament[0].name}`
}
renderDepertamentUser ()


async function renderSameDepartamentUsers (){

    const section = document.getElementById("co-workers")
    const request = await requestSameDepartamentUsers(tokenUser)
    const {users} = request[0]

    if (users !== []){
        
        const ul = document.createElement("ul")
        ul.classList = ""

        section.innerHTML = ""

        users.forEach(({username, professional_level}) => {
            ul.insertAdjacentHTML("beforeend", `
                <li>
                <h5>${username}</h5>
                <p>${professional_level}</p>
                </li>
            `)
        });
        section.appendChild(ul)
    }
}
renderSameDepartamentUsers ()

function logOut(){
    const btnLogOut = document.querySelector("#logout")
    
    btnLogOut.addEventListener("click", e =>{
        e.preventDefault()

        localStorage.removeItem("@KenzieEmpresas:user")
        window.location.replace("/index.html")
    })

}
logOut()
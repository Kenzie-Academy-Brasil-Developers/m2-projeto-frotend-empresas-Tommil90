import {requestCompanies, requestDepartamentsAllCompanies, requestDepartamentsByCompanies} from "/src/scripts/requests.js";
import { openModal } from "../../scripts/modal.js";
import { visualizerInfoDepartament, visualizerEditDepartament, visualizerDeleteDepartament} from "../../scripts/visualizeInfo.js";
import { requestAllUsers, requestEditUserByAdmin } from "../../scripts/requests.js";
import {inputDisabledRegister} from "/src/scripts/disabled.js"

let tokenAdm = JSON.parse(localStorage.getItem("@KenzieEmpresas:user"))


const select = document.querySelector("select")
const btnCreateCompany = document.querySelector("#create-company")
const ulDepartaments = document.getElementById("ul-departaments")
const ulRegisteredUsers = document.getElementById("ul-registered-users")


async function companyList(){

    const list = await requestCompanies()

    list.forEach(({uuid, name}) => {
        select.insertAdjacentHTML("beforeend", `
        <option id="${uuid}" value="${name}">${name}</option>
        `)
    });
}
companyList()

async function createCompany(){

    const list = await requestCompanies()

    btnCreateCompany.addEventListener("click", e=>{
        
        const section = document.createElement("section")
        section.classList = ""

        section.insertAdjacentHTML("beforeend", `
        <h1>Criar Departamento</h1>
        <form>
            <input type="text">
            <input type="text">
            <select name="" id="">
                <option value="">Digite nome da Empresa</option>
            </select>
            <button type="submit">Criar o Departamento</button>
        </form>
        `)

        section.addEventListener("click", async e => {
            e.preventDefault()

            let tag = e.target
            if(tag.tagName == "SELECT"){

                list.forEach(({uuid, name}) => {
                    tag.insertAdjacentHTML("beforeend", `
                    <option id="${uuid}" value="${uuid}">${name}</option>
                    `)
                });
            }
            if(tag.tagName == "BUTTON"){
               
                console.log(tag)
                // const form = tag
                // const elements = [...form.elements]

       
                //PENDIENTE
                

            }
        })



        openModal(section)
    })
}
createCompany()

async function renderDepartamentsAllCompanies(){

    const content = await requestDepartamentsAllCompanies(tokenAdm)
    
    content.forEach(({name, description, companies, uuid}) => {
        
        const li = document.createElement("li")
        li.classList = ""

        const h3 = document.createElement("h3")
        h3.classList = ""
        h3.innerText = name
        
        const p1 = document.createElement("p")
        p1.classList = ""
        p1.innerText = description

        const p2 = document.createElement("p")
        p2.classList = ""
        p2.innerText = companies.name

        const div = document.createElement("div")
        div.classList = ""

        const iconVisualizer = document.createElement("img")
        iconVisualizer.classList = ""
        iconVisualizer.src       = "/src/assets/icons/blue_eye.svg"
        iconVisualizer.alt       = "abrir departamento"
        
        iconVisualizer.addEventListener("click", async e => {
                console.log("iconVisualizer")
                await visualizerInfoDepartament({name, description, companies, uuid})
        })

        const iconEdit = document.createElement("img")
        iconEdit.classList = ""
        iconEdit.src       = "/src/assets/icons/black_pencil.svg"
        iconEdit.alt       = "editar departamento"

        iconEdit.addEventListener("click", async e => {
  
             await visualizerEditDepartament(tokenAdm, description, uuid)
                

        })

        const iconTrash = document.createElement("img")
        iconTrash.classList = ""
        iconTrash.src       = "/src/assets/icons/trash.svg"
        iconTrash.alt       = "abrir departamento"
        
        iconTrash.addEventListener("click", async e => {
            visualizerDeleteDepartament(tokenAdm, uuid)
        })

        div.append(iconVisualizer, iconEdit, iconTrash)
        li.append(h3, p1, p2, div)
        
        ulDepartaments.appendChild(li)
    });
}

renderDepartamentsAllCompanies()

async function renderDepartamentsByCompanies(){

    select.addEventListener("change", async () => {
        ulDepartaments.innerHTML = ""
        const value = select.value
        const companies = await requestCompanies()
        const companyFiltered  = companies.filter(e => e.name == value)
        const content = await requestDepartamentsByCompanies (tokenAdm, companyFiltered[0].uuid)
 
        content.forEach(({name, description, companies, uuid}) => {
        
            const li = document.createElement("li")
            li.classList = ""
    
            const h3 = document.createElement("h3")
            h3.classList = ""
            h3.innerText = name
            
            const p1 = document.createElement("p")
            p1.classList = ""
            p1.innerText = description
    
            const p2 = document.createElement("p")
            p2.classList = ""
            p2.innerText = companies.name
    
            const div = document.createElement("div")
            div.classList = ""
    
            const iconVisualizer = document.createElement("img")
            iconVisualizer.classList = ""
            iconVisualizer.src       = "/src/assets/icons/blue_eye.svg"
            iconVisualizer.alt       = "abrir departamento"
            
            iconVisualizer.addEventListener("click", async e => {
                console.log("iconVisualizer")
                await visualizerInfoDepartament({name, description, companies, uuid})
            })
    
            const iconEdit = document.createElement("img")
            iconEdit.classList = ""
            iconEdit.src       = "/src/assets/icons/black_pencil.svg"
            iconEdit.alt       = "editar departamento"
    
            iconEdit.addEventListener("click", async e => {
                console.log("iconEdit")
            })
    
            const iconTrash = document.createElement("img")
            iconTrash.classList = ""
            iconTrash.src       = "/src/assets/icons/trash.svg"
            iconTrash.alt       = "abrir departamento"
            
            iconTrash.addEventListener("click", async e => {
                console.log("iconTrash")
            })
    
            div.append(iconVisualizer, iconEdit, iconTrash)
            li.append(h3, p1, p2, div)
            
            ulDepartaments.appendChild(li)
        });
    })
}

renderDepartamentsByCompanies()

async function renderAllUsers(){

    const list = await requestAllUsers(tokenAdm)

    list.forEach(async ({uuid, username, professional_level, department_uuid}) => {

        ulRegisteredUsers.insertAdjacentHTML("beforeend", `
            <li>
            <h3>${username}</h3>
            <p>${professional_level}</p>
            <p>Company Name</p>
            <div>
            <button class="editUser">
            <img id="${uuid}" src="/src/assets/icons/black_pencil.svg" alt="edit ${username}">
            </button>
            
            <img id="${uuid}" src="/src/assets/icons/trash.svg" alt="trash ${username}">
            </div>
            </li>
        `)

    })
    const btneditUser = document.querySelectorAll(".editUser")
     
    btneditUser.forEach(btn => {
        btn.addEventListener("click", e=> {
            e.preventDefault()
            
            const idUser = btn.children[0].id

            const section = document.createElement("section")
            section.classList = "flex flex-col gap"

            const h1 = document.createElement("h1")
            h1.classList= "title-1"
            h1.innerText = "Editar Usuários"

            const form = document.createElement("form")
            form.classList = "flex flex-col gap"

            section.append(h1, form)

            form.insertAdjacentHTML("beforeend", `
            
            <select  name="kind_of_work" required="true" required="true" class="input-default">
            <option value="">Selecionar modalidade de trabalho</option>
            <option value="home office">Home office</option>
            <option value="presencial">Presencial</option>
            </select>
            <select  name="professional_level" required="true" required="true" class="input-default">
            <option value="">Selecionar nivel</option>
            <option value="sênior">Sênior</option>
            <option value="pleno">Pleno</option>
            <option value="júnior">Junior</option>
            <option value="estágio">Estagio</option>
            </select>
            <button type="submit" class="button-default">Cadastre-se</button>    
            `)

            form.addEventListener("submit", async e => {
                // e.preventDefault()
 

                const elements  = [...form.elements]
                
                const body = {}

                elements.forEach(element => {
                    
                    if ((element.tagName == "INPUT" || element.tagName == "SELECT") && element.value !== ""){
        
                        body[element.name] = element.value
                    }
                })
                await requestEditUserByAdmin(tokenAdm, idUser, body)
                ulRegisteredUsers.innerHTML = ""
                renderAllUsers()
            })
         
        
           openModal(section) 
     })
    })
  
}
renderAllUsers()

function teste12(){
    console.log("opa")
}

function logOut(){
    const btnLogOut = document.querySelector("#logout")
    
    btnLogOut.addEventListener("click", e =>{
        e.preventDefault()

        localStorage.removeItem("@KenzieEmpresas:user")
        window.location.replace("/index.html")
    })

}
logOut()
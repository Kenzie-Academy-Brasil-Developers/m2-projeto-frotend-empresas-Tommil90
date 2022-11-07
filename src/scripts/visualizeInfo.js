import { openModal } from "./modal.js"
import {requestUserOfOutWork, requestAllUsers, requestHireUser, requestDismissUser, requestUpdateDescriptionDepartament, requestDeleteCompany} from "./requests.js"

let tokenAdm = JSON.parse(localStorage.getItem("@KenzieEmpresas:user"))

async function visualizerInfoDepartament({name, description, companies, uuid}){

       const idOfDepartament = uuid    

       const section = document.createElement("section") 
       section.classList = "flex flex-col gap"
    
       const h1 = document.createElement("h1")
       h1.classList = "title-1"
       h1.innerText = name

       const div1 = document.createElement("div")
       div1.classList = "flex justify-between gap"

       const div2 = document.createElement("div")
       div2.classList = ""

       const h4 = document.createElement("h4")
       h4.classList = "title-4"
       h4.innerText = description
 
       const p = document.createElement("p")
       p.classList = ""
       p.innerText = companies.name

       const form = document.createElement("form")
       form.classList = "flex flex-col"

       form.addEventListener("submit", async e => {
         e.preventDefault()
        const value = form.children[0].value

        const body = {
            user_uuid: value,
            department_uuid: idOfDepartament
        }

         await requestHireUser(tokenAdm, body)

         let button = e.target;

         if (button.tagName == "FORM") {
          //ACESSANDO ELEMENTO PAI
         let section = button.closest(".modal-background");
 
          //REMOVENDO ELEMENTO
           section.remove()
         }

         await visualizerInfoDepartament({name, description, companies, uuid})
         select.innerHTML = ""
         select.append(option)

         const listUsersOutWork = await requestUserOfOutWork(tokenAdm)
    
         listUsersOutWork.forEach(({username, uuid}) => {
              select.insertAdjacentHTML("beforeend", `
              <option value="${uuid}">${username}</option>
              `)
          });

       })
       
       const select = document.createElement("select")
       select.classList = ""

       const option = document.createElement("option")
       option.innerText = "Seleccionar usuário"
       select.append(option)

       const listUsersOutWork = await requestUserOfOutWork(tokenAdm)
    
       listUsersOutWork.forEach(({username, uuid}) => {
            select.insertAdjacentHTML("beforeend", `
            <option value="${uuid}">${username}</option>
            `)
        });
        
       const button =  document.createElement("button")
       button.classList = ""
       button.type   = "submit"
       button.innerText = "Contratar"
       
       const ul = document.createElement("ul")
       ul.classList = "ul-visualizer-departament"

       const usersOfDepartament = await requestAllUsers (tokenAdm)
       
       usersOfDepartament.forEach(({uuid, username, professional_level, department_uuid}) => {
            if (idOfDepartament == department_uuid){
                ul.insertAdjacentHTML("beforeend", `
                <li>
                <h3 classlist="">${username}</h3>
                <p>${professional_level}</p>
                <p>${companies.name}</p>
                <button id="${uuid}" class"deleteEmploye">Desligar</button>
                </li>
            `)

            }

       })
       
       ul.addEventListener("click", async e => {
   
            let button = e.target;

                if (button.tagName == "BUTTON") {
  
                    await requestDismissUser(tokenAdm, button.id)
                    let section = button.closest("li")
                    section.remove()
 
         }
                   
       })

       form.append(select, button)
       div2.append(h4, p)
       div1.append(div2, form)
       section.append(h1, div1, ul)

       return openModal(section)
}




async function visualizerEditDepartament(token, description, endpoint){

        const section = document.createElement("section") 
        section.classList = "flex flex-col gap"

        section.insertAdjacentHTML("beforeend", `
        <h1>Editar Departamento</h1>
        <form class"flex flex-col">
            <textarea name="description" id="" cols="30" rows="10">${description}</textarea>
            <button id="saveNewInfoDepartament" type="submit">Salvar alterações</button>
        </form>
        `)

        section.addEventListener("submit", async e => {
            e.preventDefault()

            let target = e.target
                 
                if (target.tagName == "FORM"){
                    
                    const value = e.target.children[0].value

                    const body = {
                        description: value
                    }

                    await requestUpdateDescriptionDepartament(tokenAdm, endpoint, body)

                    target.closest(".modal-background").remove();
                    location.reload();

                }
        })

        return openModal(section)
}

async function visualizerDeleteDepartament(token, endpoint){

    const section = document.createElement("section") 
    section.classList = "flex flex-col gap"

    section.insertAdjacentHTML("beforeend", `
            <h3>Realmente deseja deletar o Departamento e demitir seus funcionários?</h3>
            <button>confirmar</button>
    `)

    section.addEventListener("click", async e => {
        e.preventDefault()

        let target = e.target

        if(target.tagName == "BUTTON"){
            await requestDeleteCompany(token, endpoint)
            target.closest(".modal-background").remove();
            location.reload();
        }
    })

    openModal(section)
}

export {visualizerInfoDepartament, visualizerEditDepartament, visualizerDeleteDepartament}


/*
      



       
       const select = document.createElement(select)
       select.classList = ""

       const list = await requestUserOfOutWork(tokenAdm)
       console.log()

        list.forEach(({uuid, name}) => {
            select.insertAdjacentHTML("beforeend", `
            <option id="${uuid}" value="${name}">${name}</option>
            `)
        });
*/
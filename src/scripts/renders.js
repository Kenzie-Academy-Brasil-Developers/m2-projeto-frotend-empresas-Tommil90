import { openModal } from "./modal.js";

async function renderDepartaments (request){

    const list = await request

    list.forEach(({name, description, companies, uuid}) => {
        
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
        iconTrash.src       = "/src/assets/icons/blue_eye.svg"
        iconTrash.alt       = "abrir departamento"
        
        iconTrash.addEventListener("click", async e => {
            console.log("iconTrash")
        })

        div.append(iconVisualizer, iconEdit, iconTrash)
        li.append(h3, p1, p2, div)
        return li
    });
}


export {renderDepartaments}
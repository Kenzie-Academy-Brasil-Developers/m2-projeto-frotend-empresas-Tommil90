
function showButtons(){

    const btnShowButtons = document.querySelector(".show-buttons")

    const divButtons = document.querySelector(".buttons-nav")

    btnShowButtons.addEventListener("click", e => {
       
        let toggleMenu = divButtons.classList.toggle("show-menu-mobile")

        if(toggleMenu){
            btnShowButtons.src="/src/assets/icons/X.svg"
        }else{
            btnShowButtons.src="/src/assets/icons/Vector.svg"
        }
   
    })
}

export {showButtons}
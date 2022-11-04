import {toast} from "./toast.js";
import {spinner} from "./spinner.js";

let tokenAdm = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjczOTBhZGYtMzhhNy00Y2VlLTg5ZWQtYzJiYWVmMzY4YmZmIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY2NjkxNzQyMywiZXhwIjoxNjY3NzgxNDIzLCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.1VEwu65jMWZXistVAMZrjTjkJ1KzsADjj08j-VPDlOA"

let tokenUser = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZDJlNDc2ZTUtYmY5NS00NTQ2LTk2YWYtNzZkNjRjMWRlZGI3IiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE2NjczNTQ5MDAsImV4cCI6MTY2ODIxODkwMCwic3ViIjoiW29iamVjdCBVbmRlZmluZWRdIn0.Ue_3cjuxIOxWemO4eOynRD1BQA4597CR3edbM4k3Htw"

const baseUrl = "http://localhost:6278/"

async function requestSectors (){

    try{
        const request = await fetch(baseUrl + "sectors", {
            method: "GET",
            Headers: {
                "Content-Type": "application/json"
            }
        })

        if(request.ok){
            const response = await request.json()

            return response
        }
    }catch(err){
            console.log(err)
    }
}

async function requestCompaniesBySector (sector){
   
    try{
        const request = await fetch(baseUrl + "companies" + `/${sector}`, {
            method: "GET",
            Headers: {
                "Content-Type": "application/json"
            }
        })

        if(request.ok){
            const response = await request.json()

            return response
        }
    }catch(err){
            console.log(err)
    }
}

async function requestCompanies (){

        try{
            const request = await fetch(baseUrl + "companies", {
                method: "GET",
                Headers: {
                    "Content-Type": "application/json"
                }
            })

            if(request.ok){
                const response = await request.json()

                return response
            }
        }catch(err){
                console.log(err)
        }
}

async function requestCreateUser (body){

    try{
        const request = await fetch (baseUrl + "auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        const response = await request.json()
      

        if (request.ok){
   
            toast("Criação de usuário bem sucedida")
            setTimeout(() => {
                window.location.replace("/src/pages/login/login.html")}, 4000)
        }else{
            console.log(response.error[0])
            toast("Usuario ja existe")
        }
    }catch(err){
        console.log(err)
    }
}



async function requestLoginUser (body){

    try{
        const request = await fetch (baseUrl + "auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if (request.ok){
            
            const response = await request.json()
            console.log(response.token)
            spinner() 
            localStorage.setItem("@KenzieEmpresas:user", JSON.stringify(response.token))

            const verification = await verifyUserType(response.token)

            if (verification){
                setTimeout(() => {
                    window.location.replace("/src/pages/admin/admin.html")
                }, 2000)    
            }else{
                setTimeout(() => {
                    window.location.replace("/src/pages/user/userPage.html")
                }, 2000)    
            }

        }else{
            const small = document.querySelector("small")

                       small.style.color   = "#ce4646" 
                       small.innerText     = "A senha ou usuario esta incorreto"
        }
    }catch(err){
        console.log(err)
    }
}

async function verifyUserType (token){
    
    try {
        const request = await fetch(baseUrl + "auth/validate_user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            
        })
        const response =  await request.json()

        return response.is_admin
    } catch (err){
        console.log(err)
    }
}


async function requestDepartamentsAllCompanies(token){

    try {
        const request = await fetch(baseUrl + "departments", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            
        })
        const response =  await request.json()
        return response
    } catch (err){
        console.log(err)
    }
}

async function requestDepartamentsByCompanies(token, endpoint){

    try {
        const request = await fetch(baseUrl + "departments/" + endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            
        })
        const response =  await request.json()
        return response
    } catch (err){
        console.log(err)
    }
}

async function requestUserOfOutWork(token){

    try {
        const request = await fetch(baseUrl + "admin/out_of_work", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            
        })
        const response =  await request.json()
        return response
    } catch (err){
        console.log(err)
    }
}

async function requestAllUsers(token){

    try {
        const request = await fetch(baseUrl + "users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            
        })
        const response =  await request.json()
        return response
    } catch (err){
        console.log(err)
    }
}

async function requestHireUser(token, body){

    try{
        const request = await fetch (baseUrl + "departments/hire/", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })

        if (request.ok){

            console.log("ok")
        }
    }catch(err){
        console.log(err)
    }
}

async function requestDismissUser(token, endpoint){
    try {
        const request = await fetch(baseUrl + "departments/dismiss/" + endpoint, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            
        })
        const response =  await request.json()

    } catch (err){
        console.log(err)
    }
}

async function requestInfoUser(token){

    try{
        const request = await fetch(baseUrl + "users/profile", {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",  
              "Authorization": `Bearer ${token}`
            }
        })

        if(request.ok){
            const response = await request.json()
            return response
        }else{
            console.log(request)
        }
    }catch(err){
            console.log(err)
    }
}

async function requestDepertamentUser(token){

    try{
        const request = await fetch(baseUrl + "users/departments", {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",  
              "Authorization": `Bearer ${token}`
            }
        })

        if(request.ok){
            const response = await request.json()

            return response
        }else{
            console.log(request)
        }
    }catch(err){
            console.log(err)
    }
}
 
async function requestSameDepartamentUsers(token){

    try{
        const request = await fetch(baseUrl + "users/departments/coworkers", {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",  
              "Authorization": `Bearer ${token}`
            }
        })

        if(request.ok){
            const response = await request.json()

            return response
        }else{
            console.log(request)
        }
    }catch(err){
            console.log(err)
    }
}
 
async function requestUpdateUser (token , body){

    try{
        const request = await fetch(baseUrl + "users", {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json",  
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })

        if(request.ok){
            const response = await request.json()

            return response
        }else{
            console.log(request)
        }
    }catch(err){
            console.log(err)
    }
}

async function requestUpdateDescriptionDepartament(token, endpoint, body){

    try{
        const request = await fetch(baseUrl + "departments/" + endpoint, {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json",  
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })

        if(request.ok){
            const response = await request.json()

            return response
        }else{
            console.log(request)
        }
    }catch(err){
            console.log(err)
    }
}

async function requestDeleteCompany(token, endpoint){

    try{
        const request = await fetch(baseUrl + "departments/" + endpoint, {
            method: 'DELETE',
            headers: {
              "Content-Type": "application/json",  
              "Authorization": `Bearer ${token}`
            },
        })
    }catch(err){
            console.log(err)
    }
}


export {requestSectors, requestCompaniesBySector, requestCompanies, requestCreateUser, requestLoginUser, requestDepartamentsAllCompanies, requestDepartamentsByCompanies, requestUserOfOutWork, requestAllUsers, requestHireUser, requestDismissUser, requestInfoUser, requestDepertamentUser, requestSameDepartamentUsers, requestUpdateUser, requestUpdateDescriptionDepartament, requestDeleteCompany}


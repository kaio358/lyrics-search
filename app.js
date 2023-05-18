const form = document.querySelector("#form");
const search = document.querySelector("#search")
const songs_container= document.querySelector("#songs-container")
const prevAndNextContainer = document.querySelector("#prev-and-next-container")


const apiLyricsURL = `https://api.lyrics.ovh`
const fetchAPI = async termo =>{
    const resposta = await fetch(`${apiLyricsURL}/suggest/${termo}`).then(response =>response.json())
     return resposta
}

const fragment = document.createDocumentFragment()

form.addEventListener("submit",(event)=>{
    event.preventDefault()
    // talvez uppercase ou lowercase
    const searchTratado = search.value.trim()
    const li = fabrica_LI(searchTratado)
   
    // songs_container.appendChild(li)
   
   
    
})

function fabrica_LI(searchTratado) {
    const li = document.createElement("li")
    if(!searchTratado){
        li.classList.add("warning-message")
        li.textContent = "Por favor, digite um termo valido"
        return li
    }else{
        const dados=  picota(searchTratado)
        
    }
    
}

async  function picota(searchTratado) {
    let arrayPicotado = []
    const valoresAPI =  await fetchAPI(searchTratado)
    for(let valorAPI in valoresAPI.data){
        arrayPicotado.push({titulo:valoresAPI.data[valorAPI].title_short,versao:valoresAPI.data[valorAPI].title_version,artista:valoresAPI.data[valorAPI].artist.name})
       
    }
    return arrayPicotado
}
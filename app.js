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
    const searchTratado = search.value.trim()
    resultado(searchTratado)
       
})

function fabrica_LI(searchTratado,dados) {
    
    if(!searchTratado){
        const li = document.createElement("li")
        li.classList.add("warning-message")
        li.textContent = "Por favor, digite um termo valido"
       fragment.appendChild(li)
    }else{
        for( let dado in dados){
            const li = document.createElement("li")
            li.classList.add("song")
            li.innerHTML = `<span class= "song-artist"> <strong>${dados[dado].artista}</strong> - ${dados[dado].titulo} ${dados[dado].versao} </span> <button class="btn" data-artist="${dados[dado].artista}" data-song="${dados[dado].titulo + dados[dado].versao}">Ver letra </button>`
            fragment.appendChild(li)
        }
        

     
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

async function resultado(searchTratado) {
    const dados = await picota(searchTratado)    
   fabrica_LI(searchTratado,dados)
  
    songs_container.appendChild(fragment)
}
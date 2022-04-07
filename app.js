const btnSend= document.querySelector(".btnSend");
const pokeInfo= document.querySelector(".pokeInfo");
const pokeName= document.querySelector(".pokeInfo__name");
const pokeNumber=document.querySelector(".pokeInfo__number");
const pokeImg= document.querySelector(".pokeInfo__img")
const input= document.querySelector("#poke");

function capitalizeFirstLetter(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
 }


btnSend.addEventListener("click", ()=>{
    const search= input.value.toLowerCase();
     pokeInfo.classList.add("card--visible");
        axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`)
         .then((res) => {
            console.log(res);
            pokeName.textContent= capitalizeFirstLetter(res.data.name);
            pokeImg.src=res.data.sprites.front_default;
            pokeNumber.textContent= `Numero en la pokedex ${res.data.id}`
            err="no se ingresó ningun nombre"
         })
         .catch((err) => {
            pokeName.textContent=err;
         }) 
    });

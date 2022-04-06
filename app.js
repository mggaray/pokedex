const btnSend= document.querySelector(".btnSend");
const pokeInfo= document.querySelector(".pokeInfo");
const pokeName= document.querySelector(".pokeInfo__name");
const pokeImg= document.querySelector(".pokeInfo__img")
const input= document.querySelector("#poke");

btnSend.addEventListener("click", ()=>{
    const search= input.value.toLowerCase();
     pokeInfo.classList.add("card--visible");
        axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`)
         .then((res) => {
            console.log(res);
            pokeName.textContent= res.data.name;
            pokeImg.src=res.data.sprites.front_default;
            err="no se ingresó ningun nombre"
         })
         .catch((err) => {
            pokeName.textContent=err;
         }) 
    });

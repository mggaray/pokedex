const btnSend= document.querySelector(".btnSend");
const pokeInfo= document.querySelector(".pokeInfo");
const pokeName= document.querySelector(".pokeInfo__name");
const pokeNumber=document.querySelector(".pokeInfo__number");
const pokeImg= document.querySelector(".pokeInfo__img")
const input= document.querySelector("#poke");
const btnNext=document.querySelector(".btn__next");
const btnBack=document.querySelector(".btn__back");



function capitalizeFirstLetter(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
 }

function getPokemon(res){
   console.log(res);
   let data=res.data;
   pokeName.textContent= capitalizeFirstLetter(data.name);
   pokeImg.src=data.sprites.front_default;
   pokeNumber.textContent= `Numero en la pokedex: #${data.id}`
   pokeNumber.id= data.id;
   err="no se ingresó ningun nombre"
}


btnSend.addEventListener("click", ()=>{
    const search= input.value.toLowerCase();
     pokeInfo.classList.add("pokeInfo--visible");
        axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`)
         .then((res) => getPokemon(res))
         .catch((err) => {
            pokeName.textContent=err;
         }) 
    });

 btnNext.addEventListener("click", ()=>{
   axios.get(`https://pokeapi.co/api/v2/pokemon/${parseInt(pokeNumber.id)+1}`)
      .then((res) => getPokemon(res))
      .catch((err) => {
         pokeName.textContent=err;
      }) 
   });


btnBack.addEventListener("click", ()=>{
   if(pokeNumber.id!="1"){
      axios.get(`https://pokeapi.co/api/v2/pokemon/${parseInt(pokeNumber.id)-1}`)
         .then((res) => getPokemon(res))
         .catch((err) => {
            pokeName.textContent=err;
         }) 
   }
});   
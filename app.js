// DECLARACION DE DOM
const btnSend= document.querySelector(".btnSend");
const pokeInfo= document.querySelector(".pokeInfo");
const pokeName= document.querySelector(".pokeInfo__name");
const pokeNumber=document.querySelector(".pokeInfo__number");
const pokeImg= document.querySelector(".pokeInfo__img")
const input= document.querySelector("#poke");
const btnNext=document.querySelector(".btn__next");
const btnBack=document.querySelector(".btn__back");
const btnRand=document.querySelector(".btnRand");
//

function capitalizeFirstLetter(string) { //agrega la primer mayuscula al string (nombre)
   return string.charAt(0).toUpperCase() + string.slice(1);
 }

 function getRandomInt(min, max) { //numero entero aleatorio dentro del rango deseado
   return Math.floor(Math.random() * (max - min)) + min;
 }

function getPokemon(res){  // funcion para obtene un pokemon ya sea por nombre o por id
   let data=res.data;
   pokeName.textContent= capitalizeFirstLetter(data.name);
   pokeImg.src=data.sprites.front_default;  //obiene el sprite (imagen)
   pokeNumber.textContent= `Numero en la pokedex: #${data.id}` //id tambien lo usamos como #Pokedex nacional
   pokeNumber.id= data.id;
}


// BUSQUEDA
btnSend.addEventListener("click", ()=>{
    const search= input.value.toLowerCase();  // ya que la api solo recibe nombres en minuscula la funcion lo convierte a lowerCase
         axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`)
         .then((res) =>{
           if(res.data.id!==undefined){ 
              pokeInfo.classList.add("pokeInfo--visible")
              getPokemon(res)
            }
         })
    });

// POKE ALEATORIO 
btnRand.addEventListener("click", ()=>{
   let randInt= getRandomInt(1,899);
   console.log(randInt);
   axios.get(`https://pokeapi.co/api/v2/pokemon/${randInt}`)
   .then((res) => {
      getPokemon(res)
      pokeInfo.classList.add("pokeInfo--visible")  // hace visible la card
   })
   .catch((err) => {
      pokeName.textContent=err;
   }) 
})

// ANTERIOR/SIGUIENTE
 btnNext.addEventListener("click", ()=>{
   if(pokeNumber.id<898){
      axios.get(`https://pokeapi.co/api/v2/pokemon/${parseInt(pokeNumber.id)+1}`)
      .then((res) => getPokemon(res))
      .catch((err) => {
        alert(err);
      }) 
   }
});


btnBack.addEventListener("click", ()=>{
   if(pokeNumber.id!="1"){
      axios.get(`https://pokeapi.co/api/v2/pokemon/${parseInt(pokeNumber.id)-1}`)
         .then((res) => getPokemon(res))
         .catch((err) => {
            alert(err);
         }) 
   }
});   
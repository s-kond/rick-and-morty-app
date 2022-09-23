const main = document.querySelector('.main');
const fetchDataButton = document.querySelector('[data-js="fetchDataButton"]');
const filterButton = document.querySelector('[data-js="filter"]');
const nameSearch = document.querySelector('[data-js="nameSearch"]');
let apiURL;

window.addEventListener('load', () => {
    fetchCards('https://rickandmortyapi.com/api/character/');
})

fetchDataButton.addEventListener('click', () => {   
    buildAPI();
    fetchCards(apiURL);
});

function buildAPI(){
    const filterAPI = filterButton.value.toLowerCase();
    const search = nameSearch.value.toLowerCase(); 
    if (search === ""){
        return apiURL = `https://rickandmortyapi.com/api/character/${filterAPI ? '?status=' + filterAPI : ''}`;
    } else {
        return apiURL = `https://rickandmortyapi.com/api/character/${search ? '?name=' + search : ''}${filterAPI ? '&status=' + filterAPI : ''}`;
    }
}

async function fetchCards(apiURL){
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        renderCards(data.results);
    } catch(error) {
        console.error("Something went wrong: " + error.message);
    }
}

function renderCards(people){
    main.innerHTML = "";
    const filter = filterButton.value;
    const search = nameSearch.value.toLowerCase(); 
    people.forEach(({name, status, image, origin, location, species }) => {
        let compareName = name.toLowerCase();
        if (compareName.includes(search) || search === ""){
        if (status === filter || filter === "") {

        const characterCard = document.createElement('article');
        characterCard.classList.add("card");
        if (status === "Dead"){
            characterCard.classList.add("dead");
        }
        if (status === "unknown"){
            characterCard.classList.add("unknown");
        }
        const picture = document.createElement('img');
        picture.setAttribute("src", image);
        picture.classList.add("card__img");
        
        const characterInfo = document.createElement('div');
        characterInfo.classList.add("card__characterInfo");
        const characterName = document.createElement("h2");
        characterName.innerText = `${name}`;

        characterInfo.append(characterName);

        const characterStatus = document.createElement("p");
        characterStatus.classList.add("character-status")
        if (status === "unknown") {
            characterStatus.innerHTML = `<span class="unknown-icon"></span> ${status} - ${species}`
        } else if (status === "Alive"){
            characterStatus.innerHTML = `<span class="alive-icon"></span> ${status} - ${species}`
        } else {
            characterStatus.innerHTML = `<span class="dead-icon"></span> ${status} - ${species}`
        }
        characterInfo.append(characterStatus)
        
        if(origin.name != "unknown"){
            const characterOrigin = document.createElement("p");
            characterOrigin.innerText = `Origin: ${origin.name}`
            characterInfo.append(characterOrigin);
        }
        if(location.name != "unknown"){
            const characterLocation = document.createElement("p");
            characterLocation.innerText = `Last seen: ${location.name}`
            characterInfo.append(characterLocation);
        }
        
        characterCard.append(picture, characterInfo);
        main.append(characterCard);
        }
    }
    })
}
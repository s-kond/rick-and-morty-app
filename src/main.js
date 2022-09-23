const apiURL = "https://rickandmortyapi.com/api/character";
const main = document.querySelector('.main');
const fetchDataButton = document.querySelector('[data-js="fetchDataButton"]');
const filterButton = document.querySelector('[data-js="filter"]');
const nameSearch = document.querySelector('[data-js="nameSearch"]');

fetchDataButton.addEventListener('click', () => {
main.innerHTML = "";
const filter = filterButton.value;
const search = nameSearch.value.toLowerCase(); 

console.log(`Search: ${search}, Filter: ${filter}`);
    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        /* console.log(data.results); */
        data.results.forEach(({name, status, image, origin, location }) => {
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
            const characterName = document.createElement("p");
            characterName.innerText = `Name: ${name}`;
            const characterStatus = document.createElement("p");
            characterStatus.innerText = `Status: ${status}`
            
            characterInfo.append(characterName, characterStatus)
            
            if(origin.name != "unknown"){
                const characterOrigin = document.createElement("p");
                characterOrigin.innerText = `Origin: ${origin.name}`
                characterInfo.append(characterOrigin);
            }
            if(location.name != "unknown"){
                const characterLocation = document.createElement("p");
                characterLocation.innerText = `Current location: ${location.name}`
                characterInfo.append(characterLocation);
            }
            
            characterCard.append(picture, characterInfo);
            main.append(characterCard);
            }
        }
        })
    })
    .catch(error => console.log("Something went wrong...", error));

});
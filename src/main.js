const apiURL = "https://rickandmortyapi.com/api/character";
const main = document.querySelector('.main');
const fetchDataButton = document.querySelector('[data-js="fetchDataButton"]');
const filterButton = document.querySelector('[data-js="filter"]');

fetchDataButton.addEventListener('click', () => {
main.innerHTML = "";
const filter = filterButton.value;
console.log(filter);
    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        /* console.log(data.results); */
        data.results.forEach(person => {
            const {name, status, image } = person;
            /* console.log(status);
            console.log(filter); */
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
            characterCard.append(picture, characterInfo);
            main.append(characterCard);
            }
        })
    })
    .catch(error => console.log("Something went wrong...", error));

});
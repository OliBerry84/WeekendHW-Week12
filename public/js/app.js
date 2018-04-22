let characters = [];

document.addEventListener('DOMContentLoaded', () => {
  const url = 'http://hp-api.herokuapp.com/api/characters';
  makeRequest(url, requestComplete);

  const option = document.querySelector('#character-list');
  option.addEventListener('change', handleCharacterSelection);
})

const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();
  request.addEventListener('load', callback);
}

const requestComplete = function(){
  if (this.status !== 200) return;
  const jsonString = this.responseText;
  characters = JSON.parse(jsonString);
  characterList(characters);
}

const characterList = function(characters){
  const select = document.querySelector('#character-list');
  characters.forEach((character, index) => {
    const option = document.createElement('option');
    option.textContent = character.name;
    const value = index;
    option.value = value;
    select.appendChild(option);
  });
}

const handleCharacterSelection = function(event){
  const character = characters[this.value]
  displayCharacterInfo(character)
}
const displayCharacterInfo = function(character){
  const characterInfo = document.querySelector('#character-info')
  characterInfo.innerHTML = ''

  const name = document.createElement('h2');
  const house = document.createElement('p')
  const dob = document.createElement('p');
  const ancestry = document.createElement('p');
  const charImg = document.createElement('img');
  const wand = document.createElement('p');
  const patronus = document.createElement('p');
  const wandlength = document.createElement('p');

  name.textContent = character.name;
  house.textContent = `House: ${character.house}`;
  dob.textContent = `Date of Birth: ${character.dateOfBirth}`;
  ancestry.textContent = `Ancestry: ${character.ancestry}`;
  charImg.src = character.image;
  charImg.width = 150;
  wand.textContent = `${character.name} uses a wand made of ${character.wand.wood} and ${character.wand.core}!`;
  patronus.textContent = `Patronus: ${character.patronus}`;

  characterInfo.appendChild(charImg);
  characterInfo.appendChild(name);
  characterInfo.appendChild(dob);
  characterInfo.appendChild(house);
  characterInfo.appendChild(patronus);
  characterInfo.appendChild(ancestry);
  characterInfo.appendChild(wand);
}

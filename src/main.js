import './style.css'

const listPeople = document.getElementById("list-people");

async function getJsonFile() {
  const jsonFile = await fetch('http://localhost:5173/team.json');
  return await jsonFile.json();
}

function displayInnerHTML(person, index) {
  return `
  <div class="card bg-base-100 w-96 shadow-sm m-4 transition-all duration-300 hover:scale-102 hover:shadow-lg">
        <figure class="px-10 pt-10">
          <img
            src="${person.img}"
            alt="profile-pic"
            class="rounded-full w-40 h-auto aspect-square object-cover transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0"
             />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title text-secondary text-xl cursor-pointer transition-all duration-300 hover:text-accent">${person.name}</h2>
          <h3 class="text-md">${person.poste}</h3>
          <div id="list-tech-${index}"></div>
          <p class="text-md text-gray-500 italic">${person.years_xp} années d'expérience</p>
        </div>
    </div>
  `
}

function displayList() {
  getJsonFile().then(rep => {
    rep.people.forEach((person, index) => {
      listPeople.innerHTML += displayInnerHTML(person, index);
      const listTech = document.getElementById(`list-tech-${index}`);
      person.tech.forEach(tech => {
        const newTech = document.createElement("div");
        newTech.classList.add("badge", "badge-primary", "m-1");
        newTech.textContent = tech;
        listTech.appendChild(newTech);
      })
    });
  })
}
displayList();
const inputSearch = document.getElementById("input-search");

inputSearch.addEventListener("keyup", (event) => {
  listPeople.innerHTML = "";
  if (event.target.value != "") {
    let keyword = event.target.value;
    let regex = new RegExp(`\\b${keyword}\\b`, "i");
    getJsonFile().then(rep => {
    rep.people.forEach((person, index) => {
      console.log(regex.test(person.name));
      
      if (regex.test(person.name)) {
        listPeople.innerHTML += displayInnerHTML(person, index);
        const listTech = document.getElementById(`list-tech-${index}`);
        person.tech.forEach(tech => {
          const newTech = document.createElement("div");
          newTech.classList.add("badge", "badge-primary", "m-1");
          newTech.textContent = tech;
          listTech.appendChild(newTech);
        })
      }
    });
  })
  } else {
    displayList();
  }
  
})
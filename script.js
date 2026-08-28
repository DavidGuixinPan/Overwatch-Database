// Hero Gallery func
async function getHeroes() {
    const response = await fetch("https://overfast-api.tekrop.fr/heroes");
    const heroes = await response.json();
    return heroes;
}

async function getHeroDetails(heroKey) {
    const response = await fetch(
        "https://overfast-api.tekrop.fr/heroes/" + heroKey,
    );
    const hero = await response.json();
    return hero;
}

async function displayHero(hero) {
    const heroDetails = await getHeroDetails(hero.key);

    document.getElementById("heroNotFound").textContent = "";

    // Hero Name
    document.getElementById("heroName").textContent = hero.name;

    // Hero Role
    document.getElementById("heroRole").textContent =
        "Role: " + capitalize(hero.role);

    //Hero Subrole
    document.getElementById("heroSubRole").textContent =
        "Subrole: " + capitalize(hero.subrole);

    // Hero Picture
    document.getElementById("heroPortrait").src = hero.portrait;
    document.getElementById("heroPortrait").style.display = "inline";
    document.getElementById("heroPortraitLink").href = hero.portrait;

    // Hero Gamemodes
    let gamemodeText = "Gamemodes:\n";
    for (let i = 0; i < hero.gamemodes.length; i++) {
        document.getElementById("heroGamemodes").textContent = gamemodeText +=
            "- " + capitalize(hero.gamemodes[i]) + "\n";
    }
    document.getElementById("heroGamemodes").textContent = gamemodeText;

    // Hero HP values
    document.getElementById("heroHealth").textContent =
        "Health: " + heroDetails.hitpoints.health;
    document.getElementById("heroArmor").textContent =
        "Armor: " + heroDetails.hitpoints.armor;
    document.getElementById("heroShield").textContent =
        "Shields: " + heroDetails.hitpoints.shields;
    document.getElementById("totalHP").textContent =
        "Total HP: " + heroDetails.hitpoints.total;

    // // Hero abilities
    let abilities = document.getElementById("abilities");
    abilities.innerHTML = "<h3>Abilities</h3>";

    for (let i = 0; i < heroDetails.abilities.length; i++) {
        const ability = heroDetails.abilities[i];
        const abilityDiv = document.createElement("div");

        const link = document.createElement("a");
        link.href = ability.icon;
        link.target = "_blank";

        const icon = document.createElement("img");
        icon.src = ability.icon;
        icon.alt = ability.name;
        icon.className = "abilityIcon";

        link.appendChild(icon);

        const abilityText = document.createElement("p");
        abilityText.textContent = ability.name + ": " + ability.description;

        abilityDiv.appendChild(abilityText);
        abilityDiv.appendChild(link);

        abilities.appendChild(abilityDiv);
    }

    // Minor perks
    let minorPerkText = "Minor Perks:\n";
    for (let i = 0; i < heroDetails.perks.minor.length; i++) {
        minorPerkText +=
            "- " +
            heroDetails.perks.minor[i].name +
            ": " +
            heroDetails.perks.minor[i].description +
            "\n";
    }
    document.getElementById("minorPerks").textContent = minorPerkText;

    // Major perks
    let majorPerkText = "Major Perks:\n";
    for (let i = 0; i < heroDetails.perks.major.length; i++) {
        majorPerkText +=
            "- " +
            heroDetails.perks.major[i].name +
            ": " +
            heroDetails.perks.major[i].description +
            "\n";
    }
    document.getElementById("majorPerks").textContent = majorPerkText;
}

function displayHeroes(heroes, role) {
    const list = document.getElementById("heroes");
    list.innerHTML = "";

    for (let i = 0; i < heroes.length; i++) {
        let hero = heroes[i];
        if (role === hero.role || role === "all") {
            const newLi = document.createElement("li");
            newLi.textContent = hero.name;
            newLi.addEventListener("click", () => {
                displayHero(hero);
            });
            list.appendChild(newLi);
        }
    }
}

function searchHero(heroes, hero) {
    hero = hero.toLowerCase();

    // Clear previous errors
    document.getElementById("heroNotFound").textContent = "";

    for (let i = 0; i < heroes.length; i++) {
        if (heroes[i].name.toLowerCase() === hero) {
            displayHero(heroes[i]);
            return;
        }
    }

    document.getElementById("heroNotFound").textContent =
        "No hero found with that name.";
}

function getRandomHero(heroes) {
    displayHero(heroes[Math.floor(Math.random() * heroes.length)]);
}

function getRandomMap(maps) {
    displayMap(maps[Math.floor(Math.random() * maps.length)]);
}

// Map Gallery
async function getMaps() {
    const response = await fetch("https://overfast-api.tekrop.fr/maps");
    const maps = await response.json();
    return maps;
}

function searchMap(maps, map) {
    map = map.toLowerCase();
    document.getElementById("mapNotFound").textContent = "";

    for (let i = 0; i < maps.length; i++) {
        if (maps[i].name.toLowerCase() === map) {
            displayMap(maps[i]);
            return;
        }
    }

    document.getElementById("mapNotFound").textContent =
        "No map found with that name";
}

function displayMaps(maps, gamemode) {
    const list = document.getElementById("maps");
    list.innerHTML = "";

    for (let i = 0; i < maps.length; i++) {
        let map = maps[i];
        if (map.gamemodes.includes(gamemode) || gamemode === "all") {
            const newLi = document.createElement("li");
            newLi.textContent = map.name;
            newLi.addEventListener("click", () => {
                displayMap(map);
            });
            list.append(newLi);
        }
    }
}

function displayMap(map) {
    // Map Name
    document.getElementById("mapName").textContent = map.name;

    // Map Image
    document.getElementById("mapImage").src = map.screenshot;

    // Map Gamemodes
    let mapGamemodes = "Gamemodes:\n";
    for (let i = 0; i < map.gamemodes.length; i++) {
        document.getElementById("mapGamemodes").textContent = mapGamemodes +=
            "- " + capitalize(map.gamemodes[i]) + "\n";
    }
    document.getElementById("mapGamemodes").textContent = mapGamemodes;

    // Map Location
    let mapLocationText = "Location:\n";
    document.getElementById("mapLocation").textContent =
        mapLocationText + map.location;
}

// Navi & Misc
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function showSection(section) {
    heroSection.style.display = "none";
    mapsSection.style.display = "none";

    if (section === "heroes") {
        heroSection.style.display = "block";
    } else if (section === "maps") {
        mapsSection.style.display = "block";
    }
}

async function main() {
    heroes = await getHeroes();
    maps = await getMaps();
    displayHeroes(heroes, "all");
    displayMaps(maps, "all");
}

// Navigation var
const heroSection = document.getElementById("heroesSection");
const mapsSection = document.getElementById("mapsSection");
const playerSection = document.getElementById("playerSection");
const heroesButton = document.getElementById("heroesButton");
const mapsButton = document.getElementById("mapsButton");
const playerButton = document.getElementById("playerButton");

// Hero Gallery var
const searchButton = document.getElementById("search");
const searchBox = document.getElementById("heroSearch");
const heroRandomize = document.getElementById("heroRandomize");
const heroInfo = document.getElementById("heroInfo");
const form = document.querySelector("form");
const portrait = document.getElementById("heroPortrait");
const portraitLink = document.getElementById("heroPortraitLink");
const all = document.getElementById("all");
const tank = document.getElementById("tank");
const damage = document.getElementById("damage");
const support = document.getElementById("support");
let heroes = [];

// Map Gallery var
const mapSearchButton = document.getElementById("mapSearchButton");
const mapSearchBox = document.getElementById("mapSearch");
const mapRandomize = document.getElementById("mapRandomize");
const control = document.getElementById("control");
const escort = document.getElementById("escort");
const hybrid = document.getElementById("hybrid");
const push = document.getElementById("push");
const flashpoint = document.getElementById("flashpoint");
const clash = document.getElementById("clash");
const assault = document.getElementById("assault");
const workshop = document.getElementById("workshop");
const mapSearchForm = document.getElementById("mapSearchForm");
let maps = [];

// Buttons & Listeners
searchButton.addEventListener("click", () => {
    const searchBox = document.getElementById("heroSearch");
    let text = searchBox.value;
    if (text) {
        console.log("Button clicked");
        searchHero(heroes, text);
    }
});

mapSearchButton.addEventListener("click", () => {
    const mapSearchBox = document.getElementById("mapSearch");
    let text = mapSearchBox.value;
    if (text) {
        console.log("Button clicked");
        searchMap(maps, text);
    }
});

heroesButton.addEventListener("click", () => {
    showSection("heroes");
});

mapsButton.addEventListener("click", () => {
    showSection("maps");
});

form.addEventListener("submit", function (event) {
    event.preventDefault();
    searchHero(heroes, searchBox.value);
    document.getElementById("heroSearch").value = "";
});

mapSearchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    searchMap(maps, mapSearchBox.value);
    mapSearchBox.value = "";
});

heroRandomize.addEventListener("click", () => {
    getRandomHero(heroes);
});

mapRandomize.addEventListener("click", () => {
    getRandomMap(maps);
});

all.addEventListener("click", () => {
    displayHeroes(heroes, "all");
});

tank.addEventListener("click", () => {
    displayHeroes(heroes, "tank");
});

damage.addEventListener("click", () => {
    displayHeroes(heroes, "damage");
});

support.addEventListener("click", () => {
    displayHeroes(heroes, "support");
});

control.addEventListener("click", () => {
    displayMaps(maps, "control");
});

escort.addEventListener("click", () => {
    displayMaps(maps, "escort");
});

hybrid.addEventListener("click", () => {
    displayMaps(maps, "hybrid");
});

push.addEventListener("click", () => {
    displayMaps(maps, "push");
});

flashpoint.addEventListener("click", () => {
    displayMaps(maps, "flashpoint");
});

clash.addEventListener("click", () => {
    displayMaps(maps, "clash");
});

assault.addEventListener("click", () => {
    displayMaps(maps, "assault");
});

workshop.addEventListener("click", () => {
    displayMaps(maps, "workshop");
});

main();

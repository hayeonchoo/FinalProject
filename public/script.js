const endpoint = 'https://spoonacular.com/food-api.json';

const restaurants = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => restaurants.push(...data));

function findMatches(wordToMatch, restaurants) {
    return restaurants.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.zip.match(regex) || place.category.match(regex) || place.name.match(regex)
    });
}

function displayMatches() {
    const matchArray = findMatches(this.value, restaurants);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const rName = place.name.replace(regex, `<span class="h1">${this.value}</span>`);
        const rCategory = place.category.replace(regex, `<span class="h2">${this.value}</span>`)
        const rAddress = place.address_line_1.replace(regex, `<span class="h2">${this.value}</span>`)
        const rCity = place.city.replace(regex, `<span class="h2">${this.value}</span>`)
        const rZip = place.zip.replace(regex, `<span class="h2">${this.value}</span>`)
        return `
            <li>
            <span class = "name">${rName}</span>
            <span class = "category">${rCategory}</span>
            <span class = "address">${(rAddress).italics()}</span>
            <span class = "city">${(rCity).italics()}</span>
            <span class = "zip">${(rZip).italics()}</span>
            </li>
        
        `;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keypress', displayMatches);
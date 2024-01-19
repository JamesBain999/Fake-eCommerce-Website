//Variable to reference for entire JSON object
let originalData;

//Set to use for categories dropdown
const uniqueCategories = new Set();

//Retrieves data from the specified API asynchronously
async function getJSON() {
    const response = await fetch('https://fakestoreapiserver.reactbd.com/products');
    const json = await response.json();
    return json;
}

//Function to first initialize the cards using templates
function initializeCards(arr) {
    const template = document.getElementById('JSON-card-template').content.cloneNode(true);
    template.querySelector('.card-img-top').src = arr.image;
    if (arr.category == "women") { //adds icon if category is women
        template.querySelector('.card-icon').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-standing-dress" viewBox="0 0 16 16"><path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-.5 12.25V12h1v3.25a.75.75 0 0 0 1.5 0V12h1l-1-5v-.215a.285.285 0 0 1 .56-.078l.793 2.777a.711.711 0 1 0 1.364-.405l-1.065-3.461A3 3 0 0 0 8.784 3.5H7.216a3 3 0 0 0-2.868 2.118L3.283 9.079a.711.711 0 1 0 1.365.405l.793-2.777a.285.285 0 0 1 .56.078V7l-1 5h1v3.25a.75.75 0 0 0 1.5 0Z"/></svg>'
    }
    if (arr.category == "men") { //adds icon if category is men
        template.querySelector('.card-icon').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-standing" viewBox="0 0 16 16"><path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M6 6.75v8.5a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2.75a.75.75 0 0 0 1.5 0v-2.5a.25.25 0 0 1 .5 0"/></svg>'
    }
    if (arr.category == "kids") { //adds icon if category is kids
        template.querySelector('.card-icon').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bandaid-fill" viewBox="0 0 16 16"><path d="m2.68 7.676 6.49-6.504a4 4 0 0 1 5.66 5.653l-1.477 1.529-5.006 5.006-1.523 1.472a4 4 0 0 1-5.653-5.66l.001-.002 1.505-1.492.001-.002Zm5.71-2.858a.5.5 0 1 0-.708.707.5.5 0 0 0 .707-.707ZM6.974 6.939a.5.5 0 1 0-.707-.707.5.5 0 0 0 .707.707M5.56 8.354a.5.5 0 1 0-.707-.708.5.5 0 0 0 .707.708m2.828 2.828a.5.5 0 1 0-.707-.707.5.5 0 0 0 .707.707m1.414-2.121a.5.5 0 1 0-.707.707.5.5 0 0 0 .707-.707m1.414-.707a.5.5 0 1 0-.706-.708.5.5 0 0 0 .707.708Zm-4.242.707a.5.5 0 1 0-.707.707.5.5 0 0 0 .707-.707m1.414-.707a.5.5 0 1 0-.707-.708.5.5 0 0 0 .707.708m1.414-2.122a.5.5 0 1 0-.707.707.5.5 0 0 0 .707-.707M8.646 3.354l4 4 .708-.708-4-4zm-1.292 9.292-4-4-.708.708 4 4z"/></svg>'
    }
    //This is used to make the cards more readable and display better by reducing the size of the description
    const maxChars = 100;
    const truncatedDesc = arr.description.length > maxChars ?
        arr.description.substring(0, maxChars) + '...' :
        arr.description;
    template.querySelector('.card-desc').innerText = truncatedDesc;
    //Sets title for template
    template.querySelector('.card-title').innerText = arr.title;
    //Sets price for template
    template.querySelector('.card-price').innerText = "$" + arr.price;
    //Sets category as an attribute of the template
    template.querySelector('.card').setAttribute('data-category', arr.category);
    //Sets category as an attribute of the template
    template.querySelector('#card-button').setAttribute('data-bs-target', '#modal_' + arr._id);

    //Creates children inside of #arr-list (creates the cards dynamically)
    document.querySelector('#arr-list').appendChild(template);
}

//Adds the dropdown menu for categories using Set
function addDropdowns(arr) {
    if (!uniqueCategories.has(arr.category)) {
        const template = document.getElementById('JSON-dropdown-template').content.cloneNode(true);
        template.querySelector('#dropdownCategory').innerText = arr.category;

        document.querySelector('#getListFromJSON').appendChild(template);

        uniqueCategories.add(arr.category);
    }
}
function initializeModals(arr) {
    const template = document.getElementById('JSON-modal-template').content.cloneNode(true);
    template.querySelector('.card-img-top').src = arr.image;
    //Sets title for template
    template.querySelector('.modal-title').innerText = arr.title;
    //Sets description for template
    template.querySelector('.modal-desc').innerText = arr.description;
    //Sets price for template
    template.querySelector('.modal-price').innerText = "$" + arr.price;
    //Sets category as an attribute of the template
    template.querySelector('.modal').setAttribute('id', 'modal_' + arr._id);
    //Creates children inside of #arr-list (creates the cards dynamically)
    document.querySelector('#modal-list').appendChild(template);
}

//Function that is actually displaying the information to the html document
async function initialize() {
    const arrData = await getJSON();
    originalData = [...arrData];
    arrData.forEach((arr) => initializeCards(arr));
    arrData.forEach((arr) => addDropdowns(arr));
    arrData.forEach((arr) => initializeModals(arr));
}

//Sorts cards alphabetically
function sortCardsAlphabeticallyAsc(){
    const cardsContainer = document.querySelector('#arr-list');
    const cards = Array.from(cardsContainer.children);
    

    cards.sort((a, b) => {
        const titleA = a.querySelector('.card-title').innerText.toLowerCase()
        const titleB = b.querySelector('.card-title').innerText.toLowerCase()
        
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
    });

    cardsContainer.innerHTML = ""
    cards.forEach((card) => cardsContainer.appendChild(card))
}

//Sorts cards alphabetically reverse order
function sortCardsAlphabeticallyDsc(){
    const cardsContainer = document.querySelector('#arr-list');
    const cards = Array.from(cardsContainer.children);
    

    cards.sort((a, b) => {
        const titleA = a.querySelector('.card-title').innerText.toLowerCase()
        const titleB = b.querySelector('.card-title').innerText.toLowerCase()
        
        if (titleA < titleB) return 1;
        if (titleA > titleB) return -1;
        return 0;
    });

    cardsContainer.innerHTML = ""
    cards.forEach((card) => cardsContainer.appendChild(card))
}

//Sorts cards by price from high to low
function sortCardsPriceFromHighToLow(){
    const cardsContainer = document.querySelector('#arr-list');
    const cards = Array.from(cardsContainer.children);
    

    cards.sort((a, b) => {
        const numA = parseFloat(a.querySelector('.card-price').innerText.replace("$", ""))
        const numB = parseFloat(b.querySelector('.card-price').innerText.replace("$", ""))
        return numB - numA;
    });

    cardsContainer.innerHTML = ""
    cards.forEach((card) => cardsContainer.appendChild(card))
}

//Sorts cards by price from low to high
function sortCardsPriceFromLowToHigh(){
    const cardsContainer = document.querySelector('#arr-list');
    const cards = Array.from(cardsContainer.children);
    

    cards.sort((a, b) => {
        const numA = parseFloat(a.querySelector('.card-price').innerText.replace("$", ""))
        const numB = parseFloat(b.querySelector('.card-price').innerText.replace("$", ""))
        return numA - numB;
    });

    cardsContainer.innerHTML = ""
    cards.forEach((card) => cardsContainer.appendChild(card))
}

//Filters cards to only show selected category
function categoryFilter(selectedCategory) {
    const cardsContainer = document.querySelector('#arr-list');
    const cards = Array.from(cardsContainer.children);

    cardsContainer.innerHTML = "";
    
    if (selectedCategory === 'All') {
        originalData.forEach((arr) => initializeCards(arr));
    } else {
        const filteredCards = originalData.filter(card => card.category === selectedCategory);

        filteredCards.forEach((card) => initializeCards(card));
    }
}

//Function to perform a search dynamically using the search bar
function performSearch() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredCards = originalData.filter(card =>
        card.title.toLowerCase().includes(searchInput) ||
        card.description.toLowerCase().includes(searchInput)
    );

    const cardsContainer = document.querySelector('#arr-list');
    cardsContainer.innerHTML = "";
    filteredCards.forEach((card) => initializeCards(card));

    return false
}

//Event listener to constantly update the page as the user types in the search bar
document.getElementById('searchInput').addEventListener('input', function () {
    performSearch();
});

//Calls initialize to show all cards when the page is first loaded
initialize();
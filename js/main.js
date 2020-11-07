import{
    getEquip
} from './crud.js';

import{
    Equipment,
    addEquipment
} from './model.js';

const ADDRESS = "http://127.0.0.1:8000/equip/"

const sortButton = document.getElementById('button-sort');
const priceButton = document.getElementById('button-count');
const createButton = document.getElementById('button-create');
const searchButton = document.getElementById('button__search');
const mainContainer = document.getElementById('main__container');
const clearButton = document.getElementById('button__clear');
let equipList = [];

var counter = 1;


function updateDOM(givenList) {
    var elements = mainContainer.querySelectorAll('.main__equipment');
    for (var i = 0; i < elements.length; i++) {
        elements[i].remove();
    }
    for (var i = 0; i < givenList.length; i++) {
        var id = givenList[i].id;
        var header = givenList[i].header;
        var descriptionText = givenList[i].description;
        var price = givenList[i].price;
        addEquipment({id, header, descriptionText, price}, Load);
    }
};

export const fetchAllContent = async () => {
    const allContent = await getEquip();

    equipList = allContent;

    updateDOM(equipList);
};

sortButton.addEventListener('click', (event) => {
    event.preventDefault();
    sortButton.classList.toggle('active');
    document.getElementById('button-sort__circle').classList.toggle('active');
    equipList.sort((o1, o2) => o2.price - o1.price);
    updateDOM(equipList);
});

priceButton.addEventListener('click', (event) => {
    event.preventDefault();
    var totalPrice = equipList.reduce((counter, item) => (counter += item.price), 0);
    document.getElementById('expenses-count').innerText = totalPrice + '$';
});

createButton.addEventListener('click', (event) => {
    event.preventDefault();
    var id = counter;
    counter += 1;
    var header = `Ні блін, сокира`;
    var descriptionText = 'Нижній текст Нижній текст Нижній текст Нижній текст Нижній текст.';
    var price = Math.floor(Math.random() * 100);
    var equipment = new Equipment(id, header, descriptionText, price);
    equipList.push(equipment);
    addEquipment({id, header, descriptionText, price});
    sortButton.classList.remove('active');
    document.getElementById('button-sort__circle').classList.remove('active');
});

searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    var text = document.getElementById("input__search").value;
    var pattern = new RegExp(text);
    var filteredList = equipList.filter(equip => pattern.test(equip.header));
    updateDOM(filteredList);
});

clearButton.addEventListener('click', (event) => {
    updateDOM(equipList);
}
);

async function Load() {
    equipList.length = 0;
    equipList.push(...(await (await fetch(ADDRESS)).json()))
    updateDOM(equipList);
}

window.addEventListener('load', Load)
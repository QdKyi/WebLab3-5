class Equipment {
    constructor(id, header, descriptionText, price) {
        this.id = id;
        this.header = header;
        this.descriptionText = descriptionText;
        this.price = price;
    }
}

const sortButton = document.getElementById('button-sort');
const priceButton = document.getElementById('button-count');
const createButton = document.getElementById('button-create');
const searchButton = document.getElementById('button__search');
const mainContainer = document.getElementById('main__container');
const clearButton = document.getElementById('button__clear');
const equipList = [];

var counter = 1;

const equipHTMLTemplate = ({
    id, header, descriptionText, price
}) => `
<div class="main__equipment" id="${id}">
    <img src = 1.png>
    <span class="main__equipment-header">${header}</span>
    <div class="main__equipment-description-text">${descriptionText}</div>
    
    <div class="main__equipment-price">
        <h3>Price:</h3>
        <h3>${price}$</h3>
    </div>
    <div class="main__equipment-buttons-container">
        <button class="main__equipment-edit-button">Edit</button>
        <button class="main__equipment-remove-button">Remove</button>
    </div>
    
</div>
`;

const addEquipment = ({id, header, descriptionText, price}) => 
{
    var equipmentContainer = document.getElementById('main__container');
    equipmentContainer.insertAdjacentHTML('beforeend', equipHTMLTemplate({
        id,
        header,
        descriptionText,
        price
    }));
};

function updateDOM(givenList) {
    var elements = mainContainer.querySelectorAll('.main__equipment');
    for (var i = 0; i < elements.length; i++) {
        elements[i].remove();
    }
    for (var i = 0; i < givenList.length; i++) {
        var id = givenList.id;
        var header = givenList[i].header;
        var descriptionText = givenList[i].descriptionText;
        var price = givenList[i].price;
        addEquipment({id, header, descriptionText, price});
    }
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

import {
    postEquip
} from './crud.js'

const createButton = document.getElementById("create-button")
const closeButton = document.getElementById("close-button")
const modalThing = document.getElementById("modal-popup")

createButton.addEventListener('click', (event)=>{
    event.preventDefault()
    
    let header = document.getElementById('header-input').value;
    let description = document.getElementById('description-input').value;
    let price = document.getElementById('price-input').value;

    if (header == '' || 
    description == '' || price == ''){
        modalThing.style.display = 'block';
    }
    
    postEquip({header, description,  price});
})

closeButton.addEventListener('click', (event) => {
    event.preventDefault();

    modalThing.style.display = 'none';
})
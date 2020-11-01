const createButton = document.getElementById("create-button")
const closeButton = document.getElementById("close-button")
const modalThing = document.getElementById("modal-popup")
const priceInput = document.getElementById("price-input")
const headerInput = document.getElementById("header-input")
const descriptionInput = document.getElementById("description-input")

createButton.addEventListener('click', (event)=>{
    event.preventDefault()
    if (headerInput.value == '' || 
    descriptionInput.value == '' || priceInput.value == ''){
        modalThing.style.display = 'block';
    }
})

closeButton.addEventListener('click', (event) => {
    event.preventDefault();

    modalThing.style.display = 'none';
})
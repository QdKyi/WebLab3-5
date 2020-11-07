export class Equipment {
    constructor(id, header, descriptionText, price) {
        this.id = id;
        this.header = header;
        this.descriptionText = descriptionText;
        this.price = price;
    }
}

export const equipHTMLTemplate = ({
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
        <a href = "edit.html?id=${id}" class="main__equipment-edit-button">Edit</a>
        <button class="main__equipment-remove-button" id = "remove-button-${id}">Remove</button>
    </div>
    
</div>
`

export const addEquipment = ({id, header, descriptionText, price}, callback) => 
{
    let equipmentContainer = document.getElementById('main__container');
    equipmentContainer.insertAdjacentHTML('beforeend', equipHTMLTemplate({
        id,
        header,
        descriptionText,
        price
    }));
    document.getElementById("remove-button-"+id).addEventListener('click',async function(){
        await fetch("http://127.0.0.1:8000/equip/"+id,{method: 'DELETE'});
        await callback();
    })
};
import inventory from "./inventory.js";

const addToCartBtns = Array.from(document.querySelectorAll(".add-to-cart-btn"));

addToCartBtns.map(button => {
    button.addEventListener("click", () => {
        const itemName = button.parentElement.parentElement.children[1].firstElementChild.textContent;
        findAndAddToCart(itemName);
    })
})

// generate a unique ID from time object.
function generateID() {
    return new Date().getTime();
}

// find item from the inventory object and push to local storage.
function findAndAddToCart(itemName) {
    inventory.filter(inventoryItem => {
        if(inventoryItem.name === itemName){
            localStorage.setItem(generateID(),JSON.stringify(inventoryItem));
            displayTotal();       
        }
    })
}

// check local storage for all items, display the total
function displayTotal(){
    let total = 0;
    for(let i = 0; i < localStorage.length; i++){
        const itemKey = localStorage.key(i);
        const item = JSON.parse(localStorage.getItem(itemKey));
        total += item.price;
    }
    alert(`Added to Cart.\n\nTotal: R${total}`);
}
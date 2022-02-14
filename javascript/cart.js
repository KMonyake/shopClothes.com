const showPriceElement = document.getElementById("total-price");

//get items from local storage and add up the total
function calculateTotal() {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const itemKey = localStorage.key(i);
        const item = JSON.parse(localStorage.getItem(itemKey));
        total += item.price;
    }
    return total;
}

//show total
const vat = 1.15;
let totalAmount = calculateTotal();
showPriceElement.textContent = `Total: R${(totalAmount * vat).toFixed(2)}`;

// get items from local stoage and push to array(cartItems)
const cartItems = [];

for (let i = 0; i < localStorage.length; i++) {
    const itemKey = localStorage.key(i);
    const item = JSON.parse(localStorage.getItem(itemKey));
    cartItems.push(item);
}

// display all items in the dom
const cartContainer = document.getElementById("cart-container");

cartContainer.innerHTML = cartItems.map(item => {
    return `
        <article class="card">
            <img src="${item.img}" alt="thumbnail">
            <article class = "details">
                <h3>${item.name}</h3> 
                <h4>R${item.price}</h4>
            </article> 
            <article class="footer">
                <a href="../product pages/handbag.html">More</a> 
            </article>
        </article>`
}).join("");

//apply coupon discount
let couponApplied = false;
const couponInput = document.getElementById("coupon-input");

couponInput.addEventListener("input", () => {
    if (couponInput.value !== "" && !couponApplied) {
        totalAmount = totalAmount - (totalAmount * 0.8);
        showPriceElement.textContent = `Total: R${(totalAmount * vat).toFixed(2)}`;
        couponApplied = true;
        alert("Coupon applied, 80% deducted.");
    } else {
        showPriceElement.textContent = `Total: R${(totalAmount * vat).toFixed(2)}`;
    }
})

//get collection form and delivery-form from the dom
const collectionDropDown = $("#collection-drop-down");
const deliveryForm = $("#delivery-form");

//display collection form by default
collectionDropDown.animate({height: "20rem"},{duration: 1500}).show();

//hide drop down options by default
const dropDownOptions = $("#drop-down-options-container");
dropDownOptions.hide();


//handle pick-up up options 
const deliverySelect = $("#delivery-select");
deliverySelect.change(function (e) {
    const selectedOptionIndex = e.target.options.selectedIndex;
    if (selectedOptionIndex === 0){
        showPriceElement.textContent = `Total: R${(totalAmount * vat).toFixed(2)}`;
        deliveryForm.animate({height: "20rem"},{duration: 1500}).hide();
        collectionDropDown.animate({height: "20rem"},{duration: 1500}).show();
    }
    if (selectedOptionIndex === 1) {
        showPriceElement.textContent = `Total: R${((totalAmount * vat) + 40).toFixed(2)}`;
        deliveryForm.animate({height: "20rem"},{duration: 1500}).show();
        collectionDropDown.animate({height: "20rem"},{duration: 1500}).hide();
    }
})

//fade drop down children when click
const dropDownBtn = $("#drop-down-btn")
dropDownBtn.click(function(){
    dropDownOptions.fadeToggle();
})

//generate ID and confirm order
const confirmOrderBtn = document.getElementById("confirm-order-btn");
confirmOrderBtn.addEventListener("click", () => {
    const orderID = new Date().getTime();
    alert(`Order successul.\nOrder no. #ASWP${orderID}`);
});
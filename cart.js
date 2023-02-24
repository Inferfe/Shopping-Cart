const cartAmountText = document.getElementById("cartAmount");
 itemsDatas = JSON.parse(localStorage.getItem("items")) || [];
 let cartAmount = +(localStorage.getItem("cartAmount") || 0);
  const isEmpty = itemsDatas.length
    ? !itemsDatas.some((item) => item.quantity > 0)
    : true;
const shoppingCart = document.querySelector(".shopping-cart");


const multiplyQuantity=(cartItemPrice,quantity)=>{
 const overallPrice=parseFloat(cartItemPrice.replace('$',''))*quantity
return overallPrice
}



const update = (index, quantityText) => {
  localStorage.setItem("items", JSON.stringify(itemsDatas));
  localStorage.setItem("cartAmount", cartAmount);
  quantityText.textContent= itemsDatas[index].quantity;
  cartAmountText.textContent = cartAmount;
};

const incrementQuantity = (index, quantityText) => {
  itemsDatas[index].quantity++;
  cartAmount++;
  update(index, quantityText);
};

const decrerementQuantity = (index, quantityText,item) => {
  if (itemsDatas[index].quantity - 1 >0) {
    itemsDatas[index].quantity--;
    cartAmount--;
  } else {
    itemsDatas[index].quantity=0;
    cartAmount--;
    item.remove()
 
}


 update(index, quantityText);

}

const removeItem = (index, item,quantityText) => {
  cartAmount-= itemsDatas[index].quantity;
  itemsDatas[index].quantity = 0;
  item.remove();
  update(index,quantityText)
};




const displayEmptyCartMsg = function () {
  shoppingCart.innerHTML = `<div>
        <h2 style="margin-bottom: 20px;">Cart is empty</h2>
        <a style="margin-left: 20px;" href="index.html" class="HomeBtn">Back to Home</a></div>`;
};
const displayWantedItems=function(){
    const cartItems = itemsDatas.filter((item) => item.quantity > 0);
    cartItems.forEach((item) => {
      const { url, price, quantity,id } = item;
      const html = ` <div id="${id}" class="cart-item">
        <img width="100" src="${url}" alt="" />
        <div class="details">
          <div class="title-price-x">
              <h4 class="title-price">
                <p>Shelby Suit </p>
                <p class="cart-item-price">$${price}</p>
              </h4>
              <i class="bi bi-x-lg"></i>
          </div>
          <div class="buttons">
              <i  class="bi bi-dash-lg"></i>
              <div  class="quantity">${quantity}</div>
              <i  class="bi bi-plus-lg"></i>
          </div>
          <h3>$${multiplyQuantity(String(price),quantity)} </h3>
        </div>
      </div>`;

      shoppingCart.innerHTML += html;
    });

}

const displayCartAmount = function () {
 cartAmountText.textContent = cartAmount;
  
  
};

const displayCartItems=function(){
    
    
     if(!isEmpty){
        displayWantedItems()
      
    
    }else{
        displayEmptyCartMsg();
    }
}

shoppingCart.addEventListener('click',function(e){
    const target= e.target
    const cartItem=target.closest('.cart-item')
        if (!cartItem) return;
        const quantityText = cartItem.querySelector(".quantity");
    const overallItemPrice=cartItem.querySelector('h3')
    const cartItemPrice= cartItem.querySelector('.cart-item-price')
    
  ;

    if(target.classList.contains('bi-plus-lg')){
       incrementQuantity(cartItem.id,quantityText)
       overallItemPrice.textContent = `$${multiplyQuantity(
         cartItemPrice.textContent,
         quantityText.textContent
       )}`;

      
      } 
      
      else if(target.classList.contains('bi-dash-lg')){
      decrerementQuantity(cartItem.id, quantityText,cartItem);
       overallItemPrice.textContent =`$${ multiplyQuantity(
         cartItemPrice.textContent,
         quantityText.textContent
       )}`
    }
     
    else if(target.classList.contains('bi-x-lg')){
      removeItem(cartItem.id,cartItem,quantityText);
      
    
    }
})



window.onload=()=>{ 
    displayCartAmount()
    displayCartItems()


}

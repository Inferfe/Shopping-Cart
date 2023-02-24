const shop = document.getElementById("shop");
let cartAmount=0
const cartAmountText=document.getElementById('cartAmount')



let itemsDatas = [
  { id: 0, url: "http://surl.li/faiqv", price: 200, quantity: 0 },
  { id: 1, url: "http://surl.li/faiun", price: 500, quantity: 0 },
  { id: 2, url: "http://surl.li/faivn", price: 300, quantity: 0 },
  { id: 3, url: "http://surl.li/fairv", price: 1000, quantity: 0 },
  { id: 4, url: "http://surl.li/faisb", price: 400, quantity: 0 },
  { id: 5, url: "http://surl.li/faisq", price: 500, quantity: 0 },
  { id: 6, url: "http://surl.li/faitb", price: 340, quantity: 0 },
  { id: 7, url: "http://surl.li/faiwa", price: 850, quantity: 0 },
];
const update = (index,quantityText) => {
    localStorage.setItem('items',JSON.stringify(itemsDatas))
    localStorage.setItem('cartAmount',cartAmount)
  quantityText.textContent = itemsDatas[index].quantity;
  cartAmountText.textContent = cartAmount;
};


const incrementQuantity=(index,quantityText)=>{
    itemsDatas[index].quantity++
    cartAmount++;
   update(index,quantityText)
  

}


const decrerementQuantity = (index, quantityText) => {
if(itemsDatas[index].quantity - 1 >= 0){
 itemsDatas[index].quantity--
 cartAmount--
}else{
    itemsDatas[index].quantity
};
update(index,quantityText)
 

};


const generateShopitems = () => {
  itemsDatas = JSON.parse(localStorage.getItem("items")) || itemsDatas
 return itemsDatas.forEach(item=>{
    const { url, price,id,quantity} = item;
      const html = `<div id="${id}" class="item">
        <img width="220" height="350" src="${url}" alt="">
        <div class="details">
          <h3>Shelby shirt</h3>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
          <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="buttons">
              <i class="bi bi-dash-lg"></i>
              <div class="quantity">${quantity}</div>
              
              <i class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>`;
      
      shop.innerHTML+=html
      cartAmount=localStorage.getItem('cartAmount')|| cartAmount
      cartAmountText.textContent = cartAmount;



  })
};

shop.addEventListener('click',(e)=>{
    
    const target=e.target
  const selectedItem=  target.closest(".item");
  if(!selectedItem) return;
  const quantityText = selectedItem.querySelector(".quantity");
    const { id } = selectedItem;
    if(target.classList.contains('bi-plus-lg')){
       
    
      incrementQuantity(id,quantityText)
}
else if(target.classList.contains('bi-dash-lg')){
    decrerementQuantity(id,quantityText)

}


})
window.addEventListener('load',generateShopitems)

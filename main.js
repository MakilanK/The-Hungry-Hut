const btnCart=document.querySelector('#cartlogo');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('#cart-close');

btnCart.addEventListener('click',()=>
{
    cart.classList.add('cart-active');


});
btnClose.addEventListener('click',()=>
{
    cart.classList.remove('cart-active');
     

});
document.addEventListener('DOMContentLoaded',loadFood);
function loadFood()
{
    loadContent();
}
function loadContent()
{
    let btnRemove=document.querySelectorAll('.cart-remove');

    btnRemove.forEach((i)=>{
        i.addEventListener('click',removeItem);

    });

    let qtyElements=document.querySelectorAll('.cart-quantity');

    qtyElements.forEach((input)=>{
        input.addEventListener('change',changeQty);

    });
    
    let cartBtns=document.querySelectorAll('.add-cart');
    cartBtns.forEach((btn)=>{
        btn.addEventListener('click',addCart);

        updateTotal();
        cartCount();
    });

}
function removeItem()
{
    if(confirm('Are you sure to Remove the item'))
    {
    
    let title=this.parentElement.querySelector('.cart-food-title');
   
    itemList=itemList.filter(el=>el.title!=title.innerHTML);

    this.parentElement.remove();
    loadContent();
    
    }
    
}

function changeQty()
{
    if(isNaN(this.value) || this.value<1)
    {
        this.value=1;
    }
   loadContent();
}
let itemList=[];
function addCart()
{
    let food=this.parentElement;
    let title=food.querySelector('.food-title').innerHTML;
     let price=food.querySelector('.food-price').innerHTML;
     let imgSrc=food.querySelector('.food-img').src;
     let newProduct={title,price,imgSrc};
     if(itemList.find((i)=>i.title===newProduct.title))
     {
        alert("Product Alredy Exists in cart");
        return;
     }
     else
     {
        itemList.push(newProduct);
        let added=food.querySelector('.add-cart');
        added.style.backgroundColor="red";
       
     }
     let newProductElement=createCartProduct(title,price,imgSrc);
     let element=document.createElement('div');
     element.innerHTML=newProductElement
    let cartBasket=document.querySelector('.cart-content');
    cartBasket.append(element);
  //   console.log(cartBasket);
  
  loadContent();
}
function createCartProduct(title,price,imgSrc)
{
   return `
   <div class="cart-box">
             <img src="${imgSrc}" class="cart-img"> 
             <div class="detail-box">
             <div class="cart-food-title">${title}</div>    
            <div class="price-box">
               <div class="cart-price">${price}</div>
               <div class="cart-amount">${price}</div>
            </div>
           
            <input type="number" value="1" class="cart-quantity">
   
         </div>
            <ion-icon name="trash-sharp" class="cart-remove"></ion-icon>
            </div> `;
}
function updateTotal()
{
   const cartItems=document.querySelectorAll(".cart-box");
   const totalValue=document.querySelector('.total-price');
   let total=0;
   cartItems.forEach(product=>{
    let priceElement=product.querySelector('.cart-price');
    let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
    let qty=product.querySelector('.cart-quantity').value;
     total+=(price*qty);
    
    product.querySelector('.cart-amount').innerText="Rs."+(price*qty);
   });
   
   totalValue.innerHTML='Rs.'+total;
     //count
    }
    function cartCount()
    {
    const cartCount=document.querySelector('.cart-count');
    let count=itemList.length;
    cartCount.innerHTML=count;
    if(count===0)
    {
        cartCount.style.display="none";
    }
    else
    {
        cartCount.style.display="block";
    }
    }
    
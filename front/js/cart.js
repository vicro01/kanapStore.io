const container = document.getElementById('cart__items');
let cartStr = localStorage.getItem('cart') ||'[]';
let cartArray = JSON.parse(cartStr);
// console.log(cartArray);
//function to create each card for this we are making a for loop thru the cartStr

for (let i=0; i<cartArray.length; i++){
    createCard(cartArray[i]);
}

function createCard(object){

    // var quantityT = 0

    // // for(var i = 0; i<cartArray.length; i+=1){
    // //     quantityT+=cartArray[i].quantity
    // // }
    var totalQuantity = document.getElementById('totalQuantity');
    var tQuantity = parseInt(totalQuantity.innerText) + object.quantity;
    totalQuantity.innerText = tQuantity;
    var totalPriceCalc = 0

    for (var i = 0; i<cartArray.length; i+=1){
        totalPriceCalc+=cartArray[i].price*cartArray[i].quantity
    }


    totalPrice = document.getElementById('totalPrice');
    totalPrice.innerHTML = totalPriceCalc;
    
    

    // console.log(totalPrice, quantityT);
    
    // var allItems = document.getElementById('totalQuantity');
    // allItems.innerHTML = object.quantity;

    // var allItemsPrice = document.getElementById('totalPrice');
    // allItemsPrice.innerHTML = object.price;

    var card = document.createElement('a');
    var title = document.createElement('h2');
    title.innerText = object.title;
    card.appendChild(title);

    var image = document.createElement("img");
      image.src = object.item__img;
      image.width = "200";
      image.height = "150";
      card.appendChild(image); 

    var color = document.createElement('p');
    var colorText = document.createTextNode('Color: ');
      color.appendChild(colorText);
    var colorSpan = document.createElement('span');
      colorSpan.className = 'itemColor';
      colorSpan.innerText = object.color;
    //var colorSelect = document.createTextNode(object.color);
      color.appendChild(colorSpan);
      card.appendChild(color);
    
    var description = document.createElement('p');
      description.innerText = object.description;
      card.appendChild(description);

        
    var price = document.createElement('p');
    var priceText = document.createTextNode('Price: ');
      price.appendChild(priceText); 
      price.innerHTML = object.price;
      card.appendChild(price);
      container.appendChild(card);

    // var options = document.createElement('p');
    //    options.innerHTML = object.options;
    //    card.appendChild(options);

      var removeFromCart = document.createElement('button');
        removeFromCart.setAttribute('type', 'button');
        removeFromCart.innerText = 'Remove From Cart';
        removeFromCart.addEventListener('click', removeElement);
        card.appendChild(removeFromCart);

        

      var plusSign = document.createElement('button');
        plusSign.setAttribute('type', 'button');
        plusSign.innerText = '+';
        plusSign.addEventListener('click', addItem);
        card.appendChild(plusSign);

      var input = document.createElement("input");
        input.type = "number";
        input.min="1"; 
        input.max="100"; 
        input.value=object.quantity;
        card.appendChild(input); // put it into the DOM

      var minusSign = document.createElement('button');
        minusSign.setAttribute('type', 'button');
        minusSign.innerText = '-';
        minusSign.addEventListener('click', substractItem);
        card.appendChild(minusSign);
        
    
    // console.log(plusSign);
    // updateCartArray()
}


function removeElement(event){
  const cardToRemove = event.target.parentElement;
  const title = event.target.parentElement.firstElementChild.innerText;

  for(let i=cartArray.length-1; i>-1; i--){

        //this for loop iterates over the cart arr to compare titles and option then I'll have to use splice;
    // if (cartArray[i].title === title && cartArray[i].options===options){

    if (cartArray[i].title === title){
      //removing from cartArray
      // console.log('splice', cartArray[i]);
      cartArray.splice(i, 1);
      //removing from dom
      cardToRemove.remove();
      
   }
  }
  localStorage.setItem('cart', JSON.stringify(cartArray));
  // cartArray = JSON.parse(localStorage.getItem('cart'));
}

// + sign function//

function addItem(e){
  var itemToAdd = e.target.nextElementSibling;
  itemToAdd.value = parseInt(itemToAdd.value)+1;
  var title = e.target.parentElement.firstElementChild.innerText;
  var previousSibling = e.target.previousElementSibling;
  
  var itemColor = null;

  while (previousSibling){
    if (previousSibling.matches('p')){
     var child = previousSibling.firstElementChild
     if (child != null && child.matches('span')){
       itemColor = child.innerText;
       break;
     }
    }
    previousSibling = previousSibling.previousElementSibling
  }
  var totalPriceCalc = 0;
  for(let i=cartArray.length-1; i>-1; i--){
    if (cartArray[i].title===title && cartArray[i].color===itemColor){
      cartArray[i].quantity +=1 
      totalPriceCalc+=cartArray[i].price*cartArray[i].quantity     
    }
    else{
      totalPriceCalc+=cartArray[i].price*cartArray[i].quantity     
    }
  }
  totalPrice = document.getElementById('totalPrice');
  totalPrice.innerHTML = totalPriceCalc;

  var totalQuantity = document.getElementById('totalQuantity');
  var tQuantity = parseInt(totalQuantity.innerText)+1;
  totalQuantity.innerText = tQuantity;
  localStorage.setItem('cart', JSON.stringify(cartArray));
}


// - sign function//

function substractItem(e){
  console.log('sasa')
  var cardToRemove = e.target.parentElement;
  var itemToRemove = e.target.previousElementSibling;
  itemToRemove.value = parseInt(itemToRemove.value)-1;
  var title = e.target.parentElement.firstElementChild.innerText;
  var previousSibling = e.target.previousElementSibling;
  
  var itemColor = null;

  while (previousSibling){
    if (previousSibling.matches('p')){
     var child = previousSibling.firstElementChild
     if (child != null && child.matches('span')){
       itemColor = child.innerText;
       break;
     }
    }
    previousSibling = previousSibling.previousElementSibling
  }
  var totalPriceCalc = 0;
  for(let i=cartArray.length-1; i>-1; i--){
    if (cartArray[i].title===title && cartArray[i].color===itemColor){

      // var currentQty = cartArray[i].quantity;
      // var itemPrice = cartArray[i].price;
      cartArray[i].quantity -=1 

      if (cartArray[i].quantity === 0) {
        cartArray.splice(i, 1);
        cardToRemove.remove();  
        // totalPriceCalc -= currentQty*itemPrice;        
      }
      else {
      totalPriceCalc+=cartArray[i].price*cartArray[i].quantity     
      }
    }
    else{
      totalPriceCalc+=cartArray[i].price*cartArray[i].quantity     
    }
    
  }
  totalPrice = document.getElementById('totalPrice');
  totalPrice.innerHTML = totalPriceCalc;

  var totalQuantity = document.getElementById('totalQuantity');
  var tQuantity = parseInt(totalQuantity.innerText)-1;
  totalQuantity.innerText = tQuantity;
  localStorage.setItem('cart', JSON.stringify(cartArray));
}



//from stackoverflow
//Post to confirmation page
function getForm() {
  
  var form = document.querySelector(".cart__order__form");

  //Create validation
  var emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
  var charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  var addressRegExp = new RegExp("[A-Za-z0-9'\.\-\s\,]");

 
  form.firstName.addEventListener('change', function() {
      validFirstName(this);
  });

 
  form.lastName.addEventListener('change', function() {
      validLastName(this);
  });

  
  form.address.addEventListener('change', function() {
      validAddress(this);
  });

 
  form.city.addEventListener('change', function() {
      validCity(this);
  });

  
  form.email.addEventListener('change', function() {
      validEmail(this);
  });

  
  var validFirstName = function(inputFirstName) {
      let firstNameErrorMsg = inputFirstName.nextElementSibling;

      if (charRegExp.test(inputFirstName.value)) {
          firstNameErrorMsg.innerHTML = '';
      } else {
          firstNameErrorMsg.innerHTML = 'Your first name is not valid!';
      }
  };


  var validLastName = function(inputLastName) {
      let lastNameErrorMsg = inputLastName.nextElementSibling;

      if (charRegExp.test(inputLastName.value)) {
          lastNameErrorMsg.innerHTML = '';
      } else {
          lastNameErrorMsg.innerHTML = 'Your last name is not valid!';
      }
  };

  
  var validAddress = function(inputAddress) {
      let addressErrorMsg = inputAddress.nextElementSibling;

      if (addressRegExp.test(inputAddress.value)) {
          addressErrorMsg.innerHTML = '';
      } else {
          addressErrorMsg.innerHTML = 'The address entered is not valid!';
      }
  };

  
  var validCity = function(inputCity) {
      let cityErrorMsg = inputCity.nextElementSibling;

      if (charRegExp.test(inputCity.value)) {
          cityErrorMsg.innerHTML = '';
      } else {
          cityErrorMsg.innerHTML = 'This is not a city!';
      }
  };

 
  var validEmail = function(inputEmail) {
      let emailErrorMsg = inputEmail.nextElementSibling;

      if (emailRegExp.test(inputEmail.value)) {
          emailErrorMsg.innerHTML = '';
      } else {
          emailErrorMsg.innerHTML = 'Please enter a valid email address!';
      }
  };
  }
getForm();

function postForm(){
  var btn_commander = document.getElementById("order");

  //add event listener on buy now
  btn_commander.addEventListener("click", (event)=>{
  
      //retrieve client info
      let inputName = document.getElementById('firstName');
      let inputLastName = document.getElementById('lastName');
      let inputAdress = document.getElementById('address');
      let inputCity = document.getElementById('city');
      let inputMail = document.getElementById('email');

      
      let idProducts = [];
      for (let i = 0; i<cartArray.length;i++) {
          idProducts.push(cartArray[i].id);
      }
      console.log(idProducts);

      var order = {
          contact : {
              firstName: inputName.value,
              lastName: inputLastName.value,
              address: inputAdress.value,
              city: inputCity.value,
              email: inputMail.value,
          },
          products: idProducts,
      } 

//Combining both codes

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");



var options = {
  method: 'POST',
  body: JSON.stringify(order),
  headers: myHeaders,
  redirect:'follow'
};

fetch("http://localhost:3000/api/products/order", options)
.then((response) => response.json())
.then((data) => {
  console.log(data);
  localStorage.clear();
  localStorage.setItem("orderId", data.orderId);

  document.location.href = "confirmation.html";
})
.catch((err) => {
  alert ("Problème avec fetch : " + err.message);
});
})
}
postForm();

console.log("ALoooooo", postForm)




// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// var raw = JSON.stringify({
//   "contact": {
//     "firstName": "",
//     "lastName": "41k421k",
//     "address": "14125415",
//     "city": "541521",
//     "email": "515k215"
//   },
//   "products": [
//     "107fb5b75607497b96722bda5b504926"
//   ]
// });

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

// fetch("http://localhost:3000/api/products/order", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));




// console.log();













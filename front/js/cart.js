const container = document.getElementById('cart__items');
let cartStr = localStorage.getItem('cart') || '[]';
let cartArray = JSON.parse(cartStr);

//function to create each card for this we are making a for loop thru the cartStr

for (let i = 0; i < cartArray.length; i++) {
  createCard(cartArray[i]);
}

function createCard(object) {
  var totalQuantity = document.getElementById('totalQuantity');
  var tQuantity = parseInt(totalQuantity.innerText) + object.quantity;
  totalQuantity.innerText = tQuantity;
  var totalPriceCalc = 0

  for (var i = 0; i < cartArray.length; i += 1) {
    totalPriceCalc += cartArray[i].price * cartArray[i].quantity
  }

  totalPrice = document.getElementById('totalPrice');
  totalPrice.innerHTML = totalPriceCalc;

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
  input.min = "1";
  input.max = "100";
  input.value = object.quantity;
  card.appendChild(input); // put it into the DOM

  var minusSign = document.createElement('button');
  minusSign.setAttribute('type', 'button');
  minusSign.innerText = '-';
  minusSign.addEventListener('click', substractItem);
  card.appendChild(minusSign);
}


function removeElement(event) {
  const cardToRemove = event.target.parentElement;
  const title = event.target.parentElement.firstElementChild.innerText;

  for (let i = cartArray.length - 1; i > -1; i--) {
    //this for loop iterates over the cart arr to compare titles and option then I'll have to use splice;
    if (cartArray[i].title === title) {
      //removing from cartArray
      cartArray.splice(i, 1);
      //removing from dom
      cardToRemove.remove();

    }
  }
  localStorage.setItem('cart', JSON.stringify(cartArray));
}

// + sign function//
function addItem(e) {
  var itemToAdd = e.target.nextElementSibling;
  itemToAdd.value = parseInt(itemToAdd.value) + 1;
  var title = e.target.parentElement.firstElementChild.innerText;
  var previousSibling = e.target.previousElementSibling;

  var itemColor = null;

  while (previousSibling) {
    if (previousSibling.matches('p')) {
      var child = previousSibling.firstElementChild
      if (child != null && child.matches('span')) {
        itemColor = child.innerText;
        break;
      }
    }
    previousSibling = previousSibling.previousElementSibling
  }
  var totalPriceCalc = 0;
  for (let i = cartArray.length - 1; i > -1; i--) {
    if (cartArray[i].title === title && cartArray[i].color === itemColor) {
      cartArray[i].quantity += 1
      totalPriceCalc += cartArray[i].price * cartArray[i].quantity
    }
    else {
      totalPriceCalc += cartArray[i].price * cartArray[i].quantity
    }
  }
  totalPrice = document.getElementById('totalPrice');
  totalPrice.innerHTML = totalPriceCalc;

  var totalQuantity = document.getElementById('totalQuantity');
  var tQuantity = parseInt(totalQuantity.innerText) + 1;
  totalQuantity.innerText = tQuantity;
  localStorage.setItem('cart', JSON.stringify(cartArray));
}

// - sign function//
function substractItem(e) {
  console.log('sasa')
  var cardToRemove = e.target.parentElement;
  var itemToRemove = e.target.previousElementSibling;
  itemToRemove.value = parseInt(itemToRemove.value) - 1;
  var title = e.target.parentElement.firstElementChild.innerText;
  var previousSibling = e.target.previousElementSibling;

  var itemColor = null;

  while (previousSibling) {
    if (previousSibling.matches('p')) {
      var child = previousSibling.firstElementChild
      if (child != null && child.matches('span')) {
        itemColor = child.innerText;
        break;
      }
    }
    previousSibling = previousSibling.previousElementSibling
  }
  var totalPriceCalc = 0;
  for (let i = cartArray.length - 1; i > -1; i--) {
    if (cartArray[i].title === title && cartArray[i].color === itemColor) {
      cartArray[i].quantity -= 1

      if (cartArray[i].quantity === 0) {
        cartArray.splice(i, 1);
        cardToRemove.remove();
      }
      else {
        totalPriceCalc += cartArray[i].price * cartArray[i].quantity
      }
    }
    else {
      totalPriceCalc += cartArray[i].price * cartArray[i].quantity
    }

  }
  totalPrice = document.getElementById('totalPrice');
  totalPrice.innerHTML = totalPriceCalc;

  var totalQuantity = document.getElementById('totalQuantity');
  var tQuantity = parseInt(totalQuantity.innerText) - 1;
  totalQuantity.innerText = tQuantity;
  localStorage.setItem('cart', JSON.stringify(cartArray));
}

//validating the form

var form = document.querySelector('.cart__order__form');

form.firstName.addEventListener('change', function () {
  validfirstName(this);
});
var validfirstName = function (inputfirstName) {

  //will have capitals and 3 to 20 characters
  var firstNameRegExp = new RegExp("^[A-Za-z ,']{3,20}$", 'g');
  var errorMsg = document.querySelector('#firstNameErrorMsg');

  if (firstNameRegExp.test(inputfirstName.value)) {
    errorMsg.innerHTML = ""
    return true;
  }
  else {
    errorMsg.innerHTML = "This is not a valid First Name"
  }

};

//-------- Validating Last Name------------------
form.lastName.addEventListener('change', function () {
  validlastName(this);
});
var validlastName = function (inputlastName) {

  var lastNameRegExp = new RegExp("^[A-Za-z ,']{3,20}$", 'g');
  var errorMsg = document.querySelector('#lastNameErrorMsg');

  if (lastNameRegExp.test(inputlastName.value)) {
    errorMsg.innerHTML = ""
    return true;
  }
  else {
    errorMsg.innerHTML = "This is not a valid Last Name"
  }

};

//-------- Validating address------------------
form.address.addEventListener('change', function () {
  validAddress(this);
});
var validAddress = function (inputAddress) {

  var addressRegExp = new RegExp("[A-Za-z0-9'\.\-\s\,]", 'g');
  var errorMsg = document.querySelector('#addressErrorMsg');

  if (addressRegExp.test(inputAddress.value)) {
    errorMsg.innerHTML = ""
    return true;
  }
  else {
    errorMsg.innerHTML = "This is not a valid Address"
  }

};

//-------- Validating city------------------
form.city.addEventListener('change', function () {
  validCity(this);
});
var validCity = function (inputCity) {

  var cityRegExp = new RegExp("^[A-Za-z ,.'-]{3,20}$", 'g');
  var errorMsg = document.querySelector('#cityErrorMsg');

  if (cityRegExp.test(inputCity.value)) {
    errorMsg.innerHTML = ""
    return true;
  }
  else {
    errorMsg.innerHTML = "This is not a City"
  }

};

//-------- Validating Email------------------
form.email.addEventListener('change', function () {
  validEmail(this);
});
var validEmail = function (inputEmail) {
  var emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
  var errorMsg = document.querySelector('#emailErrorMsg');

  if (emailRegExp.test(inputEmail.value)) {
    errorMsg.innerHTML = ""
    return true;
  }
  else {
    errorMsg.innerHTML = "This is not a valid Email"
  }

};



//******************************************************************************** */
//******************************************************************************** */


function postForm() {

  var btn_commander = document.getElementById("order");
  //add event listener on buy now
  btn_commander.addEventListener("click", (event) => {

  // retrieve client info
    var firstName = document.getElementById('firstName');
    var lastName = document.getElementById('lastName');
    var address = document.getElementById('address');
    var city = document.getElementById('city');
    var email = document.getElementById('email');


    if (!validfirstName(form.firstName) ||
      !validlastName(form.lastName) ||
      !validAddress(form.address) ||
      !validCity(form.city) ||
      !validEmail(form.email)) {
      return;
    }

    var idProducts = [];
    for (let i = 0; i < cartArray.length; i++) {
      idProducts.push(cartArray[i].id);
    }

    var order = {
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
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
      redirect: 'follow'
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.clear();
        localStorage.setItem("orderId", data.orderId);
        document.location.href = `confirmation.html?id=${data.orderId}`;
      })
      .catch((err) => {
        alert("Error with fetch : " + err.message);
      });
  })


}
postForm();



















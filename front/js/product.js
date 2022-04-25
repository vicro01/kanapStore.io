const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const name2 = urlParams.get('name');
// console.log(id, name2);
console.log(id, name2);  


fetch(`http://localhost:3000/api/products/${id}`)
  .then(response => {

    return response.json()
  })
  .then(data => {
    // console.log(data);
    initItem(data);
    //buildPage(data);
  })
  .catch(error => console.log(error));




// function buildPage(obj){
//   currItem.title = obj.title;
//   currItem.description = obj.description;
//   currItem.price = obj.price;
//   currItem.imageUrl = obj.imageUrl;
//   currItem.id = obj._id;
// }


function initItem(obj) {
  var description = document.getElementById('description');
  description.innerText = obj.description;

  var price = document.getElementById('price');
  price.innerText = obj.price;

  var title = document.getElementById('title');
  title.innerText = obj.name;

  var imgDiv = document.getElementById('item__img')
  var image = document.createElement("img");
  image.id = 'productImage';
  image.src = obj.imageUrl;
  image.alt = obj.altTxt;
  imgDiv.appendChild(image);


  var select = document.getElementById('colors');
  for (var i = 0; i < obj.colors.length; i++) {
    const newOption = document.createElement('option');
    const optionText = document.createTextNode(obj.colors[i]);
// set option text
    newOption.appendChild(optionText);
// and option value
    newOption.setAttribute('value', obj.colors[i]);
    select.appendChild(newOption);
  }
 }

//add to cart function

function addToCart(){ 
    
    console.log(cartArray, 'hello');
    var cartStr = localStorage.getItem('cart') ||'[]';
    var cartArray = JSON.parse(cartStr);
    var color = document.getElementById('colors').value;
    
    //if quantity is zero and color same  then don't add, display alert box

    if (!color){
      alert ("Please choose a color");
      return;
    }

    for(var i=0; i<cartArray.length; i+=1){
      if (cartArray[i].id === id && cartArray[i].color === color){
        cartArray[i].quantity +=1
        // alert ('Item Already in the Cart');
        localStorage.setItem("cart" , JSON.stringify(cartArray));
        alert('added to cart');
        return
      }

    }


      //if the cart is not changed add a new item if not do not add.

    var currItem = {
      title: document.getElementById('title').innerText,
      description: document.getElementById('description').innerText,
      price: document.getElementById('price').innerText,
      id: id,
      item__img:document.getElementById('productImage').src,
      quantity: parseInt(document.getElementById('quantity').value),    
      color: color
    };
    
      cartArray.push(currItem);
      
      

    
    
  localStorage.setItem("cart" , JSON.stringify(cartArray));
  alert('added to cart');
  // cartArray = JSON.parse(localStorage.getItem("cart"));  
  // cartChange = false;
  // document.getElementById('quantity').innerHTML=cartArray.length;

}








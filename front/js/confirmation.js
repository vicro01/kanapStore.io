function main(){
    const idNode = document.getElementById("orderId");
    idNode.innerText = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"))
    localStorage.clear();
}

main();





// // var form = document.getElementsByClassName('cart__order__form');

// const { options } = require("../../back/app");

// // fetch('http://localhost:3000/api/order', {
// //     method: "POST"
// // })
// //     .then(response => {
// //         console.log('dada', response)
// //     return response.json()
// // })
// //     .then(data=>{
// //         console.log(data);
// //     })
// // .catch(error => console.log(error));

// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// var raw = JSON.stringify({
//   "firstName": "kk",
//   "lastName": "41k421k",
//   "address": "14125415",
//   "city": "541521",
//   "email": "515k215",
//   "products": [
//     "107fb5b75607497b96722bda5b504926"
//   ]
// });

// var requestOptions = {
//   method: 'POST',
//   headers:  { 'Content-Type': 'application/json' },
//   body: raw,
//   redirect: 'follow'
// };

// fetch("http://localhost:3000/api/order", options)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

//   console.log("looog")





// 

// //Post to confirmation page
// function getForm() {
//   // Ajout des Regex
//   let form = document.querySelector(".cart__order__form");

//   //Création des expressions régulières
//   let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
//   let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
//   let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

//   // Ecoute de la modification du prénom
//   form.firstName.addEventListener('change', function() {
//       validFirstName(this);
//   });

//   // Ecoute de la modification du prénom
//   form.lastName.addEventListener('change', function() {
//       validLastName(this);
//   });

//   // Ecoute de la modification du prénom
//   form.address.addEventListener('change', function() {
//       validAddress(this);
//   });

//   // Ecoute de la modification du prénom
//   form.city.addEventListener('change', function() {
//       validCity(this);
//   });

//   // Ecoute de la modification du prénom
//   form.email.addEventListener('change', function() {
//       validEmail(this);
//   });

//   //validation du prénom
//   const validFirstName = function(inputFirstName) {
//       let firstNameErrorMsg = inputFirstName.nextElementSibling;

//       if (charRegExp.test(inputFirstName.value)) {
//           firstNameErrorMsg.innerHTML = '';
//       } else {
//           firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
//       }
//   };

//   //validation du nom
//   const validLastName = function(inputLastName) {
//       let lastNameErrorMsg = inputLastName.nextElementSibling;

//       if (charRegExp.test(inputLastName.value)) {
//           lastNameErrorMsg.innerHTML = '';
//       } else {
//           lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
//       }
//   };

//   //validation de l'adresse
//   const validAddress = function(inputAddress) {
//       let addressErrorMsg = inputAddress.nextElementSibling;

//       if (addressRegExp.test(inputAddress.value)) {
//           addressErrorMsg.innerHTML = '';
//       } else {
//           addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
//       }
//   };

//   //validation de la ville
//   const validCity = function(inputCity) {
//       let cityErrorMsg = inputCity.nextElementSibling;

//       if (charRegExp.test(inputCity.value)) {
//           cityErrorMsg.innerHTML = '';
//       } else {
//           cityErrorMsg.innerHTML = '';
//       }
//   };

//   //validation de l'email
//   const validEmail = function(inputEmail) {
//       let emailErrorMsg = inputEmail.nextElementSibling;

//       if (emailRegExp.test(inputEmail.value)) {
//           emailErrorMsg.innerHTML = '';
//       } else {
//           emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
//       }
//   };
//   }
// getForm();

// function postForm(){
//   const btn_commander = document.getElementById("order");

//   //Ecouter le panier
//   btn_commander.addEventListener("click", (e)=>{
  
//       //Récupération des coordonnées du formulaire client
//       let inputName = document.getElementById('firstName');
//       let inputLastName = document.getElementById('lastName');
//       let inputAdress = document.getElementById('address');
//       let inputCity = document.getElementById('city');
//       let inputMail = document.getElementById('email');

//       //Construction d'un array depuis le local storage
//       let idProducts = [];
//       for (let i = 0; i<cartArray.length;i++) {
//           idProducts.push(cartArray[i].idProduit);
//       }
//       console.log(idProducts);

//       const order = {
//           contact : {
//               firstName: inputName.value,
//               lastName: inputLastName.value,
//               address: inputAdress.value,
//               city: inputCity.value,
//               email: inputMail.value,
//           },
//           products: idProducts,
//       } 

// const options = {
//   method: 'POST',
//   body: JSON.stringify(order),
//   headers: {
//       'Accept': 'application/json', 
//       "Content-Type": "application/json" 
//   },
// };

// fetch("http://localhost:3000/api/products/order")
// .then((response) => response.json())
// .then((data) => {
//   console.log(data);
//   localStorage.clear();
//   localStorage.setItem("orderId", data.orderId);

//   document.location.href = "confirmation.html";
// })
// .catch((err) => {
//   alert ("Problème avec fetch : " + err.message);
// });
// })
// }
// postForm();



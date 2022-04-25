//Post to confirmation page
function getForm() {
  // Ajout des Regex
  var form = document.querySelector("cart__order__form");

  //Création des expressions régulières
  var emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
  var charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  var addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

  // Ecoute de la modification du prénom
  form.firstName.addEventListener('change', function() {
      validFirstName(this);
  });

  // Ecoute de la modification du prénom
  form.lastName.addEventListener('change', function() {
      validLastName(this);
  });

  // Ecoute de la modification du prénom
  form.address.addEventListener('change', function() {
      validAddress(this);
  });

  // Ecoute de la modification du prénom
  form.city.addEventListener('change', function() {
      validCity(this);
  });

  // Ecoute de la modification du prénom
  form.email.addEventListener('change', function() {
      validEmail(this);
  });

  //validation du prénom
  var validFirstName = function(inputFirstName) {
      let firstNameErrorMsg = inputFirstName.nextElementSibling;

      if (charRegExp.test(inputFirstName.value)) {
          firstNameErrorMsg.innerHTML = '';
      } else {
          firstNameErrorMsg.innerHTML = 'Your first name is not valid!';
      }
  };

  //validation du nom
  var validLastName = function(inputLastName) {
      let lastNameErrorMsg = inputLastName.nextElementSibling;

      if (charRegExp.test(inputLastName.value)) {
          lastNameErrorMsg.innerHTML = '';
      } else {
          lastNameErrorMsg.innerHTML = 'Your last name is not valid!';
      }
  };

  //validation de l'adresse
  var validAddress = function(inputAddress) {
      let addressErrorMsg = inputAddress.nextElementSibling;

      if (addressRegExp.test(inputAddress.value)) {
          addressErrorMsg.innerHTML = '';
      } else {
          addressErrorMsg.innerHTML = 'The address entered is not valid!';
      }
  };

  //validation de la ville
  var validCity = function(inputCity) {
      let cityErrorMsg = inputCity.nextElementSibling;

      if (charRegExp.test(inputCity.value)) {
          cityErrorMsg.innerHTML = '';
      } else {
          cityErrorMsg.innerHTML = 'This is not a city!';
      }
  };

  //validation de l'email
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

  //Ecouter le panier
  btn_commander.addEventListener("click", (event)=>{
  
      //Récupération des coordonnées du formulaire client
      let inputName = document.getElementById('firstName');
      let inputLastName = document.getElementById('lastName');
      let inputAdress = document.getElementById('address');
      let inputCity = document.getElementById('city');
      let inputMail = document.getElementById('email');

      //Construction d'un array depuis le local storage
      let idProducts = [];
      for (let i = 0; i<cartArray.length;i++) {
          idProducts.push(cartArray[i].id);
      }
      console.log(idProducts);

      const order = {
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


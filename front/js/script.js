fetch('http://localhost:3000/api/products')
  .then(response => {
  return  response.json();
   })
  .then(data => {
    console.log(data);
    displayData(data);
  })
  .catch(error => console.log(error));

  function displayData(data, obj, index){
    const dataArray = data;
  
    const container = document.getElementById('items');
    for(let i=0; i<dataArray.length; i++){
      var child = buildItem(dataArray[i], i);
      var br = document.createElement('BR'); 
      container.appendChild(child);
      container.appendChild(br);
    }
  }

    function buildItem(obj, index){
      var anchor = document.createElement('a');
      anchor.href = `../html/product.html?id=${obj._id}&name=${obj.name}`;
      var image = document.createElement("img");
      image.src = obj.imageUrl;
      image.width = "200";
      image.height = "150";
      anchor.appendChild(image);

      var name = document.createElement('p');
      name.innerHTML = obj.name;
      anchor.appendChild(name);

      var description = document.createElement('p');
      description.innerHTML = obj.description;
      anchor.appendChild(description);


      var priceContainer = document.createElement('p');
      var priceText = document.createTextNode('Price:');
      var price = document.createTextNode(`$${obj.price}`);
      priceContainer.appendChild(priceText);
      priceContainer.appendChild( document.createTextNode( '\u00A0' ) );
      priceContainer.appendChild(price);
      anchor.appendChild(priceContainer);
      
          
      return anchor;

      }

    
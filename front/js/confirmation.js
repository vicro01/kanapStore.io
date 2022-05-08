function main() {
    const idNode = document.getElementById("orderId");
    idNode.innerText = localStorage.getItem("orderId");

    //should be in the url
    console.log(localStorage.getItem("orderId"))
    localStorage.clear();
}

main();


// get cards list from localStorage
let favoriteList= localStorage.getItem('favoriteProducts');

if(localStorage.getItem("favoriteProducts") == null) {
    favoriteList = [] ;//create cards List
    console.log('not found');
}
else {
    favoriteList = JSON.parse(localStorage.getItem("favoriteProducts")) ;//parsed to array
    favorite();
    console.log('found');
}



// display all card products
async function favorite() {
    let totalPriceCalc= 0;
    let totalPrice;
    let cardCartona= ``;
    
    for (let i = 0; i < favoriteList.length; i++) {   
        cardCartona += `<div class="col-md-4 col-lg-3 mb-3">        
            <div class="product-data">
                <img class="img-fluid rounded product-img" src=${favoriteList[i].thumbnail}>
                <div class="product-info product-overlay rounded">
                    <h4>${favoriteList[i].title}</h4>
                    <p>${favoriteList[i].description.split(' ').slice(0,10).join(' ')}</p>
                    <span>Price: ${favoriteList[i].price}</span>
                    <div class="delete-card" onclick="deleteard(${i});">
                        <i class="fa-solid fa-trash-can"></i>
                    </div>
                </div>
            </div>
        </div>`
        totalPriceCalc += favoriteList[i].price;
    }
    totalPrice= document.querySelector('.card-total-price strong');
    totalPrice.innerHTML= `$${totalPriceCalc.toFixed(2)}`;
    document.querySelector('.products .row').innerHTML= cardCartona; 
}

// delete card
function deleteard(index) {
    favoriteList.splice(index, 1);
    localStorage.setItem('favoriteProducts', JSON.stringify(favoriteList));
    favorite();
}
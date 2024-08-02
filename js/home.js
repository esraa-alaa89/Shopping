let productList=[];
let favoriteList=[];


{/* <h4>user-name: ${userName}</h4>
<h4>email: ${emailInput.value}</h4> */}
$('nav button.user-btn').click(function (e) {
    $('.products h3').html('My Account')
    $('.products .row').html(`<div class="user-info">
        <button>Logout!</button>
    </div>`);
    
});


// display all products
async function getDataApi() { 
    let productsUrl= await fetch(`https://dummyjson.com/products`);
    let {products}= await productsUrl.json();
    productList= products;
    console.log(productList);

    $('.products h3').html(`Our Products`);
    let mainCartona=``;
    for (let i = 0; i < productList.length; i++) {
        mainCartona +=`<div class="col-md-4 col-lg-3 mb-3">
            <div class="product-data">
                <div class="product-img">
                    <img class="img-fluid rounded product-img" src=${productList[i].thumbnail}>
                    <div class="product-overlay" onclick="productDetails(${i})">Quick view</div>
                </div>
                <div class="product-info rounded">
                    <h4>${productList[i].title}</h4>
                    <p>${productList[i].description.split(' ').slice(0,10).join(' ')}</p>
                    <span>${productList[i].price}$</span>
                    <button class="addToCard-btn" onclick="favorite(${productList[i].id}, this)">Add to card <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>`}
        document.querySelector('.products .row').innerHTML= mainCartona;
}
getDataApi();


// check saving favorite Products
if(localStorage.getItem("favoriteProducts") == null) favoriteList = [] ;//create cards List
else favoriteList = JSON.parse(localStorage.getItem("favoriteProducts")) ;//parsed to array

// fetch each card product and set it into localStorage
async function favorite(productId, cardBtn) {
    // cardBtn.target.value= 'added successfully';
    // cardBtn.innerHtml= 'Added successfully';
    cardBtn.value= 'added successfully';
    console.log('hi');
    console.log(cardBtn);

    let favProductsUrl= await fetch(`https://dummyjson.com/products/${productId}`);
    let favProductObject= await favProductsUrl.json();
    favoriteList.push(favProductObject);

    console.log(`favoriteList is`);
    console.log(favoriteList);

    localStorage.setItem('favoriteProducts', JSON.stringify(favoriteList));
}

// display product info
function productDetails(index) {
    console.log(index);

    $('.products h3').html('');
    $('.products .row').addClass('product-details');
    $('.products .row').html(`<div class="col-lg-4 mb-3">
            <div class="product-img w-100 h-100">
                <img class="img-fluid rounded product-img" src=${productList[index].thumbnail}>
            </div>
        </div>
        <div class="col-lg-8 mb-3">
            <div class="product-data">
                <div class="product-info rounded">
                    <h4>${productList[index].title}</h4>
                    <div class="product-price">
                        <span class="pe-2">$${productList[index].price}</span>
                        <del>$${productList[index].discountPercentage}</del>
                    </div>
                    <h5>Check delivery, payment options and charges at your location</h5>
                    <div class="product-inputs">
                        <input class="form-control" tytpe="email" placeholder="enter your email...." name="" id="email-input" />
                        <input type="button" value="Check" name="check-input" id="check-input">
                    </div>
                    <h5 class="quantity">Quantity: ${productList[index].stock} in stock</h5>
                    <p>${productList[index].description}</p>
                    <button class="addToCard-btn w-25" onclick="favorite(${productList[index].id}, this)">Add to card <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
    </div>`);

    $('.products .row').after(`<div class="more-productDetails">
        <div class="row">
            <div class="col-md-6">
                <h5>Description</h5>
                <p>${productList[index].description}</p>
            </div>
            <div class="col-md-6">
                <h5>Reviews</h5>
               <ul>
                    <li>- ${productList[index].reviews[0].reviewerName}</li>
                    <li>- ${productList[index].reviews[0].reviewerEmail}</li>
                    <li>- ${productList[index].reviews[0].comment}</li>
                </ul>
            </div>
        </div> 
    </div>`)
}


// specify each nav-link is clicked and display its section
let navLink;
$('nav a.nav-link').click(function (e) { 
    console.log(e.target);
    
    navLink= $(e.target).attr('href');
    console.log(navLink);

    if (navLink == '#') {
        getDataApi();
    }
    if (navLink == '#dropDown') {
        $('nav ul li a.dropdown-item').click(function (e) {
            navLink= $(e.target).attr('href');
            console.log(navLink);
            displayCategoryProducts(navLink);
        })
    }
    if (navLink == '#services') {
        console.log(navLink);
        displayServices();
    }
    if (navLink == '#contact') {
        displayContact();
    }
});



// display dropdown section
async function displayCategoryProducts(categoryName) { 
    console.log('categoryName is');
    console.log(categoryName);
    categoryName= categoryName.slice(1);
    console.log(categoryName);
    let productsUrl= await fetch(`https://dummyjson.com/products/category/${categoryName}`);
    let {products}= await productsUrl.json();
    productList= products;
    console.log(productList);

    $('.products h3').html(`${categoryName}`);
    let categoryCartona=``;
    for (let i = 0; i < productList.length; i++) {
        categoryCartona += `<div class="col-md-4 col-lg-3 mb-3">
            <div class="product-data">
                <div class="product-img">
                    <img class="img-fluid rounded product-img" src=${productList[i].thumbnail}>
                    <div class="product-overlay" onclick="productDetails(${i})">Quick view</div>
                </div>
                <div class="product-info rounded">
                    <h4>${productList[i].title}</h4>
                    <p>${productList[i].description.split(' ').slice(0,10).join(' ')}</p>
                    <span>${productList[i].price}$</span>
                    <button class="addToCard-btn" onclick="favorite(${productList[i].id}, this)">Add to card <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>`
    }

    document.querySelector('.products .row').innerHTML= categoryCartona;
}

// display services section
function displayServices(){
    let servicesData=``;

    $('.products h3').html(`Our Services`);
    servicesData +=`<div class="col-md-6 col-lg-4 mb-5">
            <div class="services-item bg-light p-4 d-flex">
              <div class="services-icon d-flex justify-content-start align-items-start pe-4 fs-2">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
              </div>
              <div class="services-text">
                <h4>Lighting Design</h4>
                <p>
                  Achieve the perfect balance of ambient, task, and accent lighting for a functional atmosphere
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-4 mb-5">
            <div class="services-item bg-light p-4 d-flex">
              <div class="services-icon d-flex justify-content-start align-items-start pe-4 fs-2">
                <i class="fa-solid fa-couch"></i>
              </div>
              <div class="services-text">
                <h4>Interior Design</h4>
                <p>
                  From concept to completion, we oversee every detail to bring your vision to life efficiently
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-4 mb-5 m-auto">
            <div class="services-item bg-light p-4 d-flex">
              <div class="services-icon d-flex justify-content-start align-items-start pe-4 fs-2">
                <i class="fa-brands fa-pagelines"></i>
              </div>
              <div class="services-text">
                <h4>Outdoor Design</h4>
                <p>
                  Celebrate the changing seasons with our seasonal outdoor decor services that serves you in your design
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>`

    document.querySelector('.products .row').innerHTML= servicesData;
}

// display contact section
function displayContact() {
    let contactData=``;

    $('.products h3').html(`Contact`);
    contactData +=`<div class="left-contact col-md-12 col-lg-6">
        <h4 class="title-left-contact fs-2 mb-5">
            Send Message Us<div class="underline-left-contact">
        </h4>
        <form>
            <div class="row mb-3">
                <div class="col-sm-10 col-md-12">
                    <input type="text" class="form-control" id="inputName3" placeholder="Your Name">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-10 col-md-12">
                    <input type="email" class="form-control" id="inputEmail3" placeholder="Your Email">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-10 col-md-12">
                    <input type="text" class="form-control" id="inputSubject3" placeholder="Your Subjest">
                </div>
            </div>
            <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
                <label for="floatingTextarea2">Message</label>
            </div>
            <div class="text-center">
                <button type="submit" class="btn">Send Message</button>
            </div>
        </form>
    </div>
    <div class="right-contact col-md-12 col-lg-6">
        <h4 class="title-right-contact fs-2 mb-5">
            Get In Touch<div class="underline-right-contact">
        </h4>
        <p class="lead">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolorum dolorem soluta quidem expedita aperiam aliquid at. Totam magni ipsum suscipit amet? Autem nemo esse laboriosam ratione nobis mollitia inventore
        </p>
        <ul class="">
            <li>
                <i class="fa-brands fa-usps"></i>329 WASHINGTON ST BOSTON, MA 02108
            </li>
            <li>
                <i class="fa-regular fa-clipboard"></i>(617) 557-0089
            </li>
            <li>
                <i class="fa-regular fa-envelope"></i>contact@example.com
            </li>
        </ul>

        <ul class="contact-icons">
            <li class="d-inline-block li-icon-contact">
                <span class="icon-circle-contact">
                    <i class="fa-brands fa-facebook"></i>
                </span>
            </li>
            <li class="d-inline-block li-icon-contact">
                <span class="icon-circle-contact">
                    <i class="fa-brands fa-instagram"></i>
                </span>
            </li>
            <li class="d-inline-block li-icon-contact">
                <span class="icon-circle-contact">
                    <i class="fa-brands fa-twitter"></i>
                </span>
            </li>
            <li class="d-inline-block li-icon-contact">
                <span class="icon-circle-contact">
                    <i class="fa-brands fa-linkedin"></i>
                </span>
            </li>
        </ul>
    </div>`

    document.querySelector('.products .row').innerHTML= contactData;
}
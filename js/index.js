var nameInput = document.querySelector("#nameInput") ;
var emailInput = document.querySelector("#emailInput") ;
var passwordInput = document.querySelector("#passwordInput") ;
var loginBtn = document.getElementById("loginBtn") ;
var signUpBtn = document.getElementById("signUpBtn") ;
var paraghraph = document.querySelector(".incorrectMassege") ;
var signUpLink = document.getElementById("signUpLink") ;
var signInLink = document.getElementById("signInLink") ;
var userName = document.querySelector("h1 #userName") ;
var cartona = [] ;


//============================LOCAL STORAGE========================

if(localStorage.getItem("userData") == null)
{
    cartona = [] ;
}
else
{
    cartona = JSON.parse(localStorage.getItem("userData")) ;
}

//============================START VALIDATION========================

//============================NAME VALIDATION========================
function validNameInput()
{
    var regexName = /^[a-zA-Z]{3,}(\s[a-zA-Z])?/
    if(regexName.test(nameInput.value) == true)
    {
        return true ;
    }
    else
    {
        return false ;
    }
    
}
//============================EMAIL VALIDATION========================
function validEmailInput()
{
    var regexEmail = /^[a-z0-9](\.?[a-z0-9]){4,}@((g(oogle)?mail)|yahoo)\.com$/
    if(regexEmail.test(emailInput.value) == true)
    {
        return true ;
    }
    else if(regexEmail.test(emailInput.value) == false)
    {
        return false ;
    }
    
}


//============================LOGIN BUTTON========================

loginBtn.addEventListener("click" , function(){
    checkEmailValidation() ;
    clearFix() ;
});

function checkEmailValidation()
{
    if(emailInput.value == "" && passwordInput.value == "")
    {
        paraghraph.innerHTML = "All inputs is required" ;
        paraghraph.style.cssText = "color : red ; font-size : 18px ;" ;
    }
    if(validEmailInput() == true)
    {
        if(checkEmailExisted() == true)
        {
            location.replace("home.html") ;
            userName.innerHTML = `welcome + ${cartona[i].nameInput}` ;
            console.log(cartona[i].nameInput) ;
        }
    }
    if(validEmailInput() == false || emailInput.value!="" || passwordInput.value != "")
    {
        paraghraph.innerHTML = "Incorrect Email or Password" ;
        paraghraph.style.cssText = "color : red ; font-size : 18px ;" ;
    }
}

//============================SIGN_UP LINK========================
signUpLink.addEventListener("click" , function(){
    signInLink.classList.replace("d-none" , "d-inline") ;
    nameInput.classList.remove("d-none") ;
    signUpBtn.classList.remove("d-none") ;
    loginBtn.classList.add("d-none") ;
    signUpLink.classList.add("d-none") ;
    clearFix() ;
})

//============================SIGN_IN LINK========================
signInLink.addEventListener("click" , function(){
    nameInput.classList.add("d-none") ;
    signUpBtn.classList.add("d-none") ;
    loginBtn.classList.remove("d-none") ;
    signUpLink.classList.remove("d-none") ;
    signInLink.classList.add("d-none") ;
    clearFix() ;
});

//============================SIGN_UP BUTTON========================
signUpBtn.addEventListener("click" , function(){
    checkNameValidation () ;
})

function checkNameValidation()
{
    if(nameInput.value == "" || emailInput.value == "" || passwordInput.value == "")
    {
        paraghraph.innerHTML = "All inputs is required" ;
        paraghraph.style.cssText = "color : red ; font-size : 18px ;" ;
    }
    if(validNameInput() == true && validEmailInput() == true)
    {
        checkEmailExisted() ;
    }
    // validation is incorrect
    if(validNameInput() == false && validEmailInput() == false && nameInput.value != "" && emailInput.value!="" && passwordInput.value != "")
    {
        paraghraph.innerHTML = "Incorrect Email or Password" ;
        paraghraph.style.cssText = "color : red ; font-size : 18px ;" ;
    }
}

//============================CLEAR ALL DATA========================
function clearFix()
{
    nameInput.value = "" ;
    emailInput.value = "" ;
    passwordInput.value = "" ;
}

//============================CHECK EMAIL EXISTANCE========================
function isEmailExist()
{
    for(var i=0; i<cartona.length; i++)
    {
        if(cartona[i].emailInput.toLowerCase() == emailInput.value.toLowerCase())
        {
            return false ; //email is already existed before
        }
    }
    
}

//============================STORE USER_DATA AFTER CHECK EMAIL EXISTANCE========================
function checkEmailExisted()
{
    var object = 
    { 
        nameInput : nameInput.value , 
        emailInput : emailInput.value , 
        passwordInput : passwordInput.value 
    }
    if (cartona.length == 0) 
    {
        cartona.push(object)
        localStorage.setItem('userData', JSON.stringify(cartona))
        paraghraph.innerHTML = "success" ;
        paraghraph.style.cssText = "color : green ; font-size : 18px ;" ;
        return true
    }
    if (isEmailExist() == false) 
    {
        paraghraph.innerHTML = "This email is already existed" ;
        paraghraph.style.cssText = "color : red ; font-size : 18px ;" ;
        return true ;
    } 
    else 
    {
        cartona.push(object)
        localStorage.setItem('userData', JSON.stringify(cartona))
        paraghraph.innerHTML = "success" ;
        paraghraph.style.cssText = "color : green ; font-size : 18px ;" ;
    }

}



//  <button id="addBtn" class="btn btn-danger my-3">Add Circle</button>
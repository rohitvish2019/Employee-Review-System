console.log("Script");

document.addEventListener('click', function(event){
    if(event.target.id == 'login'){
        openLoginForm();
    };

    if(event.target.id == 'sign-up'){
        openSignupForm();
    };
});

function openLoginForm(){
    document.getElementById('login-form-container').style.display= 'flex'
    document.getElementById('signup-form-container').style.display = 'none'
}

function openSignupForm(){
    document.getElementById('login-form-container').style.display= 'none'
    document.getElementById('signup-form-container').style.display = 'flex'
}


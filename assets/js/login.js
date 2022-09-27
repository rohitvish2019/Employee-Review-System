console.log("Script");
let thisEmail;
document.addEventListener('click', function(event){
    if(event.target.id == 'login'){
        openLoginForm();
    };

    if(event.target.id == 'sign-up'){
        openSignupForm();
    };

    if(event.target.id == 'get-otp'){
        $.ajax({
            type:'post',
            url : '/email-verify',
            data :{
                email : document.getElementById('email').value
            },
            success:function(data){
                new Noty({
                    theme: 'relax',
                    text: data.message,
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                }).show();
                document.getElementById('verify-button').style.display='inline-block'
                document.getElementById('otp').style.display = 'inline-block'
                document.getElementById('email').style.display='none'
                document.getElementById('get-otp').style.display='none';
            },
            error: function(err){
                new Noty({
                    theme: 'relax',
                    text: err.responseJSON.message,
                    type: 'error',
                    layout: 'topRight',
                    timeout: 1500
                }).show(); 
                console.log(err);
            }
        })
    }

    if(event.target.id == 'verify-button'){
        $.ajax({
            type:'Post',
            url: '/verify',
            data:{
                email : document.getElementById('email').value,
                otp : document.getElementById('otp').value
            },
            success: function(data){
                new Noty({
                    theme: 'relax',
                    text: data.message,
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                }).show();
                console.log(data);
                document.getElementById('signup-form').style.display = 'inline-block'
                document.getElementById('unverified').style.display ='none'
                document.getElementById('userid').setAttribute('value',data.id);
            },
            error: function(err){
                new Noty({
                    theme: 'relax',
                    text: err.responseText,
                    type: 'error',
                    layout: 'topRight',
                    timeout: 1500
                }).show();
                console.log(err.responseText);
            }
        });
    }

});

function openLoginForm(){
    document.getElementById('login-form-container').style.display= 'flex'
    document.getElementById('signup-form-container').style.display = 'none'
    document.getElementById('login').style.backgroundColor='#208F45'
    document.getElementById('sign-up').style.backgroundColor='transparent'
}

function openSignupForm(){
    document.getElementById('login-form-container').style.display= 'none'
    document.getElementById('signup-form-container').style.display = 'flex'
    document.getElementById('login').style.backgroundColor='transparent'
    document.getElementById('sign-up').style.backgroundColor='#208F45'
}

function initApp(){
    document.getElementById('signup-form').style.display='none'
    document.getElementById('verify-button').style.display='none'
    document.getElementById('otp').style.display = 'none'
}

initApp();


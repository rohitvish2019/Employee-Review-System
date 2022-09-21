module.exports.login = function(req, res){
    res.render('login');
}


module.exports.createSession = function(req, res){
    if(req.user){
        console.log("yes");
    }else{
        console.log("No");
    }
    res.render('home');
}
function login(){
    var username = document.getElementsByName("email");
    var pass = document.getElementsByName("password");

    var obj = {
        email: username,
        password: pass
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST","/signin",true);

    xhr.onload = function(){
        console.log(xhr.responseText);
        var response = JSON.parse(xhr.responseText);
        if(response == 1){
            //console.log("Successfull Login");
        }
        else{
            alert("Username or Password Incorrect");
        }
    };
    xhr.send(obj);
}
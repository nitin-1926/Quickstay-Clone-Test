function login(){
    var username = document.getElementById("email");
    var pass = document.getElementById("pass");

    var obj = {
        email: username.value,
        password: pass.value
    }
    var data = JSON.stringify(obj);

    var xhr = new XMLHttpRequest();
    xhr.open('POST','/signin');
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.onload = function(){
        console.log(xhr.responseText);
        var response = JSON.parse(xhr.responseText);
        if(response == 1){
            window.location = "./upload.html"
        }
        else{
            alert("Username or Password Incorrect");
        }
    };
    xhr.send(data);
}
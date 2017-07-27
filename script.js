

$(document).ready(function(){

//    loadPosts();
//    loadAlbums();
//
//
//    $(".feed").scroll(function() {
//        var div = $(this);
//        var scroll = 0;
//
///*                    setTimeout(function() {
//            scroll = div.scrollTop();
//        }, 200);
//        console.log(scroll);*/
//
//        if (Math.round($(this).scrollTop()) == $(".feed")[0].scrollHeight - 600) { //scrollTop is 0 based
//            console.log("Load more!");
//
//            loadPosts();
//        }
//    });

//    $(document).on('click', '.post-username', function(){
//        window.location.href = "profile.html";
//    });
//
//    $(document).on('click', '#username', function(){
//        window.location.href = "profile.html";
//    });
//
//    $(document).on('click', '#uPost', function(){
//        document.getElementById("feed").style.display = "inline-block";
//        document.getElementsByClassName("album-previews")[0].style.display = "none";
//    });
//
//    $(document).on('click', '#uPhotos', function(){
//        document.getElementById("feed").style.display = "none";
//        document.getElementsByClassName("album-previews")[0].style.display = "inline-block";
//    });


    $(document).on('click', '#clickedNavBarLinks', function(event){
        event.stopPropagation();
    });

    $(document).on('click', '#login', function(event){
        event.stopPropagation();
        var x = document.getElementById('clickedNavBarLinks');
        x.style.display = 'block';

        x.innerHTML = "<div id = \"username-input\">" +
                      "<input type = \"text\"  placeholder=\"Username\">" +
                      "</div>" +
                      "<div id = \"password-input\">" +
                      "<input type = \"password\" placeholder=\"Password\">" +
                      "</div>" +
                      "<button class=\"input-box\" id = \"loginButton\">Log In</button>";
    });

    $("#signup").click(function(event){
        event.stopPropagation();
        var x = document.getElementById('clickedNavBarLinks');
        x.style.display = 'block';

        x.innerHTML = "<div id = \"username-input\">" +
                                  "<input type = \"text\"  placeholder=\"Username\">" +
                                  "</div>" +
                                  "<div id = \"password-input\">" +
                                  "<input type = \"password\" placeholder=\"Password\">" +
                                  "</div>" +
                                  "<div id = \"name-input\">" +
                                  "<input type = \"text\" placeholder=\"Name\">" +
                                  "</div>" +
                                  "<button class = \"input-box\" id = \"signUpButton\">Sign Up</button>";
    });

    $("#signUpButton").click(function(){
        var x = document.getElementById('clickedNavBarLinks');
        var username = document.getElementById('username-input').value;
        var password = document.getElementById('password-input').value;
        var name = document.getElementById('name-input').value;

        console.log("ASA");
        console.log(name + ": " + username + " " + password + " ");
        if(username.length != 0 && password.length != 0 && name.length != 0){
            // Update database
            console.log(name + ": " + username + " " + password + " ");
            x.style.display = 'none';
        }
    });

    $("#loginButton").click(function(){
        var x = document.getElementById('clickedNavBarLinks');
        var username = document.getElementById('username-input').value;
        var password = document.getElementById('password-input').value;

        if(username.length != 0 && password.length != 0){
            // Update (Check from the database)
            console.log(username + " " + password + " ");
            x.style.display = 'none';

            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            window.location.href = "profile.html";
        }
    });

    $(window).click(function(){
        var x = document.getElementById('clickedNavBarLinks');
        x.style.display = 'none';
    });


});


    var loaded = 0;
    var loadA = 0;
    var root = 'http://jsonplaceholder.typicode.com';
    var max = function () {
        var tmp = null;
        $.ajax({
            'async': false,
            url: root + '/photos/',
            method: 'GET',
            success: (function(data) {
                tmp = data.length;
            }),
        });
        return tmp;
    }();

    function loadPhotos(){

        var stringDiv = document.createElement("div");

        //add classes
        $(stringDiv).addClass("string");

        for(i = 1; i <= 5 && max && i < max; i++){
            (function(i, loadA, stringDiv) {
                $.ajax({
                    url: root + '/photos/',
                    method: 'GET',
                    error: function()
                    {
                        //file does not exists
                        console.log("File does not exist");
                    },
                    success: function(data)
                    {
                        generateAlbumInfo(data[max - loadA - i], stringDiv);
                    }
                });
            })(i, loadA, stringDiv);
        }
        loadA += 5;
        return stringDiv;
    }

    function generateAlbumInfo(data, stringDiv) {
        (function(data, stringDiv) {
            $.ajax({
                url: root + '/albums/' + data.albumId,
                method: 'GET',
                error: function()
                {
                    //file does not exists
                    console.log("File does not exist");
                },
                success: function(album)
                {
                    generateUserInfo(data, album, stringDiv);
                }
            });
        })(data, stringDiv);
    }

    function generateUserInfo(data, album, stringDiv) {
        (function(data, album, stringDiv) {
            $.ajax({
                url: root + '/users/' + album.userId,
                method: 'GET',
                error: function()
                {
                    //file does not exists
                    console.log("File does not exist");
                },
                success: function(user)
                {
                    postPhoto(data, album, user, stringDiv);
                }
            });
        })(data, album, stringDiv);
    }

    function postPhoto(data, album, user, stringDiv){
        //create elements
        var pin          = document.createElement("div");
        var groove       = document.createElement("div");
        var metal        = document.createElement("div");
        var polaroid     = document.createElement("div");
        var thumbnail    = document.createElement("div");

        var modal = document.createElement("div");
        var close = document.createElement("span");
        var photo = document.createElement("div");
        var caption = document.createElement("div");

        //add classes
        $(pin).addClass("pin");
        $(groove).addClass("groove");
        $(metal).addClass("metal");
        $(polaroid).addClass("polaroid");
        $(thumbnail).addClass("thumbnail");

        $(modal).addClass("modal");
        $(close).addClass("close");
        $(photo).addClass("photo");
        $(caption).addClass("caption");

        $(close).text("x");
        $(caption).append("Title: " + data.title +
                        "<br>Album: " + '<a id="album" albumId="' +
                        album.id + '" userId = "' + user.username +
                       '">' + album.title + '</a>' +
                       "<br>By: " + '<a id = "username" userId = "' +
                        user.id + '">' + user.username + '</a>');
        //assemble
        $(photo).prepend('<img id="theImg" src="' + data.url + '.png" />');
        $(modal).append(close);
        $(modal).append(photo);
        $(modal).append(caption);

        $(thumbnail).prepend('<img id="theImg" src="' + data.thumbnailUrl + '.png" />');
        $(pin).append(groove);
        $(groove).append(metal);
        $(polaroid).append(thumbnail);

        $(stringDiv).append(modal);
        $(stringDiv).append(pin);
        $(stringDiv).append(polaroid);

        $(polaroid).click(function(){
            modal.style.display = "flex";
        });

        $(close).click(function(){
            modal.style.display = "none";
        });
    }

$(document).ready(function(){

    for(i = 0; i < 3; i++){     // 3 strings * 5 photos each
        var stringDiv = loadPhotos();
        $(".feed").append(stringDiv);
    }

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

    $(document).on('click', '#signUpButton', function(event){
        var x = document.getElementById('clickedNavBarLinks');
        var username = document.getElementById('username-input').value;
        var password = document.getElementById('password-input').value;
        var name = document.getElementById('name-input').value;

        if(username !== null && password !== null && name !== null){
            // Update database
            console.log(name + ": " + username + " " + password + " ");
            x.style.display = 'none';
        }
    });


    $(document).on('click', '#loginButton', function(event){
        var x = document.getElementById('clickedNavBarLinks');
        var username = document.getElementById('username-input').value;
        var password = document.getElementById('password-input').value;

        if(username !== null && password !== null){
            // Update (Check from the database)
            console.log(username + " " + password + " ");
            x.style.display = 'none';

            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            window.location.href = "profile.html";
        }
    });

    $("#login").click(function(event){
        event.stopPropagation();
        var x = document.getElementById('clickedNavBarLinks');
        x.style.display = 'block';

        x.innerHTML = "<div>" +
                      "<input id = \"username-input\" type = \"text\"  placeholder=\"Username\">" +
                      "</div>" +
                      "<div>" +
                      "<input id = \"password-input\" type = \"password\" placeholder=\"Password\">" +
                      "</div>" +
                      "<button class=\"input-box\" id = \"loginButton\">Log In</button>";
    });

    $("#signup").click(function(event){
        event.stopPropagation();
        var x = document.getElementById('clickedNavBarLinks');
        x.style.display = 'block';

        x.innerHTML = "<div>" +
                                  "<input id = \"username-input\" type = \"text\"  placeholder=\"Username\">" +
                                  "</div>" +
                                  "<div>" +
                                  "<input id = \"password-input\" type = \"password\" placeholder=\"Password\">" +
                                  "</div>" +
                                  "<div>" +
                                  "<input id = \"name-input\" type = \"text\" placeholder=\"Name\">" +
                                  "</div>" +
                                  "<button class = \"input-box\" id = \"signUpButton\">Sign Up</button>";
    });


    $(window).click(function(){
        var x = document.getElementById('clickedNavBarLinks');
        x.style.display = 'none';
    });


     $(window).scroll(function() {
        var div = $(this);
        var scroll = 0;
        setTimeout(function() {
            scroll = div.scrollTop();
        }, 200);
        if (Math.round($(this).scrollTop()) == $(".feed")[0].scrollHeight - window.innerHeight &&
            document.getElementsByClassName("close")[0].style.display == "none") { //scrollTop is 0 based
            console.log("Load more!");
            for(i = 0; i < 3; i++){     // 3 strings * 5 photos each
                var stringDiv = loadPhotos();
                $(".feed").append(stringDiv);
            }
        }
    });
});

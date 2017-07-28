
    var loaded = 0;
    var loadA = 0;
    var root = 'https://jsonplaceholder.typicode.com';
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

        var url = "";
        if(document.URL.indexOf("#") == 0)
            url = root + '/photos/';
        else url = root + '/photos/'; // update db (user's pictures) document.URL ("#")
        for(i = 1; i <= 5 && max && i < max; i++){
            (function(i, loadA, stringDiv, url) {
                $.ajax({
                    url: url,
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
            })(i, loadA, stringDiv, url);
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
        
        var navbar = document.getElementById('navbar');

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
                        user.id + '" username = "' + user.username  +
                        '"">' + user.username + '</a>');
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
        
        polaroid.addEventListener('click', function() {
            document.body.classList.toggle('noscroll');
        })

        $(close).click(function(){
            modal.style.display = "none";
            document.body.classList.toggle('noscroll');
        });
    }

    function changeNavBar() {
        var navBar = document.getElementById('navbar');
            navBar.innerHTML = "<div id = \"navbar\">" +
                          "<a href = \"index.html\" id = \"title\"> twine </a>" +
                          "<div class=\"links\" id = \"navBarLinks\">" +
                          "<a class = \"acc\" id = \"profile\">Profile</a>" +       //Profile or username na niya? update db
                          "|" +
                          "<a class = \"acc\" id = \"upload\">Upload</a>" +
                          "|" +
                          "<a class = \"acc\" id = \"logout\">Log Out</a>" +
                          "<div id = \"clickedNavBarLinks\">" +
                          "</div>" +
                          "</div>" +
                          "</div>";
    }

    function getCookie(toCheck) {
        var name = toCheck + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    $(document).ready(function(){
        var d = new Date();
        var nDaysExpiry = 21;   // 3 weeks
        d.setTime(d.getTime() + (nDaysExpiry*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        var loggedInUser     =  getCookie("loggedInUser").substring(getCookie("loggedInUser").indexOf("="), getCookie("loggedInUser").length);
        var rememberedUser =  getCookie("username").substring(getCookie("username").indexOf("="), getCookie("username").length)

        if( loggedInUser == rememberedUser && loggedInUser != ""){
//            alert("Updating cookies");
//            alert(loggedInUser);
            document.cookie = "username" + "=" + rememberedUser + ";" + expires + ";path=/";
            document.cookie = "loggedInUser" + "=" + rememberedUser + ";" + expires + ";path=/";
        }/*else alert("NOT FOUND")*/;


        for(var i = 0; i < 3; i++){     // 3 strings * 5 photos each
            var stringDiv = loadPhotos();
            $(".feed").append(stringDiv);
        }

        if(getCookie("loggedInUser") != "")
            changeNavBar();

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

            if(username !== null && password !== null && name !== null && username !== "" && password !== "" && name !== ""){
                // Update database
//                console.log(name + ": " + username + " " + password + " ");
                x.style.display = 'none';
            }
            else{
                x.innerHTML = 
                    "<div class = \"errorlogin\">" +
                        "Please fill in all fields" +
                    "</div>" +
                    "<div>" +
                        "<input id = \"username-input\" type = \"text\"  placeholder=\"Username\">" +
                    "</div>" +
                    "<div>" +
                        "<input id = \"password-input\" type = \"password\" placeholder=\"Password\">" +
                    "</div>" +
                    "<div>" +
                        "<input id = \"name-input\" type = \"text\" placeholder=\"Name\">" +
                    "</div>" +
                    "<button class = \"input-box\" id = \"signUpButton\">Sign Up</button>";
                    
            }
        });


        $(document).on('click', '#loginButton', function(event){
            var x = document.getElementById('clickedNavBarLinks');
            var username = document.getElementById('username-input').value;
            var password = document.getElementById('password-input').value;

            if(username !== null && password !== null && username != "" && password != ""){
                // Update (Check from the database)
                console.log(username + " " + password + " ");
                x.style.display = 'none';

                var d = new Date();
                var nDaysExpiry = 21;   // 3 weeks
                d.setTime(d.getTime() + (nDaysExpiry*24*60*60*1000));
                var expires = "expires="+ d.toUTCString();

                if(document.getElementById("rememberme").checked)
                    document.cookie = "username" + "=" + username + ";" + expires + ";path=/";
                document.cookie     = "loggedInUser" + "=" + username + ";path=/";

                window.location.href = "profile.html";
            }
            else{
                x.innerHTML = 
                    "<div class = \"errorlogin\">" +
                        "Invalid username / password" +
                    "</div>" +
                    "<div>" +
                        "<input id = \"username-input\" type = \"text\"  placeholder=\"Username\">" +
                    "</div>" +
                    "<div>" +
                        "<input id = \"password-input\" type = \"password\" placeholder=\"Password\">" +
                    "</div>" +
                    "<div class = \"checkbox\">" +
                        "<input id=\"rememberme\" type=\"checkbox\">" +
                        "<label for=\"rememberme\">Remember Me</label>" +
                    "</div>" +
                    "<button class=\"input-box\" id = \"loginButton\">Log In</button>";
                    
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
            "<div class = \"checkbox\">" +
                "<input id=\"rememberme\" type=\"checkbox\">" +
                "<label for=\"rememberme\">Remember Me</label>" +
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

        $("#logout").click(function(event){
            alert("expiring cookies");
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "loggedInUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            window.location.href = "index.html";
        });

        $("#upload").click(function(event){
            event.stopPropagation();
            var x = document.getElementById('clickedNavBarLinks');
            x.style.display = 'block';

            x.innerHTML = " <form action=\"\" method=\"post\" enctype=\"multipart/form-data\"" +
                                " name=\"uploadForm\" id=\"uploadForm\"><div class = \"upload\">Upload file<input type=\"file\"" +
                                " multiple name=\"file\" id=\"file\" /></div>" +
                                "<button id=\"uploadButton\">Submit</button></form>";

                                // update db (save images)

        });

        $("#profile").click(function(event){
            window.location.href = "profile.html";
        });

        $(document).on('click', '#username', function(){
            var userId = $(this).attr('username');
//            if (typeof(Storage) !== "undefined") {           // Code for localStorage/sessionStorage.
//                sessionStorage.setItem("userId", userId);
//                window.location.href = "profile.html#" + sessionStorage.getItem("userId");
//            } else {                                         // Sorry! No Web Storage support..
//                document.cookies = "username = " + test + ";path =/;";
                window.location.href = "profile.html#" + /*getCookie("username")*/userId;
//            }
        });
        
        $(document).on('click', '#slider', function(){
            if(document.getElementById('a1').innerHTML == "Public Photos")
                document.getElementById('a1').innerHTML = "Shared Photos";
            else
                document.getElementById('a1').innerHTML = "Public Photos";
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
//            console.log(Math.round($(this).scrollTop()) + " " + $(".feed")[0].scrollHeight +" " + window.innerHeight);
    //        console.log(div.scrollHeight);
            if (Math.round($(this).scrollTop()) == $(".feed")[0].scrollHeight - window.innerHeight
                /*document.getElementsByClassName("close")[0].style.display == "none"*/) { //scrollTop is 0 based
//                console.log("Load more!");
                for(var i = 0; i < 3; i++){     // 3 strings * 5 photos each
                    var stringDiv = loadPhotos();
                    $(".feed").append(stringDiv);
                }
            }
        });
    });

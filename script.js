
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

/*    updateList = function() {                                 // uncomment list of files (upload function)
      var input = document.getElementById('file');
      var output = document.getElementById('fileList');

      output.innerHTML = '<ul>';
      for (var i = 0; i < input.files.length; ++i) {
        output.innerHTML += '<li>' + input.files.item(i).name + '</li>';
      }
      output.innerHTML += '</ul>';
    }*/

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

        var modal        = document.createElement("div");
        var close        = document.createElement("span");
        var photo        = document.createElement("div");
        var caption      = document.createElement("div");
        
        var tag          = document.createElement("div");
        var editTags     = document.createElement("div");
        var divider      = document.createElement("div");
        var exitEditTags = document.createElement("span");
        var inputTagUser = document.createElement("input");
        var taggedUsers = document.createElement("div");

        var navbar       = document.getElementById('navbar');

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

        $(tag).addClass("tag-overlay");
        $(divider).addClass("divider");
        $(editTags).addClass('edittags');
        $(exitEditTags).addClass("exit");
        $(taggedUsers).addClass('taggedusers');
        $(inputTagUser).addClass('taguser');

        tag.setAttribute('id', "tag");
        inputTagUser.setAttribute('type', 'text');
        inputTagUser.setAttribute('placeholder', 'Enter username');

        $(close).text("x");
        $(exitEditTags).text("x");

        $(taggedUsers).append('<a class ="username" href="">Harvey</a>' +       // update show db tagged users
                             '<br>' +
                             '<a class ="username" href="">Nella</a>' +
                             '<br>' +
                             '<a class ="username" href="">Nella</a>' +
                             '<br>' +
                             '<a class ="username" href="">Nella</a>' +
                             '<br>' +
                             '<a class ="username" href="">Nella</a>' +
                             '<br>' +
                             '<a class ="username" href="">Nella</a>');

        $(tag).append("<i class=\"fa fa-tags\" aria-hidden=\"true\"></i>" + 
                "<p class = \"tagged\">Tagged:</p>");
        
        var edit = document.createElement("div");
        $(edit).addClass("edit");
        $(edit).append('<i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i>');
        
        var title = document.createElement("p");
        $(title).addClass('captionTitle');
        $(title).text(data.title);
        
        var puser = document.createElement("p");
        $(puser).addClass('puser');
        $(puser).append('By: <a class="captionUsername" userId = "' + user.id +
                        '" username = "' + user.username  + '" id="username">' +
                        user.username + '</a>');
        
        var desc = document.createElement("p");
        $(desc).addClass('captionDescription');
        $(desc).text(album.title);
        
        var ct = document.createElement("p");
        $(ct).addClass('captionTags');
        $(ct).append("#something hello");
        
        $(caption).append(edit);
        $(caption).append(title);
        $(caption).append(puser);
        $(caption).append(desc);
        $(caption).append(ct);

        //assemble
        $(photo).prepend('<img id="theImg" src="' + data.url + '.png" />');
        $(photo).append(tag);
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


        $(editTags).append(inputTagUser);
        $(editTags).append(exitEditTags);
        $(editTags).append(divider);
        $(editTags).append(taggedUsers);
        $(tag).append(editTags);

        $(polaroid).click(function(){
            modal.style.display = "flex";
        });

        polaroid.addEventListener('click', function() {
            document.body.classList.toggle('noscroll');
        })

        $(close).click(function(){
            modal.style.display = "none";
            document.body.classList.toggle('noscroll');

            $('.captionTitle').prop('contenteditable'      , false).toggleClass('editable');
            $('.captionDescription').prop('contenteditable', false).toggleClass('editable');
            $('.captionTags').prop('contenteditable'       , false).toggleClass('editable');
        });

        photo.addEventListener('mouseover', function(){
            tag.style.display = "block";
        });

        photo.addEventListener('mouseout', function(){
            if(editTags.style.display != "block")
                tag.style.display = "none";
        });

        $(tag).click(function(event){
            event.stopPropagation();
            editTags.style.display = "block";
        });


        $('.edit').unbind('click');
        $('.edit').click(function(){
//            $('.captionTitle').prop('contenteditable'      , !($('.captionTitle').is('.editable'))).toggleClass('editable');
            if(!($('.captionTitle').is('.editable'))){
                $('.captionTitle').prop('contenteditable'      , true).toggleClass('editable');
                $('.captionDescription').prop('contenteditable', true).toggleClass('editable');
                $('.captionTags').prop('contenteditable'       , true).toggleClass('editable');
                $(this).css('color', "#008bc7");
            }else{
                $('.captionTitle').prop('contenteditable'      , false).toggleClass('editable');
                $('.captionDescription').prop('contenteditable', false).toggleClass('editable');
                $('.captionTags').prop('contenteditable'       , false).toggleClass('editable');
                $(this).css('color', "grey");
            }
        });

        $('.exit').click(function(event){
            event.stopPropagation();
            editTags.style.display = "none";
//            alert('hello');
        });

//        document.onkeyup = null;
        $(document).keyup(function (e) {
            if ($(".captionTags:focus") && (e.keyCode === 13 || e.keyCode == 32)) {


                if(ct.innerHTML.charAt(0) != "#")
                    ct.innerHTML = "#" + ct.innerHTML;

                ct.innerHTML = ct.innerHTML.replace("<br>", "#");
                ct.innerHTML = ct.innerHTML.replace(" ", "#");
                ct.innerHTML = ct.innerHTML.replace("##", "#");
            }

            if (modal.style.display != "none" && e.keyCode === 27)
                modal.style.display = "none";
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
        var loggedInUser   =  getCookie("loggedInUser").substring(getCookie("loggedInUser").indexOf("="),
                                                                  getCookie("loggedInUser").length);
        var rememberedUser =  getCookie("username").substring(getCookie("username").indexOf("="),
                                                              getCookie("username").length)

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

        for(var i = 0; i < 3; i++){     // update db shared feed call
            var stringDiv = loadPhotos();
            $(".sharedFeed").append(stringDiv);
        }

        var sharedFeedScrollTop = 0;
        var feedScrollTop       = 0;

        if(getCookie("loggedInUser") != "")
            changeNavBar();



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

                window.location.href = "profile.html#" + username;
            }
            else{
                x.innerHTML = "<div class = \"errorlogin\">" +
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
                                " name=\"uploadForm\" id=\"uploadForm\"><div class = \"upload\"><p>Upload file</p><input type=\"file\"" +
                                " multiple name=\"file\" id=\"file\" accept=\"image/*\" " +
                                "onchange=\"javascript:updateList()\"/>" +
                                "<input id=\"utitle\" type=\"text\" placeholder=\"Title\">" +
                                "<p>hello</p>" +
                                "</div><button id=\"uploadButton\">Submit</button></form>";


        });


        $("#uploadButton").click(function(event){

            // update db (save images)
            alert("update db (save images)");

        });

        $("#profile").click(function(event){
            window.location.href = "profile.html#" + loggedInUser;
        });

        $(document).on('click', '#username', function(){
            var userId = $(this).attr('username');
                window.location.href = "profile.html#" + userId;
        });

        $("#checkBoxPane").click(function(event){

            if(document.getElementById("checkBoxPane").checked){

                var feed = document.getElementById('feed');
                var sharedFeed = document.getElementById('sharedFeed');
                
                
                feedScrollTop       =  document.body.scrollTop;
                document.getElementById('a1').innerHTML = "Shared Photos";
//                $('body, html').animate({ scrollLeft: $(this).width }, 700);

                feed.style.display = "none";
                sharedFeed.style.display = "block";
                document.body.scrollTop  = sharedFeedScrollTop;
            } else{


                var feed = document.getElementById('feed');
                var sharedFeed = document.getElementById('sharedFeed');

                sharedFeedScrollTop = document.body.scrollTop;
                document.getElementById('a1').innerHTML = "Public Photos";
//                $('body, html').animate({ scrollLeft: 0 }, 700);

                sharedFeed.style.display = "none";
                feed.style.display = "block";
                document.body.scrollTop  = feedScrollTop;
            }
        });

        $(window).click(function(){
            var x = document.getElementById('clickedNavBarLinks');
            x.style.display = 'none';
        });


        $(window).scroll(function() {
            var body = document.body,
                html = document.documentElement;

            var height = Math.max( body.scrollHeight, body.offsetHeight,
                                   html.clientHeight, html.scrollHeight, html.offsetHeight );
            var div = $(this);
            var scroll = 0;
            setTimeout(function() {
                scroll = div.scrollTop();
            }, 200);
            if (Math.round($(this).scrollTop()) == height - window.innerHeight){
                for(var i = 0; i < 3; i++){     // 3 strings * 5 photos each
                    if(document.getElementById("checkBoxPane") != null && document.getElementById("checkBoxPane").checked){
                        var stringDiv = loadPhotos();
                        $(".sharedFeed").append(stringDiv);
                    } else {                                    // update db (shared feed call))
                        var stringDiv = loadPhotos();
                        $(".feed").append(stringDiv);
                    }
                }
            }
        });

//        $(document).keyup(function (e) {
//            if ($(".edit:focus") && (e.keyCode === 13 || e.keyCode == 32)) {
//               alert('ya!');
//            }
//
//            if ($(".modal").display != "none" && e.keyCode === 27) {
//                $(".modal").display = "none";
//            }
//         });

    });

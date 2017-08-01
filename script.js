var loaded = 0;
var loadA = 0;
var sharedTo = 0;
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

function deleteUser(taggedUser, event){
    event.stopPropagation();
    // update Delete user from the db if possible

    alert(taggedUser.innerHTML);
    alert(document.getElementById('ususers').innerHTML);

    document.getElementById('ususers').innerHTML = document.getElementById('ususers').innerHTML.replace(taggedUser.innerHTML, '');
}

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
                    generateAlbumInfo(data[document.getElementById("checkBoxPane") != null &&
                                           document.getElementById("checkBoxPane").checked ? (i + loadA):
                                                                                             (max - loadA - i)],
                                      stringDiv);
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
    var tagged = 0;
    loaded+=1;
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

    var ct = document.createElement("p");

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
    $(ct).addClass('captionTags');
    
    var edit = document.createElement("div");
    $(edit).addClass("edit");

    tag.setAttribute('id', "tag");
    inputTagUser.setAttribute('type', 'text');
    inputTagUser.setAttribute('placeholder', 'Enter username');
    
    
    var title = document.createElement("p");
    $(title).addClass('captionTitle');
    $(title).text(data.title);

    var puser = document.createElement("p");
    $(puser).addClass('puser');
    var desc = document.createElement("p");
    $(desc).addClass('captionDescription');
    
    
    
    if(data.id != 4996 && data.id != 4992 && data.id != 4991){
        $(puser).append('By: <a class="captionUsername" userId = "' + user.id +
                    '" username = "' + user.username  + '" id="username">' +
                    user.username + '</a>');
    }
    else{
        $(puser).append('By: <a class="captionUsername" userId = "' + user.id +
                    '" username = "Bret" id="username">Bret</a>');
    }

    
    $(desc).text(album.title);

    $(close).text("x");
    $(exitEditTags).text("x");
    $(taggedUsers).append('<div class="uusername"><a class="username" id ="username' + sharedTo + '" href="">Bret</a></div>' +  // update show db tagged users
                         '<div class="uexit" id="uexit' + sharedTo + '">x</div><br>');
    sharedTo+=1;
    tagged+=1;
    $(taggedUsers).append('<div class="uusername"><a class="username" id ="username' + sharedTo + '" href="">Antonette</a></div>' +  // update show db tagged users
                         '<div class="uexit" id="uexit' + sharedTo + '">x</div><br>');
    sharedTo+=1;
    tagged+=1;
    
    var loggedInUser   =  getCookie("loggedInUser").substring(getCookie("loggedInUser").indexOf("="),
                                                                  getCookie("loggedInUser").length);
    
//    if(loggedInUser != "" && loggedInUser.toUpperCase() == user.username.toUpperCase()){
//        $(tag).append("<i class=\"fa fa-tags\" aria-hidden=\"true\"></i>" + 
//            "<p class = \"tagged\">Tagged:</p>");
//    }
//    else{
//        $(tag).append('<i class="fa fa-globe" aria-hidden="true"></i>' +
//            '<p class="public">Public</p>');
//    }
    
      if(loggedInUser != "" && loggedInUser.toUpperCase() == user.username.toUpperCase())
          $(edit).append('<i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i>');
    
    //hardcoding
    if((data.id < 4997 || data.id == max) && user.id != 1
       && data.id != 4996 && data.id != 4992 && data.id != 4991){
        $(tag).append('<i class="fa fa-globe" aria-hidden="true"></i>' +
            '<p class="public">Public</p>');
        $(ct).append("#something");
    }

    if(data.id == 4999){
        $(tag).append("<i class=\"fa fa-tags\" aria-hidden=\"true\"></i>" + 
            (loggedInUser.length == 0 ? '<p class="public">Public</p>' :
                                  "<p class = \"tagged\">Tagged: Bret, Antonette</p>"));
        $(ct).append("#wow #yay");
    }
    
    if(data.id == 4998){
        $(tag).append("<i class=\"fa fa-tags\" aria-hidden=\"true\"></i>" + 
            (loggedInUser.length == 0 ? '<p class="public">Public</p>' :
                                 "<p class = \"tagged\">Tagged: Antonette</p>"));
        $(ct).append("#wow");
    }
    
    if(data.id == 4997){
        $(tag).append("<i class=\"fa fa-tags\" aria-hidden=\"true\"></i>" + 
            (loggedInUser.length == 0 ? '<p class="public">Public</p>' :
                                 "<p class = \"tagged\">Tagged: Bret</p>"));
        $(ct).append("#wow #yay");
    }
    
    if(user.id == 1 || data.id == 4996 || data.id == 4992 || data.id == 4991){
        $(tag).append("<i class=\"fa fa-tags\" aria-hidden=\"true\"></i>" + 
                      "<p class = \"tagged\">Tagged: Moriah.Stanton</p>");
        $(ct).append("#obosen");
    }

    $(caption).append(edit);
    $(caption).append(title);
    $(caption).append(puser);
    $(caption).append(desc);
    $(caption).append(ct);

    //assemble
    $(photo).prepend('<img id="theImg" src="' + "https" + data.url.substring(4, data.url.length) + '.png" />');
    $(photo).append(tag);
    $(modal).append(close);
    $(modal).append(photo);
    $(modal).append(caption);

    $(thumbnail).prepend('<img id="theImg" src="' + "https" + data.thumbnailUrl.substring(4   , data.thumbnailUrl.length)  + '.png" />');
    $(pin).append(groove);
    $(groove).append(metal);
    $(polaroid).append(thumbnail);
    
    var url = window.location.pathname;
//    alert(url);
<<<<<<< HEAD
    if(
        document.getElementById("checkBoxPane") == null &&
       (user.id == 1 || data.id == 4996 || data.id == 4992 || data.id == 4991) &&
       loggedInUser != "" && loggedInUser.toUpperCase() == user.username.toUpperCase()){
        $(polaroid).append("<p>Shared With You</p>");
    }else{
        $(polaroid).append("<p>Public</p>");
=======
    if(url.indexOf("moriah.stanton") != -1 && url.indexOf("Moriah.Stanton") != -1){
//    if(url != "/profile#moriah.stanton" && url != "/profile#Moriah.Stanton" &&  url != "/profile"){
        if((user.id == 1 || data.id == 4996 || data.id == 4992 || data.id == 4991) && loggedInUser != "" && loggedInUser.toUpperCase() == user.username.toUpperCase()){
            $(polaroid).append("<p>Shared With You</p>");
        }else{
            $(polaroid).append("<p>Public</p>");
        }
>>>>>>> d188cace50207a243c3e45380f498a343f951fc0
    }

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
        $('.captionTitle').prop('contenteditable'      , false);
        $('.captionDescription').prop('contenteditable', false);
        $('.captionTags').prop('contenteditable'       , false);
        if($('.captionTitle').hasClass('editable')){
            $('.captionTitle').removeClass('editable');
            $('.captionDescription').removeClass('editable');
            $('.captionTags').removeClass('editable');
            $('.edit').css('color', "grey");
        }
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
        
        //removing tagged people
        var temp = 0;
        for(var i = 0; i < tagged; i++){
            temp = i; 
            var x = document.getElementById("uexit" + i);
            x.addEventListener('click', function(i){
                console.log(x.getAttribute('id'));
                // always removes the last user only
//                $('#username' + (tagged - i)).remove();
//                $("#uexit" + (tagged - i)).remove();
            });
        }
        
    });

    $('.exit').click(function(event){
        event.stopPropagation();
        editTags.style.display = "none";
    });

    $(document).keyup(function (e) {
        var activeElement = document.activeElement;

        if ($(ct).is(':focus') && (e.keyCode == 32)) {
            
            if(ct.innerHTML.charAt(0) != '#'){
                ct.innerHTML = "#" + ct.innerHTML;
            }
//                    
            ct.innerHTML = ct.innerHTML.replace(/&nbsp; &nbsp;/g, '');
            ct.innerHTML = ct.innerHTML.replace(/ /g, " #");
            ct.innerHTML = ct.innerHTML.replace(/ <br> /g, "");
            ct.innerHTML = ct.innerHTML.replace(/<br><br>/g, "");
            ct.innerHTML = ct.innerHTML.replace(/<br>/g, " #");
            ct.innerHTML = ct.innerHTML.replace(/##/g, "#");
            ct.innerHTML = ct.innerHTML.replace(/#&nbsp;#/g, "#");
        }

        if (modal.style.display != "none" && e.keyCode === 27){
            modal.style.display = "none";

            $('.captionTitle').prop('contenteditable'      , false);
            $('.captionDescription').prop('contenteditable', false);
            $('.captionTags').prop('contenteditable'       , false);

            if($('.captionTitle').hasClass('editable')){
                $('.captionTitle').removeClass('editable');
                $('.captionDescription').removeClass('editable');
                $('.captionTags').removeClass('editable');
                $('.edit').css('color', "grey");
            }
        }

        return false;
     });

    $('.edit').unbind('click');
    $('.edit').click(function(){
//            $('.captionTitle').prop('contenteditable'      , !($('.captionTitle').is('.editable'))).toggleClass('editable');

        var loggedInUser   =  getCookie("loggedInUser").substring(getCookie("loggedInUser").indexOf("="),
                                                                  getCookie("loggedInUser").length);
        if(loggedInUser != "" && loggedInUser.toUpperCase() == user.username.toUpperCase()){    // case insensitive
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
        }
    });
}

function changeNavBar() {
    var loggedInUser   =  getCookie("loggedInUser").substring(getCookie("loggedInUser").indexOf("="),
                                                              getCookie("loggedInUser").length);
    var navBar = document.getElementById('navbar');
        navBar.innerHTML = "<div id = \"navbar\">" +
                      "<a href = \"index.html\" id = \"title\"> twine </a>" +
                      "<div class=\"links\" id = \"navBarLinks\">" +
                      "<a class = \"acc\" id = \"profile\">" + loggedInUser + "</a>" +
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
                                                          getCookie("username").length);

    if( loggedInUser == rememberedUser && loggedInUser != ""){
//            alert("Updating cookies");
//            alert(loggedInUser);
        document.cookie = "username" + "=" + rememberedUser + ";" + expires + ";path=/";
        document.cookie = "loggedInUser" + "=" + rememberedUser + ";" + expires + ";path=/";
    }/*else alert("NOT FOUND")*/;

    if(loggedInUser == "")
        $("#checkBoxPane").prop('disabled', true);

//    console.log($("#username1").attr("id"));
    

    for(var i = 0; i < 3; i++){     // 3 strings * 5 photos each
        var stringDiv = loadPhotos();
        $(".feed").append(stringDiv);
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
                    "<input id = \"description-input\" type = \"text\" placeholder=\"Description\">" +
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
                      "<input id = \"description-input\" type = \"text\" placeholder=\"Description\">" +
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

        //dont delete this is the original more correct version
//        x.innerHTML = " <form action=\"\" method=\"post\" enctype=\"multipart/form-data\"" +
//                            " name=\"uploadForm\" id=\"uploadForm\"><div class = \"upload\"><p>Upload file</p><input type=\"file\"" +
//                            " name=\"file\" id=\"file\" accept=\"image/*\" " +
//                            "onchange=\"javascript:updateList()\"/>" +
//                            "<input class=\"uinput\" id=\"utitle\" type=\"text\" placeholder=\"Title\"/>" +
//                            "<textarea class=\"uinput\" id=\"udesc\" type=\"text\" placeholder=\"Description\"></textarea>" +
//                            "<input class=\"uinput utags\" id=\"utags\" type=\"text\" placeholder=\"Tags\"/>" +
//                            "<input id=\"uprivacy\" type=\"checkbox\" />" + "Private" +
//                            "<input class=\"ushare\" id=\"ushare\" type=\"text\" placeholder=\"Enter username\"/ disabled>" +
//                            "<p class=\"t2\">Shared With:</p><div class=\"ususers\" id=\"ususers\"></div>" +
//                            "</div><button id=\"uploadButton\">Submit</button></form>";
        
        //for hardcoding?
        x.innerHTML = " <div class = \"upload\"><p>Upload file</p><input type=\"file\"" +
                        " name=\"file\" id=\"file\" accept=\"image/*\" " +
                        "onchange=\"javascript:updateList()\"/>" +
                        "<input class=\"uinput\" id=\"utitle\" type=\"text\" placeholder=\"Title\"/>" +
                        "<textarea class=\"uinput\" id=\"udesc\" type=\"text\" placeholder=\"Description\"></textarea>" +
                        "<input class=\"uinput utags\" id=\"utags\" type=\"text\" placeholder=\"Tags\"/>" +
                        "<input id=\"uprivacy\" type=\"checkbox\" />" + "Private" +
                        "<input class=\"ushare\" id=\"ushare\" type=\"text\" placeholder=\"Enter username\"/ disabled>" +
                        "<p class=\"t2\">Shared With:</p><div class=\"ususers\" id=\"ususers\"></div>" +
                        "</div><button id=\"uploadButton\">Submit</button>";

        $(document).keyup(function (e){
            var activeElement = document.activeElement;
            if (activeElement.className == "ushare" && (e.keyCode == 32) &&
                document.getElementById('ushare').value.replace(/ /g,'').length != 0){

                var taggedUser = document.createElement("div");
                var copyDiv = "<div id=\"username\">" + document.getElementById('ushare').value + "</div>" +
                              "<div class=\"uexit\" onclick=\"return deleteUser(\'{%=taggedUser%}\', event)\">x</div><br>" +
                               document.getElementById('ususers').innerHTML;

                //add classes
                taggedUser.setAttribute('id', "username");


                taggedUser.innerHTML = "<div id=\"username\">" + document.getElementById('ushare').value + "</div>" +
                                       "<div class=\"uexit\" onclick=\"return deleteUser(this.parentElement, event)\">x</div><br>" +
                                        document.getElementById('ususers').innerHTML;

                                        // update check muna if there's a user in the db before adding(?)
                document.getElementById('ususers').append(taggedUser);
                document.getElementById('ushare').value = "";
            }


        });
        
        $("#uploadButton").click(function(event){
            // update db (save images)
            event.stopPropagation();
            $(x).fadeOut(2000);
            if(document.getElementById('file').value == ""){
                x.style.display = "block";
                
                x.innerHTML = " <div class = \"upload\"><p>Upload file</p>" +
                                "<div class = \"errorupload\">" +
                                "You did not select an image" +
                                "</div>" +
                                "<input type=\"file\"" +
                                " name=\"file\" id=\"file\" accept=\"image/*\" " +
                                "onchange=\"javascript:updateList()\"/>" +
                                "<input class=\"uinput\" id=\"utitle\" type=\"text\" placeholder=\"Title\"/>" +
                                "<textarea class=\"uinput\" id=\"udesc\" type=\"text\" placeholder=\"Description\"></textarea>" +
                                "<input class=\"uinput utags\" id=\"utags\" type=\"text\" placeholder=\"Tags\"/>" +
                                "<input id=\"uprivacy\" type=\"checkbox\" />" + "Private" +
                                "<input class=\"ushare\" id=\"ushare\" type=\"text\" placeholder=\"Enter username\"/ disabled>" +
                                "<p class=\"t2\">Shared With:</p><div class=\"ususers\" id=\"ususers\"></div>" +
                                "</div><button id=\"uploadButton\">Submit</button>";
            } else if(document.getElementById('utitle').value == ""){
                x.style.display = "block";
                 x.innerHTML = " <div class = \"upload\"><p>Upload file</p>" +
                                "<div class = \"errorupload\">" +
                                "Title cannot be empty" +
                                "</div>" +
                                "<input type=\"file\"" +
                        " name=\"file\" id=\"file\" accept=\"image/*\" " +
                        "onchange=\"javascript:updateList()\"/>" +
                        "<input class=\"uinput\" id=\"utitle\" type=\"text\" placeholder=\"Title\"/>" +
                        "<textarea class=\"uinput\" id=\"udesc\" type=\"text\" placeholder=\"Description\"></textarea>" +
                        "<input class=\"uinput utags\" id=\"utags\" type=\"text\" placeholder=\"Tags\"/>" +
                        "<input id=\"uprivacy\" type=\"checkbox\" />" + "Private" +
                        "<input class=\"ushare\" id=\"ushare\" type=\"text\" placeholder=\"Enter username\"/ disabled>" +
                        "<p class=\"t2\">Shared With:</p><div class=\"ususers\" id=\"ususers\"></div>" +
                        "</div><button id=\"uploadButton\">Submit</button>";
            } else {
                x.style.display = "block";
                x.innerHTML =  "<div class = \"upload\"><p>Upload file</p>" +
                    "<div class = \"successupload\">" +
                              "Success!" +
                              "</div>"+
                                "<input type=\"file\"" +
                        " name=\"file\" id=\"file\" accept=\"image/*\" " +
                        "onchange=\"javascript:updateList()\"/>" +
                        "<input class=\"uinput\" id=\"utitle\" type=\"text\" placeholder=\"Title\"/>" +
                        "<textarea class=\"uinput\" id=\"udesc\" type=\"text\" placeholder=\"Description\"></textarea>" +
                        "<input class=\"uinput utags\" id=\"utags\" type=\"text\" placeholder=\"Tags\"/>" +
                        "<input id=\"uprivacy\" type=\"checkbox\" />" + "Private" +
                        "<input class=\"ushare\" id=\"ushare\" type=\"text\" placeholder=\"Enter username\"/ disabled>" +
                        "<p class=\"t2\">Shared With:</p><div class=\"ususers\" id=\"ususers\"></div>" +
                        "</div><button id=\"uploadButton\">Submit</button>";
            }
        });

        document.getElementById('uprivacy').addEventListener('click', function(){
            if(document.getElementById('uprivacy').checked)
                $(".ushare").prop('disabled', false);
            else{
                $(".ushare").prop('disabled', true);
                document.getElementById('ususers').innerHTML = "";
            } 
        });
        
        $(document).keyup(function (e){

            var activeElement = document.activeElement;

            if (activeElement.id == "utags" && (e.keyCode == 32)){
                document.getElementById('utags').value = "#" + document.getElementById('utags').value;
                document.getElementById('utags').value = document.getElementById('utags').value.replace(/ /g, " #");
                document.getElementById('utags').value = document.getElementById('utags').value.replace(/##/g, "#");
                document.getElementById('utags').value = document.getElementById('utags').value.replace(/#&nbsp;&nbsp;#/g, "#");
                document.getElementById('utags').value = document.getElementById('utags').value.replace(/# #/g, "#");
            }
        });

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

            if(sharedFeed.children.length == 0){
                for(var i = 0; i < 3; i++){     // update db shared feed call
                    var stringDiv = loadPhotos();
                    $(".sharedFeed").append(stringDiv);
                }
            }

            feedScrollTop       =  document.body.scrollTop;
            document.getElementById('a1').innerHTML = "Shared With You";
//                $('body, html').animate({ scrollLeft: $(this).width }, 700);

            feed.style.display = "none";
            sharedFeed.style.display = "block";
            document.body.scrollTop  = sharedFeedScrollTop;
        } else{


            var feed = document.getElementById('feed');
            var sharedFeed = document.getElementById('sharedFeed');

            sharedFeedScrollTop = document.body.scrollTop;
            document.getElementById('a1').innerHTML = "Your Photos";
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
    
    $(document).keypress(               // prevents form from being submitted when enter is pressed
        function(event){
         if (event.which == '13') {
            var activeElement = document.activeElement;
            event.preventDefault();
            if (activeElement.className == "ushare"){
                event.preventDefault();
//                alert('prevented');
                var taggedUser = document.createElement("div");

                var copyDiv = "<div id=\"username\">" + document.getElementById('ushare').value + "</div>" +
                              "<div class=\"uexit\" onclick=\"return deleteUser(\'{%=taggedUser%}\', event)\">x</div><br>" +
                               document.getElementById('ususers').innerHTML;

                //add classes
                taggedUser.setAttribute('id', "username");


                taggedUser.innerHTML = "<div id=\"username\">" + document.getElementById('ushare').value + "</div>" +
                                       "<div class=\"uexit\" onclick=\"return deleteUser(this.parentElement, event)\">x</div><br>" +
                                        document.getElementById('ususers').innerHTML;

                                        // update check muna if there's a user in the db before adding(?)
                document.getElementById('ususers').append(taggedUser);
                document.getElementById('ushare').value = "";
            } else if (activeElement.id == "utags"){
//                alert('hello');
                document.getElementById('utags').value = "#" + document.getElementById('utags').value;
                document.getElementById('utags').value = document.getElementById('utags').value.replace(/ /g, " #");
                document.getElementById('utags').value = document.getElementById('utags').value.replace(/##/g, "#");
                document.getElementById('utags').value = document.getElementById('utags').value.replace(/#&nbsp;&nbsp;#/g, "#");
                document.getElementById('utags').value = document.getElementById('utags').value.replace(/# #/g, "#");
            } else if (activeElement.className == "captionTags") {
                var ct = document.activeElement;
//                alert(document.activeElement.innerHTML);
//                alert(ct.text);
//                alert(ct.value);
//                ct.innerHTML = ct.innerHTML.replace(/&nbsp; &nbsp;/g, '');
//                ct.innerHTML = ct.innerHTML.replace(/ /g, " #");
//                ct.innerHTML = ct.innerHTML.replace(/ <br> /g, "");
//                ct.innerHTML = ct.innerHTML.replace(/<br><br>/g, "");
//                ct.innerHTML = ct.innerHTML.replace(/<br>/g, " #");
//                ct.innerHTML = ct.innerHTML.replace(/##/g, "#");
//                ct.innerHTML = ct.innerHTML.replace(/#&nbsp;#/g, "#");


                if(ct.value.charAt(0) != "#" && ct.value.length != '0')
                    ct.value = "#" + ct.value + " #";

                if(ct.value.charAt(ct.value.length - 1) != " " && ct.value.charAt(ct.value.length - 1) != "#" && ct.value.length != 0)
                    ct.value = ct.value + " #";
            } else if (activeElement.id == "searchbox"){
                // Remove all children div
                var feed = document.getElementById("feed");
                while (feed.firstChild) {
                    feed.removeChild(feed.firstChild);
                }



                var stringDiv = document.createElement("div");

                //add classes
                $(stringDiv).addClass("string");

                var url = "";
                if(document.URL.indexOf("#") == 0)
                    url = root + '/photos/';
                else url = root + '/photos/'; // update db (user's pictures) document.URL ("#")
                for(i = 0; i < 3 ; i++){
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
                                generateAlbumInfo(data[i + 4996],
                                                  stringDiv);
                            }
                        });
                    })(i, loadA, stringDiv, url);
                }


                $(".feed").append(stringDiv);

//                for(var i = 0; i < 3; i++)

                feed.append(stringDiv);
            }


          }


    });

});

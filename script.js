

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

    $("#login").click(function(event){
        event.stopPropagation();
        var x = document.getElementById('clickedNavBarLinks');
            x.style.display = 'block';

            x.innerHTML = "<div id = \"username-input\">" +
                          "<input type = \"search\"  placeholder=\"Username\">" +
                          "</div>" +
                          "<div id = \"password-input\">" +
                          "<input type = \"password\" placeholder=\"Password\">" +
                          "</div>" +
                          "<button>Log In</button>";
    });

    $("#signup").click(function(event){
        event.stopPropagation();
        var x = document.getElementById('clickedNavBarLinks');
            x.style.display = 'block';

            x.innerHTML = "<div id = \"username-input\">" +
                                      "<input type = \"search\"  placeholder=\"Username\">" +
                                      "</div>" +
                                      "<div id = \"password-input\">" +
                                      "<input type = \"password\" placeholder=\"Password\">" +
                                      "</div>" +
                                      "<div id = \"name-input\">" +
                                      "<input type = \"password\" placeholder=\"Name\">" +
                                      "</div>" +
                                      "<button>Register</button>";
    });

    $(window).click(function(){
        var x = document.getElementById('clickedNavBarLinks');
            x.style.display = 'none';
    });


})

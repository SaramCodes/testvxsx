$(document).ready(function(){

var chatIconID = $("#chat-app");
var chatContainer = $("#custom-message-app-container");
var vusuIcon = $("#general-chat-icon");
var vusuChat = $("#vusu-general-chat");
var mobileSideBtn = $("#mobile-chat-sidebtn");
var globalChatData = dummyData.globalChat;
var usersChat = dummyData.usersChat;
var createChat = dummyData.newChat;

//some functions
function addMenuIconsEvents(firstCall){
    if(firstCall){
        //add active icon to first chat
        $($(".changing-menu-links .message-menu-icon")[0]).addClass("message-menu-icon-active");
    }
    //what to do when icons are clicked
$(".message-menu-icon").click(function(){

    if($(".vusu-chat-types-mobile").css("display") === "none"){
        $("#chat-type").focus();


    }
    
   


    //make sure we are not clicking the new message button and that the current button is not already activated.
    if(!$(this).hasClass("new-message")){
        
       

        if(!$(this).hasClass("message-menu-icon-active") && !$(this).is("#general-chat-icon")){
                
                // now remove the active class on icon
               $(".message-menu-icon").each(function(){
                   if($(this).hasClass("message-menu-icon-active")){
                       $(this).removeClass("message-menu-icon-active");
                   }
               });
                $(this).addClass("message-menu-icon-active");



            if($(".message-app-menu").hasClass("message-app-menu-mobile")){
                $(".message-app-menu").removeClass("message-app-menu-mobile");
                $(mobileSideBtn).children(".fa").removeClass("fa-close").addClass("fa-bars");
                $(".message-app-chat-window").removeClass("slide-chat-large");
                $(".message-app-chat-window").removeClass("slide-chat-small");
                if($(".vusu-chat-types-mobile").css("display") === "block"){
                    $(".chat-type").prop("disabled", false);
                }
    
            }

                $("#vusu-general-chat").css("display", "none");
                loadChat($(this).attr("data-name"), false);
                if($(".vusu-chat-types-mobile").hasClass("vusu-chat-types-mobile-show")){
                    $(".vusu-chat-types-mobile").removeClass("vusu-chat-types-mobile-show");
                }


        } else if(!$(this).hasClass("message-menu-icon-active") && $(this).is("#general-chat-icon")){
                
                // now remove the active class on icon
               $(".message-menu-icon").each(function(){
                   if($(this).hasClass("message-menu-icon-active")){
                       $(this).removeClass("message-menu-icon-active");
                   }
               });
                $(this).addClass("message-menu-icon-active");


            
                if($(this).is("#general-chat-icon")){
                    //show vusu chatTypes on desktop
                    $("#vusu-general-chat").css("display", "block");               
                    loadChat(globalChatData[0].name,true)
                }
               
                if($(".message-app-menu").hasClass("message-app-menu-mobile")){
                    $(".message-app-menu").removeClass("message-app-menu-mobile");
                    $(mobileSideBtn).children(".fa").removeClass("fa-close").addClass("fa-bars");
                    $(".message-app-chat-window").removeClass("slide-chat-large");
                    $(".message-app-chat-window").removeClass("slide-chat-small");
                    if($(".vusu-chat-types-mobile").css("display") === "block"){
                        $(".chat-type").prop("disabled", false);
                    }
        
                }

            
        } else if($(this).hasClass("message-menu-icon-active") && $(this).is("#general-chat-icon")){
            // now remove the active class on icon
           $(".message-menu-icon").each(function(){
                $(this).removeClass("message-menu-icon-active");
           });
            $(this).addClass("message-menu-icon-active");

        
            //show vusu chatTypes on desktop
            $("#vusu-general-chat").css("display", "block");

           
        
    }



        

    } 
    else if($(this).hasClass("new-message")){
        //new message popup
        $(".new-message-container").css("display", "flex");
        $(".new-message-popup").addClass("float-in");
        if($(".vusu-chat-types-mobile").hasClass("vusu-chat-types-mobile-show")){
            $(".vusu-chat-types-mobile").removeClass("vusu-chat-types-mobile-show")
        }
        $("#chat-type").blur();
        if($(".message-app-menu").hasClass("message-app-menu-mobile")){
            $(".message-app-menu").removeClass("message-app-menu-mobile");
            $(mobileSideBtn).children(".fa").removeClass("fa-close").addClass("fa-bars");
            $(".message-app-chat-window").removeClass("slide-chat-large");
            $(".message-app-chat-window").removeClass("slide-chat-small");
            if($(".vusu-chat-types-mobile").css("display") === "block"){
                $(".chat-type").prop("disabled", false);
            }
        }
        
    }
    
});
}

function destroyAvatarClickEvents(){
    $(".message-menu-icon").each(function(){
        $(this).removeClass("message-menu-icon-active");
        $(this).unbind();
    })
}


function createChatFetch(){

    for(w=0; w< createChat.length; w++){

       
        

        var createNewChat = [
            "<div class='new-chats'>",
                "<div class='new-chats-inner'>",
                    "<img src='",
                    createChat[w].img,
                    "'>",
                    "<p>",
                    createChat[w].user,
                    "</p>",
                "</div>",
            "</div>",
        ]


        $(".new-chats-container").append(createNewChat.join(""));
    }

    
}

//Open chat container popup when message icon clicked
chatIconID.click(function(){
    if(chatContainer.css("display") === "flex" ){
        chatContainer.css("display", "none");
        setTimeout(function(){
            $(".custom-message-app").removeClass("float-in");
            $("body").css("overflow-y","auto");
        },5)
    } else{
        chatContainer.css("display", "flex");
        setTimeout(function(){
            $("body").css("overflow-y","hidden");
            $(".custom-message-app").addClass("float-in");
        },5)

        if($(".play-match-container").css("display") === "flex"){
            $(".play-match-container").css("display","none");

            if( $(".match-found-container").css("display", "flex") ){
                $("#op-avatar").attr("src", "img/no_avatar.png");
                $(".fm-title").css("display", "flex");
                $(".fm-found").css("display", "none");
                $(".match-found-container").css("display", "none");
                $(".finding-match-window").css("display", "none");
                $(".match-found").removeClass("fade-in");
                $(".match-found").addClass("fade-out");
                $(".fm-finding-timer").html("00:00")
            }

            //show finding match window
            $(".finding-match-window").removeClass("fade-in");
            $(".finding-match-window").css("display", "none");
        }
    }
    
})

//close chat container popup when chat container background is clicked
chatContainer.click(function(){
    chatContainer.css("display", "none");
    $("body").css("overflow-y","auto");


})

$(".close-main-chat").click(function(){
    chatContainer.css("display", "none");
    $("body").css("overflow-y","auto");
})

//do nothing when children of chat container are clicked
$(".custom-message-app-container > *").click(function(e){
    e.stopPropagation();
})




//what to do when the sidebutton on mobile is clicked
$(mobileSideBtn).click(function(){
    
    if( $(".message-app-menu").hasClass("message-app-menu-mobile") ){
        
        $(".message-app-menu").removeClass("message-app-menu-mobile");
        $(".vusu-chat-types-mobile").removeClass("vusu-chat-types-mobile-show");
        $(".message-app-chat-window").removeClass("slide-chat-large");
        $(".message-app-chat-window").removeClass("slide-chat-small");
        if($(".vusu-chat-types-mobile").css("display") === "block"){
            $(".chat-type").prop("disabled", false);
        }
        $(this).children(".fa").removeClass("fa-close").addClass("fa-bars");

    
    } else{

        

        $(".message-app-menu").addClass("message-app-menu-mobile");
        $(this).children(".fa").removeClass("fa-bars").addClass("fa-close");
        $(".message-app-chat-window").addClass("slide-chat-small");
        if($(".vusu-chat-types-mobile").css("display") === "block"){
            $(".chat-type").prop("disabled", true);
        }
        $.grep($(".message-menu-icon"), function(r){
            if($(r).hasClass("message-menu-icon-active") && $(r).is("#general-chat-icon")){
                $(".vusu-chat-types-mobile").addClass("vusu-chat-types-mobile-show");
                $(".message-app-chat-window").addClass("slide-chat-large");
                if($(".vusu-chat-types-mobile").css("display") === "block"){
                    $(".chat-type").prop("disabled", true);
                }
                
            }
            
        })


    }
    
});


function returnTime(tim){
    var d = new Date(tim);
    return (d.getDate() + "/" + (d.getUTCMonth() + 1) + "/" + d.getFullYear() + " " + d.toLocaleTimeString());
}




function loadChat(chatName, global){
    if(global){
        $(".chats").html("");
        for(i = 0; i < globalChatData.length; i++){

            if(globalChatData[i].name.toLowerCase() === chatName.toLowerCase()){

                $("#chat-window-heading").html(globalChatData[i].name);
                $("#vusu-chat-heading-mobile").html(globalChatData[i].name);
                // $("#vusu-chat-heading-mobile").css("display","block");


                $(".vusu-chat-type").each(function(){
                    $(this).removeClass("vusu-chat-type-active");
                    if($(this).text().toLowerCase() === globalChatData[i].name.toLowerCase()){
                        $(this).addClass("vusu-chat-type-active");
                    }
                });


                

                var tempGlobal = globalChatData[i].chats;

                for(z = 0; z < tempGlobal.length; z++){
                    

                   if(tempGlobal[z].embeded){
                    
                    var vusuDesktopChats = [
                        "<div class='chat'>",
                            "<div class='avatar-icon'>",
                                "<img src='",
                                tempGlobal[z].img,
                                "'>",
                            "</div>",
                            "<div class='chat-body'>",
                                "<div class='chat-user'>",
                                    tempGlobal[z].user,
                                    "<span class='chat-time'>",
                                        returnTime(tempGlobal[z].time),
                                    "</span>",    
                                "</div>",
                                "<div class='chat-content'>",
                                    "<div class='embed-wrapper'>",
                                        "<div class='color-pill'></div>",
                                            "<div class='content-inner'>",
                                                "<div class='content'>",
                                                               
                                                "<div class='title'>",
                                                tempGlobal[z].embeded.title,
                                                "</div>",  
                                                "<p>",
                                               "Battle Tag: ", tempGlobal[z].embeded.battleTag,
                                                "</p>",
                                                "<p>",
                                                "Region: ",tempGlobal[z].embeded.region,
                                                "</p>",
                                                "<p>",
                                                "General Level: ",tempGlobal[z].embeded.generalLevel,
                                                "</p>",
                                                "<br>",
                                                "<p><b><u>Quick Play</u></b></p>",
                                                "<p>",
                                                "Avg Elims: ",tempGlobal[z].embeded.avgKill,
                                                "</p>",                      
                                                "<p>",
                                                "Avg. Deaths: ",tempGlobal[z].embeded.avgDeath,
                                                "</p>",                      
                                                "<p>",
                                                "Final Blows: ", tempGlobal[z].embeded.finalBlow,
                                                "</p>",          
                                                "</div>", 
                                                "<img class='thumb' src='",
                                                tempGlobal[z].embeded.img, 
                                                "'>",
                                            "</div>",    
                                                                     
                                    "</div>",
                                "</div>",
                            "</div>",
                        "</div>"
                    ]
                    $(".chats").append(vusuDesktopChats.join(""));

                   }

                    var vusuDesktopChats = [
                        "<div class='chat'>",
                            "<div class='avatar-icon'>",
                                "<img src='",
                                tempGlobal[z].img,
                                "'>",
                            "</div>",
                            "<div class='chat-body'>",
                                "<div class='chat-user'>",
                                    tempGlobal[z].user,
                                    "<span class='chat-time'>",
                                        returnTime(tempGlobal[z].time),
                                    "</span>",    
                                "</div>",
                                "<div class='chat-content'>",
                                    tempGlobal[z].message,
                                "</div>",
                            "</div>",
                        "</div>"
                    ]
                    $(".chats").append(vusuDesktopChats.join(""));

                }      

            }
            
           
        }
    } else{
        for(b = 0; b < usersChat.length; b++ ){
            if(usersChat[b].user.toLowerCase() === chatName.toLowerCase()){
                $(".chats").html("");

                $("#chat-window-heading").html(usersChat[b].user);
                $("#vusu-chat-heading-mobile").html(usersChat[b].user);
                // $("#vusu-chat-heading-mobile").css("display","block");


                var tempUsers = usersChat[b].chats;

                for(c = 0; c < tempUsers.length; c++ ){


                    if(tempUsers[c].embeded){
                    
                        var userDesktopChats = [
                            "<div class='chat'>",
                                "<div class='avatar-icon'>",
                                    "<img src='",
                                    tempUsers[c].img,
                                    "'>",
                                "</div>",
                                "<div class='chat-body'>",
                                    "<div class='chat-user'>",
                                    tempUsers[c].sender,
                                        "<span class='chat-time'>",
                                            returnTime(tempUsers[c].dateTime),
                                        "</span>",    
                                    "</div>",
                                    "<div class='chat-content'>",
                                        "<div class='embed-wrapper'>",
                                            "<div class='color-pill'></div>",
                                                "<div class='content-inner'>",
                                                    "<div class='content'>",
                                                                   
                                                    "<div class='title'>",
                                                    tempUsers[c].embeded.title,
                                                    "</div>",  
                                                    "<p>",
                                                   "Battle Tag: ", tempUsers[c].embeded.battleTag,
                                                    "</p>",
                                                    "<p>",
                                                    "Region: ",tempUsers[c].embeded.region,
                                                    "</p>",
                                                    "<p>",
                                                    "General Level: ",tempUsers[c].embeded.generalLevel,
                                                    "</p>",
                                                    "<br>",
                                                    "<p><b><u>Quick Play</u></b></p>",
                                                    "<p>",
                                                    "Avg Elims: ",tempUsers[c].embeded.avgKill,
                                                    "</p>",                      
                                                    "<p>",
                                                    "Avg. Deaths: ",tempUsers[c].embeded.avgDeath,
                                                    "</p>",                      
                                                    "<p>",
                                                    "Final Blows: ", tempUsers[c].embeded.finalBlow,
                                                    "</p>",          
                                                    "</div>", 
                                                    "<img class='thumb' src='",
                                                    tempUsers[c].embeded.img, 
                                                    "'>",
                                                "</div>",    
                                                                         
                                        "</div>",
                                    "</div>",
                                "</div>",
                            "</div>"
                        ]
                        $(".chats").append(userDesktopChats.join(""));
    
                       }



                    var userDesktopChats = [
                        "<div class='chat'>",
                            "<div class='avatar-icon'>",
                                "<img src='",
                                tempUsers[c].img,
                                "'>",
                            "</div>",
                            "<div class='chat-body'>",
                                "<div class='chat-user'>",
                                tempUsers[c].sender,
                                    "<span class='chat-time'>",
                                        returnTime(tempUsers[c].dateTime),
                                    "</span>",    
                                "</div>",
                                "<div class='chat-content'>",
                                tempUsers[c].message,
                                "</div>",
                            "</div>",
                        "</div>"
                    ]


                    $(".chats").append(userDesktopChats.join(""));

                }


            } else if(createChat[b].user.toLowerCase() === chatName.toLowerCase()){
                $(".chats").html("");

                $("#chat-window-heading").html(createChat[b].user);
                $("#vusu-chat-heading-mobile").html(createChat[b].user);
                // $("#vusu-chat-heading-mobile").css("display","block");

                var emptyChat = [
                    "<div class='empty-chat'>",
                        "<h2>Send a message to intiate a conversation with ",
                        createChat[b].user,
                        "</h2>",
                    "</div>"
                ]

                $(".chats").append(emptyChat.join(""));
                if($(".vusu-chat-types-mobile").css("display") === "none"){
                    $("#chat-type").focus();
            
                }
                //emptying the createChat
                $(".new-chats").each(function(){
                    if($($(this).children(".new-chats-inner")).children("p").text().toLowerCase() === chatName.toLowerCase()){
                        $(this).remove();
                        isCreateEmpty();
                    }
                })
                
            }
        }
    }
}

function isCreateEmpty(){
    if($(".new-chats").length === 0){
        $(".new-chats-container").append("<div class='create-chat-empty'><h2>No Friends remaining. Chats with all friends exist already.<h2></div>")
    }
}



function GlobalSetup(){
    // load vusu chat types for desktop and mobile and add to page
    


    for(i = 0; i < globalChatData.length; i++){
        
        var vusuDesktopTypes = [
            "<div class='vusu-chat-type'>",
            globalChatData[i].name,
            "<div/>"
        ]

       
        
        $(".vusu-chat-types").append(vusuDesktopTypes.join(""));
        $(".vusu-chat-types-mobile").append(vusuDesktopTypes.join(""));
    }

    // Add Icons and load to html
    for(i = 0; i < usersChat.length; i++){
        var iconsDesktop = [
            "<div class='message-menu-icon' data-name='",
            usersChat[i].user,
            "'>",
            "<img src='",
            usersChat[i].img,
            "'>",
            "</div>"
        ]

        $(".changing-menu-links").append(iconsDesktop.join(""));
    }

    // load the first default vusu chat category
    loadChat(globalChatData[0].name, true);  

    //set events to icons once
    addMenuIconsEvents(false);

    //add data for create new chats
    createChatFetch();
}

GlobalSetup();



$(".new-message-container").click(function(){
    $(this).css("display","none");
})
$("#new-message-close").click(function(){
    $(".new-message-container").css("display","none");
})

$(".new-message-container > * ").click(function(e){
    e.stopPropagation();
})




//What to do when different general types are selected
$(".vusu-chat-type").click(function(){
    $(".vusu-chat-type").each(function(){
        $(this).removeClass("vusu-chat-type-active");
    })
    $(this).addClass("vusu-chat-type-active");
    $(".vusu-chat-types-mobile").removeClass("vusu-chat-types-mobile-show");
    if($(".message-app-menu").hasClass("message-app-menu-mobile")){
        $(".message-app-menu").removeClass("message-app-menu-mobile");
        $(mobileSideBtn).children(".fa").removeClass("fa-close").addClass("fa-bars");
        $(".message-app-chat-window").removeClass("slide-chat-large");
        $(".message-app-chat-window").removeClass("slide-chat-small");
        if($(".vusu-chat-types-mobile").css("display") === "block"){
            $(".chat-type").prop("disabled", false);
        }
        
    }
    
    loadChat($(this).text(),true);

    if($(".vusu-chat-types-mobile").css("display") === "none"){
        $("#chat-type").focus();

    }

});





//handle create new chat clicks
$(".new-chats-inner").click(function(){
    $("#vusu-general-chat").css("display", "none");
    $(".new-message-container").css("display","none");
    //adding empty chat
    loadChat($(this).children("p").text(),false);
    
    //adding it's icon
    for(p = 0; p < createChat.length; p++){
        if(createChat[p].user.toLowerCase() === $(this).children("p").text().toLowerCase()){
            
            var tempCreate = [
                "<div class='message-menu-icon' data-name='",
                createChat[p].user,
                "'>",
                "<img src='",
                createChat[p].img,
                "'>",
                "</div>"
            ]

            $(".changing-menu-links").prepend(tempCreate.join(""));
            destroyAvatarClickEvents();
            addMenuIconsEvents(true);
        }
    }

})


$(window).resize(function(){



    if($(".vusu-chat-types-mobile").css("display") === "block"){
        if($(".message-app-menu").hasClass("message-app-menu-mobile")){
            
            $(".chat-type").prop("disabled", true);
        }
    } else{
        $("#chat-type").prop("disabled", false);
    }


    

})


});
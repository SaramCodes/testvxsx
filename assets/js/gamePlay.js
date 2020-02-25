$(document).ready(function(){

    //global
    var timer = new easytimer.Timer();
    timer.addEventListener('secondsUpdated', function (e) {
        $(".fm-finding-timer").html(timer.getTimeValues().toString().substr(3));
        if(timer.getTimeValues().toString().substr(3) == "00:05" && $(".finding-match-window").css("display") === "block"){
            matchFound();
        }
    })
    
    
    
    


    function matchRejected(){
        $(".match-found-timer").circletimer("stop");

        $(".fm-title").css("display", "flex");
        $(".fm-found").css("display", "none");
        $(".match-found-container").css("display", "none");
        $(".match-found").removeClass("fade-in");
        $(".match-found").addClass("fade-out");
        
        $(".fm-finding-timer").html("00:00")

        cancelFindingMatch();
    }

    function matchFound(){
        $(".match-found-timer").circletimer("start");
       
        timer.pause();
        $(".fm-title").css("display", "none");
        $(".fm-found").css("display", "flex");
        $(".match-found-container").css("display", "flex");
        $(".match-found").addClass("fade-in");
        
    }


    //start code here
    setTimeout(function(){
        $(".play-match-container").css("display", "none");
        $(".play-match-container").css("opacity", "1");
    },1)

    //showmatchplaywindow
    function matchPlayWindowStarter(){

        if(swiper === undefined){
          swiper =   new Swiper('.swiper-container', {
                slidesPerView: 1,
                spaceBetween: 0,
                touchEventsTarget: "container",
                touchStartPreventDefault: false,
                touchStartForcePreventDefault: true,
                allowTouchMove: true,
                observer: true,
                observeParents: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                breakpoints:{
                    920: {
                        slidesPerView: 3
                    },

                    720: {
                        slidesPerView: 2
                    }
                }
            });

            
        };




        if($(".play-match-container").css("display") === "none"){
            $(".play-match-container").css("display", "flex");
            $(".pm-main-window").css("display", "block");
            $("body").css("overflow-y", "hidden");
            globalSlideVersus();

            if($(".custom-message-app-container").css("display") === "flex"){
                $("body").css("overflow-y", "auto");
                $(".custom-message-app-container").css("display", "none");
                setTimeout(function(){
                    $(".custom-message-app").removeClass("float-in");
                    $("body").css("overflow-y","auto");
                },5)
            }

        } else{
            closePlayWindow();
        }
    }

    //close main container functions here
    function closePlayWindow(){
        $(".play-match-container").css("display","none");
        $("body").css("overflow-y", "auto");

        if( $(".match-found-container").css("display", "flex") ){
            matchRejected();
        }

        $(".versus-type").each(function(){
            $(this).removeClass("versus-type-selected");
        })

        //show finding match window
        $(".finding-match-window").removeClass("fade-in");
        $(".finding-match-window").css("display", "none");
        timer.stop();
    }

    //active slide
    function activeSlide(){
        //remove active from all instants
        $(".swiper-slide").each(function(){
            $(this).removeClass("swiper-slide-show");

        })
        
        // add active to the current slide
        $(this).parent().addClass("swiper-slide-show");


        $(".versus-type").each(function(){
            $(this).removeClass("versus-type-selected");
        })

        //select the first checbox of the selected slide.
        var tempCheckBox = $($(this).parent().children(".versus-type-container")).children(".versus-type")[0];
        $(tempCheckBox).addClass("versus-type-selected");
        
        

    }

    //active versus
    function activeVersus(){
        if($(this).hasClass("versus-type-selected")) return;

        if($(this).parent().parent().hasClass("swiper-slide-show")) {
            
            $(".versus-type").each(function(){
                $(this).removeClass("versus-type-selected");
            })
    
            $(this).addClass("versus-type-selected");
    
        }


    }




    function globalSlideVersus(){
        $(".swiper-slide").removeClass("swiper-slide-show");
        var globalFirstSlide = $($(".swiper-slide")[0]);
        globalFirstSlide.addClass("swiper-slide-show");

        $($(globalFirstSlide.children(".versus-type-container")).children(".versus-type")[0]).addClass("versus-type-selected");

    }

    function loadFindingMatch(){
        $(".pm-main-window").removeClass("fade-in");
        $(".pm-main-window").addClass("fade-out");
        timer.stop()
        timer.reset()
        setTimeout(function(){

            //remove main window
            $(".pm-main-window").removeClass("fade-out");
            $(".pm-main-window").css("display", "none");

            //show finding match window
            $(".finding-match-window").addClass("fade-in");
            $(".finding-match-window").css("display", "block");
        },200)

        $(".fm-finding-timer").html("00:00")
        timer.start();
        
    }

    function cancelFindingMatch(){
        $(".finding-match-window").removeClass("fade-in");
        $(".finding-match-window").addClass("fade-out");
        setTimeout(function(){
            $(".finding-match-window").css("display", "none");

            //remove main window
            $(".pm-main-window").removeClass("fade-out");
            $(".pm-main-window").addClass("fade-in");
            $(".pm-main-window").css("display", "block");
        },200);

        timer.stop();
    }
    
    

    function redirectToMatch(){
        location.replace("match generated.html")
    }

    //event listeners here

    // event listener to open main play match window
    $("#play-btn").click(matchPlayWindowStarter);
    
    // close main window
    $(".play-match-container").click(function(){
        if($(".pm-main-window").css("display") === "block"){
            closePlayWindow();
        } else {
            return;
        }
    });
    $(".play-match-container > *").click(function(e){
        e.stopPropagation();
    });

    //active slide
    $(".slide-game").click(activeSlide);
    $(".versus-type").click(activeVersus);

    //change to finding match winndow
    $(".game-confirm-btn").click(loadFindingMatch);

    //cancel and close finding match window
    $("#fm-cancel").click(cancelFindingMatch);


    //decline and exit
    $(".match-found-decline").click(matchRejected);
    // redirect to match generated page
    $(".match-found-accept").click(redirectToMatch);
    
    //close btn

    $(".close-match-window").click(closePlayWindow);

    //event listeners here
    var swiper;

    var stopFinding = setInterval(function(){
        if( $("#fm-blinking").html().length > 2 ){
            $("#fm-blinking").html("")
        } else{
            $("#fm-blinking").html("." + $("#fm-blinking").html())
        }
    },400)

    




// initialize matchfound timer
$(".match-found-timer").circletimer({
    onComplete: matchRejected,
    timeout: 15000,
    clockwise: true
})












    
});
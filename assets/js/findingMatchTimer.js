function findingMatchCountup(){
    // $(".fm-finding-timer").html("00:00");
    setTimeout(function(){
        
        var currentDate = new Date();
        var minutes = newDate.getMinutes() - currentDate.getMinutes();
        var seconds = newDate.getSeconds() - currentDate.getSeconds();

        console.log(("00" + Math.abs(minutes)).substr(-2) + ":"+ ("00" + Math.abs(seconds)).substr(-2))
        console.log(newDate)
        $(".fm-finding-timer").html( ("00" + Math.abs(minutes)).substr(-2) + ":"+ ("00" + Math.abs(seconds)).substr(-2))

        findingMatchCountup();
    }, 1000);
    
}


self.addEventListener('message', function(e) {
    if (e.data.opt === "send"){

        setTimeout(function(){
            var currentDate = new Date();
            var minutes = e.data.time.getMinutes() - currentDate.getMinutes();
            var seconds = e.data.time.getSeconds() - currentDate.getSeconds();
            console.log(("00" + Math.abs(minutes)).substr(-2) + ":"+ ("00" + Math.abs(seconds)).substr(-2))
            postMessage( ("00" + Math.abs(minutes)).substr(-2) + ":"+ ("00" + Math.abs(seconds)).substr(-2))
        }, 1000);


    }
  }, false);
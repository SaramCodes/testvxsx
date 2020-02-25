(function ($) {
    $( document ).ready(function() {

        $(".dropdown-notification a").click( function () {
            $(".notification-overlay").toggle();
        });
        $(document).click(function(){
            $(".notification-overlay").hide();
        });


        /*$(".gamepad-matchmaker .matches td[colspan=5]").find("div").hide();
        $(".gamepad-matchmaker .matches").click(function(event) {
            event.stopPropagation();
            var $target = $(event.target);
            if ( $target.closest("td").attr("colspan") > 1 ) {
                $target.slideUp();
            } else {
                $target.closest("tr").next().find("div").slideToggle();
            }
        });*/

        $(".gamepad-matchmaker .matches td[colspan=5]").hide();
        $(".gamepad-matchmaker .matches .extd").click(function(event) {
            event.stopPropagation();
            event.preventDefault();

            $target = $(event.target);
            $target.closest("tr").next().children().slideToggle();
            $target.closest("tr .extendedchallenges").show();
            console.log($target.closest("tr").next().children());
        });


        $(".gamepad-matchmaker .matches .report-scores").click(function (e) {
            e.stopPropagation();
            e.preventDefault();
            $target = $(e.target);
            $target.parent().parent().next().show();
            $target.parent().parent().hide();
        });





        $(".gamepad-matchmaker .challenges td[colspan=5]").find("div").hide();
        $(".gamepad-matchmaker .challenges").click(function(event) {
            event.stopPropagation();
            event.preventDefault();
            $target = $(event.target);
            $target.closest("tr").next().find("div").slideToggle();
        });

        $(".gamepad-matchmaker .disputes td[colspan=5]").find("div").hide();

        $(".gamepad-matchmaker .disputes").click(function(event) {
            event.stopPropagation();
            event.preventDefault();
            var $target = $(event.target);
            $target.closest("tr").next().find("div").slideToggle();
        });


        /*$(".gamepad-matchmaker .disputes .desputes-form").click(function(event) {
            event.stopPropagation();
            event.preventDefault();
            var $target = $(event.target);
            if ( $target.closest("td").attr("colspan") > 1 ) {
                $target.slideUp();
            } else {
                $target.closest("tr").next().find("div").slideToggle();
            }
        });*/

       /* $(".gamepad-matchmaker .challenges td[colspan=5]").hide();
        $(".gamepad-matchmaker .challenges .extd").click(function(event) {
            event.stopPropagation();

            $target = $(event.target);
            $target.closest("tr").next().children().slideToggle();
            $target.closest("tr .extendedchallenges").show();
            console.log($target.closest("tr").next().children());
        });*/


        /*$(".gamepad-matchmaker .challenges .report-scores").click( function (e) {
            e.stopPropagation();
            $( this ).parent().parent().next().show();
            $( this ).parent().parent().hide();
        });*/


    });
})(jQuery);

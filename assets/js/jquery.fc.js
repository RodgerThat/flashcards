/**
 * jquery.fc.js
 */

(function($) {

    var $flexslider;        // object for interacting w/ the slider
    var flexsliderWidth;    // container for flexslider's height value
    var flexsliderHeight;   // container for flexslider's width value
    var slides;             // container for flexslider slides
    var randomSlides;       // container for shuffled slides
    var menu;               // container for responsive nav
    var instructionSlides;  // container for instruction slides // #todo - setup a flashcard group for instructions, pull on init, load into dom before flexslider in instantiated.
    var $window = $(window); // from the window , to the walls...
    var flashcards = [];    // container for the flashcards markup

    // RESPONSIVE NAV
    ////////////////
    menu = responsiveNav("#main-nav", { // Selector: The ID of the wrapper
        animate: true,      // Boolean: Use CSS3 transitions, true or false
        transition: 400,    // Integer: Speed of the transition, in milliseconds
        label: "Menu",      // String: Label for the navigation toggle
        insert: "before",   // String: Insert the toggle before or after the navigation
        customToggle: "",   // Selector: Specify the ID of a custom toggle
        openPos: "relative",// String: Position of the opened nav, relative or static
        jsClass: "js",      // String: 'JS enabled' class which is added to <html> el
        init: function(){}, // Function: Init callback
        open: function(){}, // Function: Open callback
        close: function(){} // Function: Close callback
    });
    //menu.destroy(); // Destroy
    //menu.toggle(); // Toggle


    // FLEXSLIDER
    /////////////
    $window.load(function() {
        $("#flexslider-1").flexslider({
            // Basics
            namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
            selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
            animation: "slide",             //String: Select your animation type, "fade" or "slide"
            easing: "swing",                //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
            direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
            reverse: false,                 //{NEW} Boolean: Reverse the animation direction
            animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
            smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
            startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
            slideshow: false,               //Boolean: Animate slider automatically
            slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
            animationSpeed: 700,            //Integer: Set the speed of animations, in milliseconds
            initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
            shuffle: false,               //Boolean: Randomize slide order
            // Usability features
            pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
            pauseOnHover: true,             //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
            useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
            touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
            video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches
            // Primary Controls
            controlNav: true,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
            directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
            prevText: "Previous",           //String: Set the text for the "previous" directionNav item
            nextText: "Next",               //String: Set the text for the "next" directionNav item
            // Secondary Navigation
            keyboard: false,                //Boolean: Allow slider navigating via keyboard left/right keys
            multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
            mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
            pausePlay: false,               //Boolean: Create pause/play dynamic element
            pauseText: 'Pause',             //String: Set the text for the "pause" pausePlay item
            playText: 'Play',               //String: Set the text for the "play" pausePlay item
            // Special properties
            //controlsContainer: "",          //{UPDATED} Selector: USE CLASS SELECTOR. Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be ".flexslider-container". Property is ignored if given element is not found.
            //manualControls: "",             //Selector: Declare custom control navigation. Examples would be ".flex-control-nav li" or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
            //sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
            //asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider
            // Carousel Options
            //itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
            //itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
            //minItems: 0,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
            //maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
            //move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
            // Callback API
            start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
            before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
            after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
            end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
            added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
            removed: function(){}           //{NEW} Callback: function(slider) - Fires after a slide is removed
        });

        $flexslider = $("#flexslider-1").data("flexslider");
        //console.log($flexslider);

        resizeFlexContainer();
    });

    // #todo - add flashcards for 'instructions' have the instructions button pull those.
    // #todo - for now, cache the initial slides and rebuild w. those


    // INSTRUCTIONS
    ///////////////
    $(".instructions").click(function() {
        console.log("well hi there");

    });


    // AJAX
    ///////
    $(".select-group").click(function() {

        menu.toggle(); // close menu

        var $button = $(this);
        // get term slug from data attribute
        var termSlug = $button.attr("data-termSlug");

        // send request
        $.post(
            FC_Ajax.ajaxurl,
            {
                // declare parameters w/ request, and action from Object
                action : FC_Ajax.action,
                termSlug : termSlug,
                nonce : FC_Ajax.nonce
            },
            // once you hear back
            function( response ) {
                console.log( response );

                clearSlider();
                buildSlider( response.flashcards );

            }
        )

    });


    // CLEARSLIDER
    //////////////
    function clearSlider() {
        console.log("==================");
        console.log("removing cards");
        // loop thru flexslider, pull out all slides
        var totalSlides = $flexslider.count;
        for ( var i = 0; i < totalSlides; i++ ) {
            $flexslider.removeSlide(i);
            console.log("i : " + i);
            console.log($flexslider.count);
        }
    }


    // BUILDSLIDER
    //////////////
    function buildSlider( array ){
        // loop thru flashcards
        console.log("==================");
        console.log("adding cards");
        for ( var i = 0; i < array.length; i++ ) {
            var card = '<li class"card"><div class="table"><div class="table-cell">'+array[i]+'</div></div></li>';
            // add each card to flexslider
            $flexslider.addSlide( card, i );
            console.log("i : " + i);
            console.log($flexslider.count);
        }
        $flexslider.flexslider(0); // goto 1st slide
    }


    // RESIZEFLEXCONTAINER
    //////////////////////
    function resizeFlexContainer() {
        flexsliderWidth = $("#flexslider-1").outerWidth();
        flexsliderHeight = $("#flexslider-1").outerHeight();
        console.log("-----------------------------");
        console.log("$window : " + $window.width() + " x " + $window.height() );
        console.log("$flexslider : " + flexsliderWidth + " x " + flexsliderHeight);

        $(".flex-container").css({
            "height" : $window.height() *.8 + "px", // 80%
            "margin-top" : $window.height() * .1 + "px", // 10%
            "margin-bottom" : $window.height() *.1 + "px" // 10%
        });

    }


    // RANDOMIZESLIDES
    //////////////////
    function shuffleSlides() {
        // @url : http://stackoverflow.com/questions/4511652/looping-through-list-items-with-jquery

        console.log("======================");
        console.log("contents of .slides");
        console.log($(".slides li"));

        console.log("==========");
        console.log("each slide");
        $(".slides li").each(function( index ){
           if ( $(this).hasClass("clone") || $(this).hasClass("welcome") || $(this).is["aria-hidden"] ) {
               console.log("-----------");
               console.log(index);
               console.log($(this).hasClass("clone"));
               console.log($(this).is("[aria-hidden]"));
           } else {
               console.log("-----------");
               console.log(index);
               console.log($(this).hasClass("clone"));
               console.log($(this).is("[aria-hidden]"));
               flashcards.push($(this).text());
           }
        });

        console.log("===========================");
        console.log("flashcards to be shuffled");
        console.log(flashcards);
        flashcards = shuffle(flashcards); // shuffle
        clearSlider(); // empty
        buildSlider(flashcards); // fill
    }

    $(".shuffle").click(function(){
        event.preventDefault();
        menu.toggle(); // close menu
        shuffleSlides(); // mix 'em up
    });

    // SHUFFLE
    //////////
    function shuffle(array) {
        // this was a new one for me, i've never seen js liek that.
        var currentIndex = array.length
            , temporaryValue
            , randomIndex
            ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    // WINDOW RESIZE
    ////////////////
    $window.resize( function() {
        resizeFlexContainer();
    });

    // #todo - add a function to the window.resize event & buildSlider() to check for words that are too long, and bump the font down.

    // LOGIN FORM
    /////////////

    // Show the login dialog box on click
    $('a#show_login').on('click', function(e){
        $('body').prepend('<div class="login_overlay"></div>');
        $('form#login').fadeIn(500);
        $('div.login_overlay, form#login a.close').on('click', function(){
            $('div.login_overlay').remove();
            $('form#login').hide();
        });
        e.preventDefault();
    });

    // LOGIN AJAX
    /////////////

    // Perform AJAX login on form submit
    $('form#login').on('submit', function(e){
        $('form#login p.status').show().text(ajax_login_object.loadingmessage);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: ajax_login_object.ajaxurl,
            data: {
                'action': 'ajaxlogin', //calls wp_ajax_nopriv_ajaxlogin
                'username': $('form#login #username').val(),
                'password': $('form#login #password').val(),
                'security': $('form#login #security').val() },
            success: function(data){
                $('form#login p.status').text(data.message);
                if (data.loggedin == true){
                    document.location.href = ajax_login_object.redirecturl;
                }
            }
        });
        e.preventDefault();
    });

    // ADD NEW CARD FORM
    ////////////////////

    // Show the login dialog box on click
    $('a.add_new_card_button').on('click', function(e){
        $('body').prepend('<div class="login_overlay"></div>');
        $('form#add_new_card').fadeIn(500);
        $('div.login_overlay, form#add_new_card a.close').on('click', function(){
            $('div.login_overlay').remove();
            $('form#add_new_card').hide();
        });
        e.preventDefault();
    });

    // ADD NEW CARD
    ///////////////
    $("#add_new_card_submit").on('click', function(e){

        var cardData = true;

        // send request
        $.post(
            FC_Ajax.ajaxurl,
            {
                // declare parameters w/ request, and action from Object
                action : FC_Ajax.action,
                cardData : cardData,
                cardTitle : $("#card_title").val(), // pass in form values
                cardGroup : $("#card_group").val(),
                nonce : FC_Ajax.nonce
            },
            // once you hear back
            function( response ) {

                console.log( response );

                $('form#add_new_card p.status').text(response.message);

                if (response.success == true) {
                }

            }
        )
        e.preventDefault();

    });



}(jQuery));

// FLEXSLIDER OBJECT
//flexslider                        //Object: The slider element itself
//flexslider.container              //Object: The ul.slides within the slider
//flexslider.slides                 //Object: The slides of the slider
//flexslider.count                  //Int: The total number of slides in the slider
//flexslider.currentSlide           //Int: The slide currently being shown
//flexslider.animatingTo            //Int: Useful in .before(), the slide currently animating to
//flexslider.animating              //Boolean: is slider animating?
//flexslider.atEnd                  //Boolean: is the slider at either end?
//flexslider.manualPause            //Boolean: force slider to stay paused during pauseOnHover event
//flexslider.controlNav             //Object: The slider controlNav
//flexslider.directionNav           //Object: The slider directionNav
//flexslider.controlsContainer      //Object: The controlsContainer element of the slider
//flexslider.manualControls         //Object: The manualControls element of the slider
//flexslider.flexAnimate(target)    //Function: Move slider - (target, pause) parameters
//flexslider.pause()                //Function: Pause slider slideshow interval
//flexslider.play()                 //Function: Resume slider slideshow interval
//flexslider.canAdvance(target)     //Function: returns boolean if slider can advance - (target) parameter
//flexslider.getTarget(dir)         //Function: get target given a direction - "next" or "prev" parameter

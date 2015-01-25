var lastScrollTop = 0;
var header = $(".ha-header");
var visible = true;
var iframe = $('iframe');
var numTabs = 1;
var default_url = "https://news.layervault.com/";

var tabTemplate = '<div class="tab current"><input value="'+ default_url +'"/><i class="icon fav-icon ion-social-designernews"></i> <span class="name">Designer News</span><i class="icon ion-android-close"></i></div>';


function setTabWidth(){
    var newWidth = 100/(numTabs+1);
    $('.tab').css('width',newWidth + "%");
    $('.tab.current').css('width',newWidth*2 + "%");
}
setTabWidth();


// Responsive to the direction of the scroll to minimize chrome
// References:
//  - http://stackoverflow.com/questions/4326845/how-can-i-determine-the-direction-of-a-jquery-scroll-event
$(".container").scroll(function(event){
    var st = $(this).scrollTop();

    // Scroll down to hide chrome
    if (st > lastScrollTop && visible && lastScrollTop != 0){
        console.log("Hide!");
        header.addClass("hidden");
        visible = false;
    }
    // Scroll up to show chrome
    else if (st <= lastScrollTop && !visible){
        console.log("Show!");
        header.removeClass("hidden");
        visible = true;

    }
    lastScrollTop = st;
});

// Submit new URL
$(".tabs").on("keypress", "input", function(e) {
    if(e.which == 13) {
        var new_url = $(this).val();
        if ( new_url !== "" ) {
            iframe.attr('src', new_url);
            return false;
        }
    }
});

// When a new page is visited, reshow the header and scroll container to top
$('iframe').load(function() {
    console.log("New Page");
     $(".container").scrollTop(0);
    header.removeClass("hidden");
    visible = true;
});

$('#back').click(function(){
    console.log("Back Page");
    parent.history.back();
    $("#forward").removeClass("disabled");
    return false;
});

$('#forward').click(function(){
    console.log("Forward Page");
    parent.history.forward();
    return false;
});

// New tab
$('#newTab').click(function(){
    console.log("New Tab");
    $(".current").removeClass("current");
    $(".tabs").append(tabTemplate);
    numTabs++;
    setTimeout(function()
    {
        setTabWidth();
    }, 200);
    iframe.attr('src', default_url);
});

// Close tab
$(".tabs").on("click", '.ion-android-close', function(){
    var tab = $(this).parent(".tab");
    if(tab.hasClass("current")){
        console.log("Close Current Tab");
        tab.remove();
        $(".tab").last().addClass("current");
        iframe.attr('src', $(".current input").val());

    }
    else{
        console.log("Close Tab");
        tab.remove();
    }

    numTabs--;
    setTabWidth();
});

$(window).ready(function() {
    // Typing-Effect :
    var typing_bool = false;
    var typing_index = 0;
    var li_index = 0;
    var li_length = $(".typing-text>ul>li").length;

    var typing_text = $(".typing-text>ul>li").eq(li_index).text();
    typing_text = typing_text.split("");

    if(typing_bool == false){
        typing_bool = true;
        var tyInt = setInterval(typing2, 50);
    }

    function typing2(){
        $(".typing2 ul li").removeClass("on");
        $(".typing2 ul li").eq(li_index).addClass("on");
        if(typing_index < typing_text.length){
            $(".typing2 ul li").eq(li_index).append(typing_text[typing_index]);
            typing_index++;
        
        } else {
            if (li_index < li_length - 1) {
                li_index++;
                typing_index = 0;
                typing_bool = false;
                typing_text = $(".typing-text>ul>li").eq(li_index).text();

                clearInterval(tyInt);
            
                setTimeout(function () {
                    tyInt = setInterval(typing2, 50);
                }, 750);

            } else if (li_index == li_length - 1) {
                clearInterval(tyInt);
            }
        }
    }
});
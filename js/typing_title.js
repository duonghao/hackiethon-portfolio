$(window).ready(function() {
    // Typing-Effect :
    var typing_bool = false;
    var typing_index = 0;

    var typing_text = $(".typing-title").text();

    typing_text = typing_text.split("");

    if(typing_bool == false){
        typing_bool = true;
        var tyInt = setInterval(typing_title, 100);
    }

    function typing_title(){
        if(typing_index < typing_text.length){
            $(".typing1").append(typing_text[typing_index]);
            typing_index++;
        
        } else {
            clearInterval(tyInt);
        }
    }
});
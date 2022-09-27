$(window).ready(function() {
    // Typing-Effect :
    var typing_bool = false;
    var typing_index = 0;

    var typing_text = $(".typing-txt").text();

    typing_text = typing_text.split("");

    if(typing_bool == false){
        typing_bool = true;
        var tyInt = setInterval(typing, 100);
    }

    function typing(){
        if(typing_index < typing_text.length){
            $(".typing").append(typing_text[typing_index]);
            typing_index++;
        
        } else {
            clearInterval(tyInt);
        }
    }
});

// Java-functions : 
function hey() {
    alert('test!');
}
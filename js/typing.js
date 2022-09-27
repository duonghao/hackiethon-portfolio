document.addEventListener("DOMContentLoaded", function() {
    typingTextClass = document.querySelector(".typing-txt");
    typingClass = document.querySelector(".typing");
    typingTextClass1 = document.querySelector(".typing-txt1");
    typingClass1 = document.querySelector(".typing1");
    typing(typingTextClass, typingClass);
    typing(typingTextClass1, typingClass1);
});

function typing(typingTextClass, typingClass) {
        // Typing-Effect :
        let typing_bool = false;
        let typing_index = 0;
    
        let typing_text = typingTextClass.textContent;
    
        typing_text = typing_text.split("");
    
        if(typing_bool == false){
            typing_bool = true;
            let tyInt = setInterval(typing, 100);
        }
    
        function typing(){
            if(typing_index < typing_text.length){
                typingClass.textContent += (typing_text[typing_index]);
                typing_index++;
            
            } else {
                clearInterval(tyInt);
            }
        }
};
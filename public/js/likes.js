
function change()
{

    let element=document.getElementById("likeme_change");
    if(element.className=="fa-regular fa-thumbs-up")
    {
        
         
        element.classList.remove("fa-regular");
        element.classList.remove("fa-thumbs-up");
        element.className="fa-solid fa-thumbs-up";
        
    }
    else{
        
       
        element.classList.remove("fa-regular");
        element.classList.remove("fa-thumbs-up");
        
        element.className="fa-regular fa-thumbs-up";

    }

}
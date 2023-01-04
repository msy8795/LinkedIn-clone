
function change(id)
{
    const post_id = id.substring(3);
    
    const full_elem ="likeme_change_" + post_id ;
    let element=document.getElementById(full_elem);
    
    if(element.className=="fa-regular fa-thumbs-up")
    {
        
         
        element.classList.remove("fa-regular");
        element.classList.remove("fa-thumbs-up");
        element.className="fa-solid fa-thumbs-up";
        handleLike(post_id);
        
    }
    else{
        
       
        element.classList.remove("fa-regular");
        element.classList.remove("fa-thumbs-up");
        
        element.className="fa-regular fa-thumbs-up";
        handleDisLike(post_id);

    }

}

async function handleLike(id){
 
    const response = await fetch("/post/like/" + id , {
        method:"GET",
        headers :{
          "Accept":"application/json",
          "Content-Type" : "application/json"
        }
    
       });
    
       const res =  await response.json();
       if(res.status == 201){
        //   alert("Post Deleted!")
          window.location.href = "/";
       }
       else{
        alert("Some Error Occured");
       }


}

async function handleDisLike(id){
 
    const response = await fetch("/post/dislike/" + id , {
        method:"GET",
        headers :{
          "Accept":"application/json",
          "Content-Type" : "application/json"
        }
    
       });
    
       const res =  await response.json();
       if(res.status == 201){
        //   alert("Post Deleted!")
          window.location.href = "/";
       }
       else{
        alert("Some Error Occured");
       }


}
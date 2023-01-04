

let post_liked = [];
if(localStorage.getItem("liked_posts") == null){
    localStorage.setItem("liked_posts" , JSON.stringify(post_liked))
}

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
        let liked_posts_array = JSON.parse(localStorage.getItem("liked_posts"));
        
        if(isElementPresent(post_id , liked_posts_array) == -1){
            liked_posts_array.push(post_id);
        }
        
        localStorage.setItem("liked_posts" , JSON.stringify(liked_posts_array))
        handleLike(post_id);
       
       
        
    }
    else{
        
       
        element.classList.remove("fa-solid");
        element.classList.remove("fa-thumbs-up");
        
        element.className="fa-regular fa-thumbs-up";
        let liked_posts_array = JSON.parse(localStorage.getItem("liked_posts"));

        const index = liked_posts_array.indexOf(post_id);
if (index > -1) { 
    liked_posts_array.splice(index, 1); 
}

        
        localStorage.setItem("liked_posts" , JSON.stringify(liked_posts_array))
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

function handleLikeButtonColor(){
    if(localStorage.getItem("liked_posts") != null){
        let post_array = JSON.parse(localStorage.getItem("liked_posts"));
        post_array.map(e =>{
            const full_elem ="likeme_change_" + e ;
            let element=document.getElementById(full_elem);
            element.classList.remove("fa-regular");
            element.classList.remove("fa-thumbs-up");
            element.className="fa-solid fa-thumbs-up";

        });
    }
}

handleLikeButtonColor();

function isElementPresent(element, arr ){

    return arr.indexOf(element);

}
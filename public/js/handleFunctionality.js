const handleSave = (id) =>{
    
    var posts = [];
    posts = JSON.parse(localStorage.getItem('saved_post'));
    localStorage.removeItem('saved_post');
    if(posts != null) posts = [...posts ,id];
    else posts  = [id];
    localStorage.setItem('saved_post',JSON.stringify(posts));
    alert("Post is Saved in Local Storage")

}

const handleDelete = async(id)=>{

    const response = await fetch("/post/" + id , {
        method:"delete",
        headers :{
          "Accept":"application/json",
          "Content-Type" : "application/json"
        }
    
       });
    
       const res =  await response.json();
       if(res.status == 200){
          alert("Post Deleted!")
          window.location.href = "/";
       }
       else{
        alert("Some Error Occured");
       }
     
}

const handleReport = async(id) =>{

    const response = await fetch("/post/" + id , {
        method:"PUT",
        headers :{
          "Accept":"application/json",
          "Content-Type" : "application/json"
        }
    
       });
    
       const res =  await response.json();
       if(res.status == 200){
          alert("Post Reported!")
          window.location.href = "/";
       }
       else{
        alert("Some Error Occured");
       }

}


const postComment = async(id) =>{
    const element = "user_comment_"+id
    const data = document.getElementById(element).value;
    // alert("data is: " + data);
    
    
    const response = await fetch("/comment/" + id , {
      method:"PATCH",
      headers :{
        "Accept":"application/json",
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        data
      })
  
     });
  
     const res =  await response.json();
     if(res.status == 201){
        alert("Comment is Added to this Post")
        window.location.href = "/";
     }
     else{
      alert("Some Error Occured");
     }

      

}
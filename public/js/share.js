function buttonclicked(id){
  navigator.clipboard.writeText("http://localhost/post/" + id).then(() => {
    alert("Share link is copied to clipboard!")
  },() => {
    console.error('Failed to copy');
  });
}

const submitForm = async()=>{
  const text = document.getElementById("exampleFormControlTextarea1").value;
  const title = document.getElementById("exampleInputTitle").value;
  const photo = localStorage.getItem("image_url");

   const response = await fetch("/publish" , {
    method:"POST",
    headers :{
      "Accept":"application/json",
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      title,photo,text
    })

   });

   const res =  await response.json();
   if(res.status == 201){
      alert("Post Published!");
      localStorage.removeItem("image_url");
      window.location.href = "/";

   }
   else{
    alert("An Unknown Error Occured!")
   }


}
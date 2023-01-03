

document.getElementById("share").addEventListener("click",()=>{
    navigator.clipboard.writeText("This is the text to be copied").then(() => {
        alert("share link is copied to clipboard!")
      },() => {
        console.error('Failed to copy');
        
      });

      
})
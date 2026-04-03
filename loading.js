
window.addEventListener("load" , function(){
    let content = document.getElementById('content')
let loading = document.getElementById('loading')
   setTimeout(() => {
        loading.style.display = 'none';
        content.style.display = 'block';
    }, 3000);
})


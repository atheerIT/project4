document.addEventListener('DOMContentLoaded', render)

document.addEventListener('click', event=>{
    const element = event.target
    if (element.className === 'edit'){
        const p = element.parentElement.children[0]
        const textInput = element.parentElement.children[1]
        const save = element.parentElement.children[3]
        textInput.value = element.parentElement.children[0].textContent
        p.style.display = 'none'
        textInput.style.display = 'block'
        save.style.display = 'block'
        element.style.display = 'none'
    }
    if (element.className === 'save'){
        const p = element.parentElement.children[0]
        const edit = element.parentElement.children[2]
        const textInput = element.parentElement.children[1]
        const save = element.parentElement.children[3]
        fetch(`/editPost?newPost=${textInput.value}&id=${element.parentElement.id}`)
        .then(res=>res.json())
        .then(data=>{
            p.textContent = data.post
        })
        .catch(err=>console.log('Error:', err))
        textInput.style.display = 'none'
        save.style.display = 'none'
        p.style.display = 'block'
        edit.style.display = 'block'
    }
    if (element.className === 'like'){
        fetch(`/like?id=${element.dataset.like}`)
        .then(res=>res.json())
        .then(data=>{
            element.parentElement.children[1].textContent = data.likes
            render()
        })
        .catch(err=>console.log(err))
    }
})

function render() {
    document.querySelectorAll('.like').forEach(a=>{
        fetch(`/isLiked?id=${a.dataset.like}`)
        .then(res=>res.json())
        .then(data=>{
            if (data.isLiked){
                a.innerHTML= `<svg width="20px" height="20px" viewBox="0 0 16 16" class="bi bi-suit-heart-fill" fill="red" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
              </svg>`
            }else{
                a.innerHTML=`<svg width="20px" height="20px" viewBox="0 0 16 16" class="bi bi-suit-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 6.236l.894-1.789c.222-.443.607-1.08 1.152-1.595C10.582 2.345 11.224 2 12 2c1.676 0 3 1.326 3 2.92 0 1.211-.554 2.066-1.868 3.37-.337.334-.721.695-1.146 1.093C10.878 10.423 9.5 11.717 8 13.447c-1.5-1.73-2.878-3.024-3.986-4.064-.425-.398-.81-.76-1.146-1.093C1.554 6.986 1 6.131 1 4.92 1 3.326 2.324 2 4 2c.776 0 1.418.345 1.954.852.545.515.93 1.152 1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
              </svg>`
            }
        })
        .catch(err=>console.log('Error:', err))  
    })
};
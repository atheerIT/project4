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
    if(element.className === 'save'){
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
})     





document.addEventListener('click', event=>{
    const element = event.target
    if (element.className === 'edit'){
        const item = element.parentElement.children[2]
        const newText = document.createElement('textarea')
        newText.id='postText'
        const save = document.createElement('button')
        save.className= 'save'
        save.textContent = 'Save'
        newText.value = item.children[0].textContent
        item.children[0].style.display = 'none'
        element.style.display = 'none'
        item.append(newText)
        item.append(save)

    }
    if (element.className==='save') {
        const item = element.parentElement
        const textArea = document.querySelector('#postText')
        const save = document.querySelector('.save')
        const text = document.createElement('p')
        fetch(`/editPost?newPost=${textArea.value}&id=${item.id}`)
        .then(res=>res.json())
        .then(data=>{
            text.textContent=data.post
        })
        .catch(err=>console.log(err))
        textArea.style.display = 'none'
        save.style.display = 'none'
        item.append(text)
    }
})     




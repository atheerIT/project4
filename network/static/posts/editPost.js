document.addEventListener('DOMContentLoaded', render)

document.addEventListener('click', event => {
    const element = event.target
    if (element.className === 'edit') {
        const p = element.parentElement.children[0]
        const textInput = element.parentElement.children[1]
        const save = element.parentElement.children[3]
        textInput.value = element.parentElement.children[0].textContent
        p.style.display = 'none'
        textInput.style.display = 'block'
        save.style.display = 'block'
        element.style.display = 'none'
    }
    if (element.className === 'save') {
        const p = element.parentElement.children[0]
        const edit = element.parentElement.children[2]
        const textInput = element.parentElement.children[1]
        const save = element.parentElement.children[3]
        fetch(`/editPost?newPost=${textInput.value}&id=${element.parentElement.id}`)
            .then(res => res.json())
            .then(data => {
                p.textContent = data.post
            })
            .catch(err => console.log('Error:', err))
        textInput.style.display = 'none'
        save.style.display = 'none'
        p.style.display = 'block'
        edit.style.display = 'block'
    }
    if (element.className === 'like') {
        fetch(`/like?id=${element.dataset.like}`)
            .then(res => res.json())
            .then(data => {
                element.parentElement.children[1].textContent = data.likes
                render()
            })
            .catch(err => console.log(err))
    }
})

function render() {
    const fileSelect = document.querySelector('#fileSelect')
    const fileElement = document.querySelector('#fileElement')
    fileSelect.addEventListener('click', event => {
        if (fileElement) {
            fileElement.click()
        }
        event.preventDefault()
    })
    const postText = document.querySelector('#postText')
    document.querySelector('#post').disabled = true
    postText.addEventListener('keyup', event => {
        if (postText.value.length <= 0) {
            document.querySelector('#post').disabled = true
        }
        else {
            document.querySelector('#post').disabled = false
        }
    })
    document.querySelectorAll('.like').forEach(a => {
        fetch(`/isLiked?id=${a.dataset.like}`)
            .then(res => res.json())
            .then(data => {
                if (data.isLiked) {
                    a.src = '../static/icon/unlike.jpg'
                } else {
                    a.src = '../static/icon/like.jpg'
                }
            })
            .catch(err => console.log('Error:', err))
    })
};
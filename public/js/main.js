const closeBtn = document.querySelectorAll('.close-btn')

closeBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        event.currentTarget.parentNode.remove()
    })
})
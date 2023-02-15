function validateTextarea() {
    const textarea = document.querySelector('.textarea')
    const result = document.querySelector('.result')
    const btn = document.querySelector('.btn')
    const limit = 10

    result.textContent = 0 + "/" + limit

    textarea.addEventListener("input", () => {
        const textLength = textarea.value.length
        result.textContent = textLength + "/" + limit

        if (textLength > limit) {
            textarea.style.borderColor = "#ff2851"
            result.style.color = "#ff2851"
            btn.disabled = true
        }
        else {
            textarea.style.borderColor = "#31821b"
            result.style.color = "#31821b"
            btn.disabled = false
        }
    })
}
validateTextarea()
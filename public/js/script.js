const input = document.querySelector('.url-input')
const form = document.querySelector('.shortener-form')
const results = document.querySelector('#results')
const resultTemplate = document.querySelector('#result-template')
const urlBox = document.querySelector('.url-box')

form.addEventListener('submit', e => {
    e.preventDefault()

    fetch('/shorten', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: input.value
        })
    })
    .then(response => response.json())
    .then((data) => {
        results.style.display = 'block'
        const urlItem = resultTemplate.content.cloneNode(true)
        const fullUrl = urlItem.querySelector('[data-fullurl]')
        if(data.url.fullUrl.length > 25) {
            fullUrl.innerText = data.url.fullUrl.slice(0, 25) + '...'
        } else {
            fullUrl.innerText = data.url.fullUrl
        }

        const shorturl = urlItem.querySelector('[data-shorturl]')
        shorturl.innerText = `/${data.url.shortUrl}`
        shorturl.href = `/${data.url.shortUrl}`

        urlBox.appendChild(urlItem)
    })
    input.value = ''
})

document.addEventListener('click', e => {
    if(e.target.matches('.copy-btn')) {
        const url = e.target.parentElement.previousElementSibling.querySelector('[data-shorturl]')
        navigator.clipboard.writeText(url.href)
        e.target.nextElementSibling.style.display = 'block'
        setTimeout(()=> {
            e.target.nextElementSibling.style.display = 'none'
        }, 1000)
    } 
})
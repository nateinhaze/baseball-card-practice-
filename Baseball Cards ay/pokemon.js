/*async function getPokemonData(url) {
const response = await fetch('http://example.com/movies.json')
return await response.json()
}*/



async function getAPIData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }
}

const theData = getAPIData('https://pokeapi.co/api/v2/pokemon/').then(data => {
    for (const pokemon of data.results) {
        getAPIData(pokemon.url).then(pokedata => {
            populateDOM(pokedata)
        })
    }
})

let mainArea = document.querySelector('main')

function populateDOM(single_pokemon) {
    let pokeScene = document.createElement('div')
    let pokeCard = document.createElement('div')
    let pokeFront = document.createElement('div')
    let pokeBack = document.createElement('div')

    fillCardFront(pokeFront, single_pokemon)
    fillCardBack(pokeBack, single_pokemon)

    pokeScene.setAttribute('class', 'scene')
    pokeCard.setAttribute('class', 'card')
    pokeCard.appendChild(pokeFront)
    pokeCard.appendChild(pokeBack)
    pokeScene.appendChild(pokeCard)

    mainArea.appendChild(pokeScene)

        pokeCard.addEventListener('click', function() {
            pokeCard.classList.toggle('is-flipped')
    })
}

function fillCardFront(pokeFront, data) {
    pokeFront.setAttribute('class', 'card__face card__face--front')
    let name = document.createElement('p')
    let pic = document.createElement('img')
    pic.setAttribute('class', 'picDivs')
    let pokeNum = getPokeNumber(data.id)
    pokeFront.appendChild(name)

    pic.src = `../pics/${pokeNum}.png`

    pokeFront.appendChild(pic)
    pokeFront.appendChild(name)
}

function fillCardBack(pokeBack, data) {
    pokeBack.setAttribute('class','card__face card__face--back')
    let pokeOrder = document.createElement('p')
    let pokeHP = document.createElement('h5')
    pokeOrder.textContent = data.order
    //pokeHP.textContent = data.stats[0].base_stat
    pokeBack.appendChild(pokeOrder)
    pokeBack.appendChild(pokeHP)
}

function getPokeNumber(charURL) {
    let end = charURL.lastIndexOf('/')
    let charID = charURL.substring(end - 2, end)
    if (charID.indexOf('/') !== -1) {
    return `00${charID.slice(1, 2)}`
    } else {
        return `0${charID}`
    }
}















//pokeOrder.textContent = `#${data.id} ${data.name[0].toUpperCase()}${data.name.slice(1)}
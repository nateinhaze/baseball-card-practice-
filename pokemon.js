/*async function getPokemonData(url) {
const response = await fetch('http://example.com/movies.json')
return await response.json()
}*/


//POKEMON API//
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
//Getting The DATA!
const theData = getAPIData('https://pokeapi.co/api/v2/pokemon/').then(data => {
    for (const pokemon of data.results) {
        getAPIData(pokemon.url).then(pokedata => {
            populateDOM(pokedata, false)
        })
    }
})

//Javafunction for new pokemon - random pokemon generator
function addPoke() {
    var X = Math.floor((Math.random() * 130) + 20);
    var pokeURL = "https://pokeapi.co/api/v2/pokemon/" + X + "/"
    getAPIData(pokeURL).then(pokedata => {
        populateDOM(pokedata, true)
    })
}
//Using Main as document
let mainArea = document.querySelector('main')

//Populating the DOM
function populateDOM(single_pokemon, addBefore) {
    let pokeScene = document.createElement('div')
    let pokeCard = document.createElement('div')
    let pokeFront = document.createElement('div')
    let pokeBack = document.createElement('div')

    //Card Front and Back as Single Pokemon
    fillCardFront(pokeFront, single_pokemon)
    fillCardBack(pokeBack, single_pokemon)

    pokeScene.setAttribute('class', 'scene')
    pokeCard.setAttribute('class', 'card')
    pokeCard.appendChild(pokeFront)
    pokeCard.appendChild(pokeBack)
    pokeScene.appendChild(pokeCard)

    //mainArea.appendChild(pokeScene)
    if (addBefore == true) {
        mainArea.prepend(pokeScene)
    }
    else {
        mainArea.appendChild(pokeScene)
    }

    pokeCard.addEventListener('click', function () {
        pokeCard.classList.toggle('is-flipped')
    })
}
//Front of the CARD!
function fillCardFront(pokeFront, data) {
    pokeFront.setAttribute('class', 'card__face card__face--front')
    let pokeName = document.createElement('p')
    pokeName.setAttribute('class', 'pokemon-name')
    let pic = document.createElement('img')
    pic.setAttribute('class', 'picDivs')
    let pokeNum = data.id
    // let pokeNum = getPokeNumber(data.id)

    //Pictures from png for now
    pic.src = data.sprites.front_default
    pokeName.textContent = data.forms[0].name

    pokeFront.appendChild(pic)
    pokeFront.appendChild(pokeName)
}
//Back of the CARD!
function fillCardBack(pokeBack, data) {
    pokeBack.setAttribute('class', 'card__face card__face--back')
    let pokeOrder = document.createElement('p')
    let pokeHP = document.createElement('h5')
    pokeOrder.textContent = data.order

    pokeHP.textContent = "HP:" + data.stats[5].base_stat
    pokeBack.appendChild(pokeOrder)
    pokeBack.appendChild(pokeHP)
}

//Getting the right pokemon #
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
var request = new XMLHttpRequest()

request.open('GET', 'https://api.spoonacular.com/recipes/complexSearch?apiKey=10b97d23b79640198cf4d71905dec024', true)

request.onload = function() {
  console.log(this.response)
  var data = JSON.parse(this.response)
  
  data.results.forEach((recipe) => {
    const card = document.createElement('div')
    card.setAttribute('class', 'card')
    
    const h1 = document.createElement('h1')
    h1.textContent = recipe.title
    
    document.getElementById('container').appendChild(card)
    
    card.appendChild(h1)
    
    console.log(recipe.title)
    console.log(recipe.img)
  })
}

request.send()
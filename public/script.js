var apiKey = "10b97d23b79640198cf4d71905dec024";

function getInfo(id, obj) {
  $.ajax({
    url:
      "https://api.spoonacular.com/recipes/" +
      id +
      "/information?apiKey=" + apiKey,
    method: "GET",
    success: function (res) {
      var temp_list = [];
      var list = document.createElement("ul");
      list.innerHTML += "<h2>Ingredients:</h2>";
      list.setAttribute("class", "ulist");
      for (i in res.extendedIngredients) {
        var item = document.createElement("li");
        var entry = res.extendedIngredients[i]["name"];
        temp_list.push(entry);
        item.appendChild(document.createTextNode(entry));
        list.appendChild(item);
      }
      var sourceLink = document.createElement("a");
      var linkText = document.createTextNode("Link to Recipe");
      sourceLink.appendChild(linkText);
      sourceLink.title = "Link to Recipe";
      sourceLink.href = res.sourceUrl;
      list.appendChild(sourceLink);

      obj.appendChild(list);

      //postIngredients(temp_list);
    }
  });
}

function postIngredients(list) {
  $.ajax({
    method: "POST",
    url:
      "https://api.spoonacular.com/recipes/visualizeIngredients?apiKey=" + apiKey,
    async: true,
    crossDomain: true,
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    data: list,
    success: function (res) {
      console.log(res);
    }
  });
}

function getInstructions(id, obj) {
  $.ajax({
    url:
      "https://api.spoonacular.com/recipes/" +
      id +
      "/analyzedInstructions?apiKey=" + apiKey,
    method: "GET",
    success: function (res) {
      var list = [];
      console.log(res[0]["steps"]);
      for (var i = 0; i < res[0]["steps"].length; i++) {
        var step = res[0]["steps"][i]["step"];
        console.log(step);
        list.push(step);
      }
      console.log(list);
    }
  });
}

function removePrevSearch(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function getRecipe(q) {
  $.ajax({
    url:
      "https://api.spoonacular.com/recipes/search?apiKey="+ apiKey +"&number=8&query=" +
      q,
    method: "GET",
    success: function (res) {
      removePrevSearch(document.getElementById("output"));
      for (var i = 0; i < res.results.length; i++) {
        var item = document.createElement("div");
        item.setAttribute("class", "card");
        var img = document.createElement("div");
        img.setAttribute("class", "img");
        img.innerHTML =
          "<img src='" + res.baseUri + res.results[i].image + "'width='300'/>";
        var info = document.createElement("div");
        info.setAttribute("class", "info");
        info.innerHTML +=
          "<h1>" +
          res.results[i].title.toUpperCase() +
          "</h1><br><p>Cook Time: Ready In " +
          res.results[i].readyInMinutes +
          " Minutes</p>";
        item.appendChild(img);
        item.appendChild(info);
        getInfo(res.results[i].id, item);
        getInstructions(res.results[i].id, item);
        document.getElementById("output").appendChild(item);
      }
    }
  });
}

function randRec() {
  var request = new XMLHttpRequest()

  request.open('GET','https://api.spoonacular.com/recipes/random?apiKey=' + apiKey, true)

  request.onload = function() {
    var data = JSON.parse(this.response)
    var item = document.createElement('div')
    item.setAttribute('class', 'card')

    var img = document.createElement("div");
    img.setAttribute("class", "img");
    var pic = document.createElement("img");
    pic.src = data.recipes[0].image;
    pic.width = 300;
    img.appendChild(pic);

    var info = document.createElement("div");
    info.setAttribute("class","info");

    var h1 = document.createElement('h1')
    h1.textContent = data.recipes[0].title;

    
    info.appendChild(h1);
    item.appendChild(img);
    item.appendChild(info);

    getInfo(data.recipes[0].id, item);
    document.getElementById('output').appendChild(item);
  }
  request.send()
}
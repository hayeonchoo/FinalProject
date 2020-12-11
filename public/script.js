var apiKey = "c3aec59948c940bbbae565e216ae6713";

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

      postIngredients(temp_list);
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
      "https://api.spoonacular.com/recipes/search?apiKey="+ apiKey +"&number=2&query=" +
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
    console.log(this.response)
    var data = JSON.parse(this.response)
      var item = document.createElement('div')
      item.setAttribute('class', 'card')

      var img = document.createElement("div");
      img.setAttribute("class", "img");
      img.setAttribute("src",data.recipes[0].baseUri + data.recipes[0].image)

      var info = document.createElement("div");
      info.setAttribute("class","info");

      var h1 = document.createElement('h1')
      h1.textContent = data.recipes[0].title

      
      info.appendChild(h1)
      item.appendChild(img)
      item.appendChild(info)

      getInfo(data.recipes[0].id, item);
      document.getElementById('output').appendChild(item);
  }
  request.send()
}

/*
function getInfo(id) {
  $.ajax({
    url:
      "https://api.spoonacular.com/recipes/" +
      id +
      "/information?apiKey=0b5ee02fec15409fa6f231e40cda2fe6",
    method: "GET",
    success: function (res) {
      var temp_list = [];
      for (i in res.extendedIngredients) {
        var entry = res.extendedIngredients[i]["name"];
        temp_list.push(entry);
      }
      return temp_list;
    }
  });
}

function formRecipe(form) {
  $.ajax({
    method: "POST",
    url:
      "https://api.spoonacular.com/recipes/visualizeRecipe?apiKey=0b5ee02fec15409fa6f231e40cda2fe6",
    contentType: false,
    processData: false,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    mimeType: 'multipart/form-data',
    data: {form},
    success: function (res) {
      console.log("before");
      console.log(res[0]);
      //document.getElementById("output").appendChild(res)
      console.log("after");
    }
  });
}

function getInstructions(id, obj) {
  $.ajax({
    url:
      "https://api.spoonacular.com/recipes/" +
      id +
      "/analyzedInstructions?apiKey=0b5ee02fec15409fa6f231e40cda2fe6",
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
      return list;
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
      "https://api.spoonacular.com/recipes/search?apiKey=0b5ee02fec15409fa6f231e40cda2fe6&number=1&query=" +
      q,
    method: "GET",
    success: function (res) {
      //removePrevSearch(document.getElementById("output"));
      for (var i = 0; i < res.results.length; i++) {
        var formData = new FormData();
        formData.append("title", res.results[i].title);
        formData.append("image", res.results[i].image);
        formData.append("ingredients", getInfo(res.results[i].id));
        formData.append("instructions", getInstructions(res.results[i].id));
        formData.append("Cook Time", res.results[i].readyInMinutes);
        formData.append("servings",res.results[i].servings);
        formData.append("mask","ellipseMask");
        formData.append("backgroundImage","background1");
        formData.append("author",res.results[i].sourceName);
        formData.append("backgroundColor","#ffffff");
        formData.append("fontColor","#333333")
        formData.append("source","spoonacular.com")

        formRecipe(formData);
      }
    }
  });
}
*/
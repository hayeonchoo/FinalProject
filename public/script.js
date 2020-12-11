function getInfo(id, obj) {
  $.ajax({
    url:
      "https://api.spoonacular.com/recipes/" +
      id +
      "/information?apiKey=0b5ee02fec15409fa6f231e40cda2fe6",
    type: "GET",
    success: function (res) {
      var title = document.createElement("h2");
      title.appendChild(document.createTextNode("Ingredients:"));
      obj.appendChild(title);
      var list = document.createElement("ul");
      list.setAttribute("class","ulist");
      for (i in res.extendedIngredients) {
        var item = document.createElement("li");
        var entry = res.extendedIngredients[i]["name"];
        item.appendChild(document.createTextNode(entry));
        list.appendChild(item);
      }
      obj.appendChild(list);
      var sourceLink = document.createElement("a");
      var linkText = document.createTextNode("Link to Recipe");
      sourceLink.appendChild(linkText);
      sourceLink.title = "Link to Recipe";
      sourceLink.href = res.sourceUrl;
      obj.appendChild(sourceLink);
    }
  });
}

function getInstructions(id, obj) {
  $.ajax({
    url:
      "https://api.spoonacular.com/recipes/" +
      id +
      "/analyzedInstructions?apiKey=0b5ee02fec15409fa6f231e40cda2fe6",
    type: "GET",
    success: function (res) {
      var list = [];
      console.log(res[0]['steps']);
      for (var i = 0; i < res[0]['steps'].length; i++){
        var step = res[0]['steps'][i]['step'];
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
      "https://api.spoonacular.com/recipes/search?apiKey=0b5ee02fec15409fa6f231e40cda2fe6&number=1&query=" +
      q,
    type: "GET",
    success: function (res) {
      removePrevSearch(document.getElementById("output"));
      for (var i = 0; i < res.results.length; i++) {
        var item = document.createElement("div");
        item.setAttribute("class", "card");
        item.innerHTML =
          "<h1>" +
          res.results[i].title +
          "</h1><br><img src='" +
          res.baseUri +
          res.results[i].image +
          "'width='400' /><br>Cook Time: Ready In " +
          res.results[i].readyInMinutes +
          " Minutes<br>";
        getInfo(res.results[i].id, item);
        getInstructions(res.results[i].id, item);
        document.getElementById("output").appendChild(item);
      }
    }
  });
}

<font size="6" color="#006400">
<b>Formatting some text.</b>
</font>
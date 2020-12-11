function getInfo(id, obj) {
  $.ajax({
    url:
      "https://api.spoonacular.com/recipes/" +
      id +
      "/information?apiKey=f7c1bb91a6834ff68b06205d141ba628",
    type: "GET",
    success: function (res) {
      var title = document.createElement("h2");
      title.appendChild(document.createTextNode("Ingredients:"));
      obj.appendChild(title);
      for (i in res.extendedIngredients) {
        var item = document.createElement("li");
        var entry = res.extendedIngredients[i]["name"];
        console.log(entry);
        item.appendChild(document.createTextNode(entry));
        obj.appendChild(item);
      }
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
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("output").innerHTML += this.responseText;
    }
  };
  xhttp.open(
    "POST",
    "https://api.spoonacular.com/recipes/analyzeInstructions",
    true
  );
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
}

function removePrevSearch(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function getRecipe(q) {
  $.ajax({
    url:
      "https://api.spoonacular.com/recipes/search?apiKey=f7c1bb91a6834ff68b06205d141ba628&number=1&query=" +
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
          " Minutes";
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
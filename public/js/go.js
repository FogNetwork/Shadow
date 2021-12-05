function hidesugg() {
  document.getElementById("search").style.borderRadius = "100px";
  document.getElementById("suggestions").style.display = "none"
}

function showsugg() {
  document.getElementById("search").style.borderRadius = "25px 25px 0 0";
  document.getElementById("suggestions").style.display = "inherit"
}

function sugggo(suggtext) {
  go(suggtext)
  document.getElementById("search").value = ""
}

window.addEventListener("load", function() {
var search = document.getElementById("search")
search.addEventListener("keyup", function(event) {
    event.preventDefault()
    if (event.keyCode == 13)
        if (this.value !== "") {
             go(this.value)
             this.value = ""
        }
});
search.addEventListener("keyup", function(event) {
event.preventDefault()
if (search.value.trim().length !== 0) {
document.getElementById("suggestions").innerText = ""
showsugg()
async function getsuggestions() {
var term = search.value || "";
var response = await fetch("/suggestions?q=" + term);
var result = await response.json();
var suggestions = result.slice(0, 8);
for (sugg in suggestions) {
var suggestion = suggestions[sugg]
var sugg = document.createElement("div")
sugg.innerText = suggestion
sugg.setAttribute("onclick", "sugggo(this.innerText)")
sugg.className = "sugg"
document.getElementById("suggestions").appendChild(sugg)
}
}
getsuggestions()
} else {
hidesugg()
}
});

search.addEventListener("click", function(event) {
if (search.value.trim().length !== 0) {
showsugg()
}
})

})

function go(url) {
var web = document.getElementById("web")
var webnav = document.getElementById("webnav")
var settingsbtn = document.getElementById("settingsbtn")
web.src = "/service/gateway?url=" + url
web.style.display = "initial"
webnav.style.display = "flex"
settingsbtn.style.display = "none"
}

function closeweb() {
var web = document.getElementById("web")
var webnav = document.getElementById("webnav")
var settingsbtn = document.getElementById("settingsbtn")
var search = document.getElementById("search")
web.src = ""
web.style.display = "none"
webnav.style.display = "none"
settingsbtn.style.display = "initial"
search.focus()
}

function reloadweb() {
var web = document.getElementById("web")
web.contentWindow.location.reload()
}

function settings() {
var settings = document.getElementById("settings")
if (settings.style.display == "none") {
settings.style.display = "initial"
} else if (settings.style.display == "initial") {
settings.style.display = "none"
} else {
settings.style.display = "initial"
}
}

function settitle(text) {
  if (text !== "") {
  document.title = text
  localStorage.setItem("title", text)
  } else {
  document.title = "Shadow"
  localStorage.removeItem("title")
  }
}

function seticon(url) {
  if (url !== "") {
  document.querySelector("link[rel='shortcut icon']").href = url
  localStorage.setItem("favicon", url)
  } else {
  document.querySelector("link[rel='shortcut icon']").href = "/img/logo.png"
  localStorage.removeItem("favicon")
  }
}

window.addEventListener('load', function() {
var title = localStorage.getItem("title")
var favicon = localStorage.getItem("favicon")
var settitle = document.getElementsByClassName("settab")[0]
var setfav = document.getElementsByClassName("settab")[1]

if (title !== null) {settitle.value = title}
if (favicon !== null) {setfav.value = favicon}
})

function hidesettings(){
if(window.event.srcElement.id !== "settings"  && window.event.srcElement.id !== "settingsbtn" && window.event.srcElement.className !== "settitle" && window.event.srcElement.className !== "settab"){
document.getElementById("settings").style.display = "none";
}
if(window.event.srcElement.id !== "search" && window.event.srcElement.id !== "suggestions"){
hidesugg()
}
}

document.onclick = hidesettings
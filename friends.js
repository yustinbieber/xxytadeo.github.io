//friend1

'use strict';
fetch(`${"https://tokyo.tokyocity.repl.co/avatar/684902555670806546"}`, {
  method : "GET",
  mode : "cors"
}).then(function(responseJson) {
  if (responseJson.ok) {
    return responseJson.json();
  }
  return Promise.reject(responseJson);
}).then(function(fieldDescribe) {
  console.log(fieldDescribe.url);
  document.getElementById("jeje").src = fieldDescribe.url;
}).catch(function($ownerNode) {
  console.warn("Something went wrong.", $ownerNode);
  document.getElementById("jeje");
});

fetch("https://tokyo.tokyocity.repl.co/user/684902555670806546").then((res) => res.json()).then((json) => { Object.keys(json).forEach((key) => { const elem = document.getElementsByClassName("jeje"); elem[0].textContent = json[key]; }); })

//friend2

'use strict';
fetch(`${"https://tokyo.tokyocity.repl.co/avatar/864714779833401374"}`, {
  method : "GET",
  mode : "cors"
}).then(function(responseJson) {
  if (responseJson.ok) {
    return responseJson.json();
  }
  return Promise.reject(responseJson);
}).then(function(fieldDescribe) {
  console.log(fieldDescribe.url);
  document.getElementById("valu").src = fieldDescribe.url;
}).catch(function($ownerNode) {
  console.warn("Something went wrong.", $ownerNode);
  document.getElementById("valu");
});

fetch("https://tokyo.tokyocity.repl.co/user/864714779833401374").then((res) => res.json()).then((json) => { Object.keys(json).forEach((key) => { const elem = document.getElementsByClassName("valu"); elem[0].textContent = json[key]; }); })

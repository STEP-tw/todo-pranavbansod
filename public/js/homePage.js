const appendAllToDoTitlesToPage = function() {
  let userName = document.getElementById('userName').innerText;
  let currUserAllToDo = data[`${userName}`]['allToDo'];
  let toDoTitles = Object.keys(currUserAllToDo)
  let listDiv = document.getElementById("todoLists");
  let ul = document.createElement("ul");
  toDoTitles.forEach(function(toDoTitle) {
    let li = document.createElement("li");
    let a = document.createElement('a');
    a.href = '/toDo.html';
    let button = document.createElement("button");
    button.id = toDoTitle;
    button.innerText = toDoTitle;
    button.onclick = setTitleToCookie;
    a.appendChild(button);
    li.appendChild(a);
    ul.appendChild(li);
  })
  listDiv.appendChild(ul);
}


const setTitleToCookie = function(event) {
  let toDoTitle = event.target.id
  document.cookie = `currentToDo = ${toDoTitle}`;
}

window.onload = appendAllToDoTitlesToPage;

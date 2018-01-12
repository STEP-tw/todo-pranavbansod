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
    a.appendChild(li);
    li.innerText = toDoTitle;
    ul.appendChild(a);
  })
  listDiv.appendChild(ul);
}

window.onload = appendAllToDoTitlesToPage;

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = process.env.PORT  || 8000;
const path = require('path');
var val = 0;

app.use(bodyParser.json());


class ToDo {
  constructor(title, status, description) {
    this.id = ++val;
    this.title = title;
    this.status = status;
    this.description = description;
  }
}

var array = [];
function addToDo(todo) {
  array.push(todo);
}
function getToDos() {
  return array;
}


function getId() {
  //  loadTodosFromFile();
  const maxId = array.reduce(function (max, todo) {
    return Math.max(max, todo.id);
  }, 0);

  // Set val to the maximum id
  val = maxId;
}
function find(id) {

  //   loadTodosFromFile()
  for (var i = 0; i < array.length; i++) {
    if (array[i].id == id) {
      return i;
    }
  } return -1;
}
function postToDo(request, response) {
  //loadTodosFromFile()

  console.log("just checking something")
  getId()
  var title = request.body.title;
  var description = request.body.description;
  var status = request.body.status;

  var todo = new ToDo(title, status, description)
  addToDo(todo);

  response.status(200).json(todo);
  writeTodosToFile()
}

function getTodo(req, res) {
  var id = req.params.id;
  var i = find(id);
  if (i != -1) {
    res.status(200).json(array[i]);
  } else {
    res.status(404).send('Not Found');
  }
}

function allTodos(req, res) {

  res.status(200).json(array);
}

function putToDo(request, response) {
  var id = request.params.id;
  var i = find(id);
  if (i != -1) {
    console.log("putToDo")
    array[i].status = request.body.status;
    array[i].description = request.body.description;
    array[i].title = request.body.title;
    response.status(200).json(array[i]);
  } else {
    response.status(404).send('Not Found');
  }
  writeTodosToFile()
}

function deleteToDo(request, response) {
  var id = request.params.id;
  var i = find(id);
  if (i != -1) {
    array.splice(i, 1);
    response.status(200).send('OK');
  } else {
    response.status(404).send('Not Found');
  }
  writeTodosToFile()
}

function start() {
  console.log(`Server is running on port ${port}`);
  loadTodosFromFile()
}

function helpRead(err, data) {
  if (err) {
    console.log("Error loading todos : " + err);
    return
  }
  array = JSON.parse(data);
  console.log("Data loaded from file");
}
function loadTodosFromFile() {
  fs.readFile("data/todo.json", "utf8", helpRead);
}

function helpWrite(err) {
  if (err) {
    console.log("Error saving todos : " + err);
    return
  }
  console.log("Todos saved ")

}
function writeTodosToFile() {

  fs.writeFile("data/todo.json", JSON.stringify(array), helpWrite);
}

function middleware(req, res, next) {
  // loadTodosFromFile()

  console.log("Setting")
  next();
}

//   app.get('/', function(req, res) {
//     fs.readFile(__dirname + 'index.html', 'utf8', function(err, text){
//       res.send(text);
//   })
// });


app.use(middleware)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

//app.get('/', sendFile('index.html'));
app.get('/todos', allTodos)
app.get('/todos/:id', getTodo)
app.post('/todos', postToDo)
app.put('/todos/:id', putToDo)
app.delete('/todos/:id', deleteToDo)

app.listen(port, start);
module.exports = app;

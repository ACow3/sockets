const express = require('express')
const app = express();
const port = 8000;

app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const server = app.listen(port, function(){
    console.log(`Listening on port : ${port}`)
})

const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.render('index');
})

var users = [];

io.on('connection', function (socket) { //2

    // Whenever new user is added below is created
    socket.on('addNewUser', function (data) {
        console.log(data)
        // Validations to improve later
        // var isValid = validateUser(data)
        // if(isValid){
            newUser = {
                'id' : socket.id,
                'name' : data
            }
            socket.emit('newUser', newuser)
            users.push(newUser);
        // } else {
        //     socket.emit('errmsg', 'User already exists')
        // }
    })

    console.log("Number of users: ", users)
    console.log("Socket ID: ", socket.id)
    socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //3
    socket.on('thankyou', function (data) { //7
      console.log(data.msg); //8 (note: this log will be on your server's terminal)
    });
      
  });

//   function validateUser(name){
//       for(user in users){
//           if(user['name'] === name){
//               return true;
//           } else {
//            return false;
//           }
//       }
//   }
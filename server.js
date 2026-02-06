const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


app.use(express.static('public'));

let connectedUsers = 0;


const fortuneData = [
  { text: "大吉\nGreat Fortune", color: [255, 215, 0] },
  { text: "吉\nGood Luck", color: [255, 250, 205] },
  { text: "中吉\nModest Luck", color: [245, 245, 220] },
  { text: "小吉\nSmall Luck", color: [230, 230, 250] },
  { text: "末吉\nFuture Luck", color: [211, 211, 211] },
  { text: "凶\nBad Luck", color: [105, 105, 105] },
  { text: "大凶\nMajor Misfortune", color: [20, 20, 20] }
];

io.on('connection', (socket) => {
  connectedUsers++;
  console.log('A user connected. Total users:', connectedUsers);
  

  io.emit('userCount', connectedUsers);

 
  socket.on('drawFortuneRequest', () => {
    
    let index;
    let rand = Math.random();
    
    if (connectedUsers > 1) {
    
      index = Math.floor(rand * 5); 
    } else {
   
      index = Math.floor(rand * fortuneData.length);
    }

    const result = fortuneData[index];
    
    
    io.emit('fortuneUpdate', result);
  });

  socket.on('disconnect', () => {
    connectedUsers--;
    io.emit('userCount', connectedUsers);
    console.log('User disconnected. Total users:', connectedUsers);
  });
});


const PORT = process.env.PORT || 3000;
http.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
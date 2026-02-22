const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const fs = require('fs');

const PORT = process.env.PORT || 3000;

// التأكد من وجود مجلد قاعدة البيانات
if (!fs.existsSync('./database')) {
    fs.mkdirSync('./database');
}

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('لاعب جديد متصل');
    
    socket.on('register', (data) => {
        if(data.password.length >= 8) {
            fs.writeFileSync(`./database/${data.email}.json`, JSON.stringify(data));
            socket.emit('registered', 'تم الحفظ بنجاح');
        }
    });
});

http.listen(PORT, () => {
    console.log('السيرفر يعمل على بورت ' + PORT);
});

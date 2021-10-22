const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { ExpressPeerServer } = require('peer')
const peerServer = ExpressPeerServer(server, {
    debug: true,
})
// const { v4: uuidv4 } = require('uuid');

app.use('/peerjs', peerServer)
// app.use(express.static('public'));
// app.set('view engine', 'ejs');
// res.json({ error: err });

app.get('/', (req, res) => {
    res.send("hello");

})
roomId='abc'
// app.get('/:room', (req, res) => {
//     res.render('', { roomId: req.params.room })
// })

io.on('connection', (socket) => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected', userId)

        socket.on('message', (message) => {
            io.to(roomId).emit('createMessage', message, userId)
        })
        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId)
        })
    })
})




const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))

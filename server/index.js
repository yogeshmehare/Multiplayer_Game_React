const express = require("express")
const http = require("http")
const cors = require("cors")
const app = express()
const {Server} = require("socket.io")
app.use(cors())

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    }
})

io.on("connection",(socket)=>{
    console.log("User connected : "+socket.id);

    socket.on("create_game",(user)=>{
        socket.join(user.roomId)
        console.log(user.userName +" Room created with Id : "+ user.roomId + " and socket id : " +socket.id)
    })

    socket.on("join_game",(user)=>{
        socket.join(user.roomId)
        console.log(user.userName +" joined in room : "+ user.roomId + " and socket id : " +socket.id)
    })

    socket.on("sendMessage",({userName, roomId, message,time})=>{
        console.log(userName, roomId, message,time,1)
        socket.broadcast.to(roomId).emit("receiveMessage",{
            userName:userName,
            roomId:roomId,
            message:message,
            time:time
            }
        )
        console.log(userName, roomId, message,time,2)
    })

    socket.on("disconnect",()=>{
        console.log("user disconnected "+socket.id)
    })
})

server.listen(3001,(req,res)=>{
    console.log('Server Running');
})





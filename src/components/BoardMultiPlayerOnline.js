import React, { useState } from 'react'
import io from "socket.io-client";
import ChatBox from './ChatBox';
const socket = io.connect("http://localhost:3001/")

const BoardMultiPlayerOnline = ({notifyError}) => {

  const [userName, setUserName] = useState("")
  const [roomId, setRoomId] = useState("")
  const [userCreatedRoom, setUserCreatedRoom] = useState(false)
  const [userJoinedRoom, setUserJoinedRoom] = useState(false)
  
  var handlecreateGameClick = async() => {
    if(userName!=="" && roomId===""){
      var tempRoomId = Math.random().toString(36).substring(2, 8);
      await socket.emit("create_game",{"userName":userName,"roomId":tempRoomId})
      setRoomId(tempRoomId);
      setUserCreatedRoom(true)
      setUserJoinedRoom(true)
      console.log("Create room clicked")
    }else{
      if(roomId!==""){
        setRoomId("")
        notifyError("Dont Enter roomId for creating room")
      }
      else if(userName==="")
        notifyError("UserName is empty")
    }
  }
  
  function handleJoinGameClick() {
    if(userName!=="" && roomId!==""){
      socket.emit("join_game",{"userName":userName,"roomId":roomId})
      setUserCreatedRoom(true)
      setUserJoinedRoom(true)
      console.log("Join room clicked")
    }else{
      if(userName==="")
        notifyError("UserName is empty")
      else if(roomId==="")
        notifyError("RoomId is empty")
      else{
        notifyError("Enter Username and RoomId")
      }
    }
  }

  return (
    <>
    <div className='inputContainer'>
    <div>
      {(userCreatedRoom || userJoinedRoom) && <p className='text1'>Hii "{userName}", Your Room Id is : "{roomId}"</p>}
    </div>
    {(!userCreatedRoom || !userJoinedRoom) && <div>
      <div className='divInOneLine'>
        <div>
          <p className='inputText'>User Name : </p>
        </div>
        <div>
          <input type='text' className='input' placeholder='Enter UserName' onChange={(event)=>{setUserName(event.target.value)}}/>
        </div>
      </div>
      <div className='divInOneLine'>
        <div>
          <p className='inputText'>Room Id : </p>
        </div>
        <div>
          <input type='text' className='input' placeholder='To Join Enter RoomId' onChange={(event)=>{setRoomId(event.target.value)}} value={roomId}/>
        </div>
      </div>
    </div>}
    {(!userCreatedRoom || !userJoinedRoom) && <div className='divInOneLine'>
      <div>
        <button className="joinRoomButton" onClick={()=>{handlecreateGameClick()}}>Create Game</button>
      </div>
      <div>
        <button className="joinRoomButton" onClick={()=>{handleJoinGameClick()}}>Join Game</button>
      </div>
    </div>}
    </div>
    <div>
    {(userCreatedRoom || userJoinedRoom) && <ChatBox socket={socket} userName={userName} roomId={roomId}/>}
    </div>
    </>
  )
}

export default BoardMultiPlayerOnline

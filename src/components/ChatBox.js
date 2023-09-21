import React, { useEffect, useState } from 'react'
import { IoSendSharp } from 'react-icons/io5';
import 'react-chat-elements/dist/main.css'
import { MessageList } from 'react-chat-elements'
import { Container } from '@mui/material';

const ChatBox = ({socket, userName, roomId}) => {
    const [message, setMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    var handleSendMessageClick = async() => {
        var messageToSend = {
            position: 'right',
            type: 'text',
            text: message,
            date: new Date(),
        }

        setMessage("")

        const tempList = [...messageList,messageToSend]
        setMessageList(tempList)

        await socket.emit("sendMessage",{
            userName:userName,
            roomId:roomId,
            message:messageToSend.text,
            time:messageToSend.date
        })
    }

    useEffect(() => {
      socket.on("receiveMessage",({userName, roomId, message,time})=>{
        console.log(userName, roomId, message,time,"received in frontend")
        var messageToSend = {
            position: 'left',
            type: 'text',
            text: message,
            date: time,
        }

        const tempList = [...messageList,messageToSend]
        setMessageList(tempList)
      })
    }, [socket,messageList])

    var messageListReferance = React.createRef();

    return (
        <>
        <div className='inputContainer'>
        <Container fixed>
            <MessageList
                referance={messageListReferance}
                className='messageBox'
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={messageList} />
        </Container>
        <div className='divInOneLine'>
            <div>
            <input type='text' className='input messageTextBox' placeholder='Enter Message here' onChange={(event)=>{setMessage(event.target.value)}} value={message}/>
            </div>
            <div>
            <button className="joinRoomButton" onClick={()=>{handleSendMessageClick()}}>Send <IoSendSharp className='restartIcon'/></button>
            </div>
        </div>
        </div>
        </>
    )
}

export default ChatBox

import React, { useState } from "react";
import {Button} from 'react-bootstrap';
const users = [
  {
    name: 'hetu',
  },
  {
    name: 'zaid',
  },
  {
    name: 'mohit',
  },
  {
    name: 'naitik',
  },
];
function MainChat() {

    const [mute,setmute] = useState(true);
    const [defen,setdefen] = useState(false);
  const DefenOrNot = () =>{
    if(defen){
        return(
            <i class="fas fa-volume-mute" onClick={()=>setdefen(!defen)}></i>
        )
    }
    else{
        return(
            <i class="fas fa-volume-up" onClick={()=>setdefen(!defen)}></i>
        )
    }
  }  

  const MuteOrUnmute = ( ) =>{
    if(mute){
        return(
            <i class="fas fa-microphone-slash" onClick={()=>setmute(!mute)}></i>
        )
    }
    else{
        return(
            <i class="fas fa-microphone" onClick={()=>setmute(!mute)}></i>
        )
    }
  }
  return (
    <div className="main_room_files_chat bg-dark">
      <div className="main_room_chat_head">
        <i class="fas fa-microphone"></i>
        <h3>Voice Chat</h3>
      </div>
      <div className="main_room_chat_voices">
        {users.map((res) => {
          return (
            <div className="main_room_chat_user">
            <i class="fas fa-phone-volume"></i>
              <h4>{res.name}</h4>
            </div>
          );
        })}
      </div>
      <div className="main_room_chat_foot">
          {
              MuteOrUnmute()
          }
          {
              DefenOrNot()
          }
      </div>
    </div>
  );
}

export default MainChat;

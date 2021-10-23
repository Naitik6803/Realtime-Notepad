import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
const users = [
  {
    name: "hetu",
  },
  {
    name: "zaid",
  },
  {
    name: "mohit",
  },
  {
    name: "naitik",
  },
];
let muted;
function MainChat() {
  const [mute, setmute] = useState(true);
  const [defen, setdefen] = useState(false);
  const DefenOrNot = () => {
    if (defen) {
      return <i class="fas fa-volume-mute"></i>;
    } else {
      return <i class="fas fa-volume-up"></i>;
    }
  };

  const MuteOrUnmute = () => {
    if (mute) {
      return <i class="fas fa-microphone-slash"></i>;
    } else {
      return <i class="fas fa-microphone"></i>;
    }
  };
  // useEffect(()=>{
  //   navigator.mediaDevices
  //   .getUserMedia({
  //     video: false,
  //     audio: true,
  //   })
  // },[])
  useEffect(()=>{
    if(mute){
      navigator.mediaDevices.getUserMedia({audio: true}).then(res=>{
        res.getAudioTracks()[0].enabled = false;
      })
    }
    else{
      navigator.mediaDevices.getUserMedia({audio: true}).then(res=>{
        res.getAudioTracks()[0].enabled = true;
      })
    }
  })
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
        <div onClick={() => setmute(!mute)}>{MuteOrUnmute()}</div>
        <div onClick={() => setdefen(!defen)}>{DefenOrNot()}</div>
      </div>
    </div>
  );
}

export default MainChat;

import io from "socket.io-client";
import Peer from "peerjs";
import { useEffect, useState } from "react";

const socket = io("/");

function VoiceRoom(props) {
  const [roomId, setRoomId] = useState("");

  const myVideo = document.createElement("video");
  myVideo.muted = true;

  let peer = new Peer(undefined, {
    key: "peerjs",
    debug: 2,
    secure: process.env.REACT_APP_ENV === "PRODUCTION" ? true : false, // secure : false for http connection
  });

  const [myVideoStream, setVideoStream] = useState();
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: false,
        audio: true,
      })
      .then((stream) => {
        setVideoStream(stream);
        console.log("myVideoStream");
        addVideoStream(myVideo, stream);

        peer.on("call", (call) => {
          console.log("hello");
          call.answer(stream);
          const video = document.createElement("video");
          call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream);
          });
        });

        socket.on("user-connected", (userId) => {
          console.log("user");
          connectToNewUser(userId, stream);
        });
      });

    peer.on("open", (id) => {
      console.log(id);
      socket.emit("join-room", props.roomId, id);
    });
  }, []);

  const connectToNewUser = (userId, stream) => {
    console.log(userId);
    const call = peer.call(userId, stream);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
      addVideoStream(video, userVideoStream);
    });
  };

  const addVideoStream = (video, stream) => {
    const VideoGrid = document.getElementById("video-grid");
    console.log(VideoGrid);
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    // VideoGrid.append(video);
  };

  const muteUnmute = () => {
    console.log(myVideoStream);
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getAudioTracks()[0].enabled = false;
      document.getElementById("sound").innerHTML = "unmute";
    } else {
      myVideoStream.getAudioTracks()[0].enabled = true;
      document.getElementById("sound").innerHTML = "mute";
    }
  };

  return (
    <div className="App">
      <button id="sound" onClick={muteUnmute}>
        Mute
      </button>
      <div id="video-grid"></div>
    </div>
  );
}

export default VoiceRoom;

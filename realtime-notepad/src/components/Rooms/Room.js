import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../style/room.css";
// import io from 'socket.io'
// const socket = io('/')
const RoomData = [
  {
    name: "one",
    member: 4,
    author: "Zadu007",
  },
  {
    name: "two",
    member: 5,
    author: "Hetu1107",
  },
];

function Room() {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [newRoom, setRoom] = useState(RoomData);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const SettingRoom = (e) => {
    setText(e.target.value);
  };

  const CreateRoom = () => {
      let p = false;
    for(var i = 0 ;i<newRoom.length;i++){
        if(text.toLowerCase()===newRoom[i].name.toLowerCase()){
            p = true;
            break;
        }
        else{
            p = false;
        }        
    }
    if(!p){
    setShow(false);
    setRoom([...newRoom, { name: text, member: 0, author: "authorName" }]);
    }
    else{
            document.getElementById('room-name-exist-or-not').style.opacity = 1;    
    }
  };

  return (
    <div className="main_room_page">
      <div className="main_room_page_box_div">
        <div className="main_room_page_box_div_head">
          <h1>Rooms</h1>
          <Button variant="outline-success" onClick={handleShow}>
            New Room
          </Button>

          <Modal
            id="modal"
            show={show}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>New Room</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">
                  Name of Room:
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="recipient-name"
                  onChange={(e) => SettingRoom(e)}
                />
                <h5 id="room-name-exist-or-not">Room name already exists..</h5>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="outline-success" onClick={CreateRoom}>
                Create
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="main_room_page_box_div_boxes">
          {newRoom.map((res) => {
            return (
              <div className="main_room_page_boxes">
                <div className="main_room_page_boxes_left">
                  <h2>{res.name}</h2>
                </div>
                <div className="main_room_page_boxes_right">
                  <h4>Members : {res.member}</h4>
                  <h4>Author : {res.author}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Room;

import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "../../style/room.css";
import db from "../FireBase";
import Load from "../Load";
import MainNav from "../Nav";

const allnames = [
  {
    name : 'hetu'
  },
  { 
    name : 'het'
  }
]

function Room(props) {
  const [show, setShow] = useState(false);
  const [showjoin,setshowjoin] = useState(false);
  const [text, setText] = useState("");
  const [allRoom, setAllRoom] = useState([]);
  const [load, setload] = useState(true);
  const [joinRoomName,setjoinRoomName] = useState('');

  const redirectEditor = async (res) => {
    console.log(res.id);
    props.history.push({ pathname: "/notepad", state: { id: res.id } });
    await fetch("/notepad", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        roomId: res.id,
      }),
    });
  };
  const loader = () => {
    if (load) {
      return <Load />;
    } else {
      return <></>;
    }
  };
  useEffect(async () => {
    setload(true);
    const data = await new Promise((resolve, reject) => {
      db.collection("rooms").onSnapshot((snap) => {
        let smallData = [];
        snap.docs.map((doc) => {
          const data = {
            author: doc.data().author,
            id: doc.id,
            members: doc.data().members,
            name: doc.data().name,
          };
          smallData.push(data);
        });
        setAllRoom(smallData);
        setload(false);
        resolve(true);

        console.log(allRoom);
      });
    });
    const value = data;
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseJoin = () => setshowjoin(false);
  const handleShowJoin = () => setshowjoin(true);


  // setting room 
  const SettingRoom = (e) => {
    setText(e.target.value);
  };
  const checkinroom = async () => {
    const data = new Promise((resolve, reject) => {
      for (var i = 0; i < allRoom.length; i++) {
        if (allRoom[i].name.toLowerCase() === text.toLowerCase()) {
          resolve(true);
        }
      }
      resolve(false);
    });
    return data;
  };


  // creating room 
  const CreateRoom = async () => {
    let p = await checkinroom();
    if (p) {
      document.getElementById("room-name-exist-or-not").style.opacity = 1;
    } else {
      document.getElementById("room-name-exist-or-not").style.opacity = 0;
      setload(true);
      const data = await db
        .collection("rooms")
        .add({
          name: text,
          author: "Naitik",
          members: 0,
        })
        .then((c) => {
          console.log(c.id);
          db.collection("rooms").doc(c.id).collection("data").add({
              message: "",
            });
        });
        setload(false);
        setShow(false);
    }
  };



  // joining room fxn 
  const JoinRoom = () =>{
      for(var i =0;i<allnames.length;i++){
        if(allnames[i].name === joinRoomName){
          alert('join');
          setshowjoin(false);
          return
        }
      }
      alert('room not exists');
  }
  return (
    <div className="main_room_page">
    <MainNav/>
      {loader()}
      <div className="main_room_page_box_div">
        <div className="main_room_page_box_div_head">
          <h1>Rooms</h1>
          <div id="join_new">
          <Button variant="outline-success" onClick={handleShowJoin}>
            Join Room
          </Button>
          <Button variant="outline-success" onClick={handleShow} >
            New Room
          </Button>
          </div>



          {/* for creating room  */}
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



        {/* for joining room  */}
          <Modal
            id="modal"
            show={showjoin}
            onHide={handleCloseJoin}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Join Room</Modal.Title>
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
                  onChange={(e) => setjoinRoomName(e.target.value)}
                />
                <h5 id="room-name-exist-or-not">Room Not exists...</h5>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseJoin}>
                Close
              </Button>
              <Button variant="outline-success" onClick={JoinRoom}>
                Join
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="main_room_page_box_div_boxes">
          {allRoom.map((res) => {
            return (
              <div
                onClick={() => redirectEditor(res)}
                className="main_room_page_boxes"
              >
                <div className="main_room_page_boxes_left">
                  <h2>{res.name}</h2>
                </div>
                <div className="main_room_page_boxes_right">
                  <h4>Members : {res.members}</h4>
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

export default withRouter(Room);

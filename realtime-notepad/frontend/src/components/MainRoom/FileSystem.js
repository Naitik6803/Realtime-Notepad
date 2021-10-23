import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
const filename = [
  {
    name: "hetu.txt",
  },
  {
    name: "zaid.txt",
  },
  {
    name: "mohit.txt",
  },
  {
    name: "naitik.txt",
  },
];
function FileSystem() {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [newFile, setFile] = useState(filename);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const SettingFile = (e) => {
    setFile(e.target.value);
  };

  const CreateFile = () => {
    let p = false;
    for (var i = 0; i < newFile.length; i++) {
      if (text.toLowerCase() == newFile[i].name.toLowerCase()) {
        p = true;
        break;
      } else {
        p = false;
      }
    }
    if (!p) {
      setShow(false);
      setFile([...newFile, { name: text }]);
    } else {
      document.getElementById("room-name-exist-or-not").style.opacity = 1;
    }
  };
  return (
    <div className="main_room_files bg-dark">
      <div className="main_room_files_add">
        <h3>Files</h3>
        <i class="fas fa-folder-plus" onClick={handleShow}></i>
      </div>
      <Modal
        id="modal"
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>New filename</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">
              Name of File:
            </label>
            <input
              type="text"
              class="form-control"
              id="recipient-name"
              onChange={(e) => setText(e.target.value)}
            />
            <h5 id="room-name-exist-or-not">Room name already exists..</h5>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-success" onClick={CreateFile}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="main_room_files_files">
        {/*{newFile.map((res) => {*/}
        {/*  return (*/}
        {/*    <div className="main_room_files_file">*/}
        {/*      <i class="far fa-file-alt"></i>*/}
        {/*      <h4>{res.name}</h4>*/}
        {/*    </div>*/}
          );
        })}
      </div>
    </div>
  );
}

export default FileSystem;

import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import db from '../FireBase';

const filename = [
    {
        name: 'hetu.txt',
    },
    {
        name: 'zaid.txt',
    },
    {
        name: 'mohit.txt',
    },
    {
        name: 'naitik.txt',
    },
];

function FileSystem (props) {
    const [show, setShow] = useState(false);
    const [text, setText] = useState('');
    const [allFiles, setAllFile] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const CreateFile = () => {
        let p = false;

    };

    const redirectFile = (res) => {
        props.history.push({ pathname: '/notepad', state: { id: props.location.state.id, fileId: res.id } });
    };

    useEffect(() => {
        db.collection('rooms').doc(props.location.state.id).collection('files').onSnapshot(snap => {
            let smallData = [];
            snap.docs.map((doc) => {
                const data = {
                    id: doc.id,
                    name: doc.data().fileName,
                };
                smallData.push(data);
            });
            setAllFile(smallData);
        });
    });

    return (
        <div className = "main_room_files bg-dark">
            <div className = "main_room_files_add">
                <h3>Files</h3>
                <i class = "fas fa-folder-plus" onClick = {handleShow}></i>
            </div>
            <Modal
                id = "modal"
                show = {show}
                onHide = {handleClose}
                aria-labelledby = "contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>New filename</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class = "mb-3">
                        <label for = "recipient-name" class = "col-form-label">
                            Name of File:
                        </label>
                        <input
                            type = "text"
                            class = "form-control"
                            id = "recipient-name"
                            onChange = {(e) => setText(e.target.value)}
                        />
                        <h5 id = "room-name-exist-or-not">Room name already exists..</h5>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant = "secondary" onClick = {handleClose}>
                        Close
                    </Button>
                    <Button variant = "outline-success" onClick = {CreateFile}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className = "main_room_files_files">
                {allFiles.map((res) => {
                    return (
                        <div onClick = {() => redirectFile(res)} className = "main_room_files_file">
                            <i class = "far fa-file-alt"></i>
                            <h4>{res.name}</h4>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default withRouter(FileSystem);

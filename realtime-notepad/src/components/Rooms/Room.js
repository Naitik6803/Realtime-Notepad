import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import '../../style/room.css';
import db from '../FireBase';

function Room (props) {
    const [show, setShow] = useState(false);
    const [text, setText] = useState('');
    const [allRoom, setAllRoom] = useState([]);

    const redirectEditor = async (res) => {
        console.log(res.id);
        props.history.push({ pathname: '/notepad', state: { id: res.id } });
        await fetch('/notepad', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                roomId: res.id,
            }),
        });
    };

    useEffect(() => {
        db.collection('rooms').onSnapshot(snap => {
            let smallData = [];
            snap.docs.map(doc => {
                const data = {
                    author: doc.data().author,
                    id: doc.id,
                    members: doc.data().members,
                    name: doc.data().name,
                };
                smallData.push(data);
            });
            setAllRoom(smallData);
            console.log(allRoom);
        });
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const SettingRoom = (e) => {
        setText(e.target.value);
    };

    const CreateRoom = () => {
        let p = false;
        db.collection('rooms').add({
            name: text,
            author: 'Naitik',
            members: 0,
        }).then(c => {
            console.log(c.id);
            db.collection('rooms').doc(c.id).collection('data').add({
                message: '',
            });
        });
    };

    return (
        <div className = "main_room_page">
            <div className = "main_room_page_box_div">
                <div className = "main_room_page_box_div_head">
                    <h1>Rooms</h1>
                    <Button variant = "outline-success" onClick = {handleShow}>
                        New Room
                    </Button>

                    <Modal
                        id = "modal"
                        show = {show}
                        onHide = {handleClose}
                        aria-labelledby = "contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>New Room</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div class = "mb-3">
                                <label for = "recipient-name" class = "col-form-label">
                                    Name of Room:
                                </label>
                                <input
                                    type = "text"
                                    class = "form-control"
                                    id = "recipient-name"
                                    onChange = {(e) => SettingRoom(e)}
                                />
                                <h5 id = "room-name-exist-or-not">Room name already exists..</h5>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant = "secondary" onClick = {handleClose}>
                                Close
                            </Button>
                            <Button variant = "outline-success" onClick = {CreateRoom}>
                                Create
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className = "main_room_page_box_div_boxes">
                    {allRoom.map((res) => {
                        return (
                            <div onClick = {() => redirectEditor(res)} className = "main_room_page_boxes">
                                <div className = "main_room_page_boxes_left">
                                    <h2>{res.name}</h2>
                                </div>
                                <div className = "main_room_page_boxes_right">
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

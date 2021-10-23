import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import db from '../FireBase';

const Notepad = (props) => {
    const [notepadData, setnotepadData] = useState('');
    const [change, setchange] = useState(false);
    const [editorId, setEditorId] = useState('');
    const [textArea, setTextArea] = useState('');
    const changing = () => {
        if (change) {
            return (
                <Spinner animation = "border" variant = "warning" className = "onchange_text_loader"/>
            );
        } else {
            return (
                <></>
            );
        }
    };

    useEffect(() => {
        db.collection('rooms').doc(props.location.state.id).collection("files").doc(props.fileId).collection('data').onSnapshot(snap => {
            setEditorId(snap.docs[0]?.id);
            setTextArea(snap.docs[0]?.data()?.message);
            // console.log()
        });
    });

    const handleClick = () => {

    };

    const save = async (data) => {
        db.collection('rooms').doc(props.location.state.id).collection("files").doc(props.fileId).collection('data').doc(editorId).update({
            message: data,
        }).then(() => {
            console.log('updated');
        }).catch((err) => {
            console.log(err);
        });

        await fetch('/text', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                message: data,
            }),
        });

    };

    return (
        <div className = "Notepad">
            <div className = "form-group">
        <textarea value = {textArea} className = "form-control text" id = "exampleFormControlTextarea1" rows = "3"
                  onChange = {e => {
                      setchange(true);
                      save(e.target.value);
                  }} onKeyUp = {() => setchange(false)}/>
                {

                    changing()
                }
            </div>
        </div>
    );
};

export default withRouter(Notepad);

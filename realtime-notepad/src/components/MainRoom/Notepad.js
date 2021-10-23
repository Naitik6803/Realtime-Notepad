import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import db from '../FireBase';

const Notepad = () => {
    const [notepadData, setnotepadData] = useState('');
    const [change, setchange] = useState(false);
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
        db.collection('data').doc('CbjmNvbK8XN5Nulz2IFB').onSnapshot(snap => {
            setTextArea(snap.data().message);
        });
    });

    const handleClick = () => {

    };


    const save = async (data) => {
        db.collection('data').doc('CbjmNvbK8XN5Nulz2IFB').update({
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

export default Notepad;

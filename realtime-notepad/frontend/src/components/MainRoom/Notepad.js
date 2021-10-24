import React, { useEffect, useState } from 'react';
import db from '../FireBase';
import { withRouter } from 'react-router-dom';

function Notepad (props) {
    const [textArea, setTextArea] = useState('');
    const [editorId, setEditorId] = useState('');

    useEffect(() => {
        db.collection('rooms')
        .doc(props.location.state.id)
        .collection('files')
        .doc(props.fileId)
        .collection('data')
        .onSnapshot((snap) => {
            setEditorId(snap.docs[0]?.id);
            setTextArea(snap.docs[0]?.data()?.message);
            console.log('updated');
        });
    }, []);

    const handleChange = (data) => {
        setTextArea(data);
        db.collection('rooms')
        .doc(props.location.state.id)
        .collection('files')
        .doc(props.fileId)
        .collection('data')
        .doc(editorId)
        .update({
            message: data,
        })
        .then(() => {
            console.log('added');
        })
        .catch((err) => {
            console.log(err);
        });

    };

    return (
        <div>
            <textarea value = {textArea} onChange = {(e) => handleChange(e.target.value)}/>
        </div>
    );
}

export default withRouter(Notepad);

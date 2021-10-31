import React, { useEffect, useState } from 'react';
import db from '../FireBase';
import { withRouter } from 'react-router-dom';
import VoiceRoom from '../VoiceChat/VoiceRoom';

function Notepad (props) {
    const [textArea, setTextArea] = useState('');
    const [editorId, setEditorId] = useState('');

    useEffect(() => {
        db.collection('rooms')
        .doc(props.id)
        .collection('files')
        .doc(props.fileId)
        .collection('data')
        .onSnapshot((snap) => {
            setEditorId(snap.docs[0]?.id);
            setTextArea(snap.docs[0]?.data()?.message);
            console.log('updated');
        });
    }, [props.fileId]);

    const handleChange = (data) => {
        setTextArea(data);
        db.collection('rooms')
        .doc(props.id)
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
            <VoiceRoom roomId = {props.location.state.id}/>
            <textarea
                style = {{ height: '400px', width: '500px' }}
                value = {textArea}
                onChange = {(e) => handleChange(e.target.value)}
            />
        </div>
    );
}

export default withRouter(Notepad);

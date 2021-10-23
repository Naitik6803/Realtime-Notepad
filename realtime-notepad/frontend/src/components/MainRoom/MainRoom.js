import React from 'react';
import Notepad from './Notepad';
import FileSystem from './FileSystem';
import '../../style/mainRoom.css';
import MainChat from './Chat';
import MainNav from '../Nav';
import { withRouter } from 'react-router-dom';

function MainRoom (props) {
    return (
        <div className = "main_room_front_page">
            <MainNav/>
            <FileSystem/>
            <Notepad id = {props.location.state.id} fileId = {props.location.state.fileId}/>
            <MainChat/>
        </div>
    );
}

export default withRouter(MainRoom);

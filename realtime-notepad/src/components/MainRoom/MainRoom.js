import React from 'react'
import Notepad from './Notepad'
import FileSystem from './FileSystem'
import '../../style/mainRoom.css'
import MainChat from './Chat'
import MainNav from '../Nav'

function MainRoom() {
    return (
        <div className="main_room_front_page">
        <MainNav/>
            <FileSystem/>
            <Notepad/>
            <MainChat/>
        </div>
    )
}

export default MainRoom

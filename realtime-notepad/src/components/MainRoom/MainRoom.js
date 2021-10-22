import React from 'react'
import Notepad from './Notepad'
import FileSystem from './FileSystem'
import '../../style/mainRoom.css'
import MainChat from './Chat'

function MainRoom() {
    return (
        <div className="main_room_front_page">
            <FileSystem/>
            <Notepad/>
            <MainChat/>
        </div>
    )
}

export default MainRoom

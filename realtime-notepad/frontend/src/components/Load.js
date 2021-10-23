import React from 'react'
import { Spinner } from 'react-bootstrap'

function Load() {
    return (
        <div id="main_loading">
            <Spinner animation="border" variant="light" id="spinner"/>
        </div>
    )
}

export default Load

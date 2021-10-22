import React, { useState } from "react";
import {Spinner} from 'react-bootstrap'

const Notepad = () => {
  const [notepadData,setnotepadData] = useState('');
  const [change,setchange] = useState(false); 
  const changing = () =>{
    if(change){
      return(
            <Spinner animation="border" variant="warning" className="onchange_text_loader"/>
      )
    }
    else{
      return(
        <></>
      )
    }
  }
  return (
    <div className="Notepad">
      <div className="form-group">
        <textarea className="form-control text" id="exampleFormControlTextarea1" rows="3" onChange={e=>{
          setnotepadData(e.target.value);
          setchange(true);
        }} onKeyUp={()=>setchange(false)}></textarea>
        {
          changing()
        }
      </div>
    </div>
  );
};

export default Notepad;

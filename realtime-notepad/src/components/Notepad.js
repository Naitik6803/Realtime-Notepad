import React from "react";
import "../style/Notepad.css";

const Notepad = () => {
  return (
    <div className="Notepad">
      <div className="form-group">
        {/* <label for="exampleFormControlTextarea1">Example textarea</label> */}
        <textarea className="form-control text" id="exampleFormControlTextarea1" rows="3" ></textarea>
      </div>
    </div>
  );
};

export default Notepad;

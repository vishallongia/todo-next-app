import React, { useState } from "react";
import "../globals.css";
import IsTaskCheckedModal from "../ClientSideComponent/IsTaskCheckedModal";

export default function CheckBox({ id }) {
  const [showIsTaskCheckedPopup, setShowIsTaskCheckedPopup] = useState(false);
  const handleUpdateTask = async (isChecked) => {
    setShowIsTaskCheckedPopup(isChecked);
  };

  return (
    <>
      <div className="checkbox-wrapper-19 relative top-[4px]">
        <input
          id={id}
          type="checkbox"
          checked={showIsTaskCheckedPopup} // Set checked attribute based on showIsTaskCheckedPopup
          onChange={(e) => {
            handleUpdateTask(e.target.checked);
          }}
        />
        <label className="check-box" htmlFor={id}></label>
      </div>
      {showIsTaskCheckedPopup && (
        <IsTaskCheckedModal
          showIsTaskCheckedPopup={showIsTaskCheckedPopup}
          setShowIsTaskCheckedPopup={setShowIsTaskCheckedPopup}
          id={id}
        />
      )}
    </>
  );
}

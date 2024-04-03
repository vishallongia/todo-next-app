import React from "react";
import "../globals.css";

export default function Loader() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="ui-abstergo">
        <div className="abstergo-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="ui-text">
          Loading
          <div className="ui-dot"></div>
          <div className="ui-dot"></div>
          <div className="ui-dot"></div>
        </div>
      </div>
    </div>
  );
}

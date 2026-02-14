import React from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import "./Heading.css";

const Heading = () => {
  return (
    <div>
      <div className="flex">
        <AiFillThunderbolt color="yellow" size={35} />
        <h3>Typing Speed Tester</h3>
        <AiFillThunderbolt color="yellow" size={35} />
      </div>
      <p>Test your speed and accuracy!</p>
    </div>
  );
};

export default Heading;

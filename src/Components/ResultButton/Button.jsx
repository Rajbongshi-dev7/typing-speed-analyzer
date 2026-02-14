import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import "./Button.css";

const Button = forwardRef((props, ref) => {
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    if (!isTyping) return;
    const interval = setInterval(() => {
      props.setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTyping]);
  const startTimer = (text) => {
    if (!isTyping && text.length === 1) {
      setIsTyping(true);
    }
  };
  const stopTimer = () => {
    setIsTyping(false);
  };
  useImperativeHandle(ref, () => ({
    startTimer,
    stopTimer,
  }));

  return (
    <div>
      <div className="resultBtn">
        <h3>
          {props.text}
          <span>{props.unit}</span>
        </h3>
        <p>{props.result}</p>
      </div>
    </div>
  );
});

export default Button;

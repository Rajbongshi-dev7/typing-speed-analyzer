import React, { useEffect, useRef, useState } from "react";

import "./TextArea.css";
import Button from "../ResultButton/Button";
import LeaderBoard from "../LeaderBoard/LeaderBoard";
import { fetchQuote } from "../../Api/QuoteApi";

const TextArea = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [btnText, setBtnText] = useState("....");
  const childRef = useRef(null);
  const [seconds, setSeconds] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [leaderboard, setLeaderborad] = useState([]);
  // leaderboard code start from here
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("leaderboard")) || [];
    setLeaderborad(storedList);
  }, []);
  const handelLeaderboard = () => {
    if (accuracy < 95) {
      alert(
        `Your accuracy is too low(${accuracy}%)! Minimum 95% required for leaderboard.`,
      );
      return;
    }
    const playerName = prompt(
      "🎉 Great job! You qualified. Please Enter your name:",
    );
    if (!playerName) return;
    // new score object
    const newScore = {
      name: playerName,
      wpm: wpm,
      date: new Date().toLocaleDateString(),
    };
    // update leaderboard
    const updatedList = [...leaderboard, newScore];
    updatedList.sort((a, b) => b.wpm - a.wpm);
    const top10 = updatedList.slice(0, 10);
    setLeaderborad(top10);
    localStorage.setItem("leaderboard", JSON.stringify(top10));
  };
  useEffect(() => {
    if (accuracy > 0) {
      handelLeaderboard();
    }
  }, [accuracy]);
  // leaderboard code end here

  useEffect(() => setBtnText("Start Test"), []);

  const loadQuote = async () => {
    try {
      setLoading(true);
      const data = await fetchQuote();
      setQuote(data);
      // console.log(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handelChange = (e) => {
    const value = e.target.value;
    setText(value);

    if (childRef.current) {
      childRef.current.startTimer(value);

      if (quote?.quote && value.length === quote.quote.length) {
        childRef.current.stopTimer();
        // wpm calculation start here
        setWpm((prev) => {
          const minutes = seconds / 60;

          return Math.round((prev + value.length / 5) / minutes);
        });
        // Accuracy calculation start here
        setAccuracy(() => {
          const quoteWords = quote.quote.trim().split(" ");
          const typedWords = value.trim().split(" ");
          let correct = 0;
          for (let i = 0; i < value.length; i++) {
            if (typedWords[i] === quoteWords[i]) {
              correct++;
            }
          }
          let number = (correct / value.length) * 100;

          return Number(number.toFixed(1));
        });
      }
    }
  };

  return (
    <div className="textArea">
      <div className="testBox">
        <div className="sentenceBox" id="sentenceBox">
          <p id="sentence">
            {!loading && !quote ? (
              <span>Quote will be load here...</span>
            ) : null}
            {loading ? <span>Quote is loading....</span> : null}
            {quote?.quote}
          </p>
        </div>
        <h3 className="text">Write the above sentence below:</h3>
        <textarea
          value={text}
          onChange={handelChange}
          disabled={!quote || text.length === quote.quote.length}
          id="typing-area"
          className="typingArea"
          placeholder="Start typing here..."
          rows="10"
          cols="60"
        ></textarea>
      </div>
      <div className="scorers">
        <LeaderBoard leaderboard={leaderboard} />
      </div>
      <div className="resultsBtn">
        <Button text="WPM" result={wpm} />
        <Button text="Accuracy" unit="(%)" result={accuracy} />
        <Button
          ref={childRef}
          seconds={seconds}
          setSeconds={setSeconds}
          text="Time Taken"
          unit="(s)"
          result={seconds}
        />
      </div>
      <div className="startBtn">
        <button
          disabled={loading}
          onClick={() => {
            setQuote(null);
            loadQuote();
            setText("");
            setBtnText("");
            setSeconds(0);
            setWpm(0);
            setAccuracy(0);
          }}
        >
          {btnText}
          {quote && "Retake Test"}
          {loading && "Loading Quote..."}
        </button>
      </div>
    </div>
  );
};

export default TextArea;

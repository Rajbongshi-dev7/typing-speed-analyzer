import React from "react";
import "./LeaderBoard.css";
import { IoMdTrophy } from "react-icons/io";
const LeaderBoard = ({ leaderboard }) => {
  return (
    <div>
      <div className="header">
        <IoMdTrophy color="yellow" size={35} />
        <h4>Leaderboard</h4>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>WPM</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.length === 0 ? (
            <tr>
              <td colSpan="4">No Scores Yet</td>
            </tr>
          ) : (
            leaderboard.map((player, index) => (
              <tr className="data" key={index}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.wpm}</td>
                <td>{player.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;

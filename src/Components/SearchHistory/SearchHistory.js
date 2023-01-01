import "./SearchHistory.css";
import React, { useState, useEffect } from "react";
import searchIcon from "../../assets/search.png";
import deleteIcon from "../../assets/delete.png";

function SearchHistory(props) {
  return (
    <div>
      {props.newSearchHistory.map((value, index) => {
        return (
          <div key={index} className="container">
            <div className="leftContainer">
              <div>{index + 1}.</div>
              <div style={{ marginLeft: "1rem" }}>
                {value.city},{value.country}
              </div>
            </div>
            <div className="rightContainer">
              <div className="timeText">{value.time}</div>
              <button
                className="button"
                onClick={() => props.searchButtonClick(value)}
              >
                <img src={searchIcon} alt="Search" />
              </button>
              <button
                className="button"
                onClick={() => props.deleteButtonClick(index)}
              >
                <img src={deleteIcon} alt="Delete" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SearchHistory;

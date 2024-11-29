import { useEffect, useState } from "react";
import React from "react";
import { convertFormatDatetimeForLesson } from "../utils/datetimeFormatter";
import "../css/swipe.css";

export function ReservationPopular({
  popularLesson,
  lessonNumber,
  setStart,
  setClickPopular,
  setFlick,
  setInputDate,
  setP2Swipe,
  setLogin,
  setUserInput,
  postReservation,
  userId,
}) {
  const [responseMessage, setResponseMessage] = useState("");
  const handleResponse = (response) => {
    if (response === "OK") {
      postReservation(popularLesson[lessonNumber].id);
      setResponseMessage("予約できました！");
      setTimeout(() => {
        setStart(false);
        setClickPopular(false);
        setFlick(true);
        setInputDate(false);
        setP2Swipe(false);
        setLogin(false);
        setUserInput(true);
      }, 1000);
    } else {
      setResponseMessage("予約エラー");
    }
  };
  if (responseMessage) {
    // responseMessageが空でない場合はメッセージのみを表示
    return (
      <div
        style={{ marginTop: "20px", fontWeight: "bold", textAlign: "center" }}
      >
        {responseMessage}
      </div>
    );
  }
  return (
    <>
      <h1>以下のレッスンを予約しました！</h1>
      <div>
        <div class="box-result">
            <div class="box-title">{popularLesson[lessonNumber].title}</div>
            <p>概要：{popularLesson[lessonNumber].description}</p>
            <p>開催日時：{convertFormatDatetimeForLesson(popularLesson[lessonNumber])}</p>
            <p>場所：{popularLesson[lessonNumber].location}</p>
        </div>
        <div>
          <center>
            <button
              className="button-return"
              onClick={() => handleResponse("OK")}
            >
              閉じる
            </button>
          </center>
        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import React from "react";
import { convertFormatDatetimeForLesson } from "../utils/datetimeFormatter";
import "../css/swipe.css";

export function Reservation({
  lesson,
  lessonNumber,
  setStart,
  setClickPopular,
  setFlick,
  setInputDate,
  setP2Swipe,
  setLogin,
  setUserInput,
  postReservation,
}) {
  const [responseMessage, setResponseMessage] = useState("");
  const handleResponse = (response) => {
    if (response === "OK") {
      postReservation(lesson[lessonNumber].id);
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
    } else if (response === "NG") {
      setResponseMessage("予約がキャンセルされました");
      setTimeout(() => {
        setClickPopular(false);
        setFlick(true);
        setInputDate(false);
        setP2Swipe(true);
      }, 1000);
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
      <h1>予約を確定しますが、よろしいでしょうか？</h1>
      <div>
        {/* <img className="activity-image" src="image/ike.png" alt="生け花" /> */}
        <div>
          {/* <p>講座番号：{lesson[0][0].store_id}</p> */}
          <p>{lesson[lessonNumber].title}</p>
          <p>{lesson[lessonNumber].description}</p>
          <p>
            開催日時：{convertFormatDatetimeForLesson(lesson[lessonNumber])}
          </p>
          <p>場所：{lesson[lessonNumber].location}</p>
        </div>
        <div>
          <center>
            <table>
              <tbody>
                <tr>
                  <td>
                    <button
                      className="button-return"
                      onClick={() => handleResponse("NG")}
                    >
                      キャンセル
                    </button>
                  </td>
                  <td>
                    <button
                      className="button-popular"
                      onClick={() => handleResponse("OK")}
                    >
                      予約確定
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </center>
        </div>
      </div>
    </>
  );
}

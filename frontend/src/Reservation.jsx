import { useEffect, useState } from "react";
import React from "react";
import "./Login.css";
// import { useSwipeable } from "react-swipeable";

export function Reservation({ lesson }) {
  const handleResponse = (response) => {
    console.log(response);
  };
  return (
    <>
      <h1>予約しますね？良いでしょうか？</h1>
      <div>
        {/* <img className="activity-image" src="image/ike.png" alt="生け花" /> */}
        <div>
          <p>講座番号：{lesson[0][0].store_id}</p>
          <p>講座内容：一緒に生け花で遊びませんか</p>
          <p>講義時間：30分</p>
          <p>講義形態：オンライン(お家でできます)</p>
        </div>
        <div>
          <button onClick={() => handleResponse("はい")}>はい</button>
          <br></br>
          <button onClick={() => handleResponse("だめ")}>だめ</button>
        </div>
      </div>
    </>
  );
}

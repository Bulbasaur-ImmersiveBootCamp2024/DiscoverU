import { useEffect, useState } from "react";
import React from "react";
// import "./Login.css";
// import { useSwipeable } from "react-swipeable";

export function Reservation({ lesson }) {
  const [responseMessage, setResponseMessage] = useState("");
  const handleResponse = (response) => {
    if (response === "はい") {
      setResponseMessage("予約できました！");
      console.log(response);
    } else if (response === "だめ") {
      setResponseMessage("予約がキャンセルされました");
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
          <p>講座内容：一緒に生け花で遊びませんか</p>
          <p>講義時間：30分</p>
          <p>講義形態：オンライン(お家でできます)</p>
        </div>
        <div>
          <center><table>
              <tbody><tr>
              <td>
                <button className="button-deco" onClick={() => handleResponse("はい")}>確定</button>
              </td>
              <td>
                <button className="button-deco" onClick={() => handleResponse("だめ")}>キャンセル</button>
              </td>
              </tr></tbody>
            </table></center>
        </div>
      </div>
    </>
  );
}

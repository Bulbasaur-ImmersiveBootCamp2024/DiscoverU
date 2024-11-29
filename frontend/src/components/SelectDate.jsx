import { useEffect, useState } from "react";
import React from "react";
import "../css/selectDate.css";
import "../css/multiStepUserInput.css";

export function SelectDate({
  setInputDate,
  setStartDate,
  setEndDate,
  setP2Swipe,
  fetchPlans,
}) {
  const today = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(today.getDate() + 3);
  const twoWeeksLater = new Date();
  twoWeeksLater.setDate(today.getDate() + 10);

  const formattedToday = today
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .join("-");

  const formattedTwoWeeksLater = twoWeeksLater
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .join("-");

  const formattedThreeDaysLater = threeDaysLater
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .join("-");

  const [inputStartDate, setInputStartDate] = useState(formattedToday);
  const [inputEndDate, setInputEndDate] = useState(formattedTwoWeeksLater);
  const [dateCheck, setDateCheck] = useState(false);
  const [readyToFetch, setReadyToFetch] = useState(false);

  useEffect(() => {
    if (readyToFetch) {
      try {
        fetchPlans();
        setInputDate(true);
        setP2Swipe(true);
      } catch (err) {
        console.error(err);
      } finally {
        setReadyToFetch(false);
      }
    }
  }, [readyToFetch, fetchPlans, setInputDate, setP2Swipe]);

  function setDate() {
    const dateStartDate = new Date(inputStartDate);
    const dateEndDate = new Date(inputEndDate);
    if (dateStartDate <= dateEndDate) {
      setStartDate(inputStartDate);
      setEndDate(inputEndDate);
      setDateCheck(false);
      setReadyToFetch(true);
    } else {
      setDateCheck(true);
    }
  }
  return (
    <div className="selectDateMain">
      {dateCheck ? (
        <div className="chat-container">
          <p className="chat-content">
            <span className="chat-main">
              終了日は開始日より後の日付にしてね！
            </span>
            <br />
            <span className="chat-secondary">正しい日付を入力してね！</span>
          </p>
        </div>
      ) : (
        <div className="chat-container">
          <p className="chat-content">
            <span className="chat-main">
              レッスンを受講したい日付を入力してね！
            </span>
            <br />
            <span className="chat-secondary">開始日と終了日を入力してね！</span>
          </p>
        </div>
      )}
      <form className="set-calendar1">
        開始日：
        <label className="calendar-design">
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={inputStartDate}
            onChange={(e) => setInputStartDate(e.target.value)}
            className="input date-style"
            min={formattedToday} // 最小日付
            max={formattedThreeDaysLater} // 最大日付
          />
        </label>
        <br />
        終了日：
        <label className="calendar-design">
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={inputEndDate}
            onChange={(e) => setInputEndDate(e.target.value)}
            className="input date-style"
            min={formattedTwoWeeksLater} // 最小日付
          />
        </label>
      </form>
      <img
        src={"./images/dico.png"}
        alt="キャラクター"
        className="character-image"
      />
      <br />
      {/* 中沢変更 */}
      <button onClick={setDate} className="button-next">
        次へ
      </button>
    </div>
  );
}

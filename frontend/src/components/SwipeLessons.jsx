import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import "../css/swipe.css";

export function SwipeLessons({ profile, setFlick, handleSwipeType, lesson }) {
  const currentPath = process.env.REACT_APP_BASE_DIR || "../../";
  const [number, setNumber] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      handleSwipeType("left");
      // setFlick(false);
      setNumber(number + 1);
      console.log("呼ばれてますよ左");
      setTimeout(() => {
        handleSwipeType("なし");
      }, 10);
    },
    onSwipedRight: () => {
      handleSwipeType("right");
      setFlick(false);
      console.log("呼ばれてますよ右");
      // setTimeout(() => {
      //   setFlick(true); // 元に戻す
      //   handleSwipeType("なし");
      // }, 1000);
    },
  });

  //デモ用データ
  const mockData = [
    {
      date: "2024-12-02T15:00:00.000Z",
      description: "テニスを一緒にしませんか？",
      end_time: "20:00:00",
      id: 3,
      imagePath: "/image/tennis_1.gif",
      indicator: 92.1,
      location: "関東",
      momentum: null,
      moviePath: "/movies/lesson3.mp4",
      review: 4,
      start_time: "18:00:00",
      store_id: 1,
    },
    {
      date: "2024-12-02T15:00:00.000Z",
      description: "ヨガや瞑想の基本から学びましょう！",
      end_time: "20:00:00",
      id: 3,
      imagePath: "./image/yoga_1.gif",
      indicator: 92.1,
      location: "関東",
      momentum: null,
      moviePath: "/movies/lesson3.mp4",
      review: 4,
      start_time: "18:00:00",
      store_id: 1,
    },
    {
      date: "2024-12-02T15:00:00.000Z",
      description:
        "一緒に生け花で遊びませんか?簡単なキットをお送りしますので、当日はオンラインでご参加いただけます！",
      end_time: "20:00:00",
      id: 3,
      imagePath: "./image/hana_1.gif",
      indicator: 92.1,
      location: "関東",
      momentum: null,
      moviePath: "/movies/lesson3.mp4",
      review: 4,
      start_time: "18:00:00",
      store_id: 1,
    },
  ];

  return (
    <>
      <div className="profile-info">
        {/* <p>{currentPath}</p> */}
        {/* <p className="greeting"></p>
        <p className="profile_details">
          Hello! {profile.name}さん
          <br />
          生年月日：{profile.birthday}
          <br />
          性別：{profile.sex}
        </p> */}
        <center>
          <form className="set-calendar">
            <label className="calendar-design">
              <input type="date" />
            </label>
          </form>
        </center>
        <br />
      </div>
      <br />
      <div className="lesson-box" {...handlers}>
        <img
          className="lesson-image"
          src={mockData[number].imagePath}
          alt="生け花"
          {...handlers}
        />
        <div className="lesson-details">
          {/* <p>{profile.calendar}</p> */}
          {/* <p>生け花教室</p> */}
          {/* <p>講座番号：{lesson[0][0].store_id}</p> */}
          <p>{mockData[number].description}</p>
          {/* <p>一緒に生け花で遊びませんか？</p>
          <p>
            簡単なキットをお送りしますので、当日はオンラインでご参加いただけます！
          </p>
          <p>興味がある方は一緒に生花について学びましょう！</p>
          <p>講師：Rena</p> */}
        </div>
      </div>
    </>
  );
}
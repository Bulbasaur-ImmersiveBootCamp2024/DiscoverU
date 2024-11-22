import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import "./ShowActivity.css";

export function ShowActivity({ profile, setFlick, handleSwipeType, lesson }) {
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      handleSwipeType("left");
      setFlick(false);
      console.log("呼ばれてますよ");
      setTimeout(() => {
        setFlick(true); // 元に戻す
        handleSwipeType("なし");
      }, 0);
    },
    // onSwipedRight: () => {
    //   handleSwipeType("right");
    //   setFlick(false);
    //   console.log("呼ばれてますよ右");
    //   setTimeout(() => {
    //     setFlick(true); // 元に戻す
    //     handleSwipeType("なし");
    //   }, 1000);
    onSwipedRight: () => {
      handleSwipeType("right");
      setFlick(false);
      console.log("呼ばれてますよ右");
    },
  });

  return (
    <>
      <div className="profile-info">
        <p className="greeting">Hello! {profile.name}さん</p>
        <p className="profile_details">
          あなたの条件
          <br />
          年齢：{profile.age}
          <br />
          性別：{profile.gender}
        </p>
      </div>

      <div className="activity-box" {...handlers}>
        <img
          className="activity-image"
          src="image/test.gif"
          alt="生け花"
          {...handlers}
        />
        <div className="activity-details">
          <p>講座番号：{lesson[0][0].store_id}</p>
          <p>講座内容：一緒に生け花で遊びませんか</p>
          <p>講義時間：30分</p>
          <p>講義形態：オンライン(お家でできます)</p>
        </div>
      </div>
    </>
  );
}

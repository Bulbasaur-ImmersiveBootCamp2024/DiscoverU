import { useEffect, useState, useRef } from "react";
import ExtButton from "./components/extButton";
import { Login } from "./Login";
import { ShowActivity } from "./ShowActivity";
import { Reservation } from "./Reservation";

import "./App.css";

export default function App() {
  const [flick, setFlick] = useState(true);
  const [swipeType, setSwipeType] = useState("なし");
  const [login, setLogin] = useState(false);
  const [profile, setProfile] = useState(null);
  const [lesson, setLesson] = useState([]);
  const [start, setStart] = useState(false);

  async function getPlans() {
    try {
      const response = await fetch("http://localhost:3001/api/activities");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  function handleLogin(state) {
    setLogin(state);
  }

  function handleSwipeType(direction) {
    setSwipeType(direction);
  }

  function receiveFormData(data) {
    setProfile(data);
  }

  useEffect(() => {
    async function fetchPlans() {
      const responseData = await getPlans();
      setLesson((prevLessons) => [...prevLessons, responseData]);
      console.log("取得したデータ:", responseData);
    }
    fetchPlans();
  }, [profile]);

  return (
    <>
      {!start ? (
        <div className="start-screen">
          <h1>Tap to Start</h1>
          <button onClick={() => setStart(true)}>
            ボタンを押して新たな旅に出かけよう
          </button>
        </div>
      ) : !flick ? ( // flickがfalseならReservationを表示
        <Reservation lesson={lesson} />
      ) : login ? (
        // flickがtrueかつloginがtrueならShowActivityを表示
        <ShowActivity
          profile={profile}
          lesson={lesson}
          setFlick={setFlick} // flick状態を更新する関数を渡す
          handleSwipeType={handleSwipeType}
        />
      ) : (
        // loginがfalseならLoginを表示
        <Login
          profile={profile}
          handleLogin={handleLogin}
          sendFormData={receiveFormData}
        />
      )}
    </>
  );
}

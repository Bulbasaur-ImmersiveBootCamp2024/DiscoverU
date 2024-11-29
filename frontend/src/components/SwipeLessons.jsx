import React, { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import "../css/swipe.css";
import "../css/multiStepUserInput.css";
import { ImageGallery } from "./ImageGallery";
import { convertFormatDatetimeForLesson } from "../utils/datetimeFormatter";

export function SwipeLessons({
  lesson,
  setFlick,
  setClickPopular,
  reserveLesson,
  handleSwipeType,
  popularLesson,
  startDate,
  endDate,
  fetchPopularLesson,
}) {
  const currentPath = process.env.REACT_APP_BASE_DIR || "../../";
  const [number, setNumber] = useState(0);
  const [popularFlag, setPopularFlag] = useState(false);
  const limit = lesson.length;
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  const [isTutorial, setIsTutorial] = useState(true);
  const [loadedImages, setLoadedImages] = useState([]);
  const [readyToFetch, setReadyToFetch] = useState(false);

  useEffect(() => {
    const preloadedImages = [];
    lesson.forEach((data) => {
      data.imagePath.forEach((path) => {
        const img = new Image();
        img.src = path;
        preloadedImages.push(img);
      });
    });
    setLoadedImages(preloadedImages);
  }, [lesson]);

  const startAnimation = () => {
    if (card1Ref.current) {
      card1Ref.current.style.animation = "cardrotate 4s ease-in-out forwards";
    }
    if (card2Ref.current) {
      card2Ref.current.style.animation = "cardrotate 4s ease-in-out forwards";
    }
    if (card3Ref.current) {
      card3Ref.current.style.animation = "cardrotate 4s ease-in-out forwards";
    }
  };

  const handleAnimationEnd = (event) => {
    const cardElement = event.currentTarget; // どのカードがアニメーションを終えたかを取得
    cardElement.style.animation = "none"; // アニメーションを無効化
    cardElement.style.transform = "rotateY(0deg)"; // 表面を向かせる
  };

  useEffect(() => {
    // アニメーションを開始
    startAnimation();

    // 各カードにイベントリスナーを追加
    if (card1Ref.current) {
      card1Ref.current.addEventListener("animationend", handleAnimationEnd);
    }
    if (card2Ref.current) {
      card2Ref.current.addEventListener("animationend", handleAnimationEnd);
    }
    if (card3Ref.current) {
      card3Ref.current.addEventListener("animationend", handleAnimationEnd);
    }

    // クリーンアップ
    return () => {
      if (card1Ref.current) {
        card1Ref.current.removeEventListener(
          "animationend",
          handleAnimationEnd
        );
      }
      if (card2Ref.current) {
        card2Ref.current.removeEventListener(
          "animationend",
          handleAnimationEnd
        );
      }
      if (card3Ref.current) {
        card3Ref.current.removeEventListener(
          "animationend",
          handleAnimationEnd
        );
      }
    };
  }, [number, popularFlag]); // numberとpopularFlagが変わるたびにアニメーションを実行

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      handleSwipeType("left");
      if (isTutorial === true) {
        setIsTutorial(false);
      } else if (number < limit) {
        reserveLesson(number + 1);
        setNumber(number + 1);
      }
      // console.log("呼ばれてますよ左");
    },
    onSwipedRight: () => {
      handleSwipeType("right");
      if (isTutorial === true) {
        setIsTutorial(false);
      } else {
        reserveLesson(number);
        setFlick(false);
      }
      // console.log("呼ばれてますよ右");
      // console.log(lesson[number]);
    },
  });

  function clickPopularLesson(popularNumber) {
    setNumber(popularNumber);
    reserveLesson(popularNumber);
    setClickPopular(true);
    setFlick(false);
  }

  function returnFirstCard() {
    reserveLesson(0);
    setNumber(0);
    setIsTutorial(true);
  }

  useEffect(() => {
    async function fetchAndSetPupularLessons() {
      if (readyToFetch) {
        try {
          await fetchPopularLesson(); // 人気のレッスンを取得
          setPopularFlag(true); // 人気のフラグを立てる
          startAnimation(); // アニメーションを開始
        } catch (err) {
          console.error(err);
        } finally {
          setReadyToFetch(false);
        }
      }
    }
    fetchAndSetPupularLessons();
  }, [readyToFetch]);

  function nextPopularCard() {
    setReadyToFetch(true);
  }

  return (
    <>
      {number < limit ? (
        <div>
          <div className="profile-info">
            <center>
              <form className="set-calendar">
                開始日：
                <label className="calendar-design">
                  <input
                    className="input date-style grayout"
                    type="date"
                    value={startDate}
                    readOnly
                  />
                </label>
                <br />
                終了日：
                <label className="calendar-design">
                  <input
                    className="input date-style grayout"
                    type="date"
                    value={endDate}
                    readOnly
                  />
                </label>
              </form>
            </center>
            <br />
          </div>
          {isTutorial ? (
            <>
              <div className="lesson-box" {...handlers}>
                <ImageGallery
                  imgPaths={["./images/dico.png"]}
                  youtubeIds={[]}
                  disableButtons={true}
                />
                <div className="lesson-details">
                  {/* <p>{profile.calendar}</p> */}
                  <div>
                    今からあなたにピッタリな5つのレッスンカードが表示されるよ！
                    <br />
                    少しでも気になったらカードを右へスワイプして予約してみよう！
                    <br />
                    気に入らなかったら左へスワイプすると次のレッスンが表示されるよ
                    <br />
                    じゃあ、さっそく左にスワイプしてレッスンカードを表示させよう！
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="lesson-box" {...handlers}>
                <ImageGallery
                  imgPaths={lesson[number].imagePath}
                  youtubeIds={lesson[number].movie_id}
                  disableButtons={false}
                />
                <div className="lesson-details">
                  {/* <p>{profile.calendar}</p> */}
                  <p className="lesson-box-title">{lesson[number].title}</p>
                  <p className="lesson-box-description">
                    {lesson[number].description}
                  </p>
                  <p className="lesson-box-description">
                    開催日時： {convertFormatDatetimeForLesson(lesson[number])}
                    <br />
                    開催場所：{lesson[number].location}
                  </p>
                </div>
              </div>
            </>
          )}{" "}
        </div>
      ) : popularFlag === true ? (
        <div id="container">
          <div>
            <h1>3つ中から選んでね！</h1>
          </div>
          <div id="card" ref={card1Ref} onClick={() => clickPopularLesson(0)}>
            <figure className="front">
              <h2>人気のあるレッスン</h2>
              <p>その1</p>
            </figure>
            <figure className="back">
              <h2>{popularLesson[0].title}</h2>
              <p>{popularLesson[0].description}</p>
            </figure>
          </div>
          <br />
          <div id="card" ref={card2Ref} onClick={() => clickPopularLesson(1)}>
            <figure className="front">
              <h2>人気のあるレッスン</h2>
              <p>その2</p>
            </figure>
            <figure className="back">
              <h2>{popularLesson[1].title}</h2>
              <p>{popularLesson[1].description}</p>
            </figure>
          </div>
          <br />
          <div id="card" ref={card3Ref} onClick={() => clickPopularLesson(2)}>
            <figure className="front">
              <h2>人気のあるレッスン</h2>
              <p>その3</p>
            </figure>
            <figure className="back">
              <h2>{popularLesson[2].title}</h2>
              <p>{popularLesson[2].description}</p>
            </figure>
          </div>
        </div>
      ) : (
        <center className="userInputMain">
          <div className="chat-container">
            <p
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                textAlign: "center",
                margin: "0 auto", // 中央揃え
                width: "100%", // 親幅に合わせる
                wordWrap: "break-word", // 長い単語を折り返し
                whiteSpace: "normal", // 折り返し有効化
                overflow: "hidden", // オーバーフロー防止
                //textOverflow: "ellipsis", // 長すぎる場合に省略
                //backgroundColor: "blue",
              }}
            >
              興味があるレッスンが無かったかな...？
              <br />
              人気でおすすめなレッスンを3つ選んだよ！
              <br />
              もし心残りがあれば、もう1回見てみる？
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#555",
                textAlign: "center",
                margin: "10px auto 0", // 上に余白を追加
                width: "100%", // 親幅に合わせる
                wordWrap: "break-word",
                whiteSpace: "normal",
              }}
            >
              人気のレッスンは選び直しができないから気をつけてね！
            </p>
          </div>
          <img
            src={"./images/dico.png"}
            alt="キャラクター"
            className="character-image-recommend-lesson"
          />
          <button onClick={returnFirstCard} className="button-return">
            選びなおす
          </button>
          <button onClick={nextPopularCard} className="button-popular">
            人気のレッスンへ
          </button>
        </center>
      )}
    </>
  );
}

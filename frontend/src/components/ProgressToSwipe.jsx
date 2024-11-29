import React, { useState } from "react";
import "../css/multiStepUserInput.css"; // 必要に応じてCSSファイルを調整してください

export function ProgressToSwipe({
  profile,
  lesson,
  startDate,
  endDate,
  onComplete,
}) {
  // console.log("ProgressToSwipeが表示されました", { profile, lesson, startDate, endDate }); // デバッグ用
  const [currentTouch, setCurrentTouch] = useState(0);

  const handleNext = () => {
    // 次の画面に進むため、`inputDate`を`true`に設定
    onComplete(true);
  };

  const handleTouch = () => {
    setCurrentTouch((prevTouch) => {
      if (prevTouch < 10) {
        return prevTouch + 1;
      }
      return 0; // 10以上の場合はそのまま
    });
  };

  return (
    <div className="userInputMain">
      {/* メッセージ */}
      <div className="chat-container">
        <p className="chat-content">
          <span className="chat-main">よし、じゃあ早速レッスンを探そう！</span>
          <br />
          <span className="chat-secondary">
            {currentTouch === 10 ? (
              <>
                そんなに構ってほしいの？
                <br />
                ちょっとだけだよっ（パチッ）
              </>
            ) : currentTouch >= 5 ? (
              "そんなにつんつんしないでよ～くすぐったい！"
            ) : currentTouch >= 1 ? (
              "ぼくのこと触っても先には進まないよ～"
            ) : (
              " どうやって探すか、説明するね！"
            )}
          </span>
        </p>
      </div>

      {/* キャラクターの画像 */}
      <img
        src={`./images/${currentTouch === 10 ? "dico_wink.png" : "dico.png"}`} // currentTouchに応じて画像を切り替え
        onClick={handleTouch}
        alt="キャラクター"
        className="character-image"
      />

      {/* ボタン */}
      <button onClick={handleNext} className="button-next">
        レッスンを探す
      </button>
    </div>
  );
}

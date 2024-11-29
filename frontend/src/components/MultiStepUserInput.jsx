import React, { useState } from "react";
import "../css/multiStepUserInput.css";

/**
 * MultiStepUserInput Component
 * @param {Object[]} steps - 配列形式の質問データ（id, question, type, name を含む）
 * @param {function} onComplete - フォーム入力完了時のコールバック関数
 */

export function MultiStepUserInput({
  handleLogin,
  questions,
  formData,
  setFormData,
  finalCallback,
  currentStep,
  setCurrentStep,
}) {
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [currentTouch, setCurrentTouch] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setCurrentAnswer(e.target.value);
    // console.log(typeof currentAnswer, currentAnswer);
  };

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentTouch(0);
      setCurrentStep(currentStep + 1);
      setCurrentAnswer("");
    } else {
      //alert("送る処理が入る: " + JSON.stringify(formData, null, 2));
      finalCallback();
    }
  };

  const handleTouch = () => {
    setCurrentTouch((prevTouch) => {
      if (prevTouch < 10) {
        return prevTouch + 1;
      }
      return prevTouch; // 10以上の場合はそのまま
    });
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setCurrentTouch(0);
    }
  };

  const renderConfirmation = () => {
    // console.log(questions);
    // console.log(formData);

    return (
      <div className="confirmation-container">
        {questions.map((question, index) => {
          const inputId = `input-${question.name}`;
          if (Array.isArray(question.label)) {
            return (
              <div key={index} className="slide-bar-container">
                <label className="slide-bar label" htmlFor="scale">
                  <p className="slide-bar-left">{question.label[0] + " "}</p>
                  <p className="slide-bar-right">{" " + question.label[1]}</p>
                </label>
                <br />
                <div className="range-container">
                  <div className="range-track-disabled">
                    {[...Array(11)].map((_, i) => (
                      <div
                        key={i}
                        className="range-tick-disabled"
                        style={{
                          left: `${i * 10}%`,
                          visibility:
                            i === 0 || i === 10 ? "hidden" : "visible",
                        }}
                      ></div>
                    ))}
                  </div>
                  <input
                    type="range"
                    name={question.name}
                    min="0"
                    max="1"
                    step="0.1"
                    value={Number(formData[question.name])}
                    onChange={handleChange}
                    className="range-input"
                    disabled
                  />
                </div>
              </div>
            );
          }

          return (
            <div key={index} className="confirmation-item">
              <label htmlFor={inputId} className="confirmation-label">
                {question.label}
              </label>
              <span className="confirmation-value">
                {question.type === "select" && question.options.values
                  ? question.options.keys[
                      question.options.values.indexOf(
                        Number(formData[question.name])
                      )
                    ]
                  : formData[question.name]}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderCharacterSubMessage = () => {
    const subMessage = questions[currentStep].characterSubMessage;
    const userName = formData.name || "ゲスト";

    return subMessage.replace("**userName**", userName);
  };

  const renderInput = (step) => {
    const inputId = `input-${step.name}`;
    const isDate = step.type === "date";

    if (step.type === "select") {
      return (
        <>
          <label htmlFor={inputId} className="label">
            {step.label}
          </label>
          <select
            id={inputId}
            name={step.name}
            value={formData[step.name]}
            onChange={handleChange}
            className="input"
          >
            <option value="" disabled>
              選択してください
            </option>
            {step.options.keys.map((option, index) => (
              <option
                key={index}
                value={
                  !step.options.values ? option : step.options.values[index]
                }
              >
                {option}
              </option>
            ))}
          </select>
        </>
      );
    }
    if (Array.isArray(step.label)) {
      return (
        <>
          <div className="slide-bar-container">
            <label className="slide-bar label" htmlFor="scale">
              <p className="slide-bar-left">{step.label[0] + " "}</p>
              <p className="slide-bar-right">{" " + step.label[1]}</p>
            </label>
            <br />
            <div className="range-container">
              <div className="range-track">
                {[...Array(11)].map((_, i) => (
                  <div
                    key={i}
                    className="range-tick"
                    style={{
                      left: `${i * 10}%`,
                      visibility: i === 0 || i === 10 ? "hidden" : "visible",
                    }}
                  ></div>
                ))}
              </div>
              <input
                type="range"
                name={step.name}
                min="0"
                max="1"
                step="0.1"
                value={Number(formData[step.name])}
                onChange={handleChange}
                className="range-input"
              />
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <label htmlFor={inputId} className="label">
          {step.label}
        </label>
        <input
          type={step.type}
          name={step.name}
          value={formData[step.name]}
          onChange={handleChange}
          className={`input ${isDate ? "date-style" : ""}`}
        />
      </>
    );
  };
  const progress = ((currentStep + 1) / questions.length) * 100;
  return (
    <div className="userInputMain">
      {/* 戻るボタン（左上に固定） */}
      <a
        href="javascript:void(0)"
        onClick={handleBack}
        disabled={currentStep === 0}
        className="buttonReturn"
        style={{
          display: currentStep === 0 ? "none" : "inline-block",
        }}
      ></a>

      {/* プログレスバー */}
      {currentStep !== questions.length && (
        <div className="progress-bar-container">
          <div className="progress-bar-background">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* 質問と説明 */}

      <div className="chat-container">
        <p className="chat-content">
          <span className="chat-main">
            {currentStep === questions.length
              ? "ここまでの入力内容を確認して！"
              : `${questions[currentStep].characterMainMessage}`}
          </span>
          <br />
          <span className="chat-secondary">
            {currentStep === questions.length ? (
              "質問はもう少しだけ続くよ！"
            ) : currentTouch === 10 ? (
              <>
                そんなに構ってほしいの？
                <br />
                ちょっとだけだよっ（パチッ）
              </>
            ) : currentTouch >= 5 ? (
              "そんなにつんつんしないでよ～くすぐったい！"
            ) : currentTouch >= 1 ? (
              "ぼくのこと触っても先には進まないよ～"
            ) : Array.isArray(questions[currentStep].label) ? (
              Number(currentAnswer) <= 0.3 ? (
                `${questions[currentStep].characterLeftMessage}`
              ) : Number(currentAnswer) >= 0.8 ? (
                `${questions[currentStep].characterRightMessage}`
              ) : (
                `${questions[currentStep].characterMediumMessage}`
              )
            ) : (
              `${renderCharacterSubMessage()}`
            )}
          </span>
        </p>
      </div>

      {/* イラスト */}

      <img
        src={`./images/${currentTouch === 10 ? "dico_wink.png" : "dico.png"}`} // currentTouchに応じて画像を切り替え
        onClick={handleTouch}
        alt="キャラクター"
        className="character-image"
      />

      {/* 入力 */}
      <div className="input-container">
        {/* 質問の入力欄 */}
        {currentStep === questions.length
          ? renderConfirmation()
          : renderInput(questions[currentStep])}
      </div>
      {/* 次へボタン */}
      <button
        onClick={handleNext}
        className="button-next"
        disabled={currentAnswer === "" && currentStep !== questions.length}
      >
        {currentStep === questions.length - 1
          ? "確認画面へ"
          : currentStep === questions.length
          ? "完了"
          : "次へ"}
      </button>
    </div>
  );
}

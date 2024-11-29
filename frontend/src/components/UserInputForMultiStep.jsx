import { useEffect, useState } from "react";
import React from "react";
import "../css/userInput.css";
import "../css/multiStepUserInput.css";
import { MultiStepUserInput } from "./MultiStepUserInput";

const baseQuestions = [
  {
    id: 1,
    label: "名前",
    type: "text",
    name: "name",
    characterMainMessage: "早速、あなたのお名前を教えて！",
    characterSubMessage: "僕はディコ！フルネームで教えてね！",
  },
  {
    id: 2,
    label: "性別",
    type: "select",
    name: "sex",
    characterMainMessage: "つぎに、あなたの性別を教えて！",
    characterSubMessage: "よろしくね、**userName**さん！",
    options: { keys: ["男性", "女性", "その他"], values: [0, 1, 9] },
  },
  {
    id: 3,
    label: "生年月日",
    type: "date",
    name: "birthday",
    characterMainMessage: "生年月日も教えてほしいな！",
    characterSubMessage: "誕生日ってなんだかワクワクするよね",
  },
  {
    id: 4,
    label: "住所",
    type: "text",
    name: "address",
    characterMainMessage: "そしたら、次は住所を教えて！",
    characterSubMessage: "え、僕がどこに住んでるかって…？気になる？",
  },
  {
    id: 5,
    label: "趣味",
    type: "select",
    name: "hobby",
    characterMainMessage: "今やってる趣味があれば、教えてほしいな！",
    characterSubMessage: "僕は南麻布に住んでるんだ～。",
    options: {
      keys: ["特になし", "スポーツ", "読書", "音楽", "ゲーム", "料理"],
    },
  },
  {
    id: 6,
    label: "受講場所",
    type: "select",
    name: "location",
    characterMainMessage: "了解！そしたら希望の受講場所はある？",
    characterSubMessage: "月で受講できる講座があったらいいな",
    options: { keys: ["自宅", "東京都"] },
  },
];

const addisionalQuestions = [
  {
    id: 1,
    label: ["インドア派", "アウトドア派"],
    type: "text",
    name: "inoutdoor",
    characterMainMessage: "インドア派かアウトドア派だと、どっち？",
    characterSubMessage: "",
    characterLeftMessage: "おうちの中でできる趣味っていいよね～",
    characterMediumMessage: "甲乙つけがたい……",
    characterRightMessage: "やっぱり外に出るのが楽しいかな～",
  },
  {
    id: 2,
    label: ["少人数でやりたい", "大人数でやりたい"],
    type: "text",
    name: "scale",
    characterMainMessage: "どのくらいの人数でやるのがいいかな",
    characterSubMessage: "**scale**",
    characterLeftMessage: "少ない人数だと集中できるよね",
    characterMediumMessage: "何事もちょうどいいくらいが大事",
    characterRightMessage: "大人数だと楽しみが共有できる人がたくさん",
  },
  {
    id: 3,
    label: ["近くでやりたい", "遠くてもよい"],
    type: "text",
    name: "distance",
    characterMainMessage: "遠出は好き？近場で済ませるタイプ？",
    characterSubMessage: "**distance**",
    characterLeftMessage: "近所にも意外と知らないこと多いよね～",
    characterMediumMessage: "どっちにも魅力があって困っちゃう",
    characterRightMessage: "遠出はワクワク感があって楽しい",
  },
  {
    id: 4,
    label: ["黙々とやりたい", "和気藹々とやりたい"],
    type: "text",
    name: "silent",
    characterMainMessage: "静かに集中したい？にぎやかな方が好き？",
    characterSubMessage: "**silence**",
    characterLeftMessage: "………………ぷはっ！静かにするの得意なんだ！",
    characterMediumMessage: "実はスライドバーは僕の念力で動かしてるんだ！",
    characterRightMessage: "にぎやかしなら任せて！どんちゃん♪どんちゃん♪",
  },
  {
    id: 5,
    label: ["運動量少なめ", "運動量多め"],
    type: "text",
    name: "momentum",
    characterMainMessage: "どのくらい体を動かしたい？",
    characterSubMessage: "**momentum**",
    characterLeftMessage: "のんびりするのもいいよね～",
    characterMediumMessage: "最後の質問だよ！",
    characterRightMessage: "体を動かすと気分が良くなるよね！",
  },
];

// const addisionalQuestions = [
//   {
//     id: 1,
//     label: ["インドア派", "アウトドア派"],
//     type: "text",
//     name: "inoutdoor",
//     characterMainMessage: "インドア派かアウトドア派だと、どっち？",
//     characterSubMessage: "",
//     characterLeftMessage: "おうちの中でできる趣味っていいよね～",
//     characterMediumMessage: "甲乙つけがたい……",
//     characterRightMessage: "やっぱり外に出るのが楽しいかな～",
//   },
//   {
//     id: 2,
//     label: ["少人数でやりたい", "大人数でやりたい"],
//     type: "text",
//     name: "scale",
//     characterMainMessage: "どのくらいの人数でやるのがいいかな",
//     characterSubMessage: "**scale**",
//     characterLeftMessage: "少ない人数だと集中できるよね",
//     characterMediumMessage: "何事もちょうどいいくらいが大事",
//     characterRightMessage: "大人数だと楽しみが共有できる人がたくさん",
//   },
//   {
//     id: 3,
//     label: ["近くでやりたい", "遠くてもよい"],
//     type: "text",
//     name: "distance",
//     characterMainMessage: "遠出は好き？それとも近場で済ませるタイプ？",
//     characterSubMessage: "**distance**",
//     characterLeftMessage: "近所にも意外と知らないこと多いよね～",
//     characterMediumMessage: "どっちにも魅力があって困っちゃう",
//     characterRightMessage: "遠出はワクワク感があって楽しい",
//   },
//   {
//     id: 4,
//     label: ["黙々とやりたい", "和気藹々とやりたい"],
//     type: "text",
//     name: "silent",
//     characterMainMessage: "静かに集中したい？にぎやかな方が好き？",
//     characterSubMessage: "**silence**",
//     characterLeftMessage: "……………………ぷはっ！静かにするの得意なんだ！",
//     characterMediumMessage: "実はこのスライドバーは僕の念力で動かしてるんだ！",
//     characterRightMessage: "にぎやかしなら任せて！どんちゃん♪どんちゃん♪",
//   },
// ];

export function UserInputForMultiStep({ handleLogin, sendFormData, setUserId, userId }) {
  const host = process.env.REACT_APP_HOSTNAME || "98.82.11.196";

  const mock = {
    name: "趣味太郎",
    sex: 0,
    birthday: "1998-02-24",
    address: "横浜",
    hobby: "スポーツ",
    location: "東京都",
    inoutdoor: 0.5,
    scale: 0.5,
    distance: 0.5,
    silent: 0.5,
    momentum: 0.5,
  };

  const honban = {
    name: "",
    sex: "",
    birthday: "",
    address: "",
    hobby: "",
    location: "",
    inoutdoor: 0.5,
    scale: 0.5,
    distance: 0.5,
    silent: 0.5,
    momentum: 0.5,
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState("userBaseQuestions");
  const [formData, setFormData] = useState(mock);
  const [currentStep, setCurrentStep] = useState(0);

  function navigateToUserAddisionalQuestions() {
    setCurrentPage("userAddisionalQuestions");
  }

  async function handleSubmitUser() {
    try {
      const response = await fetch(`http://${host}:3000/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          sex: formData.sex,
          birthday: formData.birthday,
          address: formData.address,
        }),
      });
      // hobby: formData.hobby,
      //location: formData.location,

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      // console.log("登録成功:", responseData.id);
      setUserId(responseData.id);

      sendFormData(formData);
      setCurrentStep(0);
      navigateToUserAddisionalQuestions();
    } catch (error) {
      console.error("エラーが発生しました:", error);
      setErrorMessage("ユーザー登録に失敗しました。もう一度お試しください。");
    }
  }

  async function handleSubmitUserAnswer() {
    try {
      const formatedAnswer = addisionalQuestions.map((q) => {
        return {
          question_id: q.id,
          answer: formData[q.name],
        };
      });

      // console.log(formatedAnswer);

      const responseAnswer = await fetch(`http://${host}:3000/api/user_answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          user_answer: formatedAnswer,
        }),
      });
      if (!responseAnswer.ok) {
        throw new Error(`HTTP error! Status: ${responseAnswer.status}`);
      }
      // console.log("回答登録成功:", await responseAnswer.json());

      sendFormData(formData);
      setCurrentStep(0);
      handleLogin(true); // ログイン状態にする
    } catch (error) {
      console.error("エラーが発生しました:", error);
      setErrorMessage("ユーザー登録に失敗しました。もう一度お試しください。");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {currentPage === "userBaseQuestions" ? (
        <MultiStepUserInput
          handleLogin={handleLogin}
          questions={baseQuestions}
          formData={formData}
          setFormData={setFormData}
          finalCallback={handleSubmitUser}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      ) : (
        <MultiStepUserInput
          handleLogin={handleLogin}
          questions={addisionalQuestions}
          formData={formData}
          setFormData={setFormData}
          finalCallback={handleSubmitUserAnswer}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      )}
    </>
  );
}

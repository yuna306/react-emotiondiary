import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || " ";

  //날짜 202X. X. XX.포맷으로
  const strDate = new Date(parseInt(date)).toLocaleDateString();
  const navigate = useNavigate();

  //상세페이지 이동
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };
  //수정페이지 이동
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      {/* 클래스 명에 ,들어가지 말라고 조인  */}
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img src={env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>

      <div className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>

      <div className="btn_wrapper">
        <MyButton text={"수정하기"} onClick={goEdit} />
      </div>
    </div>
  );
};

export default DiaryItem;

import { useEffect, useState, useContext } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import DiaryList from "../components/DiaryList";

const Home = () => {
  //일단 작성한 더미데이터 (DiaryStateContext Provider에서 전달해줌)
  const diaryList = useContext(DiaryStateContext);

  //월을 변경하면 (이전달, 다음달) 변경된 월에 맞는 더미데이터가 보여지도록 하기위한 state
  const [data, setData] = useState([]);

  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  //사용자가 선택한 월에 맞는 일기만 뿌려주기
  // firstDay는 선택한 월의 첫째날
  // lastDay는 선택한 월의 마지막날

  useEffect(() => {
    // 일기의 길이가 없는 상태에서 굳이 수행하여 자원낭비 할 필요 없으므로
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0
      ).getTime();

      // 1일~ 말일 사이의 데이터가 당월 데이터
      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
    //diaryList를 전달 해주지 않으면?
    //diaryList가 바뀌었다는건 일기가 추가되었다거나 수정,삭제되었나거나 하는 상황임
    //그러므로 diaryList도 전달해야 됨
  }, [diaryList, curDate]);

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

//여러 셀렉트 박스 옵션을 컨트롤
// onChange : select 변화 감지
//optionList : select태그안에 들어갈 옵션 아래 sortOptionList, filterOptionList
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};
//날짜정렬 셀렉트 박스의 옵션
const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

//감정정렬 셀렉트 박스의 옵션
const filterOptionList = [
  { value: "all", name: "전부" },
  { value: "good", name: "좋은감정만" },
  { value: "bad", name: "나쁜감정만" },
];

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();

  // 최신순 & 오래된 순으로 정렬
  const [sortType, setSortType] = useState("latest");

  // 감정(1~5)점수 정렬/default는 전체 표시를 위해 all
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    //최신순/오래된순 sort()의 매개변수 compareFunction
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    //감정점수 good/ bad 판별 함수
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      }
      return parseInt(item.emotion) > 3;
    };

    //셀렉트 박스의 옵션이 변경될 때 일기리스트 정렬을 변경 담당
    //diaryList.sort 를 사용하게 되면 원본배열 자체가 정렬변경 되는 현상이 발생 됨
    //위와같은 상황을 방지하기 위해 깊은복사를 해야 됨.
    //JSON.stringify(diaryList) 배열을 문자열로
    //JSON.parse() 다시 배열로
    //copyList에는 값만 들어오게 됨
    const copyList = JSON.parse(JSON.stringify(diaryList));

    // 공식문서 arr.sort([compareFunction])
    // compareFunction(a, b) return 0보다 작으면 a가 먼저 / 0보다 크면 b가 먼저
    // const sortedList = copyList.sort(compare);
    // return sortedList;

    //감정필터 추가전 위 주석처리와 같았으나, 감정필터 적용이 필요하므로
    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          {/* 최신순 / 오래된 순 정렬 */}
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />

          {/* 감정에 따른 정렬 */}
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          {/* 일기쓰기 버튼 */}
          <MyButton
            type={"positive"}
            text={"새 일기쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {/* DiaryItem컴포넌트로 분리      */}
      {/* {getProcessedDiaryList().map((it) => (
        <div key={it.id}>
          {it.content} {it.emotion}
        </div>
      ))} */}

      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

//혹시라도 diaryList 프롭이 정상적으로 전달 안 될때를 대비하여
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;

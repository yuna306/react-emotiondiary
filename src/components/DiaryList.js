import React, { useState } from "react";

//셀렉트 박스
//value : 최신순, 오래된 / onChange : select 변화 감지
//optionList : select태그안에 들어갈 옵션 아래 sortOptionList
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};
//셀렉트 박스의 옵션
const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const DiaryList = ({ diaryList }) => {
  // 최신순 & 오래된 순으로 정렬
  const [sortType, setSortType] = useState("latest");

  //셀렉트 박스의 옵션이 변경될 때 일기리스트 정렬을 변경 담당
  //diaryList.sort 를 사용하게 되면 원본배열 자체가 정렬변경 되는 현상이 발생 됨
  //위와같은 상황을 방지하기 위해 깊은복사를 해야 됨.
  const getProcessedDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    //JSON.stringify(diaryList) 배열을 문자열로
    //JSON.parse() 다시 배열로
    //copyList에는 값만 들어오게 됨
    const copyList = JSON.parse(JSON.stringify(diaryList));
    const sortedList = copyList.sort(compare);
    return sortedList;
  };

  return (
    <div>
      {/* 최신/오래된 순 정렬 */}
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />

      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};

//혹시라도 diaryList 프롭이 정상적으로 전달 안 될때를 대비하여
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;

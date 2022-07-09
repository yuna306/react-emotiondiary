//react import문이 맨 윗줄인게 보기가 편함
import React, { useEffect, useReducer, useRef } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

//components
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";

// 실시간 state와 행동을 담은 action
const reducer = (state, action) => {
  // 새로운 상태 담을 배열
  let newState = [];

  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }

    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }

    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }

    default: {
      return state;
    }
  }
  return newState;
};

//data전달을 위한 Context
export const DiaryStateContext = React.createContext();
//onCreate,onRemove,onEdit 함수전달 Context
export const DiaryDispatchContext = React.createContext();

function App() {
  //DiaryStateContext.Provider로 data전달
  const [data, dispatch] = useReducer(reducer, []);

  // 아이디 값 AUTO INCREMENT
  const dataId = useRef(0);

  //CREATE : 작성한날짜, 내용, 감정을 받아서 객체형식으로 전달.
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    //아이디 1 증가
    dataId.current += 1;
  };

  // REMOVE : 지워야 할 아이디를 받아 그대로 전달
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  // EDIT: 아이디, 날짜, 내용, 감정을 모두 받아 전달
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: { id: targetId, date: new Date(date).getTime(), content, emotion },
    });
  };

  /**
   *
   * DiaryStateContext.Provider : data state를 공급
   * DiaryDispatchContext.Provider : data state를 변화시킬 수 있는 dispatch 함수들을 객체로 공급
   */

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;

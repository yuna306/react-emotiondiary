import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const id = useSearchParams.get("id");
  console.log("id" + id);

  const mode = useSearchParams.get("mode");
  console.log("mode" + mode);

  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 수정 페이지 입니다</p>
      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        Home으로가기
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
};

export default Edit;

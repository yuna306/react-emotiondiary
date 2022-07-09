const MyButton = ({ text, type, onClick }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    //className= MyButton MyButton_positive 와 같은 형태
    <button
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

// type 이 전달되지 않으면 default Props
MyButton.defaultProps = {
  type: "default",
};

export default MyButton;

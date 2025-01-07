import { useState } from "react";
import "../style/FoodForm.css";
import FileInput from "./FileInput";
const FoodForm = () => {
  const [values, setValues] = useState({
    title: "",
    calorie: 0,
    content: "",
    imgFile: "",
  });

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };
  return (
    <form onSubmit={handleSubmit} className="FoodForm">
      <FileInput
        name="imgFIle"
        value={values.imgFile}
        onChange={handleChange}
      />
      <input name="title" value={values.title} onChange={handleInputChange} />
      <input
        name="calorie"
        value={values.calorie}
        type="number"
        onChange={handleInputChange}
      />
      <input
        name="content"
        value={values.content}
        onChange={handleInputChange}
      />
      <button type="submit">확인</button>
    </form>
  );
};

export default FoodForm;

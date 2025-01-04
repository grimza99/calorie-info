import FoodList from "./FoodList";
import { useState } from "react";
import getFoods from "../api";

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const orderItems = items.sort((a, b) => b[order] - a[order]);
  const handleCalorieClick = () => {
    setOrder("calorie");
  };
  const handleNewsteCLick = () => {
    setOrder("createdAt");
  };
  const handelDelete = (id) => {
    const nextItmes = items.filter((item) => item.id !== id);
    setItems(nextItmes);
  };
  const handleLoadClick = async () => {
    const { foods } = await getFoods();
    setItems(foods);
  };
  return (
    <div>
      <div>
        <button onClick={handleNewsteCLick}>최신순</button>
        <button onClick={handleCalorieClick}>칼로리순</button>
      </div>
      <FoodList items={orderItems} onDelete={handelDelete} />
      <button onClick={handleLoadClick}>불러오기</button>
    </div>
  );
}

export default App;

import FoodList from "./FoodList";
import { useEffect, useState } from "react";
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
  const handleLoad = async (orderQuery) => {
    const { foods } = await getFoods(orderQuery);
    setItems(foods);
  };
  useEffect(() => {
    handleLoad(order);
  }, [order]);

  return (
    <div>
      <div>
        <button onClick={handleNewsteCLick}>최신순</button>
        <button onClick={handleCalorieClick}>칼로리순</button>
      </div>
      <FoodList items={orderItems} onDelete={handelDelete} />
    </div>
  );
}

export default App;

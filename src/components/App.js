import FoodList from "./FoodList";
import { useEffect, useState } from "react";
import getFoods from "../api";

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [cursor, setCursor] = useState("");
  const [isError, setIsErorr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      setIsErorr(null);
      result = await getFoods(options);
    } catch (error) {
      setIsErorr(error);
    } finally {
      setIsLoading(false);
    }
    const {
      foods,
      paging: { nextCursor },
    } = result;
    if (!options.cursor) {
      setItems(foods);
    } else {
      setItems((prevItems) => [...prevItems, ...foods]);
    }
    setCursor(nextCursor);
  };
  useEffect(() => {
    handleLoad({ order });
  }, [order]);

  const handleLoadMore = () => {
    handleLoad({
      order,
      cursor,
    });
  };
  return (
    <div>
      <div>
        <button onClick={handleNewsteCLick}>최신순</button>
        <button onClick={handleCalorieClick}>칼로리순</button>
      </div>
      <FoodList items={orderItems} onDelete={handelDelete} />

      {cursor && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더보기
        </button>
      )}
      {isError?.message && <p>{isError.message}</p>}
    </div>
  );
}

export default App;

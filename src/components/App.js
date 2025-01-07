import FoodList from "./FoodList";
import { useEffect, useState, useRef } from "react";
import getFoods from "../api";
import FoodForm from "./FoodForm";
function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [cursor, setCursor] = useState("");
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const orderItems = items.sort((a, b) => b[order] - a[order]);

  const handleCalorieClick = () => {
    setOrder("calorie");
  };

  const handleNewestCLick = () => {
    setOrder("createdAt");
  };

  const handelDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      setIsError(null);
      result = await getFoods(options);
    } catch (error) {
      setIsError(error);
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
    handleLoad({ order, search });
  }, [order, search]);

  const handleLoadMore = () => {
    handleLoad({
      order,
      cursor,
      search,
    });
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    setSearch(e.target["search"].value);
  };
  return (
    <div>
      <div>
        <button onClick={handleNewestCLick}>최신순</button>
        <button onClick={handleCalorieClick}>칼로리순</button>
      </div>
      <form onSubmit={handleSearchSubmit}>
        <input name="search" />
        <button type="submit">검색</button>
      </form>
      <FoodForm />
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

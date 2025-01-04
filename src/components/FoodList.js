function FoodListItem({ items, onDelete }) {
  const { imgUrl, title, calorie, content } = items;
  const handelDeleteButton = () => {
    return onDelete(items.id);
  };
  return (
    <div>
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>
      <button onClick={handelDeleteButton}>삭제</button>
    </div>
  );
}

function FoodList({ items, onDelete }) {
  return (
    <ul>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <FoodListItem onDelete={onDelete} items={item} />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;

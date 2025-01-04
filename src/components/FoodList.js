function FoodListItem({ items }) {
  const { imgUrl, title, calorie, content } = items;
  return (
    <div>
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>
    </div>
  );
}

function FoodList({ items }) {
  return (
    <ul>
      {items.map((item) => {
        return (
          <li>
            <FoodListItem items={item} />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;

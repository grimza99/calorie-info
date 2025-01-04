export default async function getFoods() {
  const response = await fetch("https://learn.codeit.kr/0909/foods/");
  const body = await response.json();
  return body;
}

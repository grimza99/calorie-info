export default async function getFoods({
  order = "createdAt",
  limit = 10,
  cursor = "",
  search = "",
}) {
  const query = `?order=${order}&cursor=${cursor}&limit=${limit}&search=${search}`;
  const response = await fetch(`https://learn.codeit.kr/0909/foods/${query}`);
  if (!response.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

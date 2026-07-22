const BASE_URL = "https://www.thesportsdb.com/api/v1/json/3";

export async function getData(apiPath) {
  const url = `${BASE_URL}${apiPath}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Request failed");
  }
  return response.json();
}

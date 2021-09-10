const API_URL = "https://w-r-s.herokuapp.com/api";

export async function getApiData(id) {
  const queryParam = id ? `?dirId=${id}` : "";
  const url = API_URL + queryParam;

  try {
    const response = await fetch(url);
    return response.json();
  } catch (e) {
    console.error("Error fetching data");
  }
}

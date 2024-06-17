export const API_BASE_URL = "https://rickandmortyapi.com/api/";
export const API_CHARACTER = "character";

export interface CharacterProps {
  gender: string;
  id: number;
  image: string;
  name: string;
  status: string;
}

export const fetchCharacters = async (keyword?: string, page?: number) => {
  const baseUrl = API_BASE_URL + API_CHARACTER;
  const urlWithNoPage = keyword ? baseUrl + `?name=${keyword}` : baseUrl;
  const url = page
    ? urlWithNoPage + `${keyword ? "&" : "?"}page=${page}`
    : urlWithNoPage;

  try {
    console.log("URL", url);
    const response = await fetch(url);

    if (!response.ok) {
      return console.error(`Something went wrong`);
    }

    const data = await response.json();

    const results: CharacterProps[] = data.results;
    const pages = data.info.pages;
    const prevLink = data.info.prev;
    let pageNumber = page || 1;

    // if (!prevLink) {
    //   pageNumber = 1;
    // } else {
    //   pageNumber = page;
    // }

    console.log("fetchCHARACTERS", { results, pages, page: pageNumber });

    return { results, pages, pageNumber };
  } catch (e) {
    console.log(e);
  }
};

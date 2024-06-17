import { CharacterProps, fetchCharacters } from "./src/api.js";
import { debounce } from "https://cdn.jsdelivr.net/npm/lodash-es/lodash.js";

const charactersList = document.querySelector("[data-characters]")!;
const searchInput = document.querySelector("[data-search-input]")!;
const pagination = document.querySelector("[data-pagination]")!;
let pagesArray: HTMLLIElement[] = [];
const paginationContainer = document.querySelector(".characters__pagination");

// ===================================

const addPagesEventListeners = () => {
  pagesArray.forEach((page) => {
    page.addEventListener("click", (event) => {
      fetchData(+page.getAttribute("data-page")!);
    });
  });
};

const renderData = (
  charactersArray: CharacterProps[],
  pages: number,
  pageNumber: number,
) => {
  charactersList.innerHTML = ``;

  console.log("pageNumber", pageNumber);

  charactersArray.forEach((character) => {
    charactersList.innerHTML += `
            <li class="characters__item" data-character=${character.id}>
              <figure>
                <img src=${character.image} alt="character">
              </figure>
              
              <h3>${character.name}</h3>
              <p>${character.gender}</p>
              
              <small>${character.status}</small>
            </li>
        `;
  });

  pagination.innerHTML = "";
  console.log(pagination.innerHTML);

  [...Array(pages).keys()].map((page) => {
    pagination.innerHTML += `
      <li data-page="${page + 1}" class="page-number ${pageNumber === page + 1 ? "active" : ""}">
        ${page + 1}
      </li>
    `;
  });

  paginationContainer!.classList.add("show");

  pagesArray = Array.from(document.querySelectorAll("[data-page]")!);
  addPagesEventListeners();
};

const fetchData = async (page?: number) => {
  charactersList.innerHTML = `Loading..`;
  pagination.innerHTML += ``;

  // @ts-ignore
  const data: { results: CharacterProps[]; pages: number; pageNumber: number } =
    await fetchCharacters(undefined, page);

  const { results, pages, pageNumber } = data;

  renderData(results, pages, +pageNumber);
};

const searchCharacters = async (keyword?: string) => {
  pagination.innerHTML += ``;

  // @ts-ignore
  const data: { results: CharacterProps[]; pages: number; pageNumber: number } =
    await fetchCharacters(keyword);

  const { results, pages, pageNumber } = data;

  renderData(results, pages, pageNumber);
};

// ===================================

fetchData();

const debouncedSearchCharacters = debounce(searchCharacters, 400);

searchInput.addEventListener("input", (e: Event) => {
  const { value } = e.target as HTMLInputElement;
  debouncedSearchCharacters(value);
});

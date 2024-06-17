var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchCharacters } from "./src/api.js";
import { debounce } from "https://cdn.jsdelivr.net/npm/lodash-es/lodash.js";
const charactersList = document.querySelector("[data-characters]");
const searchInput = document.querySelector("[data-search-input]");
const pagination = document.querySelector("[data-pagination]");
let pagesArray = [];
const paginationContainer = document.querySelector(".characters__pagination");
// ===================================
const addPagesEventListeners = () => {
    pagesArray.forEach((page) => {
        page.addEventListener("click", () => {
            const input = document.querySelector("[data-search-input]");
            // fetchData(+page.getAttribute("data-page")!);
            debouncedSearchCharacters(input.value, +page.getAttribute("data-page"));
        });
    });
};
const renderData = (charactersArray, pages, pageNumber) => {
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
    paginationContainer.classList.add("show");
    pagesArray = Array.from(document.querySelectorAll("[data-page]"));
    addPagesEventListeners();
};
const fetchData = (page) => __awaiter(void 0, void 0, void 0, function* () {
    charactersList.innerHTML = `Loading..`;
    pagination.innerHTML += ``;
    // @ts-ignore
    const data = yield fetchCharacters(undefined, page);
    const { results, pages, pageNumber } = data;
    renderData(results, pages, +pageNumber);
});
const searchCharacters = (keyword, page) => __awaiter(void 0, void 0, void 0, function* () {
    pagination.innerHTML += ``;
    // @ts-ignore
    const data = yield fetchCharacters(keyword, page);
    const { results, pages, pageNumber } = data;
    renderData(results, pages, pageNumber);
});
// ===================================
fetchData();
const debouncedSearchCharacters = debounce(searchCharacters, 400);
searchInput.addEventListener("input", (e) => {
    const { value } = e.target;
    debouncedSearchCharacters(value);
});

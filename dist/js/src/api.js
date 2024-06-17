var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const API_BASE_URL = "https://rickandmortyapi.com/api/";
export const API_CHARACTER = "character";
export const fetchCharacters = (keyword, page) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = API_BASE_URL + API_CHARACTER;
    const urlWithNoPage = keyword ? baseUrl + `?name=${keyword}` : baseUrl;
    const url = page ? urlWithNoPage + `?page=${page}` : urlWithNoPage;
    try {
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error(`Something went wrong`);
        }
        const data = yield response.json();
        const results = data.results;
        const pages = data.info.pages;
        const prevLink = data.info.prev;
        let pageNumber;
        if (!prevLink) {
            pageNumber = 1;
        }
        else {
            pageNumber = page;
        }
        console.log("fetchCHARACTERS", { results, pages, page: pageNumber });
        return { results, pages, pageNumber };
    }
    catch (e) {
        console.log(e);
    }
});

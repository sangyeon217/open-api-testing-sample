import { test, expect } from "@playwright/test";
import { BookSearchAPI } from "../apis/search/BookSearchAPI";

test("Get Book API Request", async ({ request }) => {
  const bookSearchAPI = new BookSearchAPI("자바스크립트");
  const response = await request.get(bookSearchAPI.url, {
    headers: {
      "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
    },
  });

  const responseBody = await response.json();
  console.log(responseBody);

  expect(response.status()).toBe(200);
  expect(responseBody.total).toEqual(expect.any(Number));
  expect(responseBody.start).toEqual(expect.any(Number));
  expect(responseBody.display).toEqual(expect.any(Number));
  expect(responseBody.items.length).toBe(responseBody.display);

  const index = 0;
  expect(responseBody.items[index].title).toEqual(expect.any(String));
  expect(responseBody.items[index].author).toEqual(expect.any(String));
  expect(responseBody.items[index].description).toEqual(expect.any(String));
});

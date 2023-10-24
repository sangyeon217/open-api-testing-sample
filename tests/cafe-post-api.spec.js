import { test, expect } from "@playwright/test";
import { AuthTokenAPI } from "../apis/login/AuthTokenAPI";
import { CafePostAPI } from "../apis/cafe/CafePostAPI";
import { AppLoginPage } from "../pages/AppLoginPage";
import { AppAccessAgreePage } from "../pages/AppAccessAgreePage";
const fs = require("fs");
// const crypto = require("crypto");

let page;

test.beforeAll(async ({ browser, request }) => {
  //   const state = crypto.randomBytes(8).toString();
  const clientId = process.env.NAVER_CLIENT_ID;
  const redirectURI = process.env.REDIRECT_URI;
  const state = "TEST";

  // 네이버 로그인 인증 요청 => CODE 값 추출
  page = await browser.newPage();
  const loginPage = new AppLoginPage({
    page: page,
    clientId: clientId,
    redirectURI: redirectURI,
    state: state,
  });
  await loginPage.goto();
  await loginPage.login(process.env.NAVER_ID, process.env.NAVER_PW);

  // const appAccessAgreePage = new AppAccessAgreePage(page);
  // await appAccessAgreePage.agreeCheckBox.click({ force: true });
  // await appAccessAgreePage.submitBtn.click();
  await page.waitForLoadState("networkidle");

  const codeRegex = /\?code=(.*)&state=/;
  const codeMatch = page.url().match(codeRegex);
  expect(codeMatch).toBeTruthy();
  const code = codeMatch[1];

  // 접근 토큰 발급
  const authTokenAPI = new AuthTokenAPI({
    grantType: "authorization_code",
    clientId: clientId,
    clientSecret: process.env.NAVER_CLIENT_SECRET,
    redirectURI: redirectURI,
    code: code,
    state: state,
  });
  const response = await request.post(authTokenAPI.url);
  const responseBody = await response.json();
  expect(response.status()).toBe(200);

  const authFileDir = process.env.AUTH_FILE_DIR;
  const authFile = authFileDir + process.env.API_AUTH_FILE;
  if (!fs.existsSync(authFileDir)) {
    fs.mkdirSync(authFileDir, { recursive: true });
  }
  fs.writeFileSync(authFile, JSON.stringify(responseBody));
});

test.afterAll(async ({ request }) => {
  // 페이지 종료
  await page.close();

  // API 접근 토큰 삭제
  const authFile = process.env.AUTH_FILE_DIR + process.env.API_AUTH_FILE;
  const authTokenResponseBody = JSON.parse(fs.readFileSync(authFile));
  const accessToken = authTokenResponseBody.access_token;

  const authTokenAPI = new AuthTokenAPI({
    grantType: "delete",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.NAVER_CLIENT_SECRET,
    accessToken: accessToken,
  });
  const response = await request.post(authTokenAPI.url);
  const responseBody = await response.json();

  expect(response.status()).toBe(200);
  expect(responseBody.result).toBe("success");
});

test("Post Cafe Post API Request", async ({ request }) => {
  const authFile = process.env.AUTH_FILE_DIR + process.env.API_AUTH_FILE;
  const authTokenResponseBody = JSON.parse(fs.readFileSync(authFile));
  const accessToken = authTokenResponseBody.access_token;

  const cafePostTitle = "Playwright Test";
  const cafePostContent = "Playwright 테스트 자동화 테스트용 포스트 입니다.";

  const cafePostAPI = new CafePostAPI({
    clubId: process.env.CAFE_CLUB_ID,
    menuId: process.env.CAFE_MENU_ID,
  });
  const response = await request.post(cafePostAPI.url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    form: {
      subject: encodeURI(cafePostTitle),
      content: encodeURI(cafePostContent),
    },
  });

  const responseBody = await response.json();
  console.log(responseBody);

  expect(response.status()).toBe(200);
  expect(responseBody.message.result.msg).toBe("Success");
});

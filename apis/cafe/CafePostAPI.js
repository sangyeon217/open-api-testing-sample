export class CafePostAPI {
  constructor({ clubId, menuId }) {
    this.url = `https://openapi.naver.com/v1/cafe/${clubId}/menu/${menuId}/articles`;
  }
}

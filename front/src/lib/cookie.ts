/**
 * トークンをCookieに保存する関数
 * @param token JWTなどの文字列
 * @param days 有効期限（日数）
 */
export const setTokenToCookie = (token: string, days: number = 7) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  
  // Cookieの書き込み
  document.cookie = `access_token=${token}; ${expires}; path=/; SameSite=Lax;`;
};

/**
 * Cookieからトークンを取得する関数
 */
export const getTokenFromCookie = (): string | null => {
  const name = "access_token=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
};

export const removeTokenCookie = () => {
  document.cookie = "access_token=; max-age=0; path=/; SameSite=Lax;";
  window.location.href = "/auth/signin"
}
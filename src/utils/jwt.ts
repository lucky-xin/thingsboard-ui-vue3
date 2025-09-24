import { jwtDecode } from 'jwt-decode';

export function decode(token: string | undefined | null) {
  if (token) {
    return jwtDecode(token);
  }
  return undefined;
}

export function getExpiration(token: string) {
  const decoded = jwtDecode(token);
  const unixTimestamp = decoded.exp;
  if (unixTimestamp) {
    return new Date(unixTimestamp * 1000);
  }
  return undefined;
}

export function isExpired(token: string | undefined | null) {
  if (token) {
    const decoded = jwtDecode(token);
    const unixTimestamp = decoded.exp;
    if (unixTimestamp) {
      return unixTimestamp * 1000 < new Date().getTime();
    }
  }
  return true;
}

interface Token {
  email: string;
  sub: string;
  id: string;
  username: string;
  iat: number;
  exp: number;
  jti: string;
}

interface fetchedUser {
  email: string;
  sub: string;
  id: string;
  username: string;
  iat: number;
  exp: number;
  jti: string;
}

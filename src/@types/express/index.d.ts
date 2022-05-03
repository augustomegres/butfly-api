declare namespace Express {
  interface Request {
    user: {
      id: string;
      uid: string;
    };
  }
}

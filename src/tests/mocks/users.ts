import supertest, { SuperTest, Test } from "supertest";

export const validUser = {
  name: "John Doe",
  email: "any@mail.com",
  password: "12345678",
};

export async function createAndAuthenticateUser(
  api: SuperTest<Test>,
  { name, email, password }: { name: string; email: string; password: string }
) {
  await api.post("/signup").send({ name, email, password });
  const response = await api.post("/signin").send({ email, password });
  return { Authorization: `Bearer ${response.body.token}` }
};



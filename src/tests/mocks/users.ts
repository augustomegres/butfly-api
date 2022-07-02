import { SuperTest, Test } from "supertest"

export const validUser = {
  name: "John Doe",
  email: "any@mail.com",
  password: "12345678",
}

export async function createAndAuthenticateUser({
  api,
  user,
}: {
  api: SuperTest<Test>
  user?: { name: string; email: string; password: string }
}): Promise<{ Authorization: string }> {
  const userObject = { ...user }
  if (!user?.name) userObject.name = validUser.name
  if (!user?.email) userObject.email = validUser.email
  if (!user?.password) userObject.password = validUser.password
  await api.post("/signup").send({ name: userObject.name, email: userObject.email, password: userObject.password })
  const response = await api.post("/signin").send({ email: userObject.email, password: userObject.password })
  return { Authorization: `Bearer ${response.body.token}` }
}

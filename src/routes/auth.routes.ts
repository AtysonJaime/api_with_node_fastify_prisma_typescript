import { FastifyInstance } from "fastify";
import { AuthUseCase } from "../usecases/auth.usecase";
import { AuthCreate } from "../interfaces/auth.interfaces";

export async function authRoutes(fastify: FastifyInstance) {
  const authUseCase = new AuthUseCase()

  fastify.post<{ Body: AuthCreate }>("/login", async (request, reply) => {
    try {
      const { email, password } = request.body
      const data = await authUseCase.login({ email, password })
      return reply.send(data)
    } catch(error) {
      reply.send(error)
    }
  })
}
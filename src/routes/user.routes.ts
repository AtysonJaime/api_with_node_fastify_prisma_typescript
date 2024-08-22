import { FastifyInstance } from "fastify"
import { UserUseCase } from "../usecases/user.usecase"
import { UserCreate } from "../interfaces/user.interfaces"

//Criação das rotas ao qual irá chamar a função dentro do UsesCases para as regras de negocio
export async function userRoutes(fastify: FastifyInstance) {
	const userUseCase = new UserUseCase()
	fastify.post<{ Body: UserCreate }>("/", async (req, reply) => {
		//Posso desestruturar a request e type separadamente
		const { name, email } = req.body
		try {
			const data = await userUseCase.create({
				name,
				email,
			})
			return reply.send(data)
		} catch (error) {
			reply.send(error)
		}
	})

	fastify.get("/", (req, reply) => {
		reply.send({ hello: "world" })
	})
}

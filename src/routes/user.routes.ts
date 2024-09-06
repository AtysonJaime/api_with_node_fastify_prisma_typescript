import { FastifyInstance } from "fastify"
import { UserUseCase } from "../usecases/user.usecase"
import { UserCreate } from "../interfaces/user.interfaces"
import { authMiddleware } from "../middlewares/auth.middleware"

//Criação das rotas ao qual irá chamar a função dentro do UsesCases para as regras de negocio
export async function userRoutes(fastify: FastifyInstance) {
	const userUseCase = new UserUseCase()
	fastify.post<{ Body: UserCreate }>("/", async (req, reply) => {
		//Posso desestruturar a request e type separadamente
		const { first_name, last_name, password, email } = req.body
		try {
			const data = await userUseCase.create({
				first_name,
				last_name,
				password,
				email,
			})
			return reply.send(data)
		} catch (error) {
			reply.send(error)
		}
	})

	fastify.get(
		"/perfil",
		{
			preHandler: authMiddleware, // Passar por esse middleware antes de chamar a rota, fica apenas para essa rota.
		},
		async (req, reply) => {
			try {
				const data = req.user //Pega os dados do usuário logado
				return reply.send(data)
			} catch (error) {
				reply.send(error)
			}
		},
	)
}

import { FastifyInstance } from "fastify"
import { ContactUseCase } from "../usecases/contact.usecase"
import { ContactCreate } from "../interfaces/contacts.interfaces"
import { authMiddleware } from "../middlewares/auth.middleware"

//Criação das rotas ao qual irá chamar a função dentro do UsesCases para as regras de negocio
export async function contactsRoutes(fastify: FastifyInstance) {
	const contactUseCase = new ContactUseCase()
	fastify.addHook("preHandler", authMiddleware) //Passar por esse middleware antes de chamar a rota
	fastify.post<{ Body: ContactCreate; Headers: { email: string } }>(
		"/",
		async (req, reply) => {
			//Posso desestruturar a request e type separadamente
			const { name, email, phone } = req.body
			const emailUser = req.user.email
			try {
				const data = await contactUseCase.create({
					email,
					name,
					phone,
					userEmail: emailUser,
				})
				return reply.send(data)
			} catch (error) {
				reply.send(error)
			}
		},
	)
	fastify.get<{ Headers: { email: string } }>("/", async (req, reply) => {
		const emailUser = req.user.email
		try {
			const data = await contactUseCase.listAllContacts(emailUser)
			return reply.send(data)
		} catch (error) {
			reply.send(error)
		}
	})
	fastify.put<{ Body: ContactCreate; Params: { id: string } }>(
		"/:id",
		async (req, reply) => {
			const { id } = req.params
			const { name, email, phone } = req.body
			try {
				const data = await contactUseCase.updateContact({
					id,
					name,
					email,
					phone,
				})
				return reply.send(data)
			} catch (error) {
				reply.send(error)
			}
		},
	)
	fastify.delete<{ Params: { id: string } }>("/:id", async (req, reply) => {
		const { id } = req.params
		try {
			const data = await contactUseCase.delete(id)
			return data
		} catch (error) {
			reply.send(error)
		}
	})
}

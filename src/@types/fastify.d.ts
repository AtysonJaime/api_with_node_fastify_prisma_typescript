import { UserLogged } from "../interfaces/user.interfaces"

declare module "fastify" {
	interface FastifyRequest {
		user: UserLogged // Defina o tipo de 'user' de acordo com a sua aplicação
	}
}

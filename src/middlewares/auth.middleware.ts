import { FastifyReply, FastifyRequest } from "fastify"
import jwt from "jsonwebtoken"
import { JWTAuth } from "../interfaces/auth.interfaces"
import { UserRepositoryPrisma } from "../repositories/user.repositories"

export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
	const { authorization } = req.headers
	const userRepository = new UserRepositoryPrisma()
	if (!authorization) {
		return reply.code(401).send({
			message: "Você não possui autorização para acessar essa rota.",
		})
	}
	const token = authorization.replace("Bearer ", "")

	try {
		const { email } = jwt.verify(
			token,
			process.env.JWT_SECRET_KEY || "",
		) as JWTAuth

		const userLogged = await userRepository.findByEmail(email)
		if (!userLogged) {
			return reply.code(404).send({
				message: "Usuário não encontrado.",
			})
		}

		req.user = {
			id: userLogged.id,
			email: userLogged.email,
			first_name: userLogged.first_name,
			last_name: userLogged.last_name,
		}
	} catch {
		return reply.code(401).send({
			message: "Token expirado ou inválido.",
		})
	}
}

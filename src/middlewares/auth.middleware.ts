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
	const { email } = jwt.verify(
		token,
		process.env.JWT_SECRET_KEY || "",
	) as JWTAuth

	const userLogged = await userRepository.findByEmail(email)
	if (!userLogged) {
		return reply.code(401).send({
			message: "Você não possui autorização para acessar essa rota.",
		})
	}

  req.user = {
    id: userLogged.id,
    email: userLogged.email,
    first_name: userLogged.first_name,
    last_name: userLogged.last_name
  }

	// if (!apiEmail) {
	// 	return reply.code(401).send({
	// 		message: "Email is required",
	// 	})
	// }
}

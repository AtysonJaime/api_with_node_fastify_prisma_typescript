import { FastifyReply, FastifyRequest } from "fastify"

export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
	const apiEmail = req.headers["email"]

	if (!apiEmail) {
		return reply.code(401).send({
			message: "Email is required",
		})
	}
}

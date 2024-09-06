import { BadRequestError } from "../helpers/error"
import { Auth, AuthCreate } from "../interfaces/auth.interfaces"
import { UserRepositoryPrisma } from "../repositories/user.repositories"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export class AuthUseCase {
	private usesRepository: UserRepositoryPrisma
	constructor() {
		this.usesRepository = new UserRepositoryPrisma()
	}
	async login({ email, password }: AuthCreate): Promise<Auth> {
		const user = await this.usesRepository.findByEmail(email)
		if (!user) throw new BadRequestError("Email or password invalid")
		const verifyPassword = await bcrypt.compare(password, user.password)
		if (!verifyPassword) throw new BadRequestError("Email or password invalid")
		const token = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_SECRET_KEY || "",
			{ expiresIn: "8h" },
		)
		return { user: {id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name}, token }
	}
}

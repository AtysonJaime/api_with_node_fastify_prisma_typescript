// A parte do código que irá fazer as operações com o banco de dados na tabela de usuários

import { prisma } from "../database/prisma-client"
import { User, UserCreate, UserRepository } from "../interfaces/user.interfaces"

class UserRepositoryPrisma implements UserRepository {
	// Criação das funções que iram mexer no banco de dados do usuário

	/**
	 * Creates a new user in the database.
	 *
	 * @param {UserCreate} data - The user data to be created.
	 * @return {Promise<User>} The created user.
	 */
	async create(data: UserCreate): Promise<User> {
		const result = await prisma.user.create({
			data: {
				name: data.name,
				email: data.email,
			},
		})

		return result
	}

	/**
	 * Finds a user by their email address.
	 *
	 * @param {string} email - The email address to search for.
	 * @return {Promise<User | null>} The user object if found, or null if not found.
	 */
	async findByEmail(email: string): Promise<User | null> {
		const result = await prisma.user.findFirst({
			where: {
				email,
			},
		})
		return result || null
	}
}
export { UserRepositoryPrisma }

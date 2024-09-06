import { BadRequestError } from "../helpers/error"
import { User, UserCreate, UserRepository } from "../interfaces/user.interfaces"
import { UserRepositoryPrisma } from "../repositories/user.repositories"
import bcrypt from "bcrypt"

// Toda a logica e regra de negocio fica nesse arquivo. Irá criar as logicas para chamar as funções do repository
export class UserUseCase {
	private userRepository: UserRepository //Somente essa classe irá ter acesso a ela.
	constructor() {
		// Irá iniciar automaticamente;
		this.userRepository = new UserRepositoryPrisma()
	}

	/**
	 * Creates a new user with the given name and email.
	 *
	 * @param {UserCreate} user - The user object containing the name and email.
	 * @return {Promise<User>} A promise that resolves to the created user.
	 * @throws {Error} If a user with the same email already exists.
	 */
	async create({
		first_name,
		last_name,
		password,
		email,
	}: UserCreate): Promise<User> {
		//Pegar de forma desestruturada
		const verifyIfUserExists = await this.userRepository.findByEmail(email)
		if (verifyIfUserExists) throw new BadRequestError("User already exists") // Verifica se existe o usuário com esse email criado
		if (password.length < 6)
			throw new BadRequestError("Password must be at least 6 characters long") // Verifica se a senha tem pelo menos 6 caracteres
		const hashPassword = await bcrypt.hash(password, 10)
		const result = await this.userRepository.create({
			first_name,
			last_name,
			password: hashPassword,
			email,
		})
		return result
	}
}

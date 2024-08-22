import { User, UserCreate, UserRepository } from "../interfaces/user.interfaces"
import { UserRepositoryPrisma } from "../repositories/user.repositories"

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
	async create({ name, email }: UserCreate): Promise<User> {
		//Pegar de forma desestruturada
		const verifyIfUserExists = await this.userRepository.findByEmail(email)
		if (verifyIfUserExists) throw new Error("User already exists") // Verifica se existe o usuário com esse email criado
		const result = await this.userRepository.create({ name, email })
		return result
	}
}

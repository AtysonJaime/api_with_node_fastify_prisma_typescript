import { BadRequestError } from "../helpers/error"
import {
	InfosUser,
	User,
	UserCreate,
	UserLogged,
	UserRepository,
} from "../interfaces/user.interfaces"
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

	/**
	 * Get user information and respective modules.
	 *
	 * @param {UserLogged} user - The user object containing the email.
	 * @return {Promise<InfosUser>} A promise that resolves to the user information.
	 */
	async infoUser(user: UserLogged): Promise<InfosUser> {
		const result = {} as InfosUser
		switch (user.email) {
			case "jurema_rebaca@gmail.com":
				result.user = {
					role: "Administrador",
					...user,
				}
				result.modules = [
					{
						name: "Inicial",
						route: "/",
						icon: "fa-solid fa-house",
						subItems: [],
					},
					{
						name: "Documentos",
						route: "",
						icon: "fa-solid fa-folder",
						subItems: [
							{
								name: "Relatórios",
								icon: "fa-solid fa-bank",
								route: "/relatorios",
							},
						],
					},
					{
						name: "Configurações",
						route: "/configuracoes",
						icon: "fa-solid fa-cog",
						subItems: [],
					},
					{
						name: "Financeiro",
						route: "/camera",
						icon: "fa-solid fa-dollar-sign",
						subItems: [
							{
								icon: "fa-solid fa-bank",
								name: "Bancos",
								route: "/",
							},
						],
					},
				]
				result.styles = [
          // Aside
          {
            key: "--aside-background",
            value: "#2C6D93"
          },
          {
            key: "--aside-link-background-hover",
            value: "#fff"
          },
          // Button
          {
            key: "--button-background",
            value: "#2C6D93"
          },
          {
            key: "--button-text-color",
            value: "#fff"
          },
          {
            key: "--button-border-color",
            value: "#fff"
          },
          {
            key: "--button-background-hover",
            value: "#3EC3FF"
          },
          {
            key: "--button-text-color-hover",
            value: "#fff"
          },
          {
            key: "--button-border-color-hover",
            value: "#fff"
          },
				]
				result.project = "argos-hidrica"
				break
			case "eduardo_pereira@gmail.com":
				result.user = {
					role: "Funcionário",
					...user,
				}
				result.modules = [
					{
						name: "Inicial",
						route: "/",
						icon: "fa-solid fa-house",
						subItems: [],
					},
					{
						name: "Documentos",
						route: "",
						icon: "fa-solid fa-folder",
						subItems: [
							{
								name: "Relatórios",
								icon: "fa-solid fa-bank",
								route: "/relatorios",
							},
						],
					},
				]
				result.styles = []
				result.project = "argos"
				break
			default:
				result.user = {
					role: "Funcionário",
					...user,
				}
				result.modules = [
					{
						name: "icial",
						route: "/",
						icon: "fa-solid fa-house",
						subItems: [],
					},
				]
				result.styles = []
				result.project = "argos"
				break
		}
		return result
	}
}

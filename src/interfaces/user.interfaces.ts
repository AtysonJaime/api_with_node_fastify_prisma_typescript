// Responsável por criar as tipagens do usuário
export interface User {
	id: string
	email: string
	first_name: string
	last_name: string
	password: string
	createdAt: Date
	updatedAt: Date
}

export interface UserLogged {
	id: string
	email: string
	first_name: string
	last_name: string
	role?: string
}
export interface UserCreate {
	email: string
	first_name: string
	last_name: string
	password: string
}

type TModules = {
	name: string
	route: string
	icon: string
	subItems: {
		name: string
		icon: string
		route: string
	}[]
}

export interface InfosUser {
	user: UserLogged
	project: string
	styles: {
		key: string
		value: string
	}[]
	modules: TModules[]
}

// Criar um interface para definir os métodos do repository
export interface UserRepository {
	create(data: UserCreate): Promise<User>
	findByEmail(email: string): Promise<User | null>
}

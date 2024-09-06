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

export interface UserCreate {
	email: string
	first_name: string
	last_name: string
	password: string
}

// Criar um interface para definir os métodos do repository
export interface UserRepository {
	create(data: UserCreate): Promise<User>
	findByEmail(email: string): Promise<User | null>
}

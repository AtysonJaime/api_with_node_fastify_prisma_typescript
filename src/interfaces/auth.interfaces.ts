export interface Auth {
	user: {
		id: string
		email: string
		first_name: string
		last_name: string
	}
	token: string
}
export interface AuthCreate {
	email: string
	password: string
}

export interface JWTAuth {
	email: string
	id: string
}

export interface AuthRepository {
	login(data: AuthCreate): Promise<Auth>
}

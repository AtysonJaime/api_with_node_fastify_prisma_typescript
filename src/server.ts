// Arquivo para criar o servidor
// Estou utilizando fastify

import fastify, { FastifyInstance } from "fastify"
import { userRoutes } from "./routes/user.routes"
import { contactsRoutes } from "./routes/contact.routes"
const app: FastifyInstance = fastify()

app.register(userRoutes, {
	// Registar nossos arquivos de rotas
	prefix: "/users",
})

app.register(contactsRoutes, {
	prefix: "/contacts",
})
// Função para escutar o servidor na porta XXXX
app.listen(
	{
		port: 3100,
	},
	() => console.log("Server is running on port 3100"),
)

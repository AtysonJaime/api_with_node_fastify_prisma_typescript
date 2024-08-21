// Arquivo para criar o servidor
// Estou utilizando fastify

import fastify, { FastifyInstance } from "fastify"

const app: FastifyInstance = fastify()

// Função para escutar o servidor na porta XXXX
app.listen(
	{
		port: 3100,
	},
	() => console.log("Server is running on port 3100"),
)

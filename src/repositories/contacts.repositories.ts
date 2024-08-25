import { prisma } from "../database/prisma-client"
import {
	Contact,
	ContactCreateData,
	ContactRepository,
} from "../interfaces/contacts.interfaces"

class ContactsRepositoryPrisma implements ContactRepository {
	async create(data: ContactCreateData): Promise<Contact> {
		const result = await prisma.contacts.create({
			data: {
				name: data.name,
				email: data.email,
				phone: data.phone,
				userId: data.userId,
			},
		})

		return result
	}

	async findByEmailOrPhone(
		email: string,
		phone: string,
	): Promise<Contact | null> {
		const result = await prisma.contacts.findFirst({
			where: {
				OR: [
					{
						email,
					},
					{
						phone,
					},
				],
			},
		})
		return result || null
	}

	async findAllContacts(userId: string): Promise<Contact[]> {
		const result = await prisma.contacts.findMany({
			//Busca vários
			where: {
				userId,
			},
		})
		return result
	}

	async updateContact({ id, name, email, phone }: Contact): Promise<Contact> {
		const result = await prisma.contacts.update({
			where: {
				id,
			},
			data: {
				name,
				email,
				phone,
			},
		})
		return result
	}

	async delete(id: string): Promise<boolean> {
		const result = await prisma.contacts.delete({
			where: {
				id,
			},
		})
		return result ? true : false
	}
}

export { ContactsRepositoryPrisma }

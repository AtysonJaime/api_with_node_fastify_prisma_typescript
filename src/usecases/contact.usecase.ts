import {
	Contact,
	ContactCreate,
	ContactRepository,
} from "../interfaces/contacts.interfaces"
import { ContactsRepositoryPrisma } from "../repositories/contacts.repositories"
import { UserRepositoryPrisma } from "../repositories/user.repositories"

export class ContactUseCase {
	private contactRepository: ContactRepository
	private usesRepository: UserRepositoryPrisma
	constructor() {
		this.contactRepository = new ContactsRepositoryPrisma()
		this.usesRepository = new UserRepositoryPrisma()
	}

	async create({ email, name, phone, userEmail }: ContactCreate) {
		// Email do usuário logado
		//buscar o usuário polo email
		// se não existir, retornar error
		// se exisiter crar o contato
		// antes de criar o contato, valuidar se jpá existe pelo reegoene ou email

		const user = await this.usesRepository.findByEmail(userEmail)

		if (!user) throw new Error("User not found")

		const verifyIgExistContact =
			await this.contactRepository.findByEmailOrPhone(email, phone)

		if (verifyIgExistContact) throw new Error("Contact already exists")

		const contact = await this.contactRepository.create({
			name,
			email,
			phone,
			userId: user.id,
		})
		return contact
	}

	async listAllContacts(userEmail: string) {
		const user = await this.usesRepository.findByEmail(userEmail)

		if (!user) throw new Error("User not found")

		const contacts = await this.contactRepository.findAllContacts(user.id)

		return contacts
	}

	async updateContact({ id, name, email, phone }: Contact) {
		// Fica para o futuro implementar validações para edição do item;
		const data = await this.contactRepository.updateContact({
			id,
			name,
			email,
			phone,
		})

		return data
	}

	async delete(id: string) {
		const data = await this.contactRepository.delete(id)
		return data
	}
}

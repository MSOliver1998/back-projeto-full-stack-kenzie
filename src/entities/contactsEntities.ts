import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm'
import { number } from 'zod'
import { User } from './usersEntities'
import { UserContact } from './userContactsEntities'

@Entity('contacts')
class Contact {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'varchar', length: 45 })
    name: string

    @Column({ type: 'varchar', length: 60, unique: true })
    email: string

    @Column({ type: 'varchar' , length:9})
    telefone: string

    @CreateDateColumn()
    createdAt?: string | Date

    @OneToMany(()=>UserContact,userContact=> userContact.contact)
    users:User[]
}


export { Contact }
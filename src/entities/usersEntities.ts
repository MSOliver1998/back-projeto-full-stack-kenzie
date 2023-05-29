import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
} from 'typeorm'
import {Contact} from './contactsEntities'
import { UserContact } from './userContactsEntities'
import { date } from 'zod'

@Entity('users')
class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'varchar', length: 45 })
    name: string

    @Column({ type: 'varchar', length: 60, unique: true })
    email: string

    @Column({ type: 'varchar' , length:9})
    telefone: string

    @Column({ type:'varchar',length:90})
    password?: string

    @CreateDateColumn()
    createdAt: string | Date

    @OneToMany(()=>UserContact,userContact=> userContact.user)
    contacts:Contact[]
}

export { User }
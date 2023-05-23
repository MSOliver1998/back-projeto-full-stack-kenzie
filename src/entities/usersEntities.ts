import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm'
import {Contact} from './contactsEntities'

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

    @CreateDateColumn()
    createdAt?: string | Date

    @ManyToMany(() => Contact)
    @JoinTable()
    categories: Contact[]
}

export { User }
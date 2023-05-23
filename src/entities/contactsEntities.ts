import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm'

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

}

export { Contact }
import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm'
import { User } from './usersEntities'
import { Contact } from './contactsEntities'

@Entity('userContact')
class UserContact{

    @PrimaryGeneratedColumn('increment')
    id:number

    @ManyToOne(() => Contact, (contact) => contact.users)
    contact: Contact

    @ManyToOne(() => User, (user) => user.contacts)
    user: User

    @CreateDateColumn({type: 'date'})
    CreatedAt: string | Date

}

export {UserContact}
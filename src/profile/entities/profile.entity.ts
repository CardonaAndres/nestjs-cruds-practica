import { User } from "src/users/entities/user.entity";
import { 
    Column,
    Entity, 
    JoinColumn, 
    OneToOne, 
    PrimaryGeneratedColumn
} from "typeorm";

@Entity({ name : 'profiles' })
export class Profile {
    @PrimaryGeneratedColumn()
    profile_ID : number

    @Column({ type : 'text' })
    bio : string

    @OneToOne(() => User)
    @JoinColumn({ name : 'user_ID' })
    user : User
}

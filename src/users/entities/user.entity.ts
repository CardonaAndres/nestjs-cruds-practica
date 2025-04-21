import { Profile } from "src/profile/entities/profile.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name : 'users' })
export class User {
    @PrimaryGeneratedColumn()
    user_ID : number

    @Column()
    name : string

    @Column({ unique : true })
    email : string

    @Column({ type : 'text' })
    password : string

    @Column({ type : 'datetime', default : () => 'CURRENT_TIMESTAMP'  })
    created_at : Date

    @OneToOne(() => Profile, profile => profile.user)
    profile: Profile;
}

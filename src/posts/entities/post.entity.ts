import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name : 'posts' })
export class Post {
    @PrimaryGeneratedColumn()
    post_ID : number

    @Column()
    title : string

    @Column()
    content : string

    @ManyToOne(() => User)
    @JoinColumn({ name : 'user_ID' })
    user : User
}

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import { User } from './user';

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: ['user', 'admin'],
        default: 'user',
        nullable: false
    })
    name: 'user' | 'admin';

    @Column({ type: 'varchar', length: 255, nullable: true })
    description: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[];

    @CreateDateColumn({

        type: 'timestamp',
    })
    created_at: Date;

    @UpdateDateColumn({

        type: 'timestamp',
    })
    updated_at!: Date;

}

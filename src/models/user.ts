import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
  } from 'typeorm';
  import { Role } from './role';
import { Order } from './order';
  
  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn()
      id!: number;
  
    @Column({ type: 'varchar', length: 50, nullable: false })
      username!: string;
  
    @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
      email!: string;
  
    @Column({ type: 'varchar', length: 100, nullable: false })
      password!: string;

    @OneToMany(()=>Order, (order)=> order.user)  
    orders: Order[]
  
    @ManyToOne(() => Role, (role)=>role.name,{onDelete:"SET NULL"})
      @JoinColumn({ name: 'role_id' })
      role: Role;
  
      @CreateDateColumn({ type: "timestamp"})
      created_at: Date
  
      @UpdateDateColumn({ type:"timestamp"})
      updated_at: Date
  }
  
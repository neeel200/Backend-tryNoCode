import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    OneToMany,
  } from 'typeorm';
import { Order } from './order';
  
  @Entity('products')
  export class Product {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"varchar", length:100, nullable: false})
    name: string

    @Column({nullable:true})
    description: string

    @Column({type:"decimal", precision: 10, scale: 2, nullable: false})
    price: number

    @Column({ type:"int", default: 0, nullable: false})
    stock: number

    @OneToMany(()=> Order,(order)=> order.product)
    orders: Order[]

    @CreateDateColumn({ type: "timestamp"})
    created_at: Date

    @UpdateDateColumn({type:"timestamp"})
    updated_at: Date
  
}
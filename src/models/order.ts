import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./product";
import { User } from "./user";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @Column()
    product_id:number

    @ManyToOne(() => User, (user) => user.orders, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user: User

    @ManyToOne(() => Product, (product) => product.orders, { onDelete: "CASCADE" })
    @JoinColumn({ name: "product_id"})
    product: Product

    @Column({ default: 1, nullable: false })
    quantity: number

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    total_price: number

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    order_date: Date

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date

}


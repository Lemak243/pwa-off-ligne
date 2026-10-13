import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('signalement')
export class Signalement {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    contenu!: string;

    @CreateDateColumn()
    dateCreation!: Date;
}

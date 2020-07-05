import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'urls' })
export class UrlEntity {
    @PrimaryColumn({ type: 'varchar', length: 32 })
    public alias!: string;

    @Column({ nullable: false, type: 'varchar', length: 512 })
    public url!: string;

    @Column({ nullable: false, default: 0 })
    public views!: number;

    @CreateDateColumn({ nullable: false })
    public createdAt!: Date;

    @Column({ nullable: false })
    public createdByAddress!: string;
}

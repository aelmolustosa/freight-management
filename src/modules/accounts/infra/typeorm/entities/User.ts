import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Company } from "../../../../companies/infra/typeorm/entities/Company";

@Entity("users")
class User {
  @PrimaryColumn({ name: "user_id" })
  userId: string;

  @Column({ name: "national_identity" })
  nationalIdentity: string;

  @Column()
  password: string;

  @Column({ name: "full_name" })
  fullName: string;

  @Column()
  profile: string;

  @Column({ name: "company_id" })
  companyId: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => Company)
  @JoinColumn()
  company: Company;

  constructor() {
    if (!this.userId) {
      this.userId = uuidV4();
    }
  }
}

export { User };

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("companies")
class Company {
  @PrimaryColumn({ name: "company_id" })
  companyId: string;

  @Column()
  name: string;

  @Column({ name: "national_identity" })
  nationalIdentity: string;

  @Column()
  email: string;

  @Column()
  country: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  constructor() {
    if (!this.companyId) {
      this.companyId = uuidV4();
    }
  }
}

export { Company };

import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("companies")
class Company {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  nationalIdentity: string;

  @Column()
  email: string;

  @Column()
  country: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Company };

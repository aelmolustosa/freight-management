import { ICreateCompany } from "../dtos/ICreateCompany";
import { Company } from "../infra/typeorm/entities/Company";

interface ICompaniesRepository {
  create(data: ICreateCompany): Promise<Company>;
  findById(company_id: string): Promise<Company>;
  findByNationalIdentity(nationalIdentity: string): Promise<Company>;
}

export { ICompaniesRepository };

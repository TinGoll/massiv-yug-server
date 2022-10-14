export interface MigrationWorker {
  password?: string;
  id: number;
  name: string;
  sectorId: number;
  sectorName: string;
  departament: string;
  status: number;
  location?: string;
  firstname?: string;
  lastname?: string;
  middlename?: string;
  card?: string;
  cardHolder?: string;
  phone?: string;
  permossionGroup: number;
}

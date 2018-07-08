import { IDatabase } from "IDatabase";

export class Database implements IDatabase {
    public readonly db: string; // File path until a property DB is set up.
    public constructor(db: string) {
        this.db = db;
    }
}

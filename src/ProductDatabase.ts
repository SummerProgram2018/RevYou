import { Database } from "./Database";
import { IDatabase } from "IDatabase";

export class ProductDatabase extends Database implements IDatabase {
    public constructor(db: string) {
        super(db);
    }
}

import * as fs from "fs";
import { IDatabase } from "IDatabase";

export class Database implements IDatabase {
    public db: string; // File path until a property DB is set up.
    public constructor(db: string) {
        if (fs.existsSync(db)) {
            this.db = db;
        } else {
            try {
                fs.writeFileSync(db, "[]");
            } catch (e) {
                this.db = null;
                throw e;
            }
            this.db = db;
        }
    }
    protected addField(data: any) {
        fs.readFile(this.db, (err: any, res: any) => {
            if (err) {
                throw err;
            }
            const newData: any[] = JSON.parse(res);
            newData.push(data);
            fs.writeFileSync(this.db, JSON.stringify(newData));
        });
    }
}

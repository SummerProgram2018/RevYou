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
    public getData(): any[] {
        try {
            const dataSet: any = fs.readFileSync(this.db);
            return JSON.parse(dataSet);
        } catch (e) {
            throw e;
        }
    }
    public merge(dir: string, out: string, type: string): void {
        const files = fs.readdirSync(dir);
        const outStr = [];
        for (const file of files) {
            try {
                let data: any = fs.readFileSync(dir + "/" + file);
                data = JSON.parse(data);
                data.type = type;
                outStr.push(data);
            } catch (e) {
                throw e;
            }
        }
        fs.writeFile(out, JSON.stringify(outStr), (err2: any) => {
            if (err2) {
                throw err2;
            }
        });
    }
    protected addField(data: any): void {
        fs.readFile(this.db, (err: any, res: any) => {
            if (err) {
                throw err;
            }
            const newData: any[] = JSON.parse(res);
            newData.push(data);
            fs.writeFileSync(this.db, JSON.stringify(newData));
        });
    }
    protected removeField(field: any, match: string): void {
        fs.readFile(this.db, (err: any, res: any) => {
            if (err) {
                throw err;
            }
            const newData: any[] = JSON.parse(res);
            const index = newData.findIndex((f: any) =>
                f[match] === field[match]
            );
            newData.splice(index, 1);
            fs.writeFileSync(this.db, JSON.stringify(newData));
        });
    }
}

import * as fs from "fs";
import { Database } from "./Database";
import { IDatabase } from "IDatabase";
import { Product } from "./Product";

export class ProductDatabase extends Database implements IDatabase {
    public constructor(db: string) {
        super(db);
    }
    public addTrackerNum(id: string, amount: number, field: string): void {
        fs.readFile(this.db, (err: any, res: any) => {
            if (err) {
                throw err;
            }
            const newData: Product[] = JSON.parse(res);
            console.log(newData, id);
            const index = newData.findIndex((f: Product) =>
                String(f.id) === id
            );
            const data = newData[index].trackers[field] += amount;
            newData.push(data);
            fs.writeFileSync(this.db, JSON.stringify(newData));
        });
    }
}

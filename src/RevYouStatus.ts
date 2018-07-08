import { stat } from "fs";

export class RevYouStatus {
    // True if success, false is failed.
    public status: boolean;
    public message: string;
    public constructor(status: boolean, message: string) {
        this.status = status;
        this.message = message;
    }
}

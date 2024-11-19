import { URN_MAP } from "@/app/lib/URN";

export class Communication {
    urn: number;
    components: { [key: string]: any } = {};

    constructor(log: any) {
        console.log(log);

        this.urn = log.urn;

        log.componentsMap.map((component: any) => {
            let count = 0;
            let key: string;
            component.map((li: any) => {
                if (count === 0) {
                    key = URN_MAP[li];
                    count++;
                } else {
                    if (key === "AgentID") {
                        this.components[key] = li.entityid;
                    } else if (key === "Channel" || key === "Time") {
                        this.components[key] = li.intvalue;
                    } else if (key === "Message") {
                        this.components[key] = li.rawdata;
                    } else {
                        console.error("知らないやつ見つけたぞ");
                    }
                }
            });
        });

        console.log(this.urn, this.components);
    }
}

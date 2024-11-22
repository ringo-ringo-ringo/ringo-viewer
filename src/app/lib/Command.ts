import { URN_MAP } from "@/app/lib/URN";

export class Command {
    urn: number;
    componentsMap: { [key: string]: any } = {};

    constructor(command: any) {
        this.urn = command.urn;
        if (URN_MAP[this.urn] === "AK_MOVE") {
            command.componentsMap.map((component: any) => {
                let count = 0;
                let key = "";
                component.map((res: any) => {
                    if (count === 0) {
                        key = res;
                        count++;
                    } else {
                        this.componentsMap[URN_MAP[key]] = res;
                        if (URN_MAP[key] === "AgentID") {
                            this.componentsMap[URN_MAP[key]] = res.entityid;
                        } else if (URN_MAP[key] === "DestinationX" || URN_MAP[key] === "DestinationY" || URN_MAP[key] === "Time") {
                            this.componentsMap[URN_MAP[key]] = res.intvalue;
                        } else if (URN_MAP[key] === "Path") {
                            this.componentsMap[URN_MAP[key]] = res.entityidlist.valuesList;
                        } else {
                            console.error("知らないコンポーネント見つけたぞ");
                        }
                    }
                });
            });
            console.log(this.componentsMap);
        } else {
            console.error("未知のコマンド発見！", URN_MAP[this.urn], command);
        }
    }
}

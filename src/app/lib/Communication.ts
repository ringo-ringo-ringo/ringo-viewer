import { URN_MAP } from "@/app/lib/URN";
import { BitStreamReader } from "@/app/lib/BitStreamReader";

export class Communication {
    urn: number;
    components: { [key: string]: any } = {};

    constructor(log: any) {
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
                        const binaryString = window.atob(li.rawdata);
                        const len = binaryString.length;
                        const bytes = new Uint8Array(len);

                        for (let i = 0; i < len; i++) {
                            bytes[i] = binaryString.charCodeAt(i);
                        }

                        const reader = new BitStreamReader(bytes.buffer);

                        const messageType = reader.getBits(5);

                        console.log(messageType);

                        if (messageType === 1) {
                            const id = reader.getBits(32);

                            const hp = reader.getBits(1) === 1 ? reader.getBits(14) : -1;
                            const buriedness = reader.getBits(1) === 1 ? reader.getBits(13) : -1;
                            const damage = reader.getBits(1) === 1 ? reader.getBits(14) : -1;
                            const position = reader.getBits(1) === 1 ? reader.getBits(32) : -1;
                            const target = reader.getBits(1) === 1 ? reader.getBits(32) : -1;
                            const action = reader.getBits(4);

                            this.components[key] = {
                                id,
                                hp,
                                buriedness,
                                damage,
                                position,
                                target,
                                action,
                            };
                        } else if (messageType === 2) {
                            const id = reader.getBits(32);

                            const brokeness = reader.getBits(1) === 1 ? reader.getBits(32) : -1;
                            const fireryness = reader.getBits(1) === 1 ? reader.getBits(32) : -1;
                            const temperature = reader.getBits(1) === 1 ? reader.getBits(32) : -1;

                            this.components[key] = {
                                id,
                                brokeness,
                                fireryness,
                                temperature,
                            };
                        } else if (messageType === 3) {
                            const id = reader.getBits(32);

                            const hp = reader.getBits(1) === 1 ? reader.getBits(14) : -1;
                            const buriedness = reader.getBits(1) === 1 ? reader.getBits(13) : -1;
                            const damage = reader.getBits(1) === 1 ? reader.getBits(14) : -1;
                            const position = reader.getBits(1) === 1 ? reader.getBits(32) : -1;

                            this.components[key] = {
                                id,
                                hp,
                                buriedness,
                                damage,
                                position,
                            };
                        } else if (messageType === 4) {
                            const id = reader.getBits(32);

                            const hp = reader.getBits(1) === 1 ? reader.getBits(14) : -1;
                            const buriedness = reader.getBits(1) === 1 ? reader.getBits(13) : -1;
                            const damage = reader.getBits(1) === 1 ? reader.getBits(14) : -1;
                            const position = reader.getBits(1) === 1 ? reader.getBits(32) : -1;
                            const target = reader.getBits(1) === 1 ? reader.getBits(32) : -1;
                            const water = reader.getBits(1) === 1 ? reader.getBits(32) : -1;
                            const action = reader.getBits(1) === 1 ? reader.getBits(4) : -1;

                            this.components[key] = {
                                id,
                                hp,
                                buriedness,
                                damage,
                                position,
                                target,
                                water,
                                action,
                            };
                        } else if (messageType === 5) {
                            const id = reader.getBits(32);

                            const hp = reader.getBits(1) === 1 ? reader.getBits(14) : -1;
                            const buriedness = reader.getBits(1) === 1 ? reader.getBits(13) : -1;
                            const damage = reader.getBits(1) === 1 ? reader.getBits(14) : -1;
                            const position = reader.getBits(1) === 1 ? reader.getBits(32) : -1;
                            const target = reader.getBits(1) === 1 ? reader.getBits(32) : -1;
                            const action = reader.getBits(1) === 1 ? reader.getBits(4) : -1;

                            this.components[key] = {
                                id,
                                hp,
                                buriedness,
                                damage,
                                position,
                                target,
                                action,
                            };
                        } else {
                            console.error("知らないやつきたぞ", "メッセージタイプ : ", messageType, "中身 : ", reader);
                        }
                        //アクションって何だ？？？？？？？？？
                    } else {
                        console.error("知らないやつ見つけたぞ");
                    }
                }
            });
        });
        console.log(this);
    }
}

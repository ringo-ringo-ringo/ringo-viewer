import { URN_MAP } from "@/app/lib/URN";
import { BitStreamReader } from "@/app/lib/BitStreamReader";

export class Communication {
    urn: number;
    components: { [key: string]: any } = {};

    constructor(log: any) {
        this.urn = log.urn;
        if (this.urn !== 4876) {
            console.error("AK_SPEARじゃないやつ来たぞ", this.urn, URN_MAP[this.urn]);
        }

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
                        try {
                            if (li.rawdata === "") {
                                this.components[key] = null;
                            } else {
                                const binaryString = window.atob(li.rawdata);
                                const len = binaryString.length;
                                const bytes = new Uint8Array(len);

                                for (let i = 0; i < len; i++) {
                                    bytes[i] = binaryString.charCodeAt(i);
                                }

                                const reader = new BitStreamReader(bytes.buffer);

                                const messageType = reader.getBits(5);
                                this.components["messageType"] = messageType;

                                // MessageAmbulanceTeam
                                if (messageType === 1) {
                                    const id = reader.getBits(32);

                                    const hp = reader.getBits(1) === 1 ? reader.getBits(14) : -1;
                                    const buriedness = reader.getBits(1) === 1 ? reader.getBits(13) : -1;
                                    const damage = reader.getBits(1) === 1 ? reader.getBits(14) : -1;
                                    const position = reader.getBits(1) === 1 ? reader.getBits(32) : -1;
                                    const target = reader.getBits(1) === 1 ? reader.getBits(32) : -1;
                                    const ACTION = reader.getBits(4);

                                    let action = "";
                                    if (ACTION === 0) {
                                        action = "REST";
                                    } else if (ACTION === 1) {
                                        action = "MOVE";
                                    } else if (ACTION === 2) {
                                        action = "RESCUE";
                                    } else if (ACTION === 3) {
                                        action = "LOAD";
                                    } else if (ACTION === 4) {
                                        action = "UNLOAD";
                                    }

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
                                    const ACTION = reader.getBits(4);
                                    const water = reader.getBits(1) === 1 ? reader.getBits(32) : -1;

                                    let action = "";
                                    if (ACTION === 0) {
                                        action = "REST";
                                    } else if (ACTION === 1) {
                                        action = "MOVE";
                                    } else if (ACTION === 2) {
                                        action = "EXTINGUISH";
                                    } else if (ACTION === 3) {
                                        action = "REFILL";
                                    } else if (ACTION === 4) {
                                        action = "RESCUE";
                                    } else {
                                        action = "";
                                    }

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
                                    const ACTION = reader.getBits(4);

                                    let action = "";
                                    if (ACTION === 0) {
                                        action = "REST";
                                    } else if (ACTION === 1) {
                                        action = "MOVE";
                                    } else if (ACTION === 2) {
                                        action = "CLEAR";
                                    } else {
                                        action = "";
                                    }

                                    this.components[key] = {
                                        id,
                                        hp,
                                        buriedness,
                                        damage,
                                        position,
                                        target,
                                        action,
                                    };
                                } else if (messageType === 6) {
                                    const id = reader.getBits(32);

                                    const blockadeId = reader.getBits(1) === 1 ? reader.getBits(32) : -1;
                                    const cost = reader.getBits(1) === 1 ? reader.getBits(32) : -1;
                                    const x = reader.getBits(1) === 1 ? reader.getBits(32) : null;
                                    const y = reader.getBits(1) === 1 ? reader.getBits(32) : null;
                                    const passable = reader.getBits(1) === 1 ? reader.getBits(1) : null;

                                    this.components[key] = {
                                        id,
                                        blockadeId,
                                        cost,
                                        x,
                                        y,
                                        passable,
                                    };
                                } else if (messageType === 9) {
                                    const to = reader.getBits(1) === 1 ? reader.getBits(32) : -1;
                                    const target = reader.getBits(1) === 1 ? reader.getBits(32) : -1;
                                    const ACTION = reader.getBits(4);
                                    const broadcast = to === -1;

                                    let action = "";
                                    if (ACTION === 0) {
                                        action = "REST";
                                    } else if (ACTION === 1) {
                                        action = "MOVE";
                                    } else if (ACTION === 2) {
                                        action = "CLEAR";
                                    } else if (ACTION === 3) {
                                        action = "AAUTONOMY";
                                    } else {
                                        action = "";
                                    }

                                    this.components[key] = {
                                        to,
                                        target,
                                        action,
                                        broadcast,
                                    };
                                } else {
                                    console.error("知らないメッセージタイプきたぞ", "メッセージタイプ : ", messageType, "中身 : ", log);
                                }
                            }

                            //アクションって何だ？？？？？？？？？
                        } catch (e) {
                            console.error("えらー", log, component, li, this.components, e);
                        }
                    } else {
                        console.error("知らないやつ見つけたぞ");
                    }
                }
            });
        });
    }
}


/*
messageのinformationとcentralizedとはなに？？
    informationが個人？
    centralizedは司令塔？

informationのbuildingsがないのはなぜ？

AITは土木隊の通信未実装？

centralizedはほぼ通信がないのはなぜ？
    司令塔はあまり開発されてないと聞いてるけど，本当？
        だからないのかな？
    csuがcentralizedのpoliceだけ使ってた？
        けいかいしてーー

メッセージ12とは？
    存在していいものなの？

たまにメッセージの解読ができないのはなぜ？
    通信のノイズで，targetがわからなくなることはあり得るのか？

いみわからん
*/
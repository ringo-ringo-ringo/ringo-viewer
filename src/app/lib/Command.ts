import { URN_MAP } from "@/app/lib/URN";
import { Entity } from "@/app/lib/Entity";
import { BitStreamReader } from "@/app/lib/BitStreamReader";

export class Command {
    urn: number;
    componentsMap: { [key: string]: any } = {};

    constructor(command: any, entity: Entity[]) {
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

            entity.map((entity: Entity) => {
                if (entity.getEntityId() === this.componentsMap.AgentID) {
                    entity.setCommand(this);
                }
            });
        } else if (URN_MAP[this.urn] === "AK_SPEAK") {
            command.componentsMap.map((component: any) => {
                let count = 0;
                let key = "";
                component.map((res: any) => {
                    if (count === 0) {
                        key = res;
                        count++;
                    } else {
                        if (URN_MAP[key] === "AgentID") {
                            this.componentsMap[URN_MAP[key]] = res.entityid;
                        } else if (URN_MAP[key] === "Time" || URN_MAP[key] === "Channel") {
                            this.componentsMap[URN_MAP[key]] = res.intvalue;
                        } else if (URN_MAP[key] === "Message") {
                            this.componentsMap[URN_MAP[key]] = res.rawdata;

                            try {
                                const binaryString = window.atob(res.rawdata);
                                const len = binaryString.length;
                                const bytes = new Uint8Array(len);

                                for (let i = 0; i < len; i++) {
                                    bytes[i] = binaryString.charCodeAt(i);
                                }

                                const reader = new BitStreamReader(bytes.buffer);

                                const messageType = reader.getBits(5);

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

                                    this.componentsMap[URN_MAP[key]] = {
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

                                    this.componentsMap[URN_MAP[key]] = {
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

                                    this.componentsMap[URN_MAP[key]] = {
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

                                    this.componentsMap[URN_MAP[key]] = {
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

                                    this.componentsMap[URN_MAP[key]] = {
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

                                    this.componentsMap[URN_MAP[key]] = {
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

                                    this.componentsMap[URN_MAP[key]] = {
                                        to,
                                        target,
                                        action,
                                        broadcast,
                                    };
                                } else {
                                    console.error("知らないメッセージタイプきたぞ", "メッセージタイプ : ", messageType);
                                }
                            } catch (e) {
                                console.error("えらー", component, e);
                            }
                        } else {
                            console.error("知らないコンポーネント見つけたぞ", URN_MAP[key], res);
                        }
                    }
                });
            });
        } else {
            console.error("未知のコマンド発見！", URN_MAP[this.urn], command);
        }
    }
}

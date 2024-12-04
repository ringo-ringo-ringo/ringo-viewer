import { Property } from "@/lib/Property";
import { URN_MAP, URN_MAP_R } from "@/lib/URN";
import { Communication } from "@/lib/Communication";
import { Command } from "@/lib/Command";

export class Entity {
    urn: number;
    entityId: number;
    properties: { [key: string]: any } = {};
    perception: Entity[] | null = null;
    communication: Communication[] = [];
    command: Command[] = [];

    constructor(entity: any) {
        this.urn = entity.urn;
        this.entityId = entity.entityid;

        entity.propertiesList.forEach((prop: any) => {
            const p = new Property(prop);
            // this.properties[p.urn] = p;
            if (p.urn === 999) {
                this.properties["Loading"] = p;
            } else {
                this.properties[URN_MAP[p.urn]] = p;
            }
        });
    }

    changePropertie(log: any) {
        if (this.urn === log.urn && this.entityId === log.entityid) {
            log.propertiesList.map((property: any) => {
                const p = new Property(property);
                this.properties[URN_MAP[property.urn]] = p;
            });
        } else {
            console.error("わたされたログは違うぞ");
        }
    }

    changeLoading(res: any) {
        const prop = {
            urn: 999,
            defined: res === null ? false : true,
            value: res,
        };
        this.properties["Loading"] = new Property(prop);
    }

    clone() {
        const cloneProperties: { [key: string]: any } = {};

        for (const key in this.properties) {
            cloneProperties[key] = new Property(this.properties[key]);
        }

        return new Entity({
            urn: this.urn,
            entityid: this.entityId,
            propertiesList: Object.values(cloneProperties),
        });
    }

    changePerception(changeLog: any, deleteLog: any) {
        if (this.perception) {
            for (const entity of changeLog) {
                let changed: boolean = false;

                for (const perception of this.perception) {
                    if (entity.entityid === perception.entityId) {
                        perception.changePropertie(entity);

                        changed = true;
                    }
                }

                if (!changed) {
                    this.perception.push(new Entity(entity));
                }
            }

            //ここに削除の処理
            if (deleteLog.length > 0) {
                console.error("デリートきたぞ");
            }
        }
    }

    initPerception(perception?: Entity[]) {
        if (perception) {
            this.perception = perception;
        } else {
            this.perception = [];
        }
    }

    setCommunication(log: any) {
        log.map((communication: any) => {
            this.communication.push(new Communication(communication));
        });
    }

    setCommand(command: Command) {
        this.command.push(command);
    }

    getPerception() {
        return this.perception;
    }

    getPropertys() {
        return this.properties;
    }

    getEntityId() {
        return this.entityId;
    }

    getCommunication() {
        return this.communication;
    }

    getLoading() {
        if (this.properties["Loading"]) {
            return this.properties["Loading"].value;
        } else {
            return null;
        }
    }
}

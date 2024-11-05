import { Property } from "@/app/lib/Property";
import { URN_MAP, URN_MAP_R } from "@/app/lib/URN";

export class Entity {
    urn: number;
    entityId: number;
    properties: { [key: string]: any } = {};

    constructor(entity: any) {
        this.urn = entity.urn;
        this.entityId = entity.entityid;

        entity.propertiesList.forEach((prop: any) => {
            const p = new Property(prop);
            // this.properties[p.urn] = p;
            this.properties[URN_MAP[p.urn]] = p;
        });
    }

    changePropertie(log: any) {
        console.log("受け取った差分の入ったログ");
        console.log(log);

        if (URN_MAP[log.urn] === "CIVILIAN") {
            console.log("市民だぞ");
            // console.log(log);
            // log.propertiesList.map((prop) => {
            //     console.log(URN_MAP[prop.urn] + "のやつ");
            //     console.log(prop);
            // });
        }

        if (this.urn === log.urn && this.entityId === log.entityid) {
            console.log("しっかり渡された情報が一致して，正しかったぞ");
            console.log("変更前");
            console.log(this.properties);

            log.propertiesList.map((property: any) => {
                const p = new Property(property);
                this.properties[URN_MAP[property.urn]] = p;
            });

            console.log("変更されたやつ")
            console.log(this.properties);
        } else {
            console.error("わたされたログは違うぞ");
        }
    }

    getPropertys() {
        return this.properties;
    }
}

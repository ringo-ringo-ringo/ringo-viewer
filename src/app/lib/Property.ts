import { URN_MAP } from "@/app/lib/URN";

export class Property {
    urn: number;
    idDefined: boolean;
    value: any;

    constructor(propertys: any) {
        this.urn = propertys.urn;
        if (propertys.defined) {
            this.idDefined = true;
            if (this.idDefined) {
                if (URN_MAP[propertys.urn] === "EDGES") {
                    this.value = propertys.edgelist;
                    // console.log(this.value);
                } else if (URN_MAP[propertys.urn] === "X") {
                    this.value = propertys.intvalue;
                    // console.log(this.value);
                } else if (URN_MAP[propertys.urn] === "Y") {
                    this.value = propertys.intvalue;
                    // console.log(this.value);
                } else if (URN_MAP[propertys.urn] === "POSITION") {
                    this.value = propertys.intvaluez;
                    // console.log(this.value);
                } else if (URN_MAP[propertys.urn] === "HP") {
                    this.value = propertys.intvalue;
                    // console.log(this.value);
                } else if (URN_MAP[propertys.urn] === "DAMAGE") {
                    this.value = propertys.intvalue;
                    // console.log(this.value);
                } else if (URN_MAP[propertys.urn] === "STAMINA") {
                    this.value = propertys.intvalue;
                    // console.log(this.value);
                } else if (URN_MAP[propertys.urn] === "POSITION_HISTORY") {
                    this.value = propertys.intlist;
                    // console.log(this.value);
                } else if (URN_MAP[propertys.urn] === "FLOORS") {
                    this.value = propertys.intvalue;
                    // console.log(this.value);
                } else if (URN_MAP[propertys.urn] === "TRAVEL_DISTANCE") {
                    this.value = propertys.intvalue;
                    // console.log(this.value);
                } else if (URN_MAP[propertys.urn] === "WATER_QUANTITY") {
                    this.value = propertys.intvalue;
                    // console.log(this.value);
                } else if (URN_MAP[propertys.urn] === "BURIEDNESS") {
                    this.value = propertys.intvalue;
                    // console.log(this.value);
                } else if (URN_MAP[propertys.urn] === "BUILDING_ATTRIBUTES") {
                    // this.value = propertys.intvalue;
                    console.log("何これ : " + URN_MAP[propertys.urn]);
                } else if (URN_MAP[propertys.urn] === "DIRECTION") {
                    // this.value = propertys.intvalue;
                    console.log("何これ : " + URN_MAP[propertys.urn]);
                } else if (URN_MAP[propertys.urn] === "BUILDING_CODE") {
                    this.value = propertys.intvalue;
                    // console.log(this.value);
                } else if (URN_MAP[propertys.urn] === "BUILDING_AREA_GROUND") {
                    this.value = propertys.intvalue;
                    // console.log(this.value);
                } else if (URN_MAP[propertys.urn] === "BUILDING_AREA_TOTAL") {
                    this.value = propertys.intvalue;
                    // console.log(this.value);
                } else if (URN_MAP[propertys.urn] === "FIERYNESS") {
                    this.value = propertys.intvalue;
                } else if (URN_MAP[propertys.urn] === "CAPACITY") {
                    // this.value = propertys.intvalue;
                    // console.log(this.value);
                    console.log("何これ : " + URN_MAP[propertys.urn]);
                } else if (URN_MAP[propertys.urn] === "IMPORTANCE") {
                    this.value = propertys.intvalue;
                    // console.log(this.value);
                } else if (URN_MAP[propertys.urn] === "BROKENNESS") {
                    this.value = propertys.intvalue;
                } else if (URN_MAP[propertys.urn] === "BED_CAPACITY") {
                    this.value = propertys.intvalue;
                    // console.log(this.value);
                } else if (URN_MAP[propertys.urn] === "OCCUPIED_BEDS") {
                    this.value = propertys.intvalue;
                    // console.log(this.value);
                } else if (URN_MAP[propertys.urn] === "REFILL_CAPACITY") {
                    this.value = propertys.intvalue;
                    // console.log(this.value);
                } else if (URN_MAP[propertys.urn] === "WAITING_LIST_SIZE") {
                    this.value = propertys.intvalue;
                } else if (URN_MAP[propertys.urn] === "REPAIR_COST") {
                    this.value = propertys.intvalue;
                    // console.log(this.value);
                } else if (URN_MAP[propertys.urn] === "APEXES") {
                    this.value = propertys.intlist.valuesList;
                    // console.log(propertys);
                    // console.log(this.value);
                } else if (URN_MAP[propertys.urn] === "BLOCKADES") {
                    this.value = propertys.intlist.valuesList;
                    // console.log(propertys);
                    // console.log(this.value);
                } else {
                    console.error("Propertyクラスにて，未知のプロパティを発見しました : " + this.urn + " : " + URN_MAP[propertys.urn]);
                    console.log(propertys);
                }
            }
        } else if (propertys.idDefined) {
            this.idDefined = true;
            if (this.idDefined) {
                this.value = propertys.value;
            }
        } else {
            this.idDefined = false;
            this.value = null;
        }
    }

    getValue() {
        return this.value;
    }
}

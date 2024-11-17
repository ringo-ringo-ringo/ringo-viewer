import { Simulation } from "@/app/lib/Simulation";
import { WorldModel } from "@/app/lib/WorldModel";
import { URN_MAP, URN_MAP_R } from "@/app/lib/URN";
import { PolygonLayer, IconLayer, LineLayer } from "@deck.gl/layers";
import { Entity } from "./Entity";

interface BuildLayer {
    apex: number[][];
    backgroundColor: number[];
}

interface HumanLayer {
    position: number[];
    backgroundColor: number[];
}

interface PositionHistoryLayer {
    backgroundColor: number[];
    from: number[];
    to: number[];
}

export class CreateLayer {
    BuildingsLayer: BuildLayer[] = [];
    RoadsLayer: BuildLayer[] = [];
    RefugesLayer: BuildLayer[] = [];
    HydrantsLayer: BuildLayer[] = [];
    GasStationsLayer: BuildLayer[] = [];
    FireStationsLayer: BuildLayer[] = [];
    AmbulanceCentresLayer: BuildLayer[] = [];
    PoliceOfficesLayer: BuildLayer[] = [];
    CiviliansLayer: HumanLayer[] = [];
    FireBrigadesLayer: HumanLayer[] = [];
    AmbulanceTeamsLayer: HumanLayer[] = [];
    PoliceForcesLayer: HumanLayer[] = [];
    BlockadesLayer: BuildLayer[] = [];
    PositionHistoryLayer: PositionHistoryLayer[] = [];

    perceptionBuildingsLayer: BuildLayer[] = [];
    perceptionRoadsLayer: BuildLayer[] = [];
    perceptionRefugesLayer: BuildLayer[] = [];
    perceptionHydrantsLayer: BuildLayer[] = [];
    perceptionGasStationsLayer: BuildLayer[] = [];
    perceptionFireStationsLayer: BuildLayer[] = [];
    perceptionAmbulanceCentresLayer: BuildLayer[] = [];
    perceptionPoliceOfficesLayer: BuildLayer[] = [];
    perceptionCiviliansLayer: HumanLayer[] = [];
    perceptionFireBrigadesLayer: HumanLayer[] = [];
    perceptionAmbulanceTeamsLayer: HumanLayer[] = [];
    perceptionPoliceForcesLayer: HumanLayer[] = [];
    perceptionBlockadesLayer: BuildLayer[] = [];

    constructor() {}

    getEdges(edgesList: any) {
        let first: boolean = true;
        const edges: Array<number[]> = [];

        edgesList.map((edge: any) => {
            if (first) {
                edges.push([edge.startx / 20000, edge.starty / 20000]);
                first = false;
            }
            edges.push([edge.endx / 20000, edge.endy / 20000]);
        });

        return edges;
    }

    createLayer(step: number, simulation: Simulation, perceptionId: number) {
        //ここからがworldのレイヤー作成
        const worldModel: WorldModel = simulation.getWorldModel(step);
        const entitys = worldModel.getEntity();

        entitys.map((entity) => {
            if (URN_MAP[entity.urn] === "BUILDING") {
                const properties = entity.getPropertys();
                const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                let color = 100;
                if (properties.BROKENNESS.value) {
                    color = 100 * (1 - properties.BROKENNESS.value / 100);
                }

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    backgroundColor: [color + 50, color + 50, color + 50],
                    ...properties,
                };

                this.BuildingsLayer.push(data);
            } else if (URN_MAP[entity.urn] === "ROAD") {
                const properties = entity.getPropertys();
                const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    backgroundColor: [200, 200, 200],
                    ...properties,
                };

                this.RoadsLayer.push(data);
            } else if (URN_MAP[entity.urn] === "REFUGE") {
                const properties = entity.getPropertys();
                const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                let color = 200;
                if (properties.BROKENNESS.value) {
                    color = 200 * (1 - properties.BROKENNESS.value / 100);
                }

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    backgroundColor: [color + 50, 0, 0],
                    ...properties,
                };

                this.RefugesLayer.push(data);
            } else if (URN_MAP[entity.urn] === "HYDRANT") {
                const properties = entity.getPropertys();
                const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                let color = 200;
                if (properties.BROKENNESS.value) {
                    color = 200 * (1 - properties.BROKENNESS.value / 100);
                }

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    backgroundColor: [0, color + 50, 0],
                    ...properties,
                };

                this.HydrantsLayer.push(data);
            } else if (URN_MAP[entity.urn] === "GAS_STATION") {
                const properties = entity.getPropertys();
                const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                let color = 200;
                if (properties.BROKENNESS.value) {
                    color = 200 * (1 - properties.BROKENNESS.value / 100);
                }

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    backgroundColor: [0, 0, color + 50],
                    ...properties,
                };

                this.GasStationsLayer.push(data);
            } else if (URN_MAP[entity.urn] === "FIRE_STATION") {
                const properties = entity.getPropertys();
                const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                let color = 100;
                if (properties.BROKENNESS.value) {
                    color = 100 * (1 - properties.BROKENNESS.value / 100);
                }

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    lineColor: [255, 0, 0],
                    backgroundColor: [color + 50, color + 50, color + 50],
                    ...properties,
                };

                this.FireStationsLayer.push(data);
            } else if (URN_MAP[entity.urn] === "AMBULANCE_CENTRE") {
                const properties = entity.getPropertys();
                const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                let color = 200;
                if (properties.BROKENNESS.value) {
                    color = 200 * (1 - properties.BROKENNESS.value / 100);
                }

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    backgroundColor: [color + 50, 0, color + 50],
                    ...properties,
                };

                this.AmbulanceCentresLayer.push(data);
            } else if (URN_MAP[entity.urn] === "POLICE_OFFICE") {
                const properties = entity.getPropertys();
                const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                let color = 200;
                if (properties.BROKENNESS.value) {
                    color = 200 * (1 - properties.BROKENNESS.value / 100);
                }

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    backgroundColor: [0, color + 50, color + 50],
                    ...properties,
                };

                this.PoliceOfficesLayer.push(data);
            } else if (URN_MAP[entity.urn] === "CIVILIAN") {
                const properties = entity.getPropertys();

                if (properties.POSITION_HISTORY.value && properties.POSITION_HISTORY.value.valuesList.length > 0) {
                    let count: number = 0;
                    let first: boolean = true;
                    let x1: number = 0;
                    let y1: number = 0;
                    let x2: number = 0;
                    let y2: number = 0;
                    for (const position of properties.POSITION_HISTORY.value.valuesList) {
                        if (count % 2 === 0) {
                            x2 = position;
                        } else if (count % 2 === 1) {
                            y2 = position;
                            if (first) {
                                first = false;
                            } else {
                                const positionHistoryData = {
                                    backgroundColor: [250, 0, 0],
                                    from: [x1 / 20000, y1 / 20000],
                                    to: [x2 / 20000, y2 / 20000],
                                };
                                this.PositionHistoryLayer.push(positionHistoryData);
                            }
                            x1 = x2;
                            y1 = y2;
                        }
                        count++;
                    }
                    const positionHistoryData = {
                        backgroundColor: [250, 0, 0],
                        from: [x2 / 20000, y2 / 20000],
                        to: [properties.X.value / 20000, properties.Y.value / 20000],
                    };
                    this.PositionHistoryLayer.push(positionHistoryData);
                }

                const x: number = properties.X.value;
                const y: number = properties.Y.value;

                let color = 0;
                if (properties.HP.value) {
                    color = 255 * (properties.HP.value / 10000);
                }

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    position: [x / 20000, y / 20000],
                    backgroundColor: [0, color, 0],
                    ...properties,
                };

                this.CiviliansLayer.push(data);
            } else if (URN_MAP[entity.urn] === "FIRE_BRIGADE") {
                const properties = entity.getPropertys();

                if (properties.POSITION_HISTORY.value && properties.POSITION_HISTORY.value.valuesList.length > 0) {
                    let count: number = 0;
                    let first: boolean = true;
                    let x1: number = 0;
                    let y1: number = 0;
                    let x2: number = 0;
                    let y2: number = 0;
                    for (const position of properties.POSITION_HISTORY.value.valuesList) {
                        if (count % 2 === 0) {
                            x2 = position;
                        } else if (count % 2 === 1) {
                            y2 = position;
                            if (first) {
                                first = false;
                            } else {
                                const positionHistoryData = {
                                    backgroundColor: [250, 0, 0],
                                    from: [x1 / 20000, y1 / 20000],
                                    to: [x2 / 20000, y2 / 20000],
                                };
                                this.PositionHistoryLayer.push(positionHistoryData);
                            }
                            x1 = x2;
                            y1 = y2;
                        }
                        count++;
                    }
                    const positionHistoryData = {
                        backgroundColor: [250, 0, 0],
                        from: [x2 / 20000, y2 / 20000],
                        to: [properties.X.value / 20000, properties.Y.value / 20000],
                    };
                    this.PositionHistoryLayer.push(positionHistoryData);
                }

                const x: number = properties.X.value;
                const y: number = properties.Y.value;

                let color = 0;
                if (properties.HP.value) {
                    color = 255 * (properties.HP.value / 10000);
                }

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    position: [x / 20000, y / 20000],
                    backgroundColor: [color, 0, 0],
                    ...properties,
                };

                this.FireBrigadesLayer.push(data);
            } else if (URN_MAP[entity.urn] === "AMBULANCE_TEAM") {
                const properties = entity.getPropertys();

                if (properties.POSITION_HISTORY.value && properties.POSITION_HISTORY.value.valuesList.length > 0) {
                    let count: number = 0;
                    let first: boolean = true;
                    let x1: number = 0;
                    let y1: number = 0;
                    let x2: number = 0;
                    let y2: number = 0;
                    for (const position of properties.POSITION_HISTORY.value.valuesList) {
                        if (count % 2 === 0) {
                            x2 = position;
                        } else if (count % 2 === 1) {
                            y2 = position;
                            if (first) {
                                first = false;
                            } else {
                                const positionHistoryData = {
                                    backgroundColor: [250, 0, 0],
                                    from: [x1 / 20000, y1 / 20000],
                                    to: [x2 / 20000, y2 / 20000],
                                };
                                this.PositionHistoryLayer.push(positionHistoryData);
                            }
                            x1 = x2;
                            y1 = y2;
                        }
                        count++;
                    }
                    const positionHistoryData = {
                        backgroundColor: [250, 0, 0],
                        from: [x2 / 20000, y2 / 20000],
                        to: [properties.X.value / 20000, properties.Y.value / 20000],
                    };
                    this.PositionHistoryLayer.push(positionHistoryData);
                }

                const x: number = properties.X.value;
                const y: number = properties.Y.value;

                let color = 0;
                if (properties.HP.value) {
                    color = 255 * (properties.HP.value / 10000);
                }

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    position: [x / 20000, y / 20000],
                    backgroundColor: [color, color, color],
                    ...properties,
                };

                this.AmbulanceTeamsLayer.push(data);
            } else if (URN_MAP[entity.urn] === "POLICE_FORCE") {
                const properties = entity.getPropertys();

                if (properties.POSITION_HISTORY.value && properties.POSITION_HISTORY.value.valuesList.length > 0) {
                    let count: number = 0;
                    let first: boolean = true;
                    let x1: number = 0;
                    let y1: number = 0;
                    let x2: number = 0;
                    let y2: number = 0;
                    for (const position of properties.POSITION_HISTORY.value.valuesList) {
                        if (count % 2 === 0) {
                            x2 = position;
                        } else if (count % 2 === 1) {
                            y2 = position;
                            if (first) {
                                first = false;
                            } else {
                                const positionHistoryData = {
                                    backgroundColor: [250, 0, 0],
                                    from: [x1 / 20000, y1 / 20000],
                                    to: [x2 / 20000, y2 / 20000],
                                };
                                this.PositionHistoryLayer.push(positionHistoryData);
                            }
                            x1 = x2;
                            y1 = y2;
                        }
                        count++;
                    }
                    const positionHistoryData = {
                        backgroundColor: [250, 0, 0],
                        from: [x2 / 20000, y2 / 20000],
                        to: [properties.X.value / 20000, properties.Y.value / 20000],
                    };
                    this.PositionHistoryLayer.push(positionHistoryData);
                }

                const x: number = properties.X.value;
                const y: number = properties.Y.value;

                let color = 0;
                if (properties.HP.value) {
                    color = 255 * (properties.HP.value / 10000);
                }

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    position: [x / 20000, y / 20000],
                    backgroundColor: [0, 0, color],
                    ...properties,
                };

                this.PoliceForcesLayer.push(data);
            } else if (URN_MAP[entity.urn] === "BLOCKADE") {
                const properties = entity.getPropertys();

                const apexes = properties.APEXES.value;

                let count: number = 0;
                const edges: Array<number[]> = [];
                let x: number | null = null;
                let y: number | null = null;
                apexes.map((apex: number) => {
                    if (count % 2 === 0) {
                        x = apex;
                    } else {
                        y = apex;
                        if (x && y) {
                            edges.push([x / 20000, y / 20000]);
                        } else {
                            console.error("中に入ってる値がnullだぞ");
                        }
                    }
                    count++;
                });

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    backgroundColor: [10, 10, 10],
                    ...properties,
                };

                this.BlockadesLayer.push(data);
            } else {
                console.log("未使用のエンティティ発見 : " + URN_MAP[entity.urn]);
                console.log(entity);
            }
        });

        //ここからがperceptionのレイヤー作成
        if (perceptionId !== null && simulation.getPerception(step, perceptionId)) {
            const perceptionEntitys: Entity[] = simulation.getWorldModel(step).getPerception(perceptionId);

            perceptionEntitys.map((entity) => {
                if (URN_MAP[entity.urn] === "BUILDING") {
                    const properties = entity.getPropertys();
                    const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                    let color = 100;
                    if (properties.BROKENNESS.value) {
                        color = 100 * (1 - properties.BROKENNESS.value / 100);
                    }

                    const data = {
                        entity: URN_MAP[entity.urn],
                        entityId: entity.entityId,
                        apex: edges,
                        backgroundColor: [color + 50, color + 50, color + 50],
                        ...properties,
                    };

                    this.perceptionBuildingsLayer.push(data);
                } else if (URN_MAP[entity.urn] === "ROAD") {
                    const properties = entity.getPropertys();
                    const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                    const data = {
                        entity: URN_MAP[entity.urn],
                        entityId: entity.entityId,
                        apex: edges,
                        backgroundColor: [200, 200, 200],
                        ...properties,
                    };

                    this.perceptionRoadsLayer.push(data);

                    if (properties.BLOCKADES?.value?.length > 0) {
                        properties.BLOCKADES.value.map((bloId: number) => {
                            const entitys = simulation.getWorldModel(step).getEntity();
                            entitys.map((bloEntity) => {
                                if (bloEntity.getEntityId() === bloId) {
                                    const properties = bloEntity.getPropertys();

                                    const apexes = properties.APEXES.value;

                                    let count: number = 0;
                                    const edges: Array<number[]> = [];
                                    let x: number | null = null;
                                    let y: number | null = null;
                                    apexes.map((apex: number) => {
                                        if (count % 2 === 0) {
                                            x = apex;
                                        } else {
                                            y = apex;
                                            if (x && y) {
                                                edges.push([x / 20000, y / 20000]);
                                            } else {
                                                console.error("中に入ってる値がnullだぞ");
                                            }
                                        }
                                        count++;
                                    });

                                    const data = {
                                        entity: URN_MAP[entity.urn],
                                        entityId: entity.entityId,
                                        apex: edges,
                                        backgroundColor: [10, 10, 10],
                                        ...properties,
                                    };

                                    this.perceptionBlockadesLayer.push(data);
                                }
                            });
                        });
                    }
                } else if (URN_MAP[entity.urn] === "REFUGE") {
                    const properties = entity.getPropertys();
                    const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                    let color = 200;
                    if (properties.BROKENNESS.value) {
                        color = 200 * (1 - properties.BROKENNESS.value / 100);
                    }

                    const data = {
                        entity: URN_MAP[entity.urn],
                        entityId: entity.entityId,
                        apex: edges,
                        backgroundColor: [color + 50, 0, 0],
                        ...properties,
                    };

                    this.perceptionRefugesLayer.push(data);
                } else if (URN_MAP[entity.urn] === "HYDRANT") {
                    const properties = entity.getPropertys();
                    const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                    let color = 200;
                    if (properties.BROKENNESS.value) {
                        color = 200 * (1 - properties.BROKENNESS.value / 100);
                    }

                    const data = {
                        entity: URN_MAP[entity.urn],
                        entityId: entity.entityId,
                        apex: edges,
                        backgroundColor: [0, color + 50, 0],
                        ...properties,
                    };

                    this.perceptionHydrantsLayer.push(data);
                } else if (URN_MAP[entity.urn] === "GAS_STATION") {
                    const properties = entity.getPropertys();
                    const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                    let color = 200;
                    if (properties.BROKENNESS.value) {
                        color = 200 * (1 - properties.BROKENNESS.value / 100);
                    }

                    const data = {
                        entity: URN_MAP[entity.urn],
                        entityId: entity.entityId,
                        apex: edges,
                        backgroundColor: [0, 0, color + 50],
                        ...properties,
                    };

                    this.perceptionGasStationsLayer.push(data);
                } else if (URN_MAP[entity.urn] === "FIRE_STATION") {
                    const properties = entity.getPropertys();
                    const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                    let color = 100;
                    if (properties.BROKENNESS.value) {
                        color = 100 * (1 - properties.BROKENNESS.value / 100);
                    }

                    const data = {
                        entity: URN_MAP[entity.urn],
                        entityId: entity.entityId,
                        apex: edges,
                        lineColor: [255, 0, 0],
                        backgroundColor: [color + 50, color + 50, color + 50],
                        ...properties,
                    };

                    this.perceptionFireStationsLayer.push(data);
                } else if (URN_MAP[entity.urn] === "AMBULANCE_CENTRE") {
                    const properties = entity.getPropertys();
                    const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                    let color = 200;
                    if (properties.BROKENNESS.value) {
                        color = 200 * (1 - properties.BROKENNESS.value / 100);
                    }

                    const data = {
                        entity: URN_MAP[entity.urn],
                        entityId: entity.entityId,
                        apex: edges,
                        backgroundColor: [color + 50, 0, color + 50],
                        ...properties,
                    };

                    this.perceptionAmbulanceCentresLayer.push(data);
                } else if (URN_MAP[entity.urn] === "POLICE_OFFICE") {
                    const properties = entity.getPropertys();
                    const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                    let color = 200;
                    if (properties.BROKENNESS.value) {
                        color = 200 * (1 - properties.BROKENNESS.value / 100);
                    }

                    const data = {
                        entity: URN_MAP[entity.urn],
                        entityId: entity.entityId,
                        apex: edges,
                        backgroundColor: [0, color + 50, color + 50],
                        ...properties,
                    };

                    this.perceptionPoliceOfficesLayer.push(data);
                } else if (URN_MAP[entity.urn] === "CIVILIAN") {
                    const properties = entity.getPropertys();

                    const x: number = properties.X.value;
                    const y: number = properties.Y.value;

                    let color = 0;
                    if (properties.HP.value) {
                        color = 255 * (properties.HP.value / 10000);
                    }

                    let bgc = [0, color, 0];
                    if (entity.entityId === perceptionId) {
                        bgc = [0, color, color];
                    }

                    const data = {
                        entity: URN_MAP[entity.urn],
                        entityId: entity.entityId,
                        position: [x / 20000, y / 20000],
                        backgroundColor: bgc,
                        ...properties,
                    };

                    this.perceptionCiviliansLayer.push(data);
                } else if (URN_MAP[entity.urn] === "FIRE_BRIGADE") {
                    const properties = entity.getPropertys();

                    const x: number = properties.X.value;
                    const y: number = properties.Y.value;

                    let color = 0;
                    if (properties.HP.value) {
                        color = 255 * (properties.HP.value / 10000);
                    }

                    let bgc = [color, 0, 0];
                    if (entity.entityId === perceptionId) {
                        bgc = [0, color, color];
                    }

                    const data = {
                        entity: URN_MAP[entity.urn],
                        entityId: entity.entityId,
                        position: [x / 20000, y / 20000],
                        backgroundColor: bgc,
                        ...properties,
                    };

                    this.perceptionFireBrigadesLayer.push(data);
                } else if (URN_MAP[entity.urn] === "AMBULANCE_TEAM") {
                    const properties = entity.getPropertys();

                    const x: number = properties.X.value;
                    const y: number = properties.Y.value;

                    let color = 0;
                    if (properties.HP.value) {
                        color = 255 * (properties.HP.value / 10000);
                    }

                    let bgc = [color, color, color];
                    if (entity.entityId === perceptionId) {
                        bgc = [0, color, color];
                    }

                    const data = {
                        entity: URN_MAP[entity.urn],
                        entityId: entity.entityId,
                        position: [x / 20000, y / 20000],
                        backgroundColor: bgc,
                        ...properties,
                    };

                    this.perceptionAmbulanceTeamsLayer.push(data);
                } else if (URN_MAP[entity.urn] === "POLICE_FORCE") {
                    const properties = entity.getPropertys();

                    const x: number = properties.X.value;
                    const y: number = properties.Y.value;

                    let color = 0;
                    if (properties.HP.value) {
                        color = 255 * (properties.HP.value / 10000);
                    }

                    let bgc = [0, 0, color];
                    if (entity.entityId === perceptionId) {
                        bgc = [0, color, color];
                    }

                    const data = {
                        entity: URN_MAP[entity.urn],
                        entityId: entity.entityId,
                        position: [x / 20000, y / 20000],
                        backgroundColor: bgc,
                        ...properties,
                    };

                    this.perceptionPoliceForcesLayer.push(data);
                } else if (URN_MAP[entity.urn] === "BLOCKADE") {
                } else {
                    console.log("未使用のエンティティ発見 : " + URN_MAP[entity.urn]);
                    console.log(entity);
                }
            });
        }
    }

    createPolygoneLayer(id: string, data: Array<any>) {
        return new PolygonLayer({
            data: data,
            id: id,
            filled: true,
            // extruded: true,
            stroked: true,
            elevationScale: 20,
            getPolygon: (d) => d.apex,
            getFillColor: (d) => d.backgroundColor,
            getLineColor: (d) => {
                if (d.lineColor) {
                    return d.lineColor;
                } else {
                    return [150, 150, 150];
                }
            },
            lineWidthMinPixels: 1,
            pickable: true,
        });
    }

    createIconLayer(id: string, data: Array<any>) {
        return new IconLayer({
            data: data,
            id: id,
            iconAtlas: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
            iconMapping: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.json",
            getIcon: (d) => "marker",
            getPosition: (d) => d.position,
            getColor: (d) => d.backgroundColor,
            getSize: 30,
            pickable: true,
        });
    }

    createPositionHistoryLayer() {
        return new LineLayer({
            data: this.PositionHistoryLayer,
            id: "positionHistory",
            getColor: (d) => d.backgroundColor,
            getSourcePosition: (d) => d.from,
            getTargetPosition: (d) => d.to,
            getWidth: 1,
            // pickable: true,
        });
    }

    getBuildingsLayer() {
        const layer = this.createPolygoneLayer("buildings", this.BuildingsLayer);
        return layer;
    }

    getRoadsLayer() {
        const layer = this.createPolygoneLayer("roads", this.RoadsLayer);
        return layer;
    }

    getRefugesLayer() {
        const layer = this.createPolygoneLayer("refuges", this.RefugesLayer);
        return layer;
    }

    getHydrantsLayer() {
        const layer = this.createPolygoneLayer("Hydrants", this.HydrantsLayer);
        return layer;
    }

    getGasStationsLayer() {
        const layer = this.createPolygoneLayer("gas-station", this.GasStationsLayer);
        return layer;
    }

    getFireStationsLayer() {
        const layer = this.createPolygoneLayer("fire-station", this.FireStationsLayer);
        return layer;
    }

    getAmbulanceCentresLayer() {
        const layer = this.createPolygoneLayer("ambulance-centre", this.AmbulanceCentresLayer);
        return layer;
    }

    getPoliceOfficesLayer() {
        const layer = this.createPolygoneLayer("police-office", this.PoliceOfficesLayer);
        return layer;
    }

    getBlockadesLayer() {
        const layer = this.createPolygoneLayer("blockade", this.BlockadesLayer);
        return layer;
    }

    getCiviliansLayer() {
        const layer = this.createIconLayer("civilian", this.CiviliansLayer);
        return layer;
    }

    getFireBrigadesLayer() {
        const layer = this.createIconLayer("fire-brigade", this.FireBrigadesLayer);
        return layer;
    }

    getAmbulanceTeamsLayer() {
        const layer = this.createIconLayer("ambulance-team", this.AmbulanceTeamsLayer);
        return layer;
    }

    getPoliceForcesLayer() {
        const layer = this.createIconLayer("police-force", this.PoliceForcesLayer);
        return layer;
    }

    getPositionHistoryLayer() {
        const layer = this.createPositionHistoryLayer();
        return layer;
    }

    getPerceptionBuildingsLayer() {
        const layer = this.createPolygoneLayer("perception-buildings", this.perceptionBuildingsLayer);
        return layer;
    }

    getPerceptionRoadsLayer() {
        const layer = this.createPolygoneLayer("perception-roads", this.perceptionRoadsLayer);
        return layer;
    }

    getPerceptionRefugesLayer() {
        const layer = this.createPolygoneLayer("perception-refuges", this.perceptionRefugesLayer);
        return layer;
    }

    getPerceptionHydrantsLayer() {
        const layer = this.createPolygoneLayer("perception-Hydrants", this.perceptionHydrantsLayer);
        return layer;
    }

    getPerceptionGasStationsLayer() {
        const layer = this.createPolygoneLayer("perception-gas-station", this.perceptionGasStationsLayer);
        return layer;
    }

    getPerceptionFireStationsLayer() {
        const layer = this.createPolygoneLayer("perception-fire-station", this.perceptionFireStationsLayer);
        return layer;
    }

    getPerceptionAmbulanceCentresLayer() {
        const layer = this.createPolygoneLayer("perception-ambulance-centre", this.perceptionAmbulanceCentresLayer);
        return layer;
    }

    getPerceptionPoliceOfficesLayer() {
        const layer = this.createPolygoneLayer("perception-police-office", this.perceptionPoliceOfficesLayer);
        return layer;
    }

    getPerceptionBlockadesLayer() {
        const layer = this.createPolygoneLayer("perception-blockade", this.perceptionBlockadesLayer);
        return layer;
    }

    getPerceptionCiviliansLayer() {
        const layer = this.createIconLayer("perception-civilian", this.perceptionCiviliansLayer);
        return layer;
    }

    getPerceptionFireBrigadesLayer() {
        const layer = this.createIconLayer("perception-fire-brigade", this.perceptionFireBrigadesLayer);
        return layer;
    }

    getPerceptionAmbulanceTeamsLayer() {
        const layer = this.createIconLayer("perception-ambulance-team", this.perceptionAmbulanceTeamsLayer);
        return layer;
    }

    getPerceptionPoliceForcesLayer() {
        const layer = this.createIconLayer("perception-police-force", this.perceptionPoliceForcesLayer);
        return layer;
    }
}

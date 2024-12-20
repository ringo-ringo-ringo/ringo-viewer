import { Simulation } from "@/app/lib/Simulation";
import { WorldModel } from "@/app/lib/WorldModel";
import { URN_MAP, URN_MAP_R } from "@/app/lib/URN";
import { PolygonLayer, IconLayer, LineLayer, ArcLayer, TextLayer } from "@deck.gl/layers";
import { Entity } from "./Entity";
import { Communication } from "@/app/lib/Communication";

interface BuildLayer {
    apex: number[][];
    backgroundColor: number[];
}

interface HumanLayer {
    positions: number[];
    backgroundColor: number[];
}

interface LinesLayer {
    backgroundColor: number[];
    from: number[];
    to: number[];
}

interface targetArcLayer {
    from: number[];
    to: number[];
}

interface textLayer {
    color: number[];
    position: number[];
    message: any;
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
    PositionHistoryLayer: LinesLayer[] = [];

    commandPathLayer: LinesLayer[] = [];
    commandClearLayer: BuildLayer[] = [];
    commandClearAreaLayer: LinesLayer[] = [];
    commandCommunicationTargetLayer: targetArcLayer[] = [];
    commandHelpMessageLayer: textLayer[] = [];

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

    communicationAmbulanceTeamsLayer: HumanLayer[] = [];
    communicationCiviliansLayer: HumanLayer[] = [];
    communicationFireBrigadesLayer: HumanLayer[] = [];
    communicationPoliceForcesLayer: HumanLayer[] = [];
    communicationRoadsLayer: BuildLayer[] = [];
    communicationCentralizedLayer: BuildLayer[] = [];
    communicationTargetLayer: targetArcLayer[] = [];

    constructor() {}

    getEdges(edgesList: any) {
        let first: boolean = true;
        const edges: Array<number[]> = [];

        edgesList.map((edge: any) => {
            if (first) {
                edges.push([edge.startx / 400000, edge.starty / 400000]);
                first = false;
            }
            edges.push([edge.endx / 400000, edge.endy / 400000]);
        });

        return edges;
    }

    createLayer(step: number, simulation: Simulation, perceptionId: number, IdSearch: string) {
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

                let isSearch = false;
                if (String(entity.getEntityId()) === IdSearch) {
                    isSearch = true;
                }

                const commandProp = this.searchCommand(simulation, step, worldModel, entity, IdSearch);

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    backgroundColor: [color + 50, color + 50, color + 50],
                    isSearch,
                    ...properties,
                    ...commandProp,
                };

                this.BuildingsLayer.push(data);
            } else if (URN_MAP[entity.urn] === "ROAD") {
                const properties = entity.getPropertys();
                const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                let isSearch = false;
                if (String(entity.getEntityId()) === IdSearch) {
                    isSearch = true;
                }

                const commandProp = this.searchCommand(simulation, step, worldModel, entity, IdSearch);

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    backgroundColor: [200, 200, 200],
                    isSearch,
                    ...properties,
                    ...commandProp,
                };

                this.RoadsLayer.push(data);
            } else if (URN_MAP[entity.urn] === "REFUGE") {
                const properties = entity.getPropertys();
                const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                let color = 100;
                if (properties.BROKENNESS.value) {
                    color = 100 * (1 - properties.BROKENNESS.value / 100);
                }

                let isSearch = false;
                if (String(entity.getEntityId()) === IdSearch) {
                    isSearch = true;
                }

                const commandProp = this.searchCommand(simulation, step, worldModel, entity, IdSearch);

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    lineColor: [255, 0, 255],
                    isSearch,
                    backgroundColor: [color + 50, color + 50, color + 50],
                    ...properties,
                    ...commandProp,
                };

                this.RefugesLayer.push(data);
            } else if (URN_MAP[entity.urn] === "HYDRANT") {
                const properties = entity.getPropertys();
                const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                let color = 200;
                if (properties.BROKENNESS.value) {
                    color = 200 * (1 - properties.BROKENNESS.value / 100);
                }

                let isSearch = false;
                if (String(entity.getEntityId()) === IdSearch) {
                    isSearch = true;
                }

                const commandProp = this.searchCommand(simulation, step, worldModel, entity, IdSearch);

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    backgroundColor: [0, color + 50, 0],
                    isSearch,
                    ...properties,
                    ...commandProp,
                };

                this.HydrantsLayer.push(data);
            } else if (URN_MAP[entity.urn] === "GAS_STATION") {
                const properties = entity.getPropertys();
                const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                let color = 200;
                if (properties.BROKENNESS.value) {
                    color = 200 * (1 - properties.BROKENNESS.value / 100);
                }

                let isSearch = false;
                if (String(entity.getEntityId()) === IdSearch) {
                    isSearch = true;
                }

                const commandProp = this.searchCommand(simulation, step, worldModel, entity, IdSearch);

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    backgroundColor: [0, 0, color + 50],
                    isSearch,
                    ...properties,
                    ...commandProp,
                };

                this.GasStationsLayer.push(data);
            } else if (URN_MAP[entity.urn] === "FIRE_STATION") {
                const properties = entity.getPropertys();
                const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                let color = 100;
                if (properties.BROKENNESS.value) {
                    color = 100 * (1 - properties.BROKENNESS.value / 100);
                }

                let isSearch = false;
                if (String(entity.getEntityId()) === IdSearch) {
                    isSearch = true;
                }

                const commandProp = this.searchCommand(simulation, step, worldModel, entity, IdSearch);

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    lineColor: [255, 0, 0],
                    isSearch,
                    backgroundColor: [color + 50, color + 50, color + 50],
                    ...properties,
                    ...commandProp,
                };

                this.FireStationsLayer.push(data);
            } else if (URN_MAP[entity.urn] === "AMBULANCE_CENTRE") {
                const properties = entity.getPropertys();
                const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                let color = 100;
                if (properties.BROKENNESS.value) {
                    color = 100 * (1 - properties.BROKENNESS.value / 100);
                }

                let isSearch = false;
                if (String(entity.getEntityId()) === IdSearch) {
                    isSearch = true;
                }

                const commandProp = this.searchCommand(simulation, step, worldModel, entity, IdSearch);

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    lineColor: [240, 240, 240],
                    isSearch,
                    backgroundColor: [color + 50, color + 50, color + 50],
                    ...properties,
                    ...commandProp,
                };

                this.AmbulanceCentresLayer.push(data);
            } else if (URN_MAP[entity.urn] === "POLICE_OFFICE") {
                const properties = entity.getPropertys();
                const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                let color = 100;
                if (properties.BROKENNESS.value) {
                    color = 100 * (1 - properties.BROKENNESS.value / 100);
                }

                let isSearch = false;
                if (String(entity.getEntityId()) === IdSearch) {
                    isSearch = true;
                }

                const commandProp = this.searchCommand(simulation, step, worldModel, entity, IdSearch);

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    lineColor: [0, 0, 255],
                    isSearch,
                    backgroundColor: [color + 50, color + 50, color + 50],
                    ...properties,
                    ...commandProp,
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
                                    from: [x1 / 400000, y1 / 400000],
                                    to: [x2 / 400000, y2 / 400000],
                                    entityId: entity.entityId,
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
                        from: [x2 / 400000, y2 / 400000],
                        to: [properties.X.value / 400000, properties.Y.value / 400000],
                        entityId: entity.entityId,
                    };
                    this.PositionHistoryLayer.push(positionHistoryData);
                }

                const x: number = properties.X.value;
                const y: number = properties.Y.value;

                let color = 0;
                if (properties.HP.value) {
                    color = 255 * (properties.HP.value / 10000);
                }

                let isSearch = false;
                if (String(entity.getEntityId()) === IdSearch) {
                    isSearch = true;
                }

                const commandProp = this.searchCommand(simulation, step, worldModel, entity, IdSearch);

                let props: { [key: string]: any } = {};
                for (const key in properties) {
                    props[key] = properties[key].value;
                }

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    positions: [x / 400000, y / 400000],
                    backgroundColor: [0, color, 0],
                    isSearch,
                    ...props,
                    ...commandProp,
                };

                if (x !== null && y !== null) {
                    this.CiviliansLayer.push(data);
                } else {
                    simulation
                        .getWorldModel(step)
                        .getEntity()
                        .map((res) => {
                            if (entity.getPropertys().Loading?.value === res.getEntityId()) {
                                const underx = res.getPropertys().X.value;
                                const undery = res.getPropertys().Y.value;

                                const underData = {
                                    entity: URN_MAP[entity.urn],
                                    entityId: entity.entityId,
                                    positions: [underx / 400000, undery / 400000],
                                    backgroundColor: [0, color, 0],
                                    isSearch,
                                    ...props,
                                    ...commandProp,
                                };

                                this.CiviliansLayer.push(underData);
                            }
                        });
                }
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
                                    from: [x1 / 400000, y1 / 400000],
                                    to: [x2 / 400000, y2 / 400000],
                                    entityId: entity.entityId,
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
                        from: [x2 / 400000, y2 / 400000],
                        to: [properties.X.value / 400000, properties.Y.value / 400000],
                        entityId: entity.entityId,
                    };
                    this.PositionHistoryLayer.push(positionHistoryData);
                }

                const x: number = properties.X.value;
                const y: number = properties.Y.value;

                let bgc = [255, 0, 0];
                if (properties.HP.value) {
                    bgc = [255 * (properties.HP.value / 10000), 0, 0];
                }

                let isSearch = false;
                if (String(entity.getEntityId()) === IdSearch) {
                    isSearch = true;
                }

                const commandProp = this.searchCommand(simulation, step, worldModel, entity, IdSearch);

                if (commandProp["Rescue"]) {
                    bgc = [255, 100, 0];
                }

                let props: { [key: string]: any } = {};
                for (const key in properties) {
                    props[key] = properties[key].value;
                }

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    positions: [x / 400000, y / 400000],
                    backgroundColor: bgc,
                    isSearch,
                    ...props,
                    ...commandProp,
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
                                    from: [x1 / 400000, y1 / 400000],
                                    to: [x2 / 400000, y2 / 400000],
                                    entityId: entity.entityId,
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
                        from: [x2 / 400000, y2 / 400000],
                        to: [properties.X.value / 400000, properties.Y.value / 400000],
                        entityId: entity.entityId,
                    };
                    this.PositionHistoryLayer.push(positionHistoryData);
                }

                const x: number = properties.X.value;
                const y: number = properties.Y.value;

                let bgc = [255, 255, 255];
                if (properties.HP.value) {
                    bgc = [255 * (properties.HP.value / 10000), 255 * (properties.HP.value / 10000), 255 * (properties.HP.value / 10000)];
                }

                let isSearch = false;
                if (String(entity.getEntityId()) === IdSearch) {
                    isSearch = true;
                }

                const commandProp = this.searchCommand(simulation, step, worldModel, entity, IdSearch);

                if (commandProp["Load"] || commandProp["UnLoad"]) {
                    bgc = [255, 180, 255];
                }

                let props: { [key: string]: any } = {};
                for (const key in properties) {
                    props[key] = properties[key].value;
                }

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    positions: [x / 400000, y / 400000],
                    backgroundColor: bgc,
                    isSearch,
                    ...props,
                    ...commandProp,
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
                                    from: [x1 / 400000, y1 / 400000],
                                    to: [x2 / 400000, y2 / 400000],
                                    entityId: entity.entityId,
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
                        from: [x2 / 400000, y2 / 400000],
                        to: [properties.X.value / 400000, properties.Y.value / 400000],
                        entityId: entity.entityId,
                    };
                    this.PositionHistoryLayer.push(positionHistoryData);
                }

                const x: number = properties.X.value;
                const y: number = properties.Y.value;

                let color = 0;
                if (properties.HP.value) {
                    color = 255 * (properties.HP.value / 10000);
                }

                let isSearch = false;
                if (String(entity.getEntityId()) === IdSearch) {
                    isSearch = true;
                }

                const commandProp = this.searchCommand(simulation, step, worldModel, entity, IdSearch);

                let props: { [key: string]: any } = {};
                for (const key in properties) {
                    props[key] = properties[key].value;
                }

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    positions: [x / 400000, y / 400000],
                    backgroundColor: [0, 0, color],
                    isSearch,
                    ...props,
                    ...commandProp,
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
                            edges.push([x / 400000, y / 400000]);
                        } else {
                            console.error("中に入ってる値がnullだぞ");
                        }
                    }
                    count++;
                });

                let isSearch = false;
                if (String(entity.getEntityId()) === IdSearch) {
                    isSearch = true;
                }

                const commandProp = this.searchCommand(simulation, step, worldModel, entity, IdSearch);

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    backgroundColor: [10, 10, 10],
                    isSearch,
                    ...properties,
                    ...commandProp,
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

            const communications: Communication[] = simulation.getWorldModel(step).getCommunications(perceptionId);

            //perceptionのvisibleを一つずつ読んでいって，レイヤーに格納
            //パーセプションって名前だけど，正確にはperceptionのvisibleっていう情報が入っている
            //つまり，エージェントが見た情報について入っている
            perceptionEntitys.map((entity) => {
                if (URN_MAP[entity.urn] === "BUILDING") {
                    const properties = entity.getPropertys();
                    const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                    let color = 100;
                    if (properties.BROKENNESS.value) {
                        color = 100 * (1 - properties.BROKENNESS.value / 100);
                    }

                    let isSearch = false;
                    if (String(entity.getEntityId()) === IdSearch) {
                        isSearch = true;
                    }

                    const data = {
                        entity: URN_MAP[entity.urn],
                        entityId: entity.entityId,
                        apex: edges,
                        backgroundColor: [color + 50, color + 50, color + 50],
                        isSearch,
                        ...properties,
                    };

                    this.perceptionBuildingsLayer.push(data);
                } else if (URN_MAP[entity.urn] === "ROAD") {
                    const properties = entity.getPropertys();
                    const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                    let isSearch = false;
                    if (String(entity.getEntityId()) === IdSearch) {
                        isSearch = true;
                    }

                    const data = {
                        entity: URN_MAP[entity.urn],
                        entityId: entity.entityId,
                        apex: edges,
                        backgroundColor: [200, 200, 200],
                        isSearch,
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
                                                edges.push([x / 400000, y / 400000]);
                                            } else {
                                                console.error("中に入ってる値がnullだぞ");
                                            }
                                        }
                                        count++;
                                    });

                                    let isSearch = false;
                                    if (String(entity.getEntityId()) === IdSearch) {
                                        isSearch = true;
                                    }

                                    const data = {
                                        entity: URN_MAP[entity.urn],
                                        entityId: entity.entityId,
                                        apex: edges,
                                        backgroundColor: [10, 10, 10],
                                        isSearch,
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

                    let color = 100;
                    if (properties.BROKENNESS.value) {
                        color = 100 * (1 - properties.BROKENNESS.value / 100);
                    }

                    let isSearch = false;
                    if (String(entity.getEntityId()) === IdSearch) {
                        isSearch = true;
                    }

                    const data = {
                        entity: URN_MAP[entity.urn],
                        entityId: entity.entityId,
                        apex: edges,
                        lineColor: [255, 0, 255],
                        isSearch,
                        backgroundColor: [color + 50, color + 50, color + 50],
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

                    let isSearch = false;
                    if (String(entity.getEntityId()) === IdSearch) {
                        isSearch = true;
                    }

                    const data = {
                        entity: URN_MAP[entity.urn],
                        entityId: entity.entityId,
                        apex: edges,
                        backgroundColor: [0, color + 50, 0],
                        isSearch,
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

                    let isSearch = false;
                    if (String(entity.getEntityId()) === IdSearch) {
                        isSearch = true;
                    }

                    const data = {
                        entity: URN_MAP[entity.urn],
                        entityId: entity.entityId,
                        apex: edges,
                        backgroundColor: [0, 0, color + 50],
                        isSearch,
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

                    let isSearch = false;
                    if (String(entity.getEntityId()) === IdSearch) {
                        isSearch = true;
                    }

                    const data = {
                        entity: URN_MAP[entity.urn],
                        entityId: entity.entityId,
                        apex: edges,
                        lineColor: [255, 0, 0],
                        isSearch,
                        backgroundColor: [color + 50, color + 50, color + 50],
                        ...properties,
                    };

                    this.perceptionFireStationsLayer.push(data);
                } else if (URN_MAP[entity.urn] === "AMBULANCE_CENTRE") {
                    const properties = entity.getPropertys();
                    const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                    let color = 100;
                    if (properties.BROKENNESS.value) {
                        color = 100 * (1 - properties.BROKENNESS.value / 100);
                    }

                    let isSearch = false;
                    if (String(entity.getEntityId()) === IdSearch) {
                        isSearch = true;
                    }

                    const data = {
                        entity: URN_MAP[entity.urn],
                        entityId: entity.entityId,
                        apex: edges,
                        lineColor: [240, 240, 240],
                        isSearch,
                        backgroundColor: [color + 50, color + 50, color + 50],
                        ...properties,
                    };

                    this.perceptionAmbulanceCentresLayer.push(data);
                } else if (URN_MAP[entity.urn] === "POLICE_OFFICE") {
                    const properties = entity.getPropertys();
                    const edges: Array<number[]> = this.getEdges(properties.EDGES.value.edgesList);

                    let color = 100;
                    if (properties.BROKENNESS.value) {
                        color = 100 * (1 - properties.BROKENNESS.value / 100);
                    }

                    let isSearch = false;
                    if (String(entity.getEntityId()) === IdSearch) {
                        isSearch = true;
                    }

                    const data = {
                        entity: URN_MAP[entity.urn],
                        entityId: entity.entityId,
                        apex: edges,
                        lineColor: [0, 0, 255],
                        isSearch,
                        backgroundColor: [color + 50, color + 50, color + 50],
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

                    let isSearch = false;
                    if (String(entity.getEntityId()) === IdSearch) {
                        isSearch = true;
                    }

                    let props: { [key: string]: any } = {};
                    for (const key in properties) {
                        props[key] = properties[key].value;
                    }

                    const data = {
                        entity: URN_MAP[entity.urn],
                        entityId: entity.entityId,
                        positions: [x / 400000, y / 400000],
                        backgroundColor: bgc,
                        isSearch,
                        ...props,
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

                    let isSearch = false;
                    if (String(entity.getEntityId()) === IdSearch) {
                        isSearch = true;
                    }

                    let props: { [key: string]: any } = {};
                    for (const key in properties) {
                        props[key] = properties[key].value;
                    }

                    const data = {
                        entity: URN_MAP[entity.urn],
                        entityId: entity.entityId,
                        positions: [x / 400000, y / 400000],
                        backgroundColor: bgc,
                        isSearch,
                        ...props,
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

                    let isSearch = false;
                    if (String(entity.getEntityId()) === IdSearch) {
                        isSearch = true;
                    }

                    let props: { [key: string]: any } = {};
                    for (const key in properties) {
                        props[key] = properties[key].value;
                    }

                    const data = {
                        entity: URN_MAP[entity.urn],
                        entityId: entity.entityId,
                        positions: [x / 400000, y / 400000],
                        backgroundColor: bgc,
                        isSearch,
                        ...props,
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

                    let isSearch = false;
                    if (String(entity.getEntityId()) === IdSearch) {
                        isSearch = true;
                    }

                    let props: { [key: string]: any } = {};
                    for (const key in properties) {
                        props[key] = properties[key].value;
                    }

                    const data = {
                        entity: URN_MAP[entity.urn],
                        entityId: entity.entityId,
                        positions: [x / 400000, y / 400000],
                        backgroundColor: bgc,
                        isSearch,
                        ...props,
                    };

                    this.perceptionPoliceForcesLayer.push(data);
                } else if (URN_MAP[entity.urn] === "BLOCKADE") {
                } else {
                    console.log("未使用のエンティティ発見 : " + URN_MAP[entity.urn]);
                    console.log(entity);
                }
            });

            //communicationの情報をひとつづづ読んでいって，レイヤーに格納
            communications.map((communication) => {
                if (URN_MAP[communication.urn] === "AK_SPEAK") {
                    try {
                        if (communication.components.Message.toLowerCase() === "help" || communication.components.Message.toLowerCase() === "ouch") {
                            console.error("ヘルプメッセージあるぞ");
                        } else {
                            console.error("エラー出ずに終わってしまった", communication);
                        }
                    } catch (e) {
                        //AK_SPEAKについてのメッセージ
                        if (communication.components.messageType === 1) {
                            //MessageAmbulanceTeam

                            const entitys = simulation.getWorldModel(step).getEntity();

                            let positionEntity = null;
                            let targetEntity = null;
                            entitys.map((entity) => {
                                if (entity.getEntityId() === communication.components.Message.position) {
                                    positionEntity = entity;
                                }
                                if (entity.getEntityId() === communication.components.Message.target) {
                                    targetEntity = entity;
                                }
                            });

                            if (positionEntity !== null && (positionEntity as Entity).getPropertys()?.X?.idDefined && (positionEntity as Entity).getPropertys()?.Y?.idDefined) {
                                const x = (positionEntity as Entity).getPropertys().X.value;
                                const y = (positionEntity as Entity).getPropertys().Y.value;

                                let color = 0;
                                if (communication.components.Message.hp) {
                                    color = 255 * (communication.components.Message.hp / 10000);
                                }

                                let bgc = [color, color, color];
                                if (communication.components.Message.id === perceptionId) {
                                    bgc = [0, color, color];
                                }

                                let isSearch = false;
                                if (String(communication.components.Message.id) === IdSearch) {
                                    isSearch = true;
                                }

                                const data = {
                                    entity: "AMBULANCE_TEAM",
                                    entityId: communication.components.Message.id,
                                    positions: [x / 400000, y / 400000],
                                    backgroundColor: bgc,
                                    isSearch,
                                    MessageFrom: communication.components.AgentID,
                                    MessageChannel: communication.components.Channel,
                                    MessageTime: communication.components.Time,
                                    ...communication.components.Message,
                                };

                                this.communicationAmbulanceTeamsLayer.push(data);

                                if (communication.components.Message.action === "MOVE") {
                                    if (targetEntity !== null && (targetEntity as Entity).getPropertys()?.X?.idDefined && (targetEntity as Entity).getPropertys()?.Y?.idDefined) {
                                        const targetX = (targetEntity as Entity).getPropertys().X.value;
                                        const targetY = (targetEntity as Entity).getPropertys().Y.value;

                                        const targetData = {
                                            from: [x / 400000, y / 400000],
                                            to: [targetX / 400000, targetY / 400000],
                                            color: [255, 255, 255],
                                        };

                                        this.communicationTargetLayer.push(targetData);
                                    } else {
                                        console.error("エラー");
                                    }
                                }
                            } else {
                                console.error("エラー");
                            }
                        } else if (communication.components.messageType === 3) {
                            //MessageCivilian

                            const entitys = simulation.getWorldModel(step).getEntity();

                            let positionEntity = null;
                            entitys.map((entity) => {
                                if (entity.getEntityId() === communication.components.Message.position) {
                                    positionEntity = entity;
                                }
                            });

                            if (positionEntity !== null && (positionEntity as Entity).getPropertys()?.X?.idDefined && (positionEntity as Entity).getPropertys()?.Y?.idDefined) {
                                const x = (positionEntity as Entity).getPropertys().X.value;
                                const y = (positionEntity as Entity).getPropertys().Y.value;

                                let color = 0;
                                if (communication.components.Message.hp) {
                                    color = 255 * (communication.components.Message.hp / 10000);
                                }

                                let bgc = [0, color, 0];
                                if (communication.components.Message.id === perceptionId) {
                                    bgc = [0, color, color];
                                }

                                let isSearch = false;
                                if (String(communication.components.Message.id) === IdSearch) {
                                    isSearch = true;
                                }

                                const data = {
                                    entity: "CIVILIAN",
                                    entityId: communication.components.Message.id,
                                    positions: [x / 400000, y / 400000],
                                    backgroundColor: bgc,
                                    isSearch,
                                    MessageFrom: communication.components.AgentID,
                                    MessageChannel: communication.components.Channel,
                                    MessageTime: communication.components.Time,
                                    ...communication.components.Message,
                                };

                                this.communicationCiviliansLayer.push(data);
                            } else {
                                console.error("エラー", communication, positionEntity);
                            }
                        } else if (communication.components.messageType === 4) {
                            //MessageFireBrigade

                            const entitys = simulation.getWorldModel(step).getEntity();

                            let positionEntity = null;
                            let targetEntity = null;
                            entitys.map((entity) => {
                                if (entity.getEntityId() === communication.components.Message.position) {
                                    positionEntity = entity;
                                }
                                if (entity.getEntityId() === communication.components.Message.target) {
                                    targetEntity = entity;
                                }
                            });

                            if (positionEntity !== null && (positionEntity as Entity).getPropertys()?.X?.idDefined && (positionEntity as Entity).getPropertys()?.Y?.idDefined) {
                                const x = (positionEntity as Entity).getPropertys().X.value;
                                const y = (positionEntity as Entity).getPropertys().Y.value;

                                let color = 0;
                                if (communication.components.Message.hp) {
                                    color = 255 * (communication.components.Message.hp / 10000);
                                }

                                let bgc = [color, 0, 0];
                                if (communication.components.Message.id === perceptionId) {
                                    bgc = [0, color, color];
                                }

                                let isSearch = false;
                                if (String(communication.components.Message.id) === IdSearch) {
                                    isSearch = true;
                                }

                                const data = {
                                    entity: "FIRE_BRIGADE",
                                    entityId: communication.components.Message.id,
                                    positions: [x / 400000, y / 400000],
                                    backgroundColor: bgc,
                                    isSearch,
                                    MessageFrom: communication.components.AgentID,
                                    MessageChannel: communication.components.Channel,
                                    MessageTime: communication.components.Time,
                                    ...communication.components.Message,
                                };

                                this.communicationFireBrigadesLayer.push(data);

                                if (communication.components.Message.action === "MOVE") {
                                    if (targetEntity !== null && (targetEntity as Entity).getPropertys()?.X?.idDefined && (targetEntity as Entity).getPropertys()?.Y?.idDefined) {
                                        const targetX = (targetEntity as Entity).getPropertys().X.value;
                                        const targetY = (targetEntity as Entity).getPropertys().Y.value;

                                        const targetData = {
                                            from: [x / 400000, y / 400000],
                                            to: [targetX / 400000, targetY / 400000],
                                            color: [255, 0, 0],
                                        };

                                        this.communicationTargetLayer.push(targetData);
                                    } else {
                                        console.error("エラー");
                                    }
                                }
                            } else {
                                console.error("エラー");
                            }
                        } else if (communication.components.messageType === 5) {
                            //MessagePoliceForce

                            const entitys = simulation.getWorldModel(step).getEntity();

                            let positionEntity = null;
                            let targetEntity = null;
                            entitys.map((entity) => {
                                if (entity.getEntityId() === communication.components.Message.position) {
                                    positionEntity = entity;
                                }
                                if (entity.getEntityId() === communication.components.Message.target) {
                                    targetEntity = entity;
                                }
                            });

                            if (positionEntity !== null && (positionEntity as Entity).getPropertys()?.X?.idDefined && (positionEntity as Entity).getPropertys()?.Y?.idDefined) {
                                const x = (positionEntity as Entity).getPropertys().X.value;
                                const y = (positionEntity as Entity).getPropertys().Y.value;

                                let color = 0;
                                if (communication.components.Message.hp) {
                                    color = 255 * (communication.components.Message.hp / 10000);
                                }

                                let bgc = [0, 0, color];
                                if (communication.components.Message.id === perceptionId) {
                                    bgc = [0, color, color];
                                }

                                let isSearch = false;
                                if (String(communication.components.Message.id) === IdSearch) {
                                    isSearch = true;
                                }

                                const data = {
                                    entity: "POLICE_FORCE",
                                    entityId: communication.components.Message.id,
                                    positions: [x / 400000, y / 400000],
                                    backgroundColor: bgc,
                                    isSearch,
                                    MessageFrom: communication.components.AgentID,
                                    MessageChannel: communication.components.Channel,
                                    MessageTime: communication.components.Time,
                                    ...communication.components.Message,
                                };

                                this.communicationPoliceForcesLayer.push(data);

                                if (communication.components.Message.action === "MOVE") {
                                    if (targetEntity !== null && (targetEntity as Entity).getPropertys()?.X?.idDefined && (targetEntity as Entity).getPropertys()?.Y?.idDefined) {
                                        const targetX = (targetEntity as Entity).getPropertys().X.value;
                                        const targetY = (targetEntity as Entity).getPropertys().Y.value;

                                        const targetData = {
                                            from: [x / 400000, y / 400000],
                                            to: [targetX / 400000, targetY / 400000],
                                            color: [0, 0, 255],
                                        };

                                        this.communicationTargetLayer.push(targetData);
                                    } else {
                                        console.error("エラー", communication, positionEntity, targetEntity);
                                    }
                                }
                            } else {
                                console.error("エラー");
                            }
                        } else if (communication.components.messageType === 6) {
                            // MessageRoad

                            if (communication.components.Message.cost !== -1) {
                                console.error("communicationで瓦礫のやつ発見");
                            }

                            const entitys = simulation.getWorldModel(step).getEntity();

                            let positionEntity = null;
                            entitys.map((entity) => {
                                if (entity.getEntityId() === communication.components.Message.id) {
                                    positionEntity = entity;
                                }
                            });

                            if (positionEntity !== null && (positionEntity as Entity).getPropertys()?.EDGES?.idDefined) {
                                const edges: Array<number[]> = this.getEdges((positionEntity as Entity).getPropertys().EDGES.value.edgesList);

                                let isSearch = false;
                                if (String(communication.components.Message.id) === IdSearch) {
                                    isSearch = true;
                                }

                                const data = {
                                    entity: "ROAD",
                                    entityId: communication.components.Message.id,
                                    apex: edges,
                                    backgroundColor: communication.components.Message.passable ? [200, 200, 200] : [100, 100, 100],
                                    isSearch,
                                    MessageFrom: communication.components.AgentID,
                                    MessageChannel: communication.components.Channel,
                                    MessageTime: communication.components.Time,
                                    ...communication.components.Message,
                                };

                                this.communicationRoadsLayer.push(data);
                            } else {
                                console.error("エラー");
                            }
                        } else if (communication.components.messageType === 9) {
                            //CommandPolice

                            if (communication.components.Message?.to !== -1) {
                                console.log("toが-1じゃないやつ来たぞ");
                            }

                            const entitys = simulation.getWorldModel(step).getEntity();

                            let targetEntity = null;
                            entitys.map((entity) => {
                                if (entity.getEntityId() === communication.components.Message?.target) {
                                    targetEntity = entity;
                                }
                            });

                            if (targetEntity !== null && (targetEntity as Entity).getPropertys()?.EDGES?.idDefined) {
                                const edges: Array<number[]> = this.getEdges((targetEntity as Entity).getPropertys().EDGES.value.edgesList);

                                let isSearch = false;
                                if (String((targetEntity as Entity).getEntityId()) === IdSearch) {
                                    isSearch = true;
                                }

                                const data = {
                                    entity: "centralized",
                                    entityId: (targetEntity as Entity).getEntityId(),
                                    apex: edges,
                                    backgroundColor: communication.components.Message.action === "CLEAR" ? [0, 170, 255, 75] : [255, 170, 255, 75],
                                    isSearch,
                                    MessageFrom: communication.components.AgentID,
                                    MessageChannel: communication.components.Channel,
                                    MessageTime: communication.components.Time,
                                    ...communication.components.Message,
                                };

                                this.communicationCentralizedLayer.push(data);
                            } else {
                                console.error("エラー");
                            }
                        } else {
                            //AK_SPEAK内のコンポーネントの種類の処理がなされていない場合

                            console.error("メッセージタイプ別で未処理なやつみっけ", communication.components.messageType);
                        }
                    }
                } else {
                    //コミュニケーションのメッセージ内容の処理がなされていない場合
                    //現状は，AK_SPEAK以外の場合

                    console.error("レイヤー格納処理してないやつみっけ", communication, URN_MAP[communication.urn]);
                }
            });
        }
    }

    searchCommand(simulation: Simulation, step: number, worldModel: WorldModel, entity: Entity, IdSearch: string) {
        const searchProp: any = {};

        let isSearch = false;
        if (String(entity.getEntityId()) === IdSearch) {
            isSearch = true;
        }

        const ignoreList = ["AgentID", "Time"];

        if (entity.command.length > 0) {
            let messageCount = 0;
            entity.command.map((cmd) => {
                if (URN_MAP[cmd.urn] === "AK_MOVE") {
                    if (cmd.componentsMap["Path"]) {
                        searchProp["MovePath"] = cmd.componentsMap["Path"];
                    }
                    if (cmd.componentsMap["DestinationX"]) {
                        searchProp["DestinationX"] = cmd.componentsMap["DestinationX"];
                    }
                    if (cmd.componentsMap["DestinationY"]) {
                        searchProp["DestinationY"] = cmd.componentsMap["DestinationY"];
                    }

                    if (searchProp["MovePath"]) {
                        let first: boolean = true;
                        let x1: number = 0;
                        let y1: number = 0;
                        let x2: number = 0;
                        let y2: number = 0;
                        for (const position of searchProp["MovePath"]) {
                            worldModel.getEntity().map((positionEntity) => {
                                if (positionEntity.getEntityId() === position) {
                                    if (positionEntity.properties.X?.value && positionEntity.properties.Y?.value) {
                                        x2 = positionEntity.properties.X.value;
                                        y2 = positionEntity.properties.Y.value;
                                        if (first) {
                                            const pathData = {
                                                backgroundColor: [0, 0, 200],
                                                from: [entity.properties.X.value / 400000, entity.properties.Y.value / 400000],
                                                to: [x2 / 400000, y2 / 400000],
                                                isSearch,
                                                entityId: entity.getEntityId(),
                                            };
                                            this.commandPathLayer.push(pathData);
                                            first = false;
                                        } else {
                                            const pathData = {
                                                backgroundColor: [0, 0, 200],
                                                from: [x1 / 400000, y1 / 400000],
                                                to: [x2 / 400000, y2 / 400000],
                                                isSearch,
                                                entityId: entity.getEntityId(),
                                            };
                                            this.commandPathLayer.push(pathData);
                                        }
                                    }
                                }
                            });
                            x1 = x2;
                            y1 = y2;
                        }
                        // const pathData = {
                        //     backgroundColor: [0, 0, 200],
                        //     from: [x2 / 400000, y2 / 400000],
                        //     to: [properties.X.value / 400000, properties.Y.value / 400000],
                        // };
                    }
                } else if (URN_MAP[cmd.urn] === "AK_REST") {
                    searchProp["Rest"] = true;
                } else if (URN_MAP[cmd.urn] === "AK_SUBSCRIBE") {
                    if (cmd.componentsMap["Channels"]) {
                        searchProp["SubscribeChannels"] = cmd.componentsMap["Channels"];
                    }
                } else if (URN_MAP[cmd.urn] === "AK_CLEAR") {
                    if (cmd.componentsMap["Target"]) {
                        searchProp["ClearTarget"] = cmd.componentsMap["Target"];
                    }

                    const prevEntity = simulation.getWorldModel(step - 1).getEntity();
                    prevEntity.map((prevEntity) => {
                        if (prevEntity.getEntityId() === searchProp["ClearTarget"]) {
                            const properties = prevEntity.getPropertys();

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
                                        edges.push([x / 400000, y / 400000]);
                                    } else {
                                        console.error("中に入ってる値がnullだぞ");
                                    }
                                }
                                count++;
                            });

                            const data = {
                                entity: URN_MAP[prevEntity.urn],
                                entityId: prevEntity.entityId,
                                apex: edges,
                                backgroundColor: [0, 0, 200],
                                isSearch,
                                ...properties,
                            };

                            this.commandClearLayer.push(data);
                        }
                    });
                } else if (URN_MAP[cmd.urn] === "AK_CLEAR_AREA") {
                    if (cmd.componentsMap["DestinationX"]) {
                        searchProp["CLEAR_AREA_DestinationX"] = cmd.componentsMap["DestinationX"];
                    }

                    if (cmd.componentsMap["DestinationY"]) {
                        searchProp["CLEAR_AREA_DestinationY"] = cmd.componentsMap["DestinationY"];
                    }
                    if (entity.properties.X?.value && entity.properties.Y?.value) {
                        const x1 = entity.properties.X.value;
                        const y1 = entity.properties.Y.value;

                        const x2 = cmd.componentsMap["DestinationX"];
                        const y2 = cmd.componentsMap["DestinationY"];

                        const pathData = {
                            backgroundColor: [0, 0, 200],
                            from: [x1 / 400000, y1 / 400000],
                            to: [x2 / 400000, y2 / 400000],
                            isSearch,
                        };

                        this.commandClearAreaLayer.push(pathData);
                    }
                } else if (URN_MAP[cmd.urn] === "AK_RESCUE") {
                    searchProp["Rescue"] = true;
                    if (cmd.componentsMap["Target"]) {
                        searchProp["Rescue-Target"] = cmd.componentsMap["Target"];
                    }
                } else if (URN_MAP[cmd.urn] === "AK_LOAD") {
                    searchProp["Load"] = true;
                    if (cmd.componentsMap["Target"]) {
                        searchProp["Load-Target"] = cmd.componentsMap["Target"];
                    }
                } else if (URN_MAP[cmd.urn] === "AK_UNLOAD") {
                    searchProp["UnLoad"] = true;
                } else if (URN_MAP[cmd.urn] === "AK_SPEAK") {
                    const MessageChannel = messageCount + " - MessageChannel";
                    searchProp[MessageChannel] = cmd.componentsMap.Channel;

                    try {
                        if (cmd.componentsMap.Message.toLowerCase() === "help" || cmd.componentsMap.Message.toLowerCase() === "ouch") {
                            if ((entity as Entity).getPropertys()?.X?.idDefined && (entity as Entity).getPropertys()?.Y?.idDefined) {
                                const x = entity.getPropertys().X.value;
                                const y = entity.getPropertys().Y.value;

                                const Data = {
                                    color: [255, 0, 0],
                                    position: [x / 400000, y / 400000],
                                    message: cmd.componentsMap.Message,
                                };
                                this.commandHelpMessageLayer.push(Data);
                            } else {
                                let findXY = false;

                                const loadingId = entity.getPropertys().Loading?.value;

                                simulation
                                    .getWorldModel(step)
                                    .getEntity()
                                    .map((res) => {
                                        if (res.getEntityId() === loadingId) {
                                            if ((res as Entity).getPropertys()?.X?.idDefined && (res as Entity).getPropertys()?.Y?.idDefined) {
                                                const x = res.getPropertys().X.value;
                                                const y = res.getPropertys().Y.value;

                                                const Data = {
                                                    color: [255, 0, 0],
                                                    position: [x / 400000, y / 400000],
                                                    message: cmd.componentsMap.Message,
                                                };
                                                this.commandHelpMessageLayer.push(Data);

                                                findXY = true;
                                            }
                                        }
                                    });

                                if (!findXY) {
                                    console.error("xとyがない");
                                    console.log(cmd, entity);
                                }
                            }
                        } else {
                            console.error("エラー出ずに終わってしまった", cmd);
                        }
                    } catch (e) {
                        const messageType = messageCount + " - MessageType";
                        searchProp[messageType] = cmd.componentsMap.messageType;

                        for (const key in cmd.componentsMap.Message) {
                            const outKey = messageCount + " - Message" + "-" + key;
                            searchProp[outKey] = cmd.componentsMap.Message[key];
                        }

                        if (cmd.componentsMap.messageType === 1) {
                            if (cmd.componentsMap.AgentID !== entity.getEntityId()) console.error("違うぞ");

                            const entitys = simulation.getWorldModel(step).getEntity();

                            let targetEntity = null;
                            entitys.map((res) => {
                                if (res.getEntityId() === cmd.componentsMap.Message.target) {
                                    targetEntity = res;
                                }
                            });

                            if (targetEntity === null) {
                                entitys.map((res) => {
                                    if (res.getEntityId() === cmd.componentsMap.Message.id) {
                                        targetEntity = res;
                                    }
                                });
                            }

                            if (targetEntity !== null && (targetEntity as Entity).getPropertys()?.X?.idDefined && (targetEntity as Entity).getPropertys()?.Y?.idDefined && (entity as Entity).getPropertys()?.X?.idDefined && (entity as Entity).getPropertys()?.Y?.idDefined) {
                                const targetX = (targetEntity as Entity).getPropertys().X.value;
                                const targetY = (targetEntity as Entity).getPropertys().Y.value;

                                const x = entity.getPropertys().X.value;
                                const y = entity.getPropertys().Y.value;

                                const targetData = {
                                    from: [x / 400000, y / 400000],
                                    to: [targetX / 400000, targetY / 400000],
                                    color: [255, 255, 255],
                                };

                                this.commandCommunicationTargetLayer.push(targetData);
                            } else {
                                if (targetEntity !== null && entity.getEntityId() === (targetEntity as Entity).getPropertys().Loading.value) {
                                    const targetX = entity.getPropertys().X.value;
                                    const targetY = entity.getPropertys().Y.value;

                                    const x = entity.getPropertys().X.value;
                                    const y = entity.getPropertys().Y.value;

                                    const targetData = {
                                        from: [x / 400000, y / 400000],
                                        to: [targetX / 400000, targetY / 400000],
                                        color: [255, 255, 255],
                                    };

                                    this.commandCommunicationTargetLayer.push(targetData);
                                } else {
                                    if (targetEntity !== null && (targetEntity as Entity).getLoading() !== null) {
                                        const loadingId = (targetEntity as Entity).getLoading();
                                        entitys.map((res) => {
                                            if (res.getEntityId() === loadingId) {
                                                if ((res as Entity).getPropertys()?.X?.idDefined && (res as Entity).getPropertys()?.Y?.idDefined && (entity as Entity).getPropertys()?.X?.idDefined && (entity as Entity).getPropertys()?.Y?.idDefined) {
                                                    const targetX = (res as Entity).getPropertys().X.value;
                                                    const targetY = (res as Entity).getPropertys().Y.value;

                                                    const x = entity.getPropertys().X.value;
                                                    const y = entity.getPropertys().Y.value;

                                                    const targetData = {
                                                        from: [x / 400000, y / 400000],
                                                        to: [targetX / 400000, targetY / 400000],
                                                        color: [0, 255, 0],
                                                    };

                                                    this.commandCommunicationTargetLayer.push(targetData);
                                                }
                                            }
                                        });
                                    } else {
                                        console.error("エラー", cmd, entity, targetEntity);
                                    }
                                }
                            }
                        } else if (cmd.componentsMap.messageType === 3) {
                            if (cmd.componentsMap.AgentID !== entity.getEntityId()) console.error("違うぞ");

                            const entitys = simulation.getWorldModel(step).getEntity();

                            let targetEntity = null;
                            entitys.map((res) => {
                                if (res.getEntityId() === cmd.componentsMap.Message.position) {
                                    targetEntity = res;
                                }
                            });

                            if (targetEntity === null) {
                                entitys.map((res) => {
                                    if (res.getEntityId() === cmd.componentsMap.Message.id) {
                                        targetEntity = res;
                                    }
                                });
                            }

                            if (targetEntity !== null && (targetEntity as Entity).getPropertys()?.X?.idDefined && (targetEntity as Entity).getPropertys()?.Y?.idDefined && (entity as Entity).getPropertys()?.X?.idDefined && (entity as Entity).getPropertys()?.Y?.idDefined) {
                                const targetX = (targetEntity as Entity).getPropertys().X.value;
                                const targetY = (targetEntity as Entity).getPropertys().Y.value;

                                const x = entity.getPropertys().X.value;
                                const y = entity.getPropertys().Y.value;

                                const targetData = {
                                    from: [x / 400000, y / 400000],
                                    to: [targetX / 400000, targetY / 400000],
                                    color: [0, 255, 0],
                                };

                                this.commandCommunicationTargetLayer.push(targetData);
                            } else {
                                if (targetEntity !== null && (targetEntity as Entity).getLoading() !== null) {
                                    const loadingId = (targetEntity as Entity).getLoading();
                                    entitys.map((res) => {
                                        if (res.getEntityId() === loadingId) {
                                            if ((res as Entity).getPropertys()?.X?.idDefined && (res as Entity).getPropertys()?.Y?.idDefined && (entity as Entity).getPropertys()?.X?.idDefined && (entity as Entity).getPropertys()?.Y?.idDefined) {
                                                const targetX = (res as Entity).getPropertys().X.value;
                                                const targetY = (res as Entity).getPropertys().Y.value;

                                                const x = entity.getPropertys().X.value;
                                                const y = entity.getPropertys().Y.value;

                                                const targetData = {
                                                    from: [x / 400000, y / 400000],
                                                    to: [targetX / 400000, targetY / 400000],
                                                    color: [0, 255, 0],
                                                };

                                                this.commandCommunicationTargetLayer.push(targetData);
                                            }
                                        }
                                    });
                                } else {
                                    console.error("エラー", cmd, entity, targetEntity);
                                }
                            }
                        } else if (cmd.componentsMap.messageType === 4) {
                            if (cmd.componentsMap.AgentID !== entity.getEntityId()) console.error("違うぞ");

                            const entitys = simulation.getWorldModel(step).getEntity();

                            let targetEntity = null;
                            entitys.map((res) => {
                                if (res.getEntityId() === cmd.componentsMap.Message.target) {
                                    targetEntity = res;
                                }
                            });

                            if (targetEntity === null) {
                                entitys.map((res) => {
                                    if (res.getEntityId() === cmd.componentsMap.Message.id) {
                                        targetEntity = res;
                                    }
                                });
                            }

                            if (targetEntity !== null && (targetEntity as Entity).getPropertys()?.X?.idDefined && (targetEntity as Entity).getPropertys()?.Y?.idDefined && (entity as Entity).getPropertys()?.X?.idDefined && (entity as Entity).getPropertys()?.Y?.idDefined) {
                                const targetX = (targetEntity as Entity).getPropertys().X.value;
                                const targetY = (targetEntity as Entity).getPropertys().Y.value;

                                const x = entity.getPropertys().X.value;
                                const y = entity.getPropertys().Y.value;

                                const targetData = {
                                    from: [x / 400000, y / 400000],
                                    to: [targetX / 400000, targetY / 400000],
                                    color: [255, 0, 0],
                                };

                                this.commandCommunicationTargetLayer.push(targetData);
                            } else {
                                console.error("エラー");
                            }
                        } else if (cmd.componentsMap.messageType === 5) {
                            if (cmd.componentsMap.AgentID !== entity.getEntityId()) console.error("違うぞ");

                            let entitys;

                            if (cmd.componentsMap.Message.action === "CLEAR") {
                                entitys = simulation.getWorldModel(step - 1).getEntity();
                            } else {
                                entitys = simulation.getWorldModel(step).getEntity();
                            }

                            let targetEntity = null;
                            entitys.map((res) => {
                                if (res.getEntityId() === cmd.componentsMap.Message.target) {
                                    targetEntity = res;
                                }
                            });

                            if (targetEntity === null) {
                                entitys.map((res) => {
                                    if (res.getEntityId() === cmd.componentsMap.Message.id) {
                                        targetEntity = res;
                                    }
                                });
                            }

                            if (targetEntity !== null && (targetEntity as Entity).getPropertys()?.X?.idDefined && (targetEntity as Entity).getPropertys()?.Y?.idDefined && (entity as Entity).getPropertys()?.X?.idDefined && (entity as Entity).getPropertys()?.Y?.idDefined) {
                                const targetX = (targetEntity as Entity).getPropertys().X.value;
                                const targetY = (targetEntity as Entity).getPropertys().Y.value;

                                const x = entity.getPropertys().X.value;
                                const y = entity.getPropertys().Y.value;

                                const targetData = {
                                    from: [x / 400000, y / 400000],
                                    to: [targetX / 400000, targetY / 400000],
                                    color: [0, 0, 255],
                                };

                                this.commandCommunicationTargetLayer.push(targetData);
                            } else {
                                console.error("エラー", cmd);
                            }
                        } else if (cmd.componentsMap.messageType === 6) {
                            if (cmd.componentsMap.AgentID !== entity.getEntityId()) console.error("違うぞ");

                            const entitys = simulation.getWorldModel(step).getEntity();

                            let targetEntity = null;
                            entitys.map((res) => {
                                if (res.getEntityId() === cmd.componentsMap.Message.id) {
                                    targetEntity = res;
                                }
                            });

                            if (targetEntity !== null && (targetEntity as Entity).getPropertys()?.X?.idDefined && (targetEntity as Entity).getPropertys()?.Y?.idDefined && (entity as Entity).getPropertys()?.X?.idDefined && (entity as Entity).getPropertys()?.Y?.idDefined) {
                                const targetX = (targetEntity as Entity).getPropertys().X.value;
                                const targetY = (targetEntity as Entity).getPropertys().Y.value;

                                const x = entity.getPropertys().X.value;
                                const y = entity.getPropertys().Y.value;

                                const targetData = {
                                    from: [x / 400000, y / 400000],
                                    to: [targetX / 400000, targetY / 400000],
                                    color: [100, 100, 100],
                                };

                                this.commandCommunicationTargetLayer.push(targetData);
                            } else {
                                console.error("エラー");
                            }
                        } else if (cmd.componentsMap.messageType === 9) {
                            if (cmd.componentsMap.AgentID !== entity.getEntityId()) console.error("違うぞ");

                            const entitys = simulation.getWorldModel(step).getEntity();

                            let targetEntity = null;
                            entitys.map((res) => {
                                if (res.getEntityId() === cmd.componentsMap.Message.target) {
                                    targetEntity = res;
                                }
                            });

                            if (targetEntity !== null && (targetEntity as Entity).getPropertys()?.X?.idDefined && (targetEntity as Entity).getPropertys()?.Y?.idDefined && (entity as Entity).getPropertys()?.X?.idDefined && (entity as Entity).getPropertys()?.Y?.idDefined) {
                                const targetX = (targetEntity as Entity).getPropertys().X.value;
                                const targetY = (targetEntity as Entity).getPropertys().Y.value;

                                const x = entity.getPropertys().X.value;
                                const y = entity.getPropertys().Y.value;

                                const targetData = {
                                    from: [x / 400000, y / 400000],
                                    to: [targetX / 400000, targetY / 400000],
                                    color: [100, 100, 200],
                                };

                                this.commandCommunicationTargetLayer.push(targetData);
                            } else {
                                console.error("エラー");
                            }
                        } else {
                            console.error("メッセージタイプ別で未処理なやつみっけ", cmd, cmd.componentsMap.messageType, e);
                        }
                    }

                    messageCount++;
                } else {
                    console.log("未処理のコマンド発見", URN_MAP[cmd.urn], cmd);
                }
            });
        }

        return searchProp;
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
            getFillColor: (d) => (d.isSearch ? [255, 255, 80] : d.backgroundColor),
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
            getIcon: (d) => {
                if (d.isSearch) {
                    return {
                        url: "/images/star.svg",
                        width: 128,
                        height: 128,
                        mask: true,
                    };
                } else if (d.Rescue || d.Load || d.UnLoad) {
                    return {
                        url: "/images/rescue.svg",
                        width: 128,
                        height: 128,
                        mask: true,
                    };
                } else {
                    return {
                        url: "/images/cir.svg",
                        width: 128,
                        height: 128,
                        mask: true,
                    };
                }
            },
            getPosition: (d) => d.positions,
            getColor: (d) => (d.isSearch ? [255, 255, 80] : d.backgroundColor),
            getSize: (d) => {
                if (d.isSearch) {
                    return 28;
                } else if (d.Rescue || d.Load || d.UnLoad) {
                    return 16;
                } else if (d.Loading && d.entity === "CIVILIAN") {
                    return 20;
                } else {
                    return 10;
                }
            },
            pickable: true,
            // sizeUnits: "common",
            sizeMaxPixels: 30,
            sizeMinPixels: 10,
            billboard: false,
        });
    }

    createLinesLayer(id: string, data: Array<any>) {
        return new LineLayer({
            data: data,
            id: id,
            getColor: (d) => (d.isSearch ? [255, 255, 80] : d.backgroundColor),
            getSourcePosition: (d) => d.from,
            getTargetPosition: (d) => d.to,
            getWidth: (d) => (d.isSearch ? 4 : 1),
            pickable: true,
        });
    }

    createCommunicationTargetArcLayer(id: string, data: Array<any>) {
        return new ArcLayer({
            data: data,
            id: id,
            getSourcePosition: (d) => d.from,
            getTargetPosition: (d) => d.to,
            getSourceColor: (d) => d.color,
            getTargetColor: (d) => [255, 255, 200],
            getWidth: 2,
        });
    }

    createTextLayer(id: string, data: Array<any>) {
        return new TextLayer({
            data: data,
            id: id,
            getPosition: (d) => d.position,
            getText: (d) => d.message,
            getColor: (d) => d.color,
            getSize: 16,
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
        const layer = this.createLinesLayer("positionHistory", this.PositionHistoryLayer);
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

    getCommunicationTargetLayer() {
        const layer = this.createCommunicationTargetArcLayer("Communication-target-arc", this.communicationTargetLayer);
        return layer;
    }

    getCommunicationAmbulanceTeamsLayer() {
        const layer = this.createIconLayer("communication-ambulance-team", this.communicationAmbulanceTeamsLayer);
        return layer;
    }

    getCommunicationCiviliansLayer() {
        const layer = this.createIconLayer("communication-civilian", this.communicationCiviliansLayer);
        return layer;
    }

    getCommunicationFireBrigadesLayer() {
        const layer = this.createIconLayer("communication-fire-brigade", this.communicationFireBrigadesLayer);
        return layer;
    }

    getCommunicationPoliceForcesLayer() {
        const layer = this.createIconLayer("communication-police-force", this.communicationPoliceForcesLayer);
        return layer;
    }

    getCommunicationRoadsLayer() {
        const layer = this.createPolygoneLayer("communication-roads", this.communicationRoadsLayer);
        return layer;
    }

    getCommunicationCentralizedLayer() {
        const layer = this.createPolygoneLayer("communication-centralized", this.communicationCentralizedLayer);
        return layer;
    }

    getCommandPathLayer() {
        const layer = this.createLinesLayer("command-path", this.commandPathLayer);
        return layer;
    }

    getCommandClearLayer() {
        const layer = this.createPolygoneLayer("command-clear-blockade", this.commandClearLayer);
        return layer;
    }

    getCommandClearAreaLayer() {
        const layer = this.createLinesLayer("command-clear-area-blockade", this.commandClearAreaLayer);
        return layer;
    }

    getCommandCommunicationTargetLayer() {
        const layer = this.createCommunicationTargetArcLayer("command-communication-target-arc", this.commandCommunicationTargetLayer);
        return layer;
    }

    getCommandHelpMessageLayer() {
        const layer = this.createTextLayer("command-help-message", this.commandHelpMessageLayer);
        return layer;
    }
}

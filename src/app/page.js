"use client";

import React from "react";
import DeckGL from "@deck.gl/react";
import { PolygonLayer, IconLayer } from "@deck.gl/layers";
import { COORDINATE_SYSTEM } from "deck.gl";
import { URN_MAP } from "./URN";
import { INITIAL_CONDITIONS } from "./test-INITIAL_CONDITIONS2";

export default function App() {
    function decimalToHexadecimal(decimal) {
        return decimal.toString(16).toUpperCase();
    }

    const buildingData = [];

    const humanData = [];

    for (const entity of INITIAL_CONDITIONS.initialcondition.entitiesList) {
        if (URN_MAP[entity.urn] === "BUILDING") {
            const tmp = [];
            const other = [];
            let first = true;
            for (const property of entity.propertiesList) {
                if (URN_MAP[property.urn] === "EDGES") {
                    for (const edgeList of property.edgelist.edgesList) {
                        if (first) {
                            first = false;
                            tmp.push([edgeList.startx / 20000, edgeList.starty / 20000]);
                        }
                        tmp.push([edgeList.endx / 20000, edgeList.endy / 20000]);
                    }
                } else {
                    const name = URN_MAP[property.urn];
                    const value = property;
                    other.push({ [name]: value });
                }
            }
            // console.log(tmp);
            const setData = {
                backgroundColor: [150, 150, 150],
                contour: tmp,
                other: other,
            };
            buildingData.push(setData);
        } else if (URN_MAP[entity.urn] === "ROAD") {
            const tmp = [];
            const other = [];
            let first = true;
            for (const property of entity.propertiesList) {
                if (URN_MAP[property.urn] === "EDGES") {
                    for (const edgeList of property.edgelist.edgesList) {
                        if (first) {
                            first = false;
                            tmp.push([edgeList.startx / 20000, edgeList.starty / 20000]);
                        }
                        tmp.push([edgeList.endx / 20000, edgeList.endy / 20000]);
                    }
                } else {
                    const name = URN_MAP[property.urn];
                    const value = property;
                    other.push({ [name]: value });
                }
            }
            // console.log(tmp);
            const setData = {
                backgroundColor: [200, 200, 200],
                contour: tmp,
                other: other,
            };
            buildingData.push(setData);
        } else if (URN_MAP[entity.urn] === "REFUGE") {
            const tmp = [];
            const other = [];
            let first = true;
            for (const property of entity.propertiesList) {
                if (URN_MAP[property.urn] === "EDGES") {
                    for (const edgeList of property.edgelist.edgesList) {
                        if (first) {
                            first = false;
                            tmp.push([edgeList.startx / 20000, edgeList.starty / 20000]);
                        }
                        tmp.push([edgeList.endx / 20000, edgeList.endy / 20000]);
                    }
                } else {
                    const name = URN_MAP[property.urn];
                    const value = property;
                    other.push({ [name]: value });
                }
            }
            // console.log(tmp);
            const setData = {
                backgroundColor: [250, 0, 0],
                contour: tmp,
                other: other,
            };
            buildingData.push(setData);
        } else if (URN_MAP[entity.urn] === "HYDRANT") {
            const tmp = [];
            const other = [];
            let first = true;
            for (const property of entity.propertiesList) {
                if (URN_MAP[property.urn] === "EDGES") {
                    for (const edgeList of property.edgelist.edgesList) {
                        if (first) {
                            first = false;
                            tmp.push([edgeList.startx / 20000, edgeList.starty / 20000]);
                        }
                        tmp.push([edgeList.endx / 20000, edgeList.endy / 20000]);
                    }
                } else {
                    const name = URN_MAP[property.urn];
                    const value = property;
                    other.push({ [name]: value });
                }
            }
            // console.log(tmp);
            const setData = {
                backgroundColor: [0, 250, 0],
                contour: tmp,
                other: other,
            };
            buildingData.push(setData);
        } else if (URN_MAP[entity.urn] === "GAS_STATION") {
            const tmp = [];
            const other = [];
            let first = true;
            for (const property of entity.propertiesList) {
                if (URN_MAP[property.urn] === "EDGES") {
                    for (const edgeList of property.edgelist.edgesList) {
                        if (first) {
                            first = false;
                            tmp.push([edgeList.startx / 20000, edgeList.starty / 20000]);
                        }
                        tmp.push([edgeList.endx / 20000, edgeList.endy / 20000]);
                    }
                } else {
                    const name = URN_MAP[property.urn];
                    const value = property;
                    other.push({ [name]: value });
                }
            }
            // console.log(tmp);
            const setData = {
                backgroundColor: [0, 0, 250],
                contour: tmp,
                other: other,
            };
            buildingData.push(setData);
        } else if (URN_MAP[entity.urn] === "FIRE_STATION") {
            const tmp = [];
            const other = [];
            let first = true;
            for (const property of entity.propertiesList) {
                if (URN_MAP[property.urn] === "EDGES") {
                    for (const edgeList of property.edgelist.edgesList) {
                        if (first) {
                            first = false;
                            tmp.push([edgeList.startx / 20000, edgeList.starty / 20000]);
                        }
                        tmp.push([edgeList.endx / 20000, edgeList.endy / 20000]);
                    }
                } else {
                    const name = URN_MAP[property.urn];
                    const value = property;
                    other.push({ [name]: value });
                }
            }
            // console.log(tmp);
            const setData = {
                backgroundColor: [250, 250, 0],
                contour: tmp,
                other: other,
            };
            buildingData.push(setData);
        } else if (URN_MAP[entity.urn] === "AMBULANCE_CENTRE") {
            const tmp = [];
            const other = [];
            let first = true;
            for (const property of entity.propertiesList) {
                if (URN_MAP[property.urn] === "EDGES") {
                    for (const edgeList of property.edgelist.edgesList) {
                        if (first) {
                            first = false;
                            tmp.push([edgeList.startx / 20000, edgeList.starty / 20000]);
                        }
                        tmp.push([edgeList.endx / 20000, edgeList.endy / 20000]);
                    }
                } else {
                    const name = URN_MAP[property.urn];
                    const value = property;
                    other.push({ [name]: value });
                }
            }
            // console.log(tmp);
            const setData = {
                backgroundColor: [250, 0, 250],
                contour: tmp,
                other: other,
            };
            buildingData.push(setData);
        } else if (URN_MAP[entity.urn] === "POLICE_OFFICE") {
            const tmp = [];
            const other = [];
            let first = true;
            for (const property of entity.propertiesList) {
                if (URN_MAP[property.urn] === "EDGES") {
                    for (const edgeList of property.edgelist.edgesList) {
                        if (first) {
                            first = false;
                            tmp.push([edgeList.startx / 20000, edgeList.starty / 20000]);
                        }
                        tmp.push([edgeList.endx / 20000, edgeList.endy / 20000]);
                    }
                } else {
                    const name = URN_MAP[property.urn];
                    const value = property;
                    other.push({ [name]: value });
                }
            }
            // console.log(tmp);
            const setData = {
                backgroundColor: [0, 250, 250],
                contour: tmp,
                other: other,
            };
            buildingData.push(setData);
        } else if (URN_MAP[entity.urn] === "CIVILIAN") {
            var Y;
            var X;
            const other = [];
            for (const property of entity.propertiesList) {
                if (URN_MAP[property.urn] === "X") {
                    X = property.intvalue;
                } else if (URN_MAP[property.urn] === "Y") {
                    Y = property.intvalue;
                } else {
                    const name = URN_MAP[property.urn];
                    const value = property;
                    other.push({ [name]: value });
                }
            }
            // console.log(tmp);
            const setData = {
                backgroundColor: [0, 250, 0],
                position: [X / 20000, Y / 20000],
                other: other,
            };
            humanData.push(setData);
        } else if (URN_MAP[entity.urn] === "FIRE_BRIGADE") {
            var Y;
            var X;
            const other = [];
            for (const property of entity.propertiesList) {
                if (URN_MAP[property.urn] === "X") {
                    X = property.intvalue;
                } else if (URN_MAP[property.urn] === "Y") {
                    Y = property.intvalue;
                } else {
                    const name = URN_MAP[property.urn];
                    const value = property;
                    other.push({ [name]: value });
                }
            }
            // console.log(tmp);
            const setData = {
                backgroundColor: [250, 0, 0],
                position: [X / 20000, Y / 20000],
                other: other,
            };
            humanData.push(setData);
        } else if (URN_MAP[entity.urn] === "AMBULANCE_TEAM") {
            var Y;
            var X;
            const other = [];
            for (const property of entity.propertiesList) {
                if (URN_MAP[property.urn] === "X") {
                    X = property.intvalue;
                } else if (URN_MAP[property.urn] === "Y") {
                    Y = property.intvalue;
                } else {
                    const name = URN_MAP[property.urn];
                    const value = property;
                    other.push({ [name]: value });
                }
            }
            // console.log(tmp);
            const setData = {
                backgroundColor: [256, 256, 256],
                position: [X / 20000, Y / 20000],
                other: other,
            };
            humanData.push(setData);
        } else if (URN_MAP[entity.urn] === "POLICE_FORCE") {
            var Y;
            var X;
            const other = [];
            for (const property of entity.propertiesList) {
                if (URN_MAP[property.urn] === "X") {
                    X = property.intvalue;
                } else if (URN_MAP[property.urn] === "Y") {
                    Y = property.intvalue;
                } else {
                    const name = URN_MAP[property.urn];
                    const value = property;
                    other.push({ [name]: value });
                }
            }
            // console.log(tmp);
            const setData = {
                backgroundColor: [0, 0, 250],
                position: [X / 20000, Y / 20000],
                other: other,
            };
            humanData.push(setData);
        } else {
            console.log("未使用の物体発見 : " + URN_MAP[entity.urn]);
        }
    }

    // console.log(JSON.stringify(buildingData, null, 2));
    // console.log("--------------------------------");
    // console.log(JSON.stringify(humanData, null, 2));

    // const buildingData = [
    //     {
    //         contour: [
    //             [-122.4, 37.7],
    //             [-122.3, 37.8],
    //             [-122.5, 37.9],
    //         ], // ポリゴンの輪郭を定義する座標の配列
    //     },
    //     {
    //         contour: [
    //             [-122.35, 37.75],
    //             [-122.25, 37.85],
    //             [-122.45, 37.95],
    //         ],
    //     },
    //     // ... 他のポリゴンのデータ
    // ];

    const buildingLayer = new PolygonLayer({
        // id: "PolygonLayer",
        // Data: buildingData,

        // getPolygon: (d) => d.contour,
        // getElevation: (d) => 0,
        // getFillColor: (d) => [200, 0, 0],
        // getLineColor: [255, 255, 255],
        // getLineWidth: 20,
        // lineWidthMinPixels: 1,
        // pickable: true,

        // id: "building",
        // extruded: true,
        // pickable: true,
        // stroked: true,
        // filled: true,
        // wireframe: true,
        // lineWidthMinPixels: 1,
        // getPolygon: (d) => d.contour,
        // getElevation: (d) => d.elevation,
        // getFillColor: (d) => d.color,
        // getLineColor: [80, 80, 80],
        // getLineWidth: 1,
        // coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
        // coordinateOrigin: [-122.4004935, 37.7900486, 0],

        // id: "PolygonLayer",
        // stroked: true,
        // filled: true,
        // data: buildingData,
        // getPolygon: (d) => d, // 修正: d.contour を d に変更
        // getElevation: (d) => 0,
        // getFillColor: (d) => [200, 0, 0],
        // // getLineColor: (d) => [0,0,200],
        // getLineColor: [0, 255, 255],
        // getLineWidth: 2, // 線の太さを少し細くしました
        // lineWidthMinPixels: 1,
        // pickable: true,

        data: buildingData,
        id: "buildings",
        filled: true,
        // extruded: true,
        stroked: true,
        elevationScale: 20,
        getPolygon: (d) => d.contour,
        getFillColor: (d) => d.backgroundColor,
        getLineColor: (d) => [150, 150, 150],
        lineWidthMinPixels: 1,
        pickable: true,
    });

    const humanLayer = new IconLayer({
        data: humanData,
        id: "humans",
        iconAtlas: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
        iconMapping: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.json",
        getIcon: (d) => "marker",
        getPosition: (d) => d.position,
        getColor: (d) => d.backgroundColor,
        getSize: 30,
        pickable: true,
    });

    return (
        <DeckGL
            initialViewState={{
                longitude: 15 / 2,
                latitude: 7 / 2,
                zoom: 7,
            }}
            controller
            layers={[buildingLayer, humanLayer]}
            // getTooltip={({ object }) => object && `${object.backgroundColor}\nPopulation: ${object.population}`}
            getTooltip={({ object }) => {
                return object && JSON.stringify(object.other, null, 2);
            }}
        />
    );
}

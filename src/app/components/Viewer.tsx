"use client";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { ReactElement, useState, useEffect } from "react";
import DeckGL from "@deck.gl/react";
import { PolygonLayer, IconLayer } from "@deck.gl/layers";
import { CreateLayer } from "@/app/lib/CreateLayer";
import Attention from "@/app/components/Attention/Attention";
import Sidebar from "@/app/components/Sidebar";
import OpenSideBar from "@/app/components/OpenSideBar";

export default function Viewer({ simulation, step, setAttentionData, filter, perceptionId, perceptionFilter, attentionData, setPerceptionId, setFilter, setPerceptionFilter,IdSearch,setIdSearch }: any) {
    const body = css`
        position: relative;
        height: 100%;
    `;

    const [layer, setLayer] = useState<any>([]);

    const [showSideBar, setShowSideBar] = useState(false);

    useEffect(() => {
        if (simulation && simulation.getWorldModel(step)) {
            const createLayer = new CreateLayer();
            createLayer.createLayer(step, simulation, perceptionId);

            // const layer = [createLayer.getBuildingsLayer(), createLayer.getRoadsLayer(), createLayer.getPoliceOfficesLayer(), createLayer.getRefugesLayer(), createLayer.getHydrantsLayer(), createLayer.getGasStationsLayer(), createLayer.getFireStationsLayer(), createLayer.getAmbulanceCentresLayer(), createLayer.getBlockadesLayer(), createLayer.getCiviliansLayer(), createLayer.getFireBrigadesLayer(), createLayer.getAmbulanceTeamsLayer(), createLayer.getPoliceForcesLayer(), createLayer.getPositionHistoryLayer()];

            const layer = [];

            let isOkPerception: boolean = false;
            if (perceptionId !== null && simulation.getPerception(step, perceptionId)) {
                isOkPerception = true;
            } else {
                isOkPerception = false;
            }

            if (filter.ROAD) layer.push(createLayer.getRoadsLayer());
            if (filter.BUILDING) layer.push(createLayer.getBuildingsLayer());
            if (filter.POLICE_OFFICE) layer.push(createLayer.getPoliceOfficesLayer());
            if (filter.REFUGE) layer.push(createLayer.getRefugesLayer());
            if (filter.HYDRANT) layer.push(createLayer.getHydrantsLayer());
            if (filter.GAS_STATION) layer.push(createLayer.getGasStationsLayer());
            if (filter.FIRE_STATION) layer.push(createLayer.getFireStationsLayer());
            if (filter.AMBULANCE_CENTRE) layer.push(createLayer.getAmbulanceCentresLayer());
            if (filter.BLOCKADE) layer.push(createLayer.getBlockadesLayer());

            if (perceptionFilter.perceptionROAD && isOkPerception) layer.push(createLayer.getPerceptionRoadsLayer());
            if (perceptionFilter.perceptionBUILDING && isOkPerception) layer.push(createLayer.getPerceptionBuildingsLayer());
            if (perceptionFilter.perceptionPOLICE_OFFICE && isOkPerception) layer.push(createLayer.getPerceptionPoliceOfficesLayer());
            if (perceptionFilter.perceptionREFUGE && isOkPerception) layer.push(createLayer.getPerceptionRefugesLayer());
            if (perceptionFilter.perceptionHYDRANT && isOkPerception) layer.push(createLayer.getPerceptionHydrantsLayer());
            if (perceptionFilter.perceptionGAS_STATION && isOkPerception) layer.push(createLayer.getPerceptionGasStationsLayer());
            if (perceptionFilter.perceptionFIRE_STATION && isOkPerception) layer.push(createLayer.getPerceptionFireStationsLayer());
            if (perceptionFilter.perceptionAMBULANCE_CENTRE && isOkPerception) layer.push(createLayer.getPerceptionAmbulanceCentresLayer());
            if (perceptionFilter.perceptionBLOCKADE && isOkPerception) layer.push(createLayer.getPerceptionBlockadesLayer());

            if (filter.CIVILIAN) layer.push(createLayer.getCiviliansLayer());
            if (filter.FIRE_BRIGADE) layer.push(createLayer.getFireBrigadesLayer());
            if (filter.AMBULANCE_TEAM) layer.push(createLayer.getAmbulanceTeamsLayer());
            if (filter.POLICE_FORCE) layer.push(createLayer.getPoliceForcesLayer());

            if (perceptionFilter.perceptionCIVILIAN && isOkPerception) layer.push(createLayer.getPerceptionCiviliansLayer());
            if (perceptionFilter.perceptionFIRE_BRIGADE && isOkPerception) layer.push(createLayer.getPerceptionFireBrigadesLayer());
            if (perceptionFilter.perceptionAMBULANCE_TEAM && isOkPerception) layer.push(createLayer.getPerceptionAmbulanceTeamsLayer());
            if (perceptionFilter.perceptionPOLICE_FORCE && isOkPerception) layer.push(createLayer.getPerceptionPoliceForcesLayer());

            if (filter.POSITION_HISTORY) layer.push(createLayer.getPositionHistoryLayer());

            setLayer(layer);
        }
    }, [simulation, step, filter, perceptionFilter, perceptionId]);

    const deckglClickHandler = (e: any) => {
        setAttentionData(e.object);
    };

    return (
        <>
            <div css={body}>
                <DeckGL
                    initialViewState={{
                        longitude: 2,
                        latitude: 2,
                        zoom: 6,
                    }}
                    controller
                    layers={layer}
                    onClick={deckglClickHandler}
                    getTooltip={({ object }) => {
                        //ここ適当!!直して!

                        if (!object) return null;

                        let text = "";

                        text += "entity : " + object.entity + "\n";

                        text += "entityId : " + object.entityId + "\n";

                        for (const key in object) {
                            if (key && object.hasOwnProperty(key)) {
                                const value = object[key];
                                if (value.value) {
                                    if (key === "HP" || key === "STAMINA" || key === "BURIEDNESS" || key === "REPAIR_COST" || key === "OCCUPIED_BEDS" || key === "BED_CAPACITY" || key === "BED_CAPACITY" || key === "BROKENNESS") {
                                        text += JSON.stringify(key) + " : " + JSON.stringify(value.value) + "\n";
                                    } else {
                                        // text += JSON.stringify(key) + " : " + JSON.stringify(value.value) + "\n";
                                    }
                                }
                            }
                        }

                        return { text };
                    }}
                />

                {showSideBar ? <Sidebar filter={filter} setFilter={setFilter} perceptionId={perceptionId} perceptionFilter={perceptionFilter} setPerceptionFilter={setPerceptionFilter} setShowSideBar={setShowSideBar}  IdSearch={IdSearch} setIdSearch={setIdSearch}></Sidebar> : <OpenSideBar setShowSideBar={setShowSideBar}></OpenSideBar>}

                {attentionData ? <Attention attentionData={attentionData} setAttentionData={setAttentionData} setPerceptionId={setPerceptionId} setFilter={setFilter}></Attention> : ""}
            </div>
        </>
    );
}

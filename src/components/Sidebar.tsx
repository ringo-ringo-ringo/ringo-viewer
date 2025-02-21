/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { Tooltip, TextField, Button } from "@mui/material";

export default function Sidebar({ filter, setFilter, perceptionId, perceptionFilter, setPerceptionFilter, setShowSideBar, IdSearch, setIdSearch, IdSearchList, setIdSearchList }: any) {
    const body = css`
        position: absolute;
        top: 100px;
        left: 10px;
        max-height: calc(100% - 100px - 10px - 36.5px - 40px);
        background-color: #9f9f9ff5;
        overflow: scroll;
        padding: 10px;
        border-radius: 10px;

        .tab-3-search {
            display: grid;
            grid-template-columns: 1fr auto;
            height: 48px;
            button {
                height: 100%;
            }
        }
        .tab-3-list {
            li {
                display: grid;
                grid-template-columns: 1fr auto;
                margin: 10px 0;
                .txt {
                    padding: 0 5px;
                }
            }
        }
    `;

    const clearIcon = css`
        position: relative;
        height: 30px;
        .icon {
            position: absolute;
            right: 0;
            height: 30px;
            width: 30px;
            transition: 0.2s;
            :hover {
                color: #f3f3f3f5;
                cursor: pointer;
            }
        }
    `;

    const [tabValue, setTabValue] = useState("1");

    const closeHandler = () => {
        setShowSideBar(false);
    };

    const filterHandler = (e: any) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.checked,
        });
    };

    const perceptionFilterHandler = (e: any) => {
        setPerceptionFilter({
            ...perceptionFilter,
            [e.target.name]: e.target.checked,
        });
    };

    const tabHandler = (e: any, newValue: string) => {
        setTabValue(newValue);
    };

    const changeIdSearch = (e: any) => {
        setIdSearch(e.target.value);
    };

    const checkboxList = [];
    for (const key in filter) {
        checkboxList.push(key);
    }

    const perceptionCheckboxList = [];
    if (perceptionId !== null) {
        for (const key in perceptionFilter) {
            perceptionCheckboxList.push(key);
        }
    } else {
    }

    const addIdSearchList = () => {
        if (IdSearch !== "") {
            IdSearchList.push(IdSearch);
            setIdSearch("");
        }
    };

    const deleteIdSearchList = (id: string) => {
        const newList = IdSearchList.filter((item: any) => item !== id);
        setIdSearchList(newList);
    };

    return (
        <div css={body}>
            <TabContext value={tabValue}>
                <div css={clearIcon}>
                    <Tooltip title="close filter">
                        <ClearIcon className="icon" onClick={closeHandler}></ClearIcon>
                    </Tooltip>
                </div>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={tabHandler} aria-label="lab API tabs example">
                        <Tab label="world" value="1" />
                        <Tab label="perception" value="2" />
                        <Tab label="ID-Search" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <FormGroup>
                        {checkboxList.map((key) => {
                            return <FormControlLabel key={key} control={<Checkbox name={key} checked={filter[key]} onClick={filterHandler} />} label={key} />;
                        })}
                    </FormGroup>
                </TabPanel>
                <TabPanel value="2">
                    <FormGroup>
                        {perceptionCheckboxList.map((key) => {
                            return <FormControlLabel key={key} control={<Checkbox name={key} checked={perceptionFilter[key]} onClick={perceptionFilterHandler} />} label={key} />;
                        })}
                    </FormGroup>
                </TabPanel>
                <TabPanel value="3">
                    <div className="tab-3-search">
                        <TextField id="ID-Search" label="ID-Search" variant="standard" value={IdSearch} onChange={changeIdSearch} />
                        <Tooltip title="add">
                            <Button onClick={addIdSearchList}>add</Button>
                        </Tooltip>
                    </div>
                    <ul className="tab-3-list">
                        {IdSearchList.map((list: string, index: any) => {
                            return (
                                <React.Fragment key={index}>
                                    <li>
                                        <span className="txt">{list}</span>
                                        <Tooltip title="delete" className="btn">
                                            <Button
                                                onClick={() => {
                                                    deleteIdSearchList(list);
                                                }}
                                            >
                                                delete
                                            </Button>
                                        </Tooltip>
                                    </li>
                                </React.Fragment>
                            );
                        })}
                    </ul>
                </TabPanel>
            </TabContext>
        </div>
    );
}

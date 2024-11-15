/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Slider, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react";

export default function Bottomer({ sliderValue, changeSlider, changeCommittedSlider, buttonDisable, setStep, stepDown, stepUp, perceptionId, deletePerceptionId }: any) {
    const defaultBody = css`
        position: absolute;
        /* bottom: 0px; */
        /* bottom: calc(-36.5px + -20px); */
        bottom: 0;
        width: 100%;
        /* background-color: transparent; */
        background-color: #9f9f9ff5;
        padding: 20px 10px;
        transition: 0.2s;
        z-index: 10;
        :hover {
            /* bottom: 0; */
            /* background-color: #9f9f9ff5; */
            .MuiSlider-root {
                /* height: 16px; */
                /* bottom: 0; */
            }
        }
        .showIcon {
            position: absolute;
            top: 20px;
            right: 10px;
            width: 30px;
            height: 30px;
            background-color: lightgray;
            border-radius: 10px;
            z-index: 5;
            :hover {
                cursor: pointer;
            }
            .icon {
                width: 30px;
                height: 30px;
            }
        }
        .buttons {
            height: 36.5px;
            overflow-y: scroll;
        }
        .MuiSlider-root {
            position: absolute;
            /* bottom: calc(36.5px + 20px); */
            bottom: 0;
            left: 0;
            padding: 0;
            height: 8px;
            width: 100%;
            /* height: 16px; */
            border-radius: 0;
            transition: 0.2s;
            z-index: 3;
            :hover {
                height: 16px;
            }
        }
        .MuiSlider-thumb {
            width: 0;
            height: 0;
            ::after {
                width: 0;
                height: 0;
            }
        }
    `;

    const autoCloseBody = css`
        position: absolute;
        /* bottom: 0px; */
        bottom: calc(-36.5px + -20px);
        width: 100%;
        background-color: transparent;
        padding: 20px 10px;
        transition: 0.2s;
        z-index: 10;
        :hover {
            bottom: 0;
            background-color: #9f9f9ff5;
            .MuiSlider-root {
                height: 16px;
                bottom: 0;
            }
        }
        .showIcon {
            position: absolute;
            top: 20px;
            right: 10px;
            width: 30px;
            height: 30px;
            background-color: lightgray;
            border-radius: 10px;
            z-index: 5;
            :hover {
                cursor: pointer;
            }
            .icon {
                width: 30px;
                height: 30px;
            }
        }
        .buttons {
            height: 36.5px;
            overflow-y: scroll;
        }
        .MuiSlider-root {
            position: absolute;
            bottom: calc(36.5px + 20px);
            left: 0;
            padding: 0;
            height: 8px;
            width: 100%;
            /* height: 16px; */
            border-radius: 0;
            transition: 0.2s;
            z-index: 3;
        }
        .MuiSlider-thumb {
            width: 0;
            height: 0;
            ::after {
                width: 0;
                height: 0;
            }
        }
    `;

    const [autoClose, setAutoClose] = useState(false);

    const toggleAutoClose = () => {
        if (autoClose) {
            setAutoClose(false);
        } else {
            setAutoClose(true);
        }
    };

    return (
        <>
            <div css={autoClose ? autoCloseBody : defaultBody}>
                <div className="showIcon" onClick={toggleAutoClose}>
                    {autoClose ? <ExpandLessIcon className="icon"></ExpandLessIcon> : <ExpandMoreIcon className="icon"></ExpandMoreIcon>}
                </div>

                <div className="buttons">
                    <Button
                        onClick={() => {
                            setStep(0);
                        }}
                        variant="outlined"
                        disabled={buttonDisable}
                    >
                        go to initial step
                    </Button>
                    <Button
                        onClick={() => {
                            stepDown(10);
                        }}
                        variant="outlined"
                        disabled={buttonDisable}
                    >
                        go to prev 10 step
                    </Button>
                    <Button
                        onClick={() => {
                            stepDown(1);
                        }}
                        variant="outlined"
                        disabled={buttonDisable}
                    >
                        go to prev step
                    </Button>
                    <Button
                        onClick={() => {
                            stepUp(1);
                        }}
                        variant="outlined"
                        disabled={buttonDisable}
                    >
                        go to next step
                    </Button>
                    <Button
                        onClick={() => {
                            stepUp(10);
                        }}
                        variant="outlined"
                        disabled={buttonDisable}
                    >
                        go to next 10 step
                    </Button>
                    <Button
                        onClick={() => {
                            setStep(300);
                        }}
                        variant="outlined"
                        disabled={buttonDisable}
                    >
                        go to last step
                    </Button>
                    {perceptionId !== null ? (
                        <Button
                            onClick={() => {
                                deletePerceptionId();
                            }}
                            variant="outlined"
                            disabled={buttonDisable}
                        >
                            delete perception view
                        </Button>
                    ) : (
                        ""
                    )}
                </div>
                <Slider size="small" value={sliderValue} aria-label="Small" valueLabelDisplay="auto" min={0} max={300} onChange={changeSlider} onChangeCommitted={changeCommittedSlider} disabled={buttonDisable} />
            </div>
        </>
    );
}

import React, { useCallback, useEffect, useState } from 'react'
import { Tooltip } from 'reactstrap';

export function ButtonsContainer({ handleButtonClick, createdBy, creationDate, modifiedBy, hideClose, hideSave, hideSaveAsDraft, hideClear, putStart, putSendEmail, putSendReminder, outsideClick, modifiedDate }) {
    const STATE = {
        createdBy: '',
        creationDate: '',
        modifiedBy: '',
        modifiedDate: '',
        hideClose: false,
        hideSave: false,
        hideSaveAsDraft: false,
        hideClear: false,
        putStart: true,
        putSendEmail: true,
        putSendReminder: true,
        tooltip: {
            save: false,
            saveAsDraft: false,
            clear: false,
            close: false,
            start: false,
            sendMail: false,
            sendReminder: false,
            reject: true,
        },
        outsideClick: true
    }
    const [state, setState] = useState(STATE)



    useEffect(() => {
        setState({ ...STATE, createdBy: createdBy, creationDate: creationDate, modifiedBy: modifiedBy, modifiedDate: modifiedDate, hideClose: hideClose, hideSave: hideSave, hideSaveAsDraft: hideSaveAsDraft, hideClear: hideClear, putStart: putStart, putSendEmail: putSendEmail, putSendReminder: putSendReminder, outsideClick: outsideClick })

    }, [createdBy, creationDate, modifiedBy, hideClose, hideSave, hideSaveAsDraft, hideClear, putStart, putSendEmail, putSendReminder, outsideClick]);


    const handleSubComponentClick = useCallback((name) => (e) => {
        handleButtonClick(name);
    }, [handleButtonClick])


    const toggleTooltip = useCallback((_name) => (event) => {
        setState(previousState => {
            return {
                ...previousState,
                tooltip: {
                    ...previousState.tooltip,
                    [_name]: !previousState.tooltip[_name]
                },
                outsideClick: previousState.outsideClick && previousState.tooltip[_name]
            }
        })
    }, [])


    return (
        <div className="buttonsContainer">
            <div className="row no-margin">
                <div className="col-md-6">
                    {
                        state.createdBy &&
                        <small>Created by {state.createdBy} on {state.creationDate} - Modified by {state.modifiedBy} on {state.modifiedDate}</small>
                    }
                </div>
                <div className="col-md-6 text-right no-padding">
                    {
                        !state.hideClose &&
                        <button id="close" className="topIcons" type="button" onClick={handleSubComponentClick("close")}>
                            <i className="fa fa-times"></i>
                            <span>Cancel</span>
                            <Tooltip placement="bottom" isOpen={!state.outsideClick && state.tooltip.close} target="close" toggle={toggleTooltip("close")}>Cancel</Tooltip>
                        </button>
                    }
                    {
                        (!state.hideSaveAsDraft) &&
                        <button id="hideSaveAsDraft" className="topIcons" type="button" onClick={handleSubComponentClick("saveAsDraft")}>
                            <i className="fa fa-floppy-o save"></i>
                            <span>Save as Draft</span>
                            <Tooltip placement="bottom" isOpen={!state.outsideClick && state.tooltip.saveAsDraft} target="hideSaveAsDraft" toggle={toggleTooltip("Save as Draft")}>Save as Draft</Tooltip>
                        </button>
                    }
                    {
                        !state.hideSave &&
                        <button id="save" className="topIcons" type="button" onClick={handleSubComponentClick("save")}>
                            <i className="fa fa-floppy-o save"></i>
                            <span>Save</span>
                            <Tooltip placement="bottom" isOpen={!state.outsideClick && state.tooltip.save} target="save" toggle={toggleTooltip("save")}>Save</Tooltip>
                        </button>
                    }
                    {
                        !state.hideClear &&
                        <button id="clear" type="button" className="topIcons" onClick={handleSubComponentClick("clear")}>
                            <i className="fa fa-undo"></i>
                            <span>Undo</span>
                            <Tooltip placement="bottom" isOpen={!state.outsideClick && state.tooltip.clear} target="clear" toggle={toggleTooltip("clear")}>Undo</Tooltip>
                        </button>
                    }
                    {
                        state.putSendReminder &&
                        <button id="sendReminder" type="button" className="topIcons" onClick={handleSubComponentClick("sendReminder")}>
                            <i className="fa fa-bell reminder"></i>
                            <span>Send Reminder</span>
                            <Tooltip placement="bottom" isOpen={!state.outsideClick && state.tooltip.sendReminder} target="sendReminder" toggle={toggleTooltip("sendReminder")}>Send Reminder</Tooltip>
                        </button>
                    }
                    {
                        state.putSendEmail &&
                        <button id="sendMail" type="button" className="topIcons" onClick={handleSubComponentClick("sendMail")}>
                            <i className="fa fa-envelope email"></i>
                            <span>Send Mail</span>
                            <Tooltip placement="bottom" isOpen={!state.outsideClick && state.tooltip.sendMail} target="sendMail" toggle={toggleTooltip("sendMail")}>Send Mail</Tooltip>
                        </button>
                    }
                    {
                        state.putStart &&
                        <button id="start" type="button" className="topIcons" onClick={handleSubComponentClick("start")}>
                            <i className="fa fa-play-circle play_circle"></i>
                            <span>Start</span>
                            <Tooltip placement="bottom" isOpen={!state.outsideClick && state.tooltip.start} target="start" toggle={toggleTooltip("start")}>Start</Tooltip>
                        </button>
                    }

                </div>
            </div>
        </div>
    )
}

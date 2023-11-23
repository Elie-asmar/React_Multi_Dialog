import React, { Component } from 'react';
import { Tooltip } from "reactstrap";

class RoundedIcon extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id ? this.props.id.replace(/ /g, "").replace(/'/g, "", "") : "",
            tooltip: this.props.tooltip ? this.props.tooltip : "",
            tooltipVisible: false
        }
    }

    toggleTooltip = () => {
        this.setState({
            tooltipVisible: !this.state.tooltipVisible
        })
    }

    render() {
        let divStyles = {
            backgroundColor: this.props.backgroundColor,
            float: this.props.position === "right" || this.props.position === "left" ? this.props.position : "none",
            margin: this.props.position === 'center' ? "0 auto" : "0 0 0 10px",
            display: this.props.display ? this.props.display : ""
        }

        return (
            <div id={this.state.id}
                style={divStyles}
                className="roundWrapper pointer"
                onClick={this.props.onClick}
            >
                <i style={{ color: `${this.props.iconColor}` }} className={`fa ${this.props.iconClass}`} />

                {(this.state.id && this.state.tooltip) &&
                    <Tooltip placement="bottom" isOpen={this.state.tooltipVisible} target={this.state.id} toggle={this.toggleTooltip}>{this.state.tooltip}</Tooltip>
                }

            </div>
        );
    }

}

export default RoundedIcon;
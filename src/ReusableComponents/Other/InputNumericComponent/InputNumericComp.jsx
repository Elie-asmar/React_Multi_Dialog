import React, { Component } from 'react';
import { isEqual } from "lodash";
import NumberFormat from "react-number-format";

class InputNumericComp extends Component {

    shouldComponentUpdate(nextProps) {
        if (!isEqual(this.props, nextProps)) {
            return true;
        } else {
            return false
        }
    }

    render() {
        return (
            <div>
                <NumberFormat
                    id={this.props.name}
                    thousandSeparator={this.props.thousandSeparator ? true : false}
                    suffix={this.props.suffix ? this.props.suffix : ""}
                    name={this.props.name}
                    className={`form-control  ${this.props.className}`}
                    style={this.props.style}
                    value={this.props.value}
                    format={this.props.format ? this.props.format : null}
                    maxLength={this.props.maxLength ? this.props.maxLength : null}
                    placeholder={this.props.placeholder ? this.props.placeholder : ""}
                    allowNegative={this.props.allowNegative ? true : false}
                    onValueChange={(value) => {
                        value = this.props.noDecimal ? value.value.replace(".", "") : value.value
                        this.props.handleChange(value, this.props.name)
                    }}
                    isAllowed={(values) => {
                        const { formattedValue, floatValue } = values;
                        let isAllowed = true;
                        if ((this.props.maxValue && (floatValue > parseFloat(this.props.maxValue))) || (this.props.minValue && (floatValue < parseFloat(this.props.minValue)))) isAllowed = false
                        return formattedValue === "" || isAllowed
                    }}
                    readOnly={this.props.readOnly ? true : false}
                    disabled={this.props.disabled ? true : false}
                    onBlur={() => this.props.onBlur ? this.props.onBlur(this.props.value, this.props.name) : undefined}
                    allowLeadingZeros={this.props.allowLeadingZeros ? true : false}
                />
            </div>
        );
    }
}

export default InputNumericComp;

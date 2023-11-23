import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import Moment from 'moment';
import InputMask from 'react-input-mask';
import { isEqual } from 'lodash';

class DateTimeInputMask extends React.Component {
    focus() { ReactDOM.findDOMNode(this._element).focus(); }
    render() {
        return (<InputMask {...this.props} ref={(element) => this._element = element} />);
    }
};

class DateTimePickerComp extends Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef()

        this.state = {
            date: '',
            selected: this.props.selected ? Moment(this.props.selected) : null,
            isValid: true
        };
    }

    componentDidMount() {
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!isEqual(this.props, nextProps) || !isEqual(this.state, nextState)) {
            return true;
        } else {
            return false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!isEqual(prevProps, this.props)) {
            this.setState({
                selected: this.props.selected ? Moment(this.props.selected) : null,
            })
        }

    }
    onDateChange = (datetime) => {
        this.setState({
            selected: datetime,
            isValid: true
        }, () => {
            if (datetime === null) {
                this.props.onDateTimeChange(this.props.name, this.state.selected, this.state.isValid);
            }
        })
    }

    onChangeRaw = (event) => {
        let value = event.target.value;

        this.setState({
            date: value
        });
    }



    prevIndex = (name) => { if (this.props.prevIndex) { this.props.prevIndex(name); } }

    keyDownDate = (e) => {
        const keyCode = e.keyCode || e.which;
        if (keyCode === 9) {
            if (e.shiftKey) { this.prevIndex(e.target.name); e.preventDefault(); }
        }
    }

    handleBlur = (event) => {
        let value = event.target.value;

        let formattedDate = Moment(value, "DD/MM/YYYY HH:mm");
        let formattedDate1 = Moment(value, "DD/MM/YYYY").year();
        let checkMaxMin = true
        let currentYear = Moment(new Date(), "DD/MM/YYYY").year();
        let checkError = true;


        // if (formattedDate1 < currentYear) { checkError = false }

        if (this.props.maxDate) {
            if (formattedDate.isAfter(this.props.maxDate)) {
                checkMaxMin = false
            }
        }

        if (this.props.minDate) {

            if (formattedDate.format("YYYY/MM/DD") < Moment(this.props.minDate).format("YYYY/MM/DD")) {
                checkMaxMin = false
            }

        }

        this.setState({
            isValid: (formattedDate.isValid() || value === "") && checkError && checkMaxMin ? true : false
        }, () => {
            this.props.onDateTimeChange(this.props.name, (value === "" ? "" : formattedDate), this.state.isValid ? true : false)
        });

    }

    // ! check if the component will have the x to clear the date input 
    checkIfClearable = () => {
        if (this.props.disabled) {
            return false;
        }
        return true;
    }

    render() {

        return (
            <div >
                <DatePicker
                    ref={this.textInput}
                    customInput={
                        <DateTimeInputMask mask={this.props.allowTime ? this.props.dateSlash ? '99/99/9999 hr:mn' : '99-99-9999 hr:mn ap' : "99/99/9999"}
                            formatChars={{
                                '9': '[0-9]', 'h': '[0-2]', 'r': '[0-9]', 'm': '[0-5]', 'n': '[0-9]',
                                'a': '[Aa,Pp]', 'p': '[Mm]'
                            }}
                            maskChar={null} />
                    }
                    dateFormat={`DD/MM/YYYY${this.props.allowTime ? " HH:mm" : ""}`}
                    key={this.props.key ? this.props.key : undefined}
                    locale="en-gb"
                    selected={this.state.selected && this.state.isValid ? this.state.selected : null}
                    onChange={this.onDateChange}
                    showMonthDropdown
                    showYearDropdown
                    showTime={true}
                    timeFormat="HH:mm"
                    style={{
                        width: "100%",
                        padding: '0'
                    }}
                    timeIntervals={60}
                    showTimeSelect={this.props.allowTime}
                    className={`form-control ${this.props.allowTime ? "" : "text-center"} ${this.props.className}`}
                    minDate={this.props.minDate ? Moment(this.props.minDate) : undefined}
                    maxDate={this.props.maxDate ? Moment(this.props.maxDate) : undefined}
                    onChangeRaw={this.onChangeRaw}
                    isClearable={this.checkIfClearable()}
                    onBlur={this.props.onBlur ? this.props.onBlur : this.handleBlur}
                    onKeyDown={this.keyDownDate}
                    placeholderText={this.props.placeholder}
                    todayButton="Today"
                    dropdownMode="select"
                    readOnly={this.props.readOnly ? true : false}
                    disabled={this.props.disabled ? true : false}
                    popperPlacement={this.props.popperPlacement}
                />
            </div>
        );
    }
}

export default DateTimePickerComp;
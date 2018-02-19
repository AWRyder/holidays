import React, {Component} from 'react';
import _ from 'lodash';
import Day from './Day.js';

const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
};

class Month extends Component {

    constructor(props) {
        super(props);
        this.monthDays = this.getArrayOfMonthDays(props.year, props.month);
    }

    getArrayOfMonthDays(year, month) {
        let monthDays = new Date(year, month, 0).getDate();
        let monthDaysWithInitialPadding = _.range(new Date(year, month-1, 1).getDay()).fill(0).concat(_.range(monthDays).map((val, idx) => idx + 1));
        let numberOfWeeks = Math.ceil(monthDaysWithInitialPadding.length / 7);
        return monthDaysWithInitialPadding.concat(_.range(numberOfWeeks * 7 - monthDaysWithInitialPadding.length).fill(0));
    }

    getColorOfDay(year, month, day) {
        if (day === 0) return "#eee";
        let date = new Date(year, month-1, day);

        if ( isWeekend(date.getDay()) && this.isDateAHoliday(date) ) return "#ADF";
        if ( isWeekend(date.getDay())) return "#aaa";
        if (this.isDateAHoliday(date)) return "#0DF";

        let dateBefore = new Date(date);
        let dateAfter = new Date(date);
        dateBefore.setDate(dateBefore.getDate()-1);
        dateAfter.setDate(dateAfter.getDate()+1);

        if ( (isWeekend(date.getDay()-1) || this.isDateAHoliday(dateBefore)) && (isWeekend(date.getDay()+1) || this.isDateAHoliday(dateAfter)) ) return "#faa";

        return "#fff";

        function isWeekend(dow){
            return dow === 0 || dow === 6;
        }
    }

    isDateAHoliday(date){
        let holidays = this.props.holidays;
        if ( !holidays[date.getFullYear()] ) return false;
        if ( !holidays[date.getFullYear()][date.getMonth()+1] ) return false;
        if ( !holidays[date.getFullYear()][date.getMonth()+1][date.getDate()] ) return false;
        return true;
    }


    render() {
        return (
            <div className="">
                <div className="col-12" style={{backgroundColor: "#0AF"}}>
                    {months[this.props.month]}
                </div>
                <table className="calendar-table table-bordered">
                    <thead>
                    <tr>
                        <th className="calendar-column calendar-row">
                            Sun
                        </th>
                        <th className="calendar-column calendar-row">
                            Mon
                        </th>
                        <th className="calendar-column calendar-row">
                            Tue
                        </th>
                        <th className="calendar-column calendar-row">
                            Wed
                        </th>
                        <th className="calendar-column calendar-row">
                            Thu
                        </th>
                        <th className="calendar-column calendar-row">
                            Fri
                        </th>
                        <th className="calendar-column calendar-row">
                            Sat
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        _.range(Math.ceil(this.monthDays.length / 7)).map((valw) => (
                            <tr key={this.props.year+"-"+this.props.month+"-week-"+valw}>
                                {
                                    _.range(7).map((valdow) => (
                                        <td key={this.props.year+":"+this.props.month+":"+(valdow + (7 * valw))} className="calendar-row" style={{backgroundColor: this.getColorOfDay(this.props.year, this.props.month, this.monthDays[valdow + (7 * valw)])}}>
                                            <Day
                                                 color="#ccc"
                                                 day={this.monthDays[valdow + (7 * valw)]}></Day>
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        );
    }

};


export default Month;
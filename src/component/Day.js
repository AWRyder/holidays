import React from 'react';


const Day = (props) => {
    return (
        <div className="day-cell">
            <span>{props.day>0?props.day:""}</span>
        </div>
    );
};


export default Day;
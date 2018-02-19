import React from 'react';
import Month from './Month.js';
import _ from 'lodash';

const MonthList = (props) => {


    return (
      <div>
          <div className="" style={{"backgroundColor": "#ddd"}}>
              Calendars for {props.year}
          </div>

          <div className="row">
              {
                  _.range(1,13).map( nr =>
                      <div key={"month"+nr} className="col-lg-4 mt-3">
                        <Month {...props} month={nr} />
                      </div>
                  )
              }
          </div>
      </div>
    );

};


export default MonthList;
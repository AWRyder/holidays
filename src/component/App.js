import React, {Component} from 'react';
import '../style/App.css';
import axios from 'axios';

import MonthList from './MonthList.js';

class App extends Component {

    constructor(props) {
        super(props);
        axios.get(`xxx/feriados`).then((resp) => {
            this.setState((prevState) => (
                {
                    calendarInfo: {
                        year: prevState.calendarInfo.year,
                        holidays: resp.data
                    }
                }
            ));
        });
    }

    state = {
        calendarInfo: {
            year: 2018,
            holidays: {}
        }
    };

    render() {
        return (
            <div>
                <div className=""> Calendario de pontes:</div>
                <div className="mb-5">
                    <MonthList {...this.state.calendarInfo}/>
                </div>
            </div>
        );
    }
}

export default App;

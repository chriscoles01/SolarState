import React, {PureComponent} from 'react';

export default class ControlPanel extends PureComponent {
  render() {
    var {onChangeMonth, Month} = this.props;
    this.setState({ Month: Month});

    const _onChangeMonth = evt => {
      const bMonth = evt.target.value;
      // add selected days to start time to calculate new time
      onChangeMonth(bMonth);
    };

    

    return (
      <div className="control-panel">
        <h3>SolarState</h3>
        <p>
          Map showing Solar Radiation, and potential roof coverage
          <br />
        </p>
        <hr />
     
        <div>
          <label>Month: {Month}</label>
          <br/>
          <select id="mySelect" onChange={_onChangeMonth} defaultValue={Month}>
        <option>JANUARY</option>
        <option>FEBRUARY</option>
        <option>MARCH</option>
        <option>APRIL</option>
        <option>MAY</option>
        <option>JUNE</option>
        <option>JULY</option>
        <option>AUGUST</option>
        <option>SEPTEMBER</option>
        <option>OCTOBER</option>
        <option>NOVEMBER</option>
        <option>DECEMBER</option>
        <option>ANNUAL</option>
      </select>
        </div>
        <hr />
       
      </div>
    );
  }
}

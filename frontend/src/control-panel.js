import React, {PureComponent} from 'react';

export default class ControlPanel extends PureComponent {
  render() {
    var {onChangeChoice, choice, onSelectM2, onSelectRooftop, zipChange} = this.props;
    this.setState({ choice: choice, checkm2:false, checkroof:false});

    const _onChangeChoice = evt => {
      const bchoice = evt.target.value;
      // add selected days to start time to calculate new time
      onChangeChoice(bchoice, this.refs["solar"].checked, this.refs["m2"].checked);
    };

    const _onChangeM2 = evt => {
      var checked = evt.target.checked
      onSelectM2(checked, this.refs["mySelect"].value)
      if(checked){
      this.refs["solar"].checked = !checked
      }
    }
    
    const _onChangeRoof = evt => {
      var checked = evt.target.checked
      onSelectRooftop(checked, this.refs["mySelect"].value)
      if(checked){

      this.refs["m2"].checked = !checked
      }
    }
    const _enterZip = evt => {
      var zip = evt.target.value
      if(zip.length == 5){
        zipChange(zip)
      }
      if(zip.length == 0){
        zipChange("None")
      }
    }
    return (
      <div className="control-panel">
        <h3>SolarState</h3>
        <p>
          Map showing Solar Radiation, and potential roof coverage
          <br />
        </p>
        <hr />
     
        <div>
          <label>choice: {choice}</label>
          <br/>
          <select ref="mySelect" onChange={_onChangeChoice} defaultValue={choice}>
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
      <br/>
      <input type="checkbox" ref="m2" name="m2" value="KWh per m2" onChange={_onChangeM2} />
      See Rooftop Potential Kwh per m2
      <br/>
      <input type="checkbox" ref="solar" name="solar" value="See Rooftop Potential" onChange={_onChangeRoof} />
      See Rooftop Potential Kwh Total
      <br/>
      Zip Code:  
      <input type="number" ref="zip" name="zip" onChange={_enterZip}/>
      <br/>
      Clear zip to move map
        </div>
        <hr />
       
      </div>
    );
  }
}

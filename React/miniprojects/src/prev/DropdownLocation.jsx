import React, { Component } from "react";

class DropdownLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        Uttar_Pradesh: ["Agra", "Mathura", "Lucknow", "Kanpur"],
        Maharashtra: ["Mumbai", "Pune", "Nagpur"],
        Gujarat: ["Ahmedabad", "Surat", "Rajkot"],
      },
      selectedState: "",
      selectedCity: "",
    };
  }

  handleStateChange = (e) => {
    this.setState({
      selectedState: e.target.value,
      selectedCity: "", // reset city when state changes
    });
  };

  handleCityChange = (e) => {
    this.setState({
      selectedCity: e.target.value,
    });
  };

  render() {
    const { data, selectedState, selectedCity } = this.state;
    const states = Object.keys(data);
    const cities = selectedState ? data[selectedState] : [];

    return (
      <div style={{ padding: "20px" }}>
        <h2>Select Pradesh and City</h2>

        <label>
          Pradesh (State):
          <select value={selectedState} onChange={this.handleStateChange}>
            <option value="">-- Select Pradesh --</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>

        <br /><br />

        <label>
          City:
          <select
            value={selectedCity}
            onChange={this.handleCityChange}
            disabled={!selectedState}
          >
            <option value="">-- Select City --</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        <br /><br />

        <div>
          <strong>Selected Pradesh:</strong> {selectedState || "None"}
          <br />
          <strong>Selected City:</strong> {selectedCity || "None"}
        </div>
      </div>
    );
  }
}

export default DropdownLocation;

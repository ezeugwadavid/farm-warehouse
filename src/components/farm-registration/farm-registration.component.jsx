import React from "react";
import "./farm-registration.styles.scss";
import LoaderImage from "../../assets/loader.gif";
import Input from "../input/input.component";

const FarmRegistration = () => (
  <div className="farm-reg-container">
    <div className="farm-reg-header">Farm Registration</div>

    <div className="register-input-group">
      <div className="label">Farm Name*</div>
      <Input readOnly={false} showIcon={false} placeholder="Enter Farm Name" />
    </div>

    <div className="register-input-group">
      <div className="label">
        Farm Coordinates<span className="optional-reg">(Optional)</span>
      </div>

      <div className="coordinates-section">
        <div className="longitude-left">
          <Input readOnly={false} showIcon={false} placeholder="Longitude" />
        </div>
        <div className="latitude-right">
          <Input readOnly={false} showIcon={false} placeholder="Latitude" />
        </div>
      </div>

      <div className="coordinate-text-sample">
        Ex: Longitude: 8.6753° E. Latitude: 9.0820° N
      </div>
    </div>

    <div className="farm-topic">Crops cultivated and planting season</div>

    <div className="add-farm-container">
      <div className="register-input-group">
        <div className="label">What crop do you cultivate on this farm?</div>
        <Input
          readOnly={true}
          showIcon={true}
          iconName="DownArrow"
          placeholder="Select crop"
        />
      </div>

      <div className="register-input-group-month">
        <div className="start-mnth">
          <div className="label">Start month</div>
          <Input
            readOnly={true}
            showIcon={true}
            iconName="DownArrow"
            placeholder="Select month"
          />
        </div>

        <div className="end-mnth">
          <div className="label">End month</div>
          <Input
            readOnly={true}
            showIcon={true}
            iconName="DownArrow"
            placeholder="Select month"
          />
        </div>
      </div>
    </div>
  </div>
);

export default FarmRegistration;

import React from "react";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch,
} from "react-router-dom";
import RegisterUser from "./Register/RegisterUser";
import RegisterDoctor from "./Register/RegisterDoctor";
import RegisterOrganisation from "./Register/RegisterOrganisation";
import LoginForm from "./Login/LoginForm";
import Home from "./home";
import PrivateRoute from "./auth/PrivateRoute";
import doctorDashboard from "./Dashboards/doctorDashboard";
import OrgDashboard from "./Dashboards/orgDashboard";
import PatientDashboard from "./Dashboards/patientDashboard";
import RegisterSelect from "./Register/RegisterSelect";
import DoctorUploadPanal from "./Dashboards/DoctorUploadPanal";
import Prescription from "./Dashboards/Prescription";
import Graph from "./Dashboards/Graph";
import PatientPrescription from "./Dashboards/patientPrescription";
import PatientGraph from "./Dashboards/PatientGraph";
import OrgGraph from "./Dashboards/OrgGraph";
import OrgAllDetails from "./Dashboards/OrgAllDetails";
import OrgPrescription from "./Dashboards/OrgPrescription";
import PreviousPrescriptions from "./Dashboards/previousPrescriptions";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={RegisterSelect} />
        <Route exact path="/users/register/patient" component={RegisterUser} />
        <Route exact path="/users/register/doctor" component={RegisterDoctor} />
        <Route
          exact
          path="/doctor/AddingFeatures"
          component={DoctorUploadPanal}
        ></Route>
        <Route
          exact
          path="/doctor/AddingFeatures/prescription"
          component={Prescription}
        ></Route>
        <Route
          exact
          path="/doctor/AddingFeatures/graph"
          component={Graph}
        ></Route>
        <Route
          exact
          path="/patient/dashboard/prescription"
          component={PatientPrescription}
        ></Route>
        <Route
          exact
          path="/patient/dashboard/graph"
          component={PatientGraph}
        ></Route>
        <Route exact path="/org/dashboard/graph" component={OrgGraph}></Route>
        <Route exact path="/org/allDetails" component={OrgAllDetails}></Route>
        <Route
          exact
          path="/org/dashboard/prescription"
          component={OrgPrescription}
        ></Route>
        <Route
          exact
          path="/doctor/previousPrescriptions"
          component={PreviousPrescriptions}
        ></Route>
        <Route
          exact
          path="/users/register/org"
          component={RegisterOrganisation}
        />
        <PrivateRoute
          exact
          path="/patient/dashboard"
          component={PatientDashboard}
        />
        <PrivateRoute exact path="/org/dashboard" component={OrgDashboard} />
        <PrivateRoute
          exact
          path="/doctor/dashboard"
          component={doctorDashboard}
        />
        <Route exact path="/users/login" component={LoginForm} />
      </Switch>
    </Router>
  );
}

export default withRouter(App);

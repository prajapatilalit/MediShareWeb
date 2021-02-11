import React from 'react'
import {
  Link,
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch,
} from 'react-router-dom'
import RegisterUser from './Register/RegisterUser'
import RegisterDoctor from './Register/RegisterDoctor'
import RegisterOrganisation from './Register/RegisterOrganisation'
import LoginForm from './Login/LoginForm'
import Home from './home'
import PrivateRoute from './auth/PrivateRoute'
import doctorDashboard from './Dashboards/doctorDashboard'
import OrgDashboard from './Dashboards/orgDashboard'
import PatientDashboard from './Dashboards/patientDashboard'
import RegisterSelect from './Register/RegisterSelect'

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/register' component={RegisterSelect} />
      <Route exact path='/users/register/patient' component={RegisterUser} />
      <Route exact path='/users/register/doctor' component={RegisterDoctor} />
      <Route
        exact
        path='/users/register/org'
        component={RegisterOrganisation}
      />
      <PrivateRoute
        exact
        path='/patient/dashboard'
        component={PatientDashboard}
      />
      <PrivateRoute exact path='/org/dashboard' component={OrgDashboard} />
      <PrivateRoute
        exact
        path='/doctor/dashboard'
        component={doctorDashboard}
      />
      <Route exact path='/users/login' component={LoginForm} />
    </Switch>
  )
}

export default withRouter(App)

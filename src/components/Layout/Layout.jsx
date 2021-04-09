import React, { Suspense } from 'react';
import { AnimatedSwitch } from 'react-router-transition';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import NavbarMenu from '../NavbarMenu/NavbarMenu';
import AppSpinner from '../shared/AppSpinner/AppSpinner';

const DeviceList = React.lazy(() => import('../device/DeviceList/DeviceList'));
const DeviceAdd = React.lazy(() => import('../device/DeviceAdd/DeviceAdd'));
const DeviceEdit = React.lazy(() => import('../device/DeviceEdit/DeviceEdit'));
const GatewayList = React.lazy(() => import('../gateway/GatewayList/GatewayList'));
const GatewayAdd = React.lazy(() => import('../gateway/GatewayAdd/GatewayAdd'));
const GatewayEdit = React.lazy(() => import('../gateway/GatewayEdit/GatewayEdit'));

const routes = [
  {
    path: '/devices',
    name: 'Devices',
    component: DeviceList,
  },
  { path: '/devices/add', name: 'Add', component: DeviceAdd, hidden: true },
  { path: '/devices/edit/:id', name: 'Edit', component: DeviceEdit, hidden: true },
  {
    path: '/gateway',
    name: 'Gateway',
    component: GatewayList,
  },
  { path: '/gateway/add', name: 'Add', component: GatewayAdd, hidden: true },
  { path: '/gateway/edit/:id', name: 'Edit', component: GatewayEdit, hidden: true },
];
export default function Layout() {
  return (
    <Router>
      <Suspense fallback={<AppSpinner display={'Absolute'} position={'Center'} />}>
        <NavbarMenu routes={routes}></NavbarMenu>
        <div className="container py-5">
          {/* <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper"
          > */}
          {routes.map((route) => (
            <Route exact path={route.path} component={route.component} key={route.path}></Route>
          ))}
          {/* </AnimatedSwitch> */}
        </div>
      </Suspense>
    </Router>
  );
}

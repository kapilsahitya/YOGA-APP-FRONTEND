import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { RoutesData } from "../routes";

// pages
import Presentation from "./Presentation";
import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// documentation pages
import DocsOverview from "./documentation/DocsOverview";
import DocsDownload from "./documentation/DocsDownload";
import DocsQuickStart from "./documentation/DocsQuickStart";
import DocsLicense from "./documentation/DocsLicense";
import DocsFolderStructure from "./documentation/DocsFolderStructure";
import DocsBuild from "./documentation/DocsBuild";
import DocsChangelog from "./documentation/DocsChangelog";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <React.Fragment>
      <Preloader show={loaded ? false : true} /> 
      <Component {...rest} />
    </React.Fragment>
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  return (
    <React.Fragment>
      <Preloader show={loaded ? false : true} />
      <Sidebar/>
      <main className="content">
        <Navbar/>
        <Component {...rest} />
        <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
      </main>
    </React.Fragment>
  );
};

export default () => (
  <Routes>
    <Route path={RoutesData.Presentation.path} element={<RouteWithLoader component={Presentation}/>}/>
    <Route path={RoutesData.Signin.path} element={<RouteWithLoader component={Signin}/>}/>
    <Route path={RoutesData.Signup.path} element={<RouteWithLoader component={Signup}/>}/>
    <Route path={RoutesData.ForgotPassword.path} element={<RouteWithLoader component={ForgotPassword}/>}/>
    <Route path={RoutesData.ResetPassword.path} element={<RouteWithLoader component={ResetPassword}/>}/>
    <Route path={RoutesData.Lock.path} element={<RouteWithLoader component={Lock}/>}/>
    <Route path={RoutesData.NotFound.path} element={<RouteWithLoader component={NotFoundPage}/>}/>
    <Route path={RoutesData.ServerError.path} element={<RouteWithLoader component={ServerError}/>}/>  

    <Route path={RoutesData.DashboardOverview.path} element={<RouteWithSidebar component={DashboardOverview}/>}/>  
    <Route path={RoutesData.Upgrade.path} element={<RouteWithSidebar component={Upgrade}/>}/>  
    <Route path={RoutesData.Transactions.path} element={<RouteWithSidebar component={Transactions}/>}/>  
    <Route path={RoutesData.Settings.path} element={<RouteWithSidebar component={Settings}/>}/>  
    <Route path={RoutesData.BootstrapTables.path} element={<RouteWithSidebar component={BootstrapTables}/>}/>  

    <Route path={RoutesData.Accordions.path} element={<RouteWithSidebar component={Accordion}/>}/>
    <Route path={RoutesData.Alerts.path} element={<RouteWithSidebar component={Alerts}/>}/>
    <Route path={RoutesData.Badges.path} element={<RouteWithSidebar component={Badges}/>}/>
    <Route path={RoutesData.Breadcrumbs.path} element={<RouteWithSidebar component={Breadcrumbs}/>}/>
    <Route path={RoutesData.Buttons.path} element={<RouteWithSidebar component={Buttons}/>}/>
    <Route path={RoutesData.Forms.path} element={<RouteWithSidebar component={Forms}/>}/>
    <Route path={RoutesData.Modals.path} element={<RouteWithSidebar component={Modals}/>}/>
    <Route path={RoutesData.Navs.path} element={<RouteWithSidebar component={Navs}/>}/>
    <Route path={RoutesData.Navbars.path} element={<RouteWithSidebar component={Navbars}/>}/>
    <Route path={RoutesData.Pagination.path} element={<RouteWithSidebar component={Pagination}/>}/>
    <Route path={RoutesData.Popovers.path} element={<RouteWithSidebar component={Popovers}/>}/>
    <Route path={RoutesData.Progress.path} element={<RouteWithSidebar component={Progress}/>}/>
    <Route path={RoutesData.Tables.path} element={<RouteWithSidebar component={Tables}/>}/>
    <Route path={RoutesData.Tabs.path} element={<RouteWithSidebar component={Tabs}/>}/>
    <Route path={RoutesData.Tooltips.path} element={<RouteWithSidebar component={Tooltips}/>}/>
    <Route path={RoutesData.Toasts.path} element={<RouteWithSidebar component={Toasts}/>}/>
    <Route path={RoutesData.DocsOverview.path} element={<RouteWithSidebar component={DocsOverview}/>}/>
    <Route path={RoutesData.DocsDownload.path} element={<RouteWithSidebar component={DocsDownload}/>}/>
    <Route path={RoutesData.DocsQuickStart.path} element={<RouteWithSidebar component={DocsQuickStart}/>}/>
    <Route path={RoutesData.DocsLicense.path} element={<RouteWithSidebar component={DocsLicense}/>}/>
    <Route path={RoutesData.DocsFolderStructure.path} element={<RouteWithSidebar component={DocsFolderStructure}/>}/>
    <Route path={RoutesData.DocsBuild.path} element={<RouteWithSidebar component={DocsBuild}/>}/>
    <Route path={RoutesData.DocsChangelog.path} element={<RouteWithSidebar component={DocsChangelog}/>}/>

    {/* <Navigate to={RoutesData.NotFound.path}/> */}
  </Routes>
);

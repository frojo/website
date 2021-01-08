import * as React from "react";
import ReactDOM = require("react-dom");
import { BrowserRouter as Router, 
         Switch, Route, Link, 
         withRouter, useRouteMatch
       } from 'react-router-dom';

import { A } from "./theme";

// pages for project documentation
class ProjectDocumentations extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <Switch>
        <Route path={`${this.props.match.path}/:project_id`}
               component={ProjectDocumentation} >
        </Route>
        <Route>
        </Route>
      </Switch>
    );
  );}
}
// https://reactrouter.com/web/api/withRouter
const ProjectDocsWithRouter = withRouter(ProjectDocumentations);

class ProjectDocumentation extends React.Component {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.project_id;
  }

  render() {
    switch(this.id) {
      case 'souls':
        return <SoulsDoc />
        break;
      case 'godot-workshop':
        return <GodotWorkshopDoc />
        break;
    }
    return <div> there is no documetation for {this.id} </div>
  );}
}

class SoulsDoc extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
    <h1> sou.ls </h1>
    <p> when the pandemic hit, I felt pretty lonely and instead of working through it in a healthy way, I made <A href="https://sou.ls">sou.ls</A></p>
    </div>
  );}
}

class GodotWorkshopDoc extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
    <h1> Godot workshop for Babycastles Academy </h1>
    <p> Godot is an open-source game engine. As part of Babycastles Academy (a wonderful series of workshops put on by Babycastles), I streamed an introduction to Godot. The VOD might still be up on twitch: link. </p>
    </div>
  );}
}

export { ProjectDocsWithRouter };

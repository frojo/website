import * as React from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateFormat";

import project_metas from "./../assets/project_metas.json"

import { ThemeContext } from "./theme";

function renderProjectItem(project, idx: number) {
  return (
    <ArchiveListItem key={idx} project={project} />
  );
}

// the clickable project name/subtitle links
class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.ordered_projects = this.sortReverseChrono(
                              project_metas.projects);
  }

  // THE TITAN CHRONOS
  sortReverseChrono(projects) {
    const sorted = projects.sort(function(a, b) {
      if (a.date > b.date) {
        return -1;
      } else {
        return 1;
      }
    });
    return sorted
  }

  render() {
    return (
    <div id="project-list">
      {this.ordered_projects.map(renderProjectItem, this)}
    </div>
      
    );}

}


// <A className="class" href="https://some.link" />.

// the clickable project name/subtitle link
class ProjectListItem extends React.Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);
    this.state = {
      hovered : false;
    };

    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  mouseEnter(e) {
    this.setState((state, props) => ({
      hovered : true;
    }));
    this.context.onLinkHover(true);
  }

  mouseLeave(e) {
    this.setState((state, props) => ({
      hovered : false;
    }));
    this.context.onLinkHover(false);
  }



  render() {
    const project = this.props.project;

    let style = this.context.link_color;
    if (this.state.hovered) {
      style = style + " " + this.context.hover_style;
    }
    let title_style = "project-title " + style;
    let sub_style = "project-subtitle " + style;

    if (project.documentation) {
      return (
        <div 
          className="project-item"
        >
          <Link to={"/work/" + project.id}
                className={title_style}
                onMouseEnter={this.mouseEnter}
                onMouseLeave={this.mouseLeave}>
                {project.title}
          </Link>
          <br></br>
          <Link to={"/work/" + project.id}
                className={sub_style}
                onMouseEnter={this.mouseEnter}
                onMouseLeave={this.mouseLeave}>
	    <i>{project.subtitle}</i>
          </Link>
        </div>
      );

    } else {
      return (
        <div 
          className="project-item"
        >
          <a href={project.link}
	     className={title_style}
             onMouseEnter={this.mouseEnter}
             onMouseLeave={this.mouseLeave}>
	    {project.title}
          </a>
          <br></br>
          <a href={project.link}
             className={sub_style}
             onMouseEnter={this.mouseEnter}
             onMouseLeave={this.mouseLeave}>
            <i>{project.subtitle}</i>
          </a>
        </div>
      );

    }
  }
}

// the clickable project name/subtitle link
class ArchiveListItem extends React.Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);
    this.state = {
      hovered : false;
    };

    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  mouseEnter(e) {
    this.setState((state, props) => ({
      hovered : true;
    }));
    this.context.onLinkHover(true);
  }

  mouseLeave(e) {
    this.setState((state, props) => ({
      hovered : false;
    }));
    this.context.onLinkHover(false);
  }



  render() {
    const project = this.props.project;

    let style = this.context.link_color;
    if (this.state.hovered) {
      style = style + " " + this.context.hover_style;
    }
    const title_style = "archive-title " + style;
    const date_style = "archive-date " + style;

    const date = new Date(this.props.project.date);
    const formatted_date = dateFormat(date, "mmm. yyyy");

    if (project.documentation) {
      return (
        <div 
          className="archive-item"
        >
          <Link to={"/work/" + project.id}
                onMouseEnter={this.mouseEnter}
                onMouseLeave={this.mouseLeave}>
            <div className={date_style}><i>{formatted_date}</i></div>
            <div className={title_style}>{project.title}</div> 
          </Link> 
        </div>
      );

    } else {
      return (
        <div 
          className="archive-item"
        >
          <a href={project.link}
             onMouseEnter={this.mouseEnter}
             onMouseLeave={this.mouseLeave}>
            <span className={date_style}><i>{formatted_date}</i></span>
            <span className={title_style}>{project.title}</span> 
          </a>
        </div>
      );

    }
  }
}

export { ProjectList };

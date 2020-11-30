// import { string } from "prop-types";

interface ProjectMetaLayout {
  // title and subtitle are displayed on the "work" page
  title: string;
  subtitle: string;

  // link to the work (or documentation of it)
  link: string;

  // do i want to "show off" this work in the default "work" landing page
  highlight: Boolean;

  // do i have a blogpost for this work
  blogpost: Boolean;
}

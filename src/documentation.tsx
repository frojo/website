import * as React from "react";
import ReactDOM = require("react-dom");

import { BrowserRouter as Router, 
         Switch, Route, Link, 
         withRouter, useRouteMatch
       } from 'react-router-dom';
import { TwitchPlayer } from 'react-twitch-embed';
import P5Wrapper from 'react-p5-wrapper';

import what_do_you_wish_sign from "./../assets/what-do-you-wish-sign.png";
import word_garden from './word-garden';

import { A } from "./theme";
import { FourOhFour } from "./fourohfour"

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
      case 'word-garden':
        return <WordGardenDoc />
        break;
      case 'pico8-pcd2020':
        return <Pico8TalkDoc />
        break;
      case 'pride-prejudice-pussy':
        return <PridePrejudicePussyDoc />
        break;
      case 'what-do-you-wish':
        return <WhatDoYouWishDoc />
        break;
    }
    /* no match */
    return <FourOhFour />;
  );}
}

class SoulsDoc extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <React.Fragment>
    <h1> sou.ls </h1>
    <p> in March 2020, when the pandemic first hit, I (like most) felt pretty lonely and instead of working through it in a healthy way, I made <A href="https://sou.ls">sou.ls</A></p>
    <p>At around the same time, I started spending a lot of time on Instagram. Social media always seemed scary and not worth it, but suddenly that's how I was maintaining relationships with my friends. I knew that, big-picture, me and my friendships were <A href="http://wagesforfacebook.com/">being exploited</A>. But still, it's nice to see a friend napping with their cat, or taking a huge rip from a bong, or sharing a good COVID meme.</p>
      <p>I mostly spent time in the messages tab, though I didn't really DM people much. i found myself looking at the profile pics of my friends, and noticing when last they'd been "active". When it said "Active Now" next to their portrait with the little green dot, I'd wonder if, like me, laying belly-down on their bed. Maybe they were under a tree. Was the sun still up in their timezone? their virtual presence there was a source of comfort, proof that they existed, that i existed.</p>
    <p>at the same time, it's troubling that i have this way of monitoring the activity of my friends, and with such granularity. not only do i know when someone is currently online, i can tell if they were online just 2 minutes ago, or if they haven't been online since yesterday. like a lot of Instagram's design, this normalized mutual mass surveillance doesn't seem healthy for anybody involved.</p>
    </React.Fragment>
  );}
}

class GodotWorkshopDoc extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <React.Fragment>
    <h1> Godot workshop for Babycastles Academy </h1>
    <p> Godot is a great <A href="https://godotengine.org/">open-source game engine </A>. As part of Babycastles Academy (an amazing series of workshops put on by <A href="https://www.babycastles.com/">Babycastles</A>), I streamed an introduction to Godot.</p>
    <TwitchPlayer video="624170960" autoplay={false} width="100%" />
    <p>Links to <A href="https://www.twitch.tv/videos/624170960">the recorded VOD on Twitch</A> and <A href="https://github.com/frojo/godot-bbc-may20">the code for the example project.</A></p>
    </React.Fragment>
  );}
}

class WordGardenDoc extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <React.Fragment>
    <h1>word garden</h1>
    <p>this is a small experimental toy made with <A href="https://p5js.org/">p5js</A>. please try it out :) </p>
    <p> be gentle; too many words makes her run slowly</p>
    <div id='toolbar'></div>
    <div id='sketch-holder'></div>
    <P5Wrapper sketch={word_garden} />
    <p><A href="https://github.com/frojo/word-garden">p5js sketch code</A></p>
    </React.Fragment>
  );}
}

class Pico8TalkDoc extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const opts = {
      width: "100%",
      height: "auto"
    }

    return (
    <React.Fragment>
    <h1>Intro. to PICO-8: The joy of working with limitations</h1>
    <p>For <A href="https://processing.nyc/2020/">Processing Community Day NYC 2020</A>, I gave a short overview of <A href="https://www.lexaloffle.com/pico-8.php">PICO-8</A>, a game-making tool for making small videogames. I wanted to introduce PICO-8 to the Processing community and explore if there was anything we could learn from its limitations-celebrating design.</p>

    {/* ty james fisher
      * https://jameshfisher.com/2017/08/30/how-do-i-make-a-full-width-iframe/ 
      */}
    <div>
      <div style={{
        position: "relative", 
        paddingTop: "56.25%",
      }}
      >
        <iframe 
          src="https://www.youtube.com/embed/9KVqttw4eSo" 
          frameBorder="0" 
          allowFullScreen
          style={{
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100%",
          }}
        ></iframe>
      </div>
    </div>
    </React.Fragment>
  );}
}

class PridePrejudicePussyDoc extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
      <h1>Pride and Prejudice and Pussy</h1>
      <p>As part of the <A href="http://commiserate.life/sthack">Object Oriented Orgasm Hackathon</A>, <A href="http://www.katygero.com/">Katy Gero</A> and I procedurally generated erotica.</p>
      <p>Using <A href="https://en.wikipedia.org/wiki/GPT-3">GPT-3</A>and corpus of erotica scraped from <A href="http://textfiles.com/sex/EROTICA/">textfiles.com</A>, we produced such hot and surreal excerpts as:</p>
      <p><i>“And then they spanked me with the butt that they'd given to me in the shower," he said.</i></p>
      <p><i>Elizabeth wanted her tongue to fuck her.  She wanted to make her cum but decided that she had to be in a position where she could not reach it.  She grabbed her pants and started to lick them.</i></p>
      <p><i>I can't, and I can't swallow my cock, so I'll just drink it, and eat it all. But I'll come, and I'll come if it's not too hard for me, and I want it to come in my mouth.</i></p>
      <p><i>And then they sucked me in like a wet dog. I could feel the inside of my pussy. I was sure it was a mixture of pleasure and hum.</i></p>
      </React.Fragment>
  );}
}

class WhatDoYouWishDoc extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
      <h1>what do you wish you could say?</h1>
      <img src={what_do_you_wish_sign} />
      <p>Created for the <A href="https://sfpc.io/">School of Poetic Computation</A> Fall 2019 showcase.</p>
      <p>A closet in the exhibit space was turned into a cozy, alternate space that someone could hang out in to momentarily escape the exhibition. Participants were let in one a time and were invited to take as much time as they wanted in the room, and to write down a secret on a piece of paper before leaving. By the end of the showcase, the room was full of secrets.</p>
      <p><A href="https://www.instagram.com/llisonchan/">Allison Chan</A> made the sign with the beautiful lettering on the door!</p>
      <p>Materials: lightbulbs from Canal Lighting & Parts, shelves, a bean bag, speakers, a couple of Arduinos, LEDs, paper</p>
      </React.Fragment>
  );}
}



export { ProjectDocumentation };

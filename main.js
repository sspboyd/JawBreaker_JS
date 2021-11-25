import "./style.css";
import P5 from "p5";
import yyz from "./yyz.jpeg";
// import p5 from "p5";

/*
The plan!
load base image(s)
create an array to hold jwbrkr objects
create a jawbreaker object template that has
- origin and edge (x/y)
- radius_scale - % of distance between orig and edge 
- ribbon_width (strokeWeight)
- ribbon count (number of ribbons btwn origin and edge)

functions to 
*/

let src_img;
let jb_counter = 0;

let create_jawbreaker = (p55, ox, oy) => {
  let state = {
    active: true,
    jb_id: jb_counter++,
    // orig: { x: ox, y: oy },
    // edge: { x: -1, y: -1 },
    orig_vec: p55.createVector(ox, oy),
    edge_vec: p55.createVector(),
    ring_sz: 20,
    ring_num: 3,
    ring_radius_scl: 1,
    // radius: 1,
    rings: [], // contains ring {}s with orig, edge, clr, size
    get activeStatus() {
      return state.active;
    },
    set activeStatus(val) {
      state.active = val;
    },
  };

  // return Object.assign({}, state);
  return Object.assign({}, state, renderer(state, p55));
};

const renderer = (state, p55) => ({
  // let renderer = function (state, p55) {
  // console.log(`state: ${state}`);
  // return {
  render: function () {
    console
      .log
      // `In render: jb_id: ${state.jb_id}, active state: ${state.active}`
      ();
    if (state.activeStatus) {
      state.edge_vec.x = p55.mouseX;
      state.edge_vec.y = p55.mouseY;

      // update ring objs
      for (let i = 0; i < state.ring_num; i++) {
        let ring_loc_vec = P5.Vector.lerp(
          state.orig_vec,
          state.edge_vec,
          (i + 1) / state.ring_num
        );

        let ring_clr = src_img.get(ring_loc_vec.x, ring_loc_vec.y);
        // console.log(`getting colour on ring #${i}.`);
        let ring_radius = P5.Vector.dist(state.orig_vec, ring_loc_vec);

        state.rings[i] = {
          ring_loc_vec,
          ring_radius,
          ring_clr,
          ring_sz: state.ring_sz,
          orig_vec: state.orig_vec,
          edge_vec: state.edge_vec,
        };
      }
    }
    // state.radius = 100;
    // state.radius = state.orig_vec.dist(state.edge_vec) * state.radius_scl;
    p55.strokeWeight(0.76);
    p55.stroke(0, 123);
    p55.line(
      state.orig_vec.x,
      state.orig_vec.y,
      state.edge_vec.x,
      state.edge_vec.y
    );

    // render rings
    // for each ring (state.ring_num)
    // find that spot on the line (lerp?) and get the color.
    // Then draw a circle.
    state.rings.forEach((r) => {
      // get color
      p55.stroke(r.ring_clr);
      p55.strokeWeight(r.ring_sz);
      p55.noFill();
      p55.ellipse(state.orig_vec.x, state.orig_vec.y, r.ring_radius * 2);
    });
  },
  // };
});

const s = (p55) => {
  `use strict`;
  // const PHI = (Math.sqrt(5) + 1) / 2; // For ratios
  // const sketch_name = "sspboyd"; // put this in the index.html canvas div too!
  let c; // createCanvas variable
  let canvasW = 540;
  let canvasH = 540;
  // let copy_font;

  let jawbreakers = []; // var to hold all the jb objects

  p55.preload = () => {
    // preload one of the images in here.
    // copy_font = p55.loadFont('assets/fonts/Georgia.ttf');
    src_img = p55.loadImage(yyz);
    src_img.resize(540);
  };

  p55.setup = () => {
    c = p55.createCanvas(canvasW, canvasH);
    // c.parent(sketch_name); // used to associate this sketch with an html div id
  };

  p55.draw = () => {
    p55.background(255);
    // p55.image(src_img, 0, 0, 1080, 1080);

    jawbreakers.forEach((jbkr) => {
      // console.log(
      //   `In draw() bf render() called: jbkr.jb_id = ${jbkr.jb_id}. jbkr.active = ${jbkr.active}`
      // );

      jbkr.render();
    });
  };

  p55.mousePressed = () => {
    // tests to see if this is the first jb obj created...
    if (jawbreakers.length > 0) {
      // if more than 0 jbs in the array then
      let curr_jb = jawbreakers[jawbreakers.length - 1];
      // set final edge_vec info and
      curr_jb.edge_vec.x = p55.mouseX;
      curr_jb.edge_vec.y = p55.mouseY;
      // set active = false
      curr_jb.activeStatus(false);
      // console.log(
      //   `jawbreakers[jawbreakers.length - 1].active = ${
      //     jawbreakers[jawbreakers.length - 1].active
      //   }`
      // );
      // console.log(`curr_jb.active = ${curr_jb.active}`);
    }

    let new_jb = create_jawbreaker(p55, p55.mouseX, p55.mouseY);
    console.log(new_jb);
    console.dir(new_jb);
    jawbreakers.push(new_jb);
    jawbreakers.forEach((jbkr) => {
      console.log(
        `In mousePressed: jbkr.jb_id = ${jbkr.jb_id}. jbkr.active = ${jbkr.active}`
      );
    });
  };
};

// eslint-disable-next-line no-unused-vars
const myp5 = new P5(s, "p55"); // "p55" identifies what div id the canvas tag should append to

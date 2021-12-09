import "./style.css";
import P5 from "p5";
// import yyz from "./media/yyz.jpeg";
// import white_xmas from "./media/xmas.jpeg";
import wonderful_life from "./media/wonderful_life.jpg";
import rudolph from "./media/rudolph.jpeg";
import elf from "./media/elf.jpg";
// import p5 from "p5";
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

additions. 
create these en masse by randomly setting node points and saving output (probably better suited to Processing/Java)

*/

let src_img;
let src_imgs = [];
let src_img_names = [wonderful_life, rudolph, elf];
console.log({ src_img_names });
let jb_counter = 0;
let src_img_idx = 1;
let canvas_state = "intro";
const fib_47 = [3, 4, 7, 11, 18];

const create_jawbreaker = function (p55, ox, oy) {
  let ring_sz_idx = Math.floor(Math.random() * fib_47.length);
  return {
    active: true,
    jb_id: jb_counter++,
    // orig: { x: ox, y: oy },
    // edge: { x: -1, y: -1 },
    orig_vec: p55.createVector(ox, oy),
    edge_vec: p55.createVector(),
    ring_sz: fib_47[ring_sz_idx],
    // ring_sz: 7,
    ring_num: 11 + Math.random() * 47,
    ring_radius_scl: 1,
    ring_alpha: 0.29,
    // radius: 1,
    rings: [], // contains ring {}s with orig, edge, clr, size
    activeStatus: function () {
      return this.active;
    },
    set_activeStatus: function (val) {
      this.active = val;
    },
    update: function () {
      // if true then update the ring data
      if (this.activeStatus()) {
        this.edge_vec.x = p55.mouseX;
        this.edge_vec.y = p55.mouseY;

        // update ring objs
        for (let i = 0; i < this.ring_num; i++) {
          let ring_loc_vec = P5.Vector.lerp(
            this.orig_vec,
            this.edge_vec,
            (i + 1) / this.ring_num
          );

          let ring_clr = src_img.get(ring_loc_vec.x, ring_loc_vec.y);
          // console.log(`getting colour on ring #${i}.`);
          let ring_radius = P5.Vector.dist(this.orig_vec, ring_loc_vec);

          this.rings[i] = {
            ring_loc_vec,
            ring_radius,
            ring_clr,
            ring_sz: this.ring_sz,
            orig_vec: this.orig_vec,
            edge_vec: this.edge_vec,
          };
        }
      }
    },
    render: function () {
      this.rings.forEach((r) => {
        // get color
        p55.stroke(r.ring_clr, r.ring_alpha);
        p55.strokeWeight(r.ring_sz);
        p55.noFill();
        p55.ellipse(this.orig_vec.x, this.orig_vec.y, r.ring_radius * 2);
      });
      p55.strokeWeight(0.76);
      p55.stroke(0, 199);
      p55.line(
        this.orig_vec.x,
        this.orig_vec.y,
        this.edge_vec.x,
        this.edge_vec.y
      );
      // let pointer_clr = src_img.get(p55.mouseX, p55.mouseY);
      // if (this.rings[this.rings.length - 1].ring_clr !== undefined)
      //   p55.fill(this.rings[this.rings.length - 1].ring_clr);
      // Draw the pointer
      p55.fill(src_img.get(p55.mouseX, p55.mouseY));
      p55.noStroke();
      p55.ellipse(p55.mouseX, p55.mouseY, 47, 47);
    },
  };

  // return Object.assign({}, state);
  // return Object.assign({}, state, renderer(state, p55));
};

// const renderer = (state, p55) => ({
//   // let renderer = function (state, p55) {
//   // console.log(`state: ${state}`);
//   // return {
//   render: function () {
//     console
//       .log
//       // `In render: jb_id: ${state.jb_id}, active state: ${state.active}`
//       ();
//     if (state.activeStatus) {
//       state.edge_vec.x = p55.mouseX;
//       state.edge_vec.y = p55.mouseY;

//       // update ring objs
//       for (let i = 0; i < state.ring_num; i++) {
//         let ring_loc_vec = P5.Vector.lerp(
//           state.orig_vec,
//           state.edge_vec,
//           (i + 1) / state.ring_num
//         );

//         let ring_clr = src_img.get(ring_loc_vec.x, ring_loc_vec.y);
//         // console.log(`getting colour on ring #${i}.`);
//         let ring_radius = P5.Vector.dist(state.orig_vec, ring_loc_vec);

//         state.rings[i] = {
//           ring_loc_vec,
//           ring_radius,
//           ring_clr,
//           ring_sz: state.ring_sz,
//           orig_vec: state.orig_vec,
//           edge_vec: state.edge_vec,
//         };
//       }
//     }
//     // state.radius = 100;
//     // state.radius = state.orig_vec.dist(state.edge_vec) * state.radius_scl;
//     p55.strokeWeight(0.76);
//     p55.stroke(0, 123);
//     p55.line(
//       state.orig_vec.x,
//       state.orig_vec.y,
//       state.edge_vec.x,
//       state.edge_vec.y
//     );

//     // render rings
//     // for each ring (state.ring_num)
//     // find that spot on the line (lerp?) and get the color.
//     // Then draw a circle.
//     state.rings.forEach((r) => {
//       // get color
//       p55.stroke(r.ring_clr);
//       p55.strokeWeight(r.ring_sz);
//       p55.noFill();
//       p55.ellipse(state.orig_vec.x, state.orig_vec.y, r.ring_radius * 2);
//     });
//   },
//   // };
// });

const s = (p55) => {
  `use strict`;
  // const PHI = (Math.sqrt(5) + 1) / 2; // For ratios
  // const sketch_name = "sspboyd"; // put this in the index.html canvas div too!
  // eslint-disable-next-line no-unused-vars
  let c; // createCanvas variable
  let canvasW = 1080;
  let canvasH = 1080;
  let img_show = false;
  // let copy_font;

  let jawbreakers = []; // var to hold all the jb objects

  p55.preload = () => {
    // preload one of the images in here.
    // copy_font = p55.loadFont('assets/fonts/Georgia.ttf');
    // src_img =  p55.loadImage(yyz);
    for (let i = 0; i < src_img_names.length; i++) {
      src_imgs[i] = p55.loadImage(src_img_names[i]);
    }
    src_img = src_imgs[src_img_idx];
  };

  p55.setup = () => {
    if (p55.pixelDensity() > 2) p55.pixelDensity(2);
    canvasW = src_img.width;
    canvasH = src_img.height;
    c = p55.createCanvas(canvasW, canvasH);
    // p55.image(src_img, 0, 0);
    // c.parent(sketch_name); // used to associate this sketch with an html div id
  };

  p55.draw = () => {
    if (canvas_state === "intro") {
      p55.background(255);
      p55.image(src_img, 0, 0);
      p55.fill(0, 123);
      p55.rect(0, 0, canvasW, canvasH);
      p55.fill(255);
      p55.textSize(72);
      p55.textFont("Helvetica");
      p55.text("Click Around and \nFind Out...", 199, 321);
    } else {
      // only update if the mouse has moved
      // if (p55.mouseX != p55.pmouseX || p55.mouseY != p55.pmouseY) {
      p55.background(255);
      if (p55.keyIsDown(p55.SHIFT)) p55.image(src_img, 0, 0);
      jawbreakers.forEach((jbkr) => {
        // console.log(
        //   `In draw() bf render() called: jbkr.jb_id = ${jbkr.jb_id}. jbkr.active = ${jbkr.active}`
        // );

        jbkr.update();
        jbkr.render();
      });
      watermark();
      // }
    }
  };

  p55.mousePressed = () => {
    if (canvas_state === "intro") canvas_state = "playable";
    // tests to see if this is the first jb obj created...
    if (jawbreakers.length > 0) {
      // if more than 0 jbs in the array then
      let curr_jb = jawbreakers[jawbreakers.length - 1];
      // set final edge_vec info and
      curr_jb.edge_vec.x = p55.mouseX;
      curr_jb.edge_vec.y = p55.mouseY;
      // set active = false
      curr_jb.set_activeStatus(false);
      curr_jb.ring_alpha = 1;
      // console.log(
      //   `jawbreakers[jawbreakers.length - 1].active = ${
      //     jawbreakers[jawbreakers.length - 1].active
      //   }`
      // );
      // console.log(`curr_jb.active = ${curr_jb.active}`);
    }

    let new_jb = create_jawbreaker(p55, p55.mouseX, p55.mouseY);
    // console.log(new_jb);
    // console.dir(new_jb);
    jawbreakers.push(new_jb);
    // jawbreakers.forEach((jbkr) => {
    //   // console.log(
    //   //   `In mousePressed: jbkr.jb_id = ${jbkr.jb_id}. jbkr.active = ${jbkr.active}`
    //   // );
    // });
  };

  p55.keyPressed = function () {
    if (p55.key === "i") {
      if (src_img_idx === src_img_names.length - 1) {
        src_img_idx = 0;
      } else {
        src_img_idx++;
      }
      src_img = src_imgs[src_img_idx];
      jawbreakers = [];
      p55.image(src_img, 0, 0);
      canvas_state = "intro";
      // console.log(`Inside key==='i'`);
      // console.log({ src_img_idx, src_img });
    }
    if (p55.key === "r") {
      jawbreakers = [];
      canvas_state = "intro";
      p55.image(src_img, 0, 0);
    }
    if (p55.key === "s" || p55.key === "d") {
      export_canvas();
    }
  };

  const export_canvas = function () {
    const file_name = "sspboyd-Christmas-Card";
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; //months from 1-12
    const day = dateObj.getDate();
    const hrs = dateObj.getHours();
    const mins = dateObj.getMinutes();
    const secs = dateObj.getSeconds();
    const file_id = `${year}${month}${day}${hrs}${mins}${secs}`;

    p55.saveCanvas(c, `${file_name}_${file_id}`, "jpg");
  };

  const watermark = function () {
    p55.textSize(12);
    p55.fill(255, 199);
    p55.noStroke();
    p55.text("@sspboyd", canvasW - 76, canvasH - 11);
  };
};

// eslint-disable-next-line no-unused-vars
const myp5 = new P5(s, "p55"); // "p55" identifies what div id the canvas tag should append to

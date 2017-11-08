var canvas = document.getElementById("my_canvas");
var c = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

var sensor_input_length = 5;
var number_outputs = 6;

var animation_count = 0;
var dna_string_length = 5000;
var sensor_length = 20;
var number_of_circles = 2;

var runAnimation = {
    value: true
};

function check_collision(c1,c2) {
    "use strict";

    var deltax = 0;
    var deltay = 0;
    deltax = c1.x - c2.x;
    deltay = c1.y - c2.y;
    var dist = Math.hypot(deltax , deltay );

    if (dist < c1.r) {
    if (c2.sprite_type =='f') {
      //food
      //console.log("food collision",dist, c1,c2);
         c1.reward++;
         //0-3 wall collisions
         c1.state[4] = 1;
         return true;
      } //
    } //end of if on dist
    return false;
} //end of check_collision

//create te container that will hold the boincing balls.
var container = {
  x: 0,
  y: 0,
  width: 600,
  height: 300
};
//create the array of circles that will be animated


make_foods();
make_circles();

function animate() {
   if(runAnimation.value) {
  //draw the container
  c.fillStyle = "#000000";
  c.fillRect(container.x, container.y, container.width, container.height);

  draw_foods();

  //loop throughj the circles array
  for (var i = 0; i < circles.length; i++) {
    draw_circle(circles[i]);

    //time to animate our circles ladies and gentlemen.
    for (var j = 0; j < sensor_input_length; j++) {
       circles[i].state[j] = 0;
    }
    check_for_collisions_with_food(circles[i]);
    //console.log("AFTER G V : ",circles[i].vx, circles[i].vy);


    think(circles[i]);
    get_velocities(circles[i]);
    check_for_wall(circles[i]);

    circles[i].x += circles[i].vx;
    circles[i].y += circles[i].vy;


  } //end of for loop on circles

  animation_count++;
  if ((animation_count % 500) == 0) {
     evolve();
  } 
  requestAnimationFrame(animate);
} //end of if on runAnimation
} //end of animate

//this gets it all started

      // add click listener to canvas
      document.getElementById('my_canvas').addEventListener('click', function() {
        // flip flag
        runAnimation.value = !runAnimation.value;
        requestAnimationFrame(animate);
      });

        if(runAnimation.value) {
requestAnimationFrame(animate);
}



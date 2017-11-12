var canvas = document.getElementById("my_canvas");
var c = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

var number_outputs = 6;
var animation_count = 0;
var animation_count_limit = 500;
var dna_string_length = 5000;
var size_of_state = 50;
var antenna_length = 20;
var number_of_circles = 15;

var runAnimation = {
    value: true
};

//create te container that will hold the boincing balls.
var container = {
  x: 0,
  y: 0,
  width: 600,
  height: 300
};
//create the array of circles that will be animated


map = new Map();

make_foods();
make_circles();
  
 
//time to animate our circles ladies and gentlemen.
function animate() {
   if(runAnimation.value) {
  //draw the container
  c.fillStyle = "#000000";
  c.fillRect(container.x, container.y, container.width, container.height);

  draw_foods();

  //loop throughj the circles array
  for (var i = 0; i < circles.length; i++) {
    
    draw_circle(circles[i]);
    //sensor input in order
    get_map_positions(circles[i]);
    put_map_xy_in_state(circles[i]);
    check_for_wall(circles[i]);
    check_for_collisions_with_food(circles[i]);

    think(circles[i]);

    get_velocities(circles[i]);
    circles[i].x += circles[i].vx;
    circles[i].y += circles[i].vy;

  } //end of for loop on circles

  animation_count++;
  if ((animation_count % animation_count_limit) == 0) {
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



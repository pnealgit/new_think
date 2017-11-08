
function check_for_sensor_collisions(c1) {
    //check for collision with food
    for (var k = 0; k < foods.length; k++) {
       if( check_sensor_collision(c1,foods[k]) ) {
          break;
       };
    } //end of loop on food - k
    
    //check for collision with other circle
/*
    for (var k = 0; k < circles.length; k++) {
       if( check_sensor_collision(c1,circles[k]) ) {
          break;
       };
    } //end of loop on circles - k
*/

} //end of function

function check_sensor_collision(c1,c2) {
    var deltax = 0;
    var deltay = 0;
    deltax = c1.sensor_xpos - c2.x;
    deltay = c1.sensor_ypos - c2.y;
    var dist = Math.hypot(deltax , deltay );

    if(dist < c2.r) {
      //check for another circle
      if (c2.sprite_type == 'c') {
         c1.reward--;
         c1.state[3] = 1;
         return true;
      }

      if (c2.sprite_type =='f') {
         //food
         c1.reward++;
         c1.state[2] = 1;
         return true;
      } //
    } //end of if on dist
    return false;
} //end of check_collision




foods = [];
function make_foods() {
  for(var i = 0; i < 5; i++) {
    foods.push(new Food(i));
  }
}

function Food(i) {
    var food = {};
    food.sprite_type = 'f';
    food.id = i;
    food.r = 10;
    food.x = 200 + 4 * i * food.r;
    food.y = 150;
    food.color = 200;
    return food;
}

function check_for_collisions_with_food(c1) {
    //check for collision with food
    for (var k = 0; k < foods.length; k++) {
       check_collision(c1,foods[k]);
    } //end of loop on food - k
} //end of function

function draw_foods() {
  //loop through the food array
  for (var i = 0; i < foods.length; i++) {
    //draw the food
    c.fillStyle = 'hsl(' + foods[i].color++ + ', 100%, 50%)';
    c.beginPath();
    c.arc(foods[i].x, foods[i].y, foods[i].r, 0, Math.PI * 2, true);
    c.fill();
  } //end of loopon foods
} //end of function

function check_collision(c1,c2) {
    "use strict";

    //foods is c2
    c1.food_sensor[0] = 0;
    var dist = Math.hypot(c1.x-c2.x , c1.y - c2.y);
    if (dist < c1.r) {
         c1.reward+= 10
         c1.food_sensor[0] = 1;
    } //end of if on dist

    //check for antenna collision with food
    c1.antenna_sensor = [];
    var antenna = {};
    var hit = 0;
    for (var k = 0 ; k < c1.antennae.length; k++) {
        
        antenna = c1.antennae[k];
        var dist = Math.hypot(antenna.xpos-c2.x , antenna.ypos - c2.y);
        if (dist < c1.r) {
             c1.reward+= 2 
             hit = 1;
        } //end of if on dist
        c1.antenna_sensor.push(hit);
    } //end of loop

} //end of check_collision


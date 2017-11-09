
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
       if (check_collision(c1,foods[k])) {
           //console.log("food collision state: ",c1.state);
       }

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

    c1.food_sensor[0] = 0;
    var dist = Math.hypot(c1.x-c2.x , c1.y - c2.y);

    if (dist < c1.r) {
         c1.reward+= 10
         c1.food_sensor[0] = 1;
    } //end of if on dist
} //end of check_collision


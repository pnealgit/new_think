//create the array of circles that will be animated

function make_circles() {
    var i = 0;
    circles = [];
    for (i = 0; i < number_of_circles; i++) {
        circles.push(new Circle(i));
    }
    //console.log("circles",circles);
}

function Circle(i) {
    var circle = {};
    circle.sprite_type = 'c';
    circle.id = i;
    circle.r = 10;
    circle.x = randomIntFromInterval(20,100);  
    circle.y = randomIntFromInterval(20,height-20);  
    circle.vx = randomIntFromInterval(-2,3);  
    circle.vy = randomIntFromInterval(-2,3);  
    circle.color = randomIntFromInterval(4,360);  
    circle.reward = 0;
    circle.genome = make_dna_string();
    circle.gates = make_gates(circle.genome);
    circle.gate_state = make_state(circle.gates);
    circle.angle = Math.atan2(circle.vy,circle.vx); //radians
    circle.sensor_xpos = circle.x + (sensor_length+circle.r) * Math.cos(circle.angle);
    circle.sensor_ypos = circle.x + (sensor_length+circle.r) * Math.cos(circle.angle);
    circle.bpos_sensor = [];
    circle.food_sensor = [];
    circle.wall_sensors = [];
    circle.inputs = [];
    circle.outputs = [];
    return circle;
}

function check_for_wall(c1) {
   "use strict;" 

    c1.wall_hits = [0,0,0,0];
    // left wall
    var did = false;
    if (c1.x - c1.r + c1.vx < container.x ) {
      //c1.vx = -1.0 * c1.vx;
      c1.x = container.width - (c1.r+1);
      c1.wall_sensors[0] = 1;
      did = true;
    } 

    // right wall
    if ( c1.x + c1.r + c1.vx > container.x + container.width) {
      //c1.vx = -1.0 * c1.vx;
      c1.x = c1.r+1;
      c1.wall_sensors[1] = 1;
      did = true;
    }

    //bounce of horizontal walls
    //bottom wall
    if (c1.y + c1.r + c1.vy > container.y + container.height) {
      //c1.vy = -1.0 * c1.vy;
      c1.y = c1.r+1;
      c1.wall_sensors[2] = 1;
      did = true;
    }

    //top wall
    if (c1.y - c1.r + c1.vy < container.y) {
      //c1.vy = -1.0 * c1.vy;
      c1.y = container.height - (c1.r+1);
      c1.wall_sensors[3] = 1;
      did = true;
    } //end of if
    return did;

} //end of function

function make_dna_string() {
    var dna_string = [];
    for (var i = 0; i < dna_string_length; i++) {
        dna_string.push(randomIntFromInterval(4,9));  
    }
    return dna_string;
}    
     
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}  

function draw_circle(c1) {
    //draw the circles
    c.fillStyle = 'hsl(' + c1.color + ', 100%, 50%)';
    c.beginPath();
    c.arc(c1.x, c1.y, c1.r, 0, Math.PI * 2, true);
    c.fill();

    var sensor_distance = c1.r + sensor_length;

    var angle = Math.atan2(c1.vy,c1.vx); //radians
    c1.sensor_ypos = c1.y + sensor_distance * Math.sin(angle);
    c1.sensor_xpos = c1.x + sensor_distance * Math.cos(angle);
    c.beginPath();
    c.strokeStyle = 'red';
    c.moveTo(c1.x,c1.y);
    c.lineTo(c1.sensor_xpos,c1.sensor_ypos);
    c.stroke();
    c.closePath();


} //end of function


function get_velocities(c1) {
    "use strict";
    var sum = 0;
    
    var x_info = c1.outputs.slice(0,3);
    var y_info = c1.outputs.slice(3);
    var sign_x = x_info.shift();
       
    var sdx =  '' + x_info.join('');
    var sign_y = y_info.shift();
    var sdy =  '' + y_info.join('');

    var d_vx = parseInt(sdx,2);
    var d_vy = parseInt(sdy,2);

    if (sign_x < 1 ) {
        d_vx = -d_vx;
    }
    if (sign_y < 1 ) {
        d_vy = -d_vy;
    }
  
 
    c1.vx = d_vx;
    c1.vy = d_vy;
    for (var z = 0; z < c1.outputs.length; z++) {
        c1.outputs[z] = 0;
    }
}

function put_xy_in_state(c1) {
    "use strict";
    c1.bpos = [];
    var xpos = c1.x;
    var ypos = c1.y;

    var bxpos = xpos.toString(2);
    var bypos = ypos.toString(2);
    var pbxpos = '';
    var pbypos = '';
    pbxpos = bxpos.padStart(9,'0');
    pbypos = bypos.padStart(9,'0');

    console.log("c1.x: ",c1.x," bxpos",bxpos,pbxpos);
    console.log("c1.y: ",c1.y," bypos",bypos,pbypos);

    var abxpos = [];
    abxpos = pbxpos.split('');
    var abypos = [];
    abypos = pbypos.split('');
console.log("abyxpos",abxpos);
    for (var k = 0; k < abxpos.length; k++) {
        c1.bpos.push(+abxpos[k]);
    }

    for (var k = 0; k < abypos.length; k++) {
        c1.bpos.push(+abypos[k]);
    }

    console.log("bpos: ",c1.bpos);

}


function glue_together_inputs(c1) {
   c1.inputs.concat(c1.bpos_sensor,
        c1.wall_sensors,c1.food_sensor);
}

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
    circle.number_gate_inputs = 0;
    circle.number_gate_outputs = 0;
    circle.angle = Math.atan2(circle.vy,circle.vx); //radians
    circle.sensor_xpos = circle.x + (sensor_length+circle.r) * Math.cos(circle.angle);
    circle.sensor_ypos = circle.x + (sensor_length+circle.r) * Math.cos(circle.angle);
    circle.bpos_sensor = [];
    circle.food_sensor = [];
    circle.wall_sensors = [];
    circle.sensor_data = [];
    circle.outputs = [];
    return circle;
}

function make_dna_string() {
    var dna_string = [];
    for (var i = 0; i < dna_string_length; i++) {
        dna_string.push(randomIntFromInterval(0,10000));  
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

function put_xy_in_state(c1) {
    "use strict";
    c1.bpos_sensor = [];

    var bxpos = c1.x.toString(2);
    var bypos = c1.y.toString(2);
    var pbxpos = '';
    var pbypos = '';
    pbxpos = bxpos.padStart(9,'0');
    pbypos = bypos.padStart(9,'0');


    var abxpos = [];
    abxpos = pbxpos.split('');
    var abypos = [];
    abypos = pbypos.split('');
    for (var k = 0; k < abxpos.length; k++) {
        c1.bpos_sensor.push(+abxpos[k]);
    }

    for (var k = 0; k < abypos.length; k++) {
        c1.bpos_sensor.push(+abypos[k]);
    }
}


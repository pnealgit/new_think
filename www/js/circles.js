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
    circle.genome = new Genome();
    circle.gates = make_gates(circle.genome);
    circle.state = make_state(); //for now state size is fixed
    circle.antennae = [];
    circle.bpos_sensor = [];
    circle.food_sensor = [];
    circle.antenna_sensor = [];
    circle.sensor_data = [];
    circle.outputs = [];
    circle.map_xpos = 0;
    circle.map_ypos = 0;
    return circle;
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}  

function draw_circle(c1) {
    "use strict";
    //draw the circles
    c.fillStyle = 'hsl(' + c1.color + ', 100%, 50%)';
    c.beginPath();
    c.arc(c1.x, c1.y, c1.r, 0, Math.PI * 2, true);
    c.fill();

    var a = {};
    for (var k = 0; k < c1.antennae.length; k++) {
        var color = "yellow";
        if (k == 1) {
           color = "red";
        }
        a = c1.antennae[k];
 
        c.beginPath();
        
        c.strokeStyle = color;
        c.moveTo(c1.x,c1.y);
       // c.lineTo(c1.antennae[k].xpos,c1.antennae[k].ypos);
        c.lineTo(a.xpos,a.ypos);
        c.stroke();
        c.closePath();
    }
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
function make_state() {
     var my_state = [];
     for (var k = 0; k < size_of_state; k++) {
         my_state.push(Math.round(Math.random()));
     }
     return my_state;
}

function put_map_xy_in_state(c1) {
    "use strict";
    c1.bpos_sensor = [];
    for (var k = 0;k < c1.map_xpos.length; k++) {
        c1.bpos_sensor.push(c1.map_xpos[k]);
    } 

    for (var k = 0;k < c1.map_ypos.length; k++) {
        c1.bpos_sensor.push(c1.map_ypos[k]);
    } 
} //end of function



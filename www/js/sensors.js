function make_antennae(c1) {
   "use strict";
   var antennae = [];
   var ninety = Math.PI/2.0;
   var angle = Math.atan2(c1.vy,c1.vx); //radians
   var angle_min_ninety = angle - ninety;
   var angle_plus_ninety = angle + ninety;
 
   //console.log("angle_min: ",angle_min_ninety);
   //console.log("angle_plus: ",angle_plus_ninety);
 
   //console.log("al,r,angle: ",antenna_length,c1.r,angle);

   var c = Math.cos(angle); 
   //console.log("c1.x,c1.y,Cosine ",c1.x,c1.y,c);


   antenna = {}; 
   antenna.xpos = c1.x + (antenna_length+c1.r) * Math.cos(angle_min_ninety);
   antenna.ypos = c1.y + (antenna_length+c1.r) * Math.sin(angle_min_ninety);
   antennae.push(antenna);
    
   var antenna = {};
   antenna.xpos = c1.x + (antenna_length+c1.r) * Math.cos(angle);
   antenna.ypos = c1.y + (antenna_length+c1.r) * Math.sin(angle);
   antennae.push(antenna);

   antenna = {}; 
   antenna.xpos = c1.x + (antenna_length+c1.r) * Math.cos(angle_plus_ninety);
   antenna.ypos = c1.y + (antenna_length+c1.r) * Math.sin(angle_plus_ninety);
   antennae.push(antenna);

   c1.antennae = antennae;
} //end of make_antennae


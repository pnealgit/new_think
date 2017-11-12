function think(c1) {
    "use strict";

    glue_together_inputs(c1);
    
    var gate = {}
    var result = 0;
    for (var g = 0; g < c1.gates.length; g++) {
       gate = c1.gates[g];
       if (gate.type == 1) {
          result = xor_gate(gate,c1.state);
       }
       if (gate.type == 2) {
          result = or_gate(gate,c1.state);
       }
       var o_index = 0;
       for (var k = 0; k < gate.gate_outputs.length; k++) {
           o_index = gate.gate_outputs[k];
           c1.state[o_index] = result;
       };

    } //end of loop on gates

}
function xor_gate(g1,state) {
    "use strict";

    var sum = 0;
    var val = 0;
    for (var k = 0; k < g1.gate_inputs.length; k++) {
       sum += state[g1.gate_inputs[k]];
    }
    if (sum == 1) {
       val = 1;
    }
    return val;
}

function or_gate(g1,state) {
    "use strict";

    var sum = 0;
    var val = 0;
    for (var k = 0; k < g1.gate_inputs.length; k++) {
       sum += state[g1.gate_inputs[k]];
    }
    if (sum > 0) {
       val = 1;
    }
    return val;
}


function glue_together_inputs(c1) {
   var temp = [];
   temp = c1.bpos_sensor.concat(c1.wall_sensors,c1.food_sensor,c1.antenna_sensor);
   c1.sensor_data = temp;
   for (var k = 0; k < c1.sensor_data.length; k++) {
       c1.state[k] = c1.sensor_data[k];
   }
}


function think(c1) {
    "use strict";

    glue_together_inputs(c1);

    var all_inputs = [];
    var all_outputs = [];

    all_inputs = c1.sensor_data.concat(c1.gate_state);

    c1.outputs = [];
    for (var k = 0; k < number_outputs; k++) {
        c1.outputs.push(0);
    }
    all_outputs = c1.gate_state.concat(c1.outputs);

    var gate = {}
    var result = [];
    for (var g = 0; g < c1.gates.length; g++) {
       gate = c1.gates[g];
       if (gate.type == 1) {
          result = xor_gate(gate,all_inputs);
       }
       if (gate.type == 2) {
          result = or_gate(gate,all_inputs);
       }
       var o_index = 0;
       var o_shift = all_outputs.length;
       for (var o = 0; o < gate.gate_outputs.length; o++) {
           o_index = gate.gate_outputs[o] % all_outputs.length;
           all_outputs[o_index] = result[o];
       };

    } //end of loop on gates
  var gsl = c1.gate_state.length;
  c1.gate_state = all_outputs.slice(0,gsl);

  c1.outputs = all_outputs.slice(gsl);
}
function xor_gate(g1,all_inputs) {
    "use strict";

    var sum = 0;
    var val = 0;
    var result = [];
    var in_spot ;
    for (var k = 0; k < g1.gate_inputs.length; k++) {
       in_spot = g1.gate_inputs[k] % all_inputs.length;
       sum += all_inputs[in_spot];
    }
    if (sum == 1) {
       val = 1;
    }
    for (var j = 0; j < g1.gate_outputs.length; j++) {
       result.push(val);
    }
    return result;
}

function or_gate(g1,all_inputs) {
    "use strict";

    var sum = 0;
    var val = 0;
    var result = [];
    var in_spot ;
    for (var k = 0; k < g1.gate_inputs.length; k++) {
       in_spot = g1.gate_inputs[k] % all_inputs.length;
       sum += all_inputs[in_spot];
    }
    if (sum > 0) {
       val = 1;
    }
    for (var j = 0; j < g1.gate_outputs.length; j++) {
       result.push(val);
    }
    return result;
}


function glue_together_inputs(c1) {
   var temp = [];
   temp = c1.bpos_sensor.concat(c1.wall_sensors,c1.food_sensor);
   c1.sensor_data = temp;
}




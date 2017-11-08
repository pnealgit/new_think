function think(c1) {
    "use strict";
    var state_length = c1.state.length;
    var number_of_gates = c1.gates.length; 

    var gate = {}
    var result = [];
    for (var g = 0; g < number_of_gates; g++) {
       gate = c1.gates[g];
       if (gate.type == 1) {
          result = xor_gate(gate,c1.state);
       }
       if (gate.type == 2) {
          result = xor_gate(gate,c1.state);
       }
       var o_index = 0;
       var o_shift = state_length - sensor_input_length;

       for (var o = 0; o < gate.outputs.length; o++) {
           o_index = sensor_input_length + gate.outputs[o] % o_shift;
           c1.state[o_index] = result[o];
       };

    } //end of loop on gates
}
function xor_gate(g1,state) {
    "use strict";

    var sum = 0;
    var val = 0;
    var result = [];
    for (var k = 0; k < g1.inputs.length; k++) {
       sum += state[g1.inputs[k]];
    }
    if (sum == 1) {
       val = 1;
    }
    for (var j = 0; j < g1.outputs.length; j++) {
       result.push(val);
    }
    return result;
}

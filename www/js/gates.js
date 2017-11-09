var max_number_gates = 50;
var min_number_gates = 10;
var max_number_gate_types = 2;
var min_number_inputs = 2;
var max_number_inputs = 4;
var min_number_outputs = 1;
var max_number_outputs = 4;

var working_genome = [];

function make_gates(genome) {
  "use strict";
  //gotta do a deeper copy
  working_genome = genome.slice();

  var gates = [];
  var number_of_gates = min_number_gates + (working_genome.shift() % max_number_gates);

  for (var i = 0;i < number_of_gates; i++) {
    gates.push(new Gate());
  }

  return gates;
}  //end of make_gates


function Gate() {
    "use strict";
    var gate = {};
    var temp;
    var type;
    temp = working_genome.shift();
    type = 1 + (temp % max_number_gate_types);

    if (type == 1) {
       //for now , all is xor
       gate = make_xor_gate();
    }
    if (type == 2) {
       //for now , all is xor
       gate = make_or_gate();
    }
    return gate;
}

function make_or_gate() {
    "use strict";

    var or_gate = {};
    or_gate.type = 2;
    var temp = working_genome.shift();
    var number_inputs = min_number_inputs + (temp % max_number_inputs);
    //var number_inputs = 2; //hardwire for now
    or_gate.gate_inputs = make_gate_inputs(number_inputs);

    temp = working_genome.shift();
    var number_node_outputs = min_number_outputs + (temp % max_number_outputs);
    or_gate.gate_outputs = make_gate_outputs(number_node_outputs);
    return or_gate;
}

function make_xor_gate() {
    "use strict";

    var xor_gate = {};
    xor_gate.type = 1;
    var temp = working_genome.shift();
    var number_inputs = min_number_inputs + (temp % max_number_inputs);
    //var number_inputs = 2; //hardwire for now
    xor_gate.gate_inputs = make_gate_inputs(number_inputs);

    temp = working_genome.shift();
    var number_node_outputs = min_number_outputs + (temp % max_number_outputs);
    xor_gate.gate_outputs = make_gate_outputs(number_node_outputs);
    return xor_gate;
}

function make_gate_inputs(number_inputs) {
    var gate_inputs = [];
    for (var k = 0; k < number_inputs; k++) {
           gate_inputs.push(working_genome.shift());
    }
    return gate_inputs;
}

function make_gate_outputs(number_node_outputs) {
    var gate_outputs = [];
    for (var k = 0; k < number_node_outputs; k++) {
           gate_outputs.push(working_genome.shift());
    }
    return gate_outputs;
}

function make_state(gates) {
    "use strict";

    var gate_state = [];
    for (var g = 0; g < gates.length; g++) {
       for (var k = 0 ;k <gates[g].gate_outputs.length; k++) {
           gate_state.push(Math.round(1 - Math.random()));
       }
    }
    return gate_state; 
}


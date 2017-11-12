function draw_graph(c1) {

g = {
    nodes: [],
    edges: []
  }

var s,
    gnull = {
      nodes: [],
      edges: []
    }
;

//NOW LET'S GET BUSY
// DESIGN IS: 
/* inputs
   center
   outputs
*/

//gotta make nodes before edges

make_inputs(c1);

make_center(c1);

make_outputs(c1);

//EDGES

var source;
var target;
var raw;
make_edges_inputs_center(c1);

s = new sigma({
  graph: gnull,
  renderers: [
  {
  container: document.getElementById('graph-container'),
  type: 'canvas'
  }
  ]
});

var gr;
var p;
var cc;
if(s.graph ) {
    s.graph.clear();
    gr = document.querySelector('#graph-container');
    p  = gr.parentNode;
    p.removeChild(gr);
    cc = document.createElement('div');
    cc.setAttribute('id','graph-container');
    p.appendChild(cc);
}

// Instantiate sigma:
s = new sigma({
  graph: g,
  container: 'graph-container',
  renderers: [
  {
  container: document.getElementById('graph-container'),
  type: 'canvas'
  }
  ]
});
s.refresh();
} //end of function;

function make_inputs(c1) {
  //MAKE STATE_t0
  //SENSORS
  var my_node = {};
  var name = "i";

  for (var k = 0; k < c1.sensor_data.length; k++) {
      my_node = new Node(k,name);
      g.nodes.push(my_node);
  } //end of loop on sensor_data
} //end of make_inputs

function make_center(c1) {

  var name = "c";
  var my_node = {}; 

  for (var k = 0; k < c1.state.length; k++) {
      my_node = new Node(k,name);
      g.nodes.push(my_node);
  } //end of loop on sensor data
} //end of make_center

function make_outputs(c1) {

    var name = "o";
    var my_node = {};
    for (var k = 0; k < number_outputs; k++) {
      my_node = new Node(k,name);
      g.nodes.push(my_node);
    } //end of loop on outputs
} //end of make_outputs

function Node(i,name) {
   var increment = .2;
   var my_node = {};
   my_node.id = name + i;
   my_node.x = increment * i;

   if(name == "i") {
     my_node.color = "#f00";
     my_node.size = .1;
     my_node.y = .3;
   }

   if(name == "c") {
     my_node.color = "#0f0";
     my_node.y = .6;
     my_node.size = .05
   }

   if(name == "o") {
     my_node.color = "#00f";
     my_node.y = .9;
     my_node.size = .1;
   }

   return my_node;
}

function make_edges_inputs_center(c1) {
    var name = "eic";
    var source = '';
    var my_edge = {};
    var my_id = '';
    var s = 0;
    for (var k = 0; k < c1.gates.length; k++) { 
    for (var j = 0; j < c1.gates[k].gate_inputs.length; j++) { 
        source = 'i' + c1.gates[k].gate_inputs[j];
        for (var i = 0; i < c1.gates[k].gate_outputs.length; i++) { 
            target = 'c' + c1.gates[k].gate_outputs[i];
        }
        my_id = 'eic-'+source+'-'+target;
        console.log("EDGE input to state: ",my_id);
        g.edges.push({
        id: my_id,
        source: source,
        target: target,
        size: .1,
        color: '#f00'
        });
    } //end of loop on gate_inputs
  } //end of loop on gates

} //end of make_edges_input_center



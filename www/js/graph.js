function draw_graph(c1) {
//todo --- on refresh get rid of old graph --
//probably via the old canvas refresh trick
/**
 * This is a basic example on how to instantiate sigma. A random graph is
 * generated and stored in the "graph" variable, and then sigma is instantiated
 * directly with the graph.
 *
 * The simple instance of sigma is enough to make it render the graph on the on
 * the screen, since the graph is given directly to the constructor.
 */
var i,
    s,
    N = 20,
    NG = 5;
    E = 50,
    g = {
      nodes: [],
      edges: []
    }
    gnull = {
      nodes: [],
      edges: []
    }
;

//NOW LET'S GET BUSY
/* state_t0
   gates
   state_t1
*/

var my_id = '';
var increment = 10;
var graph_knt = 0;
//MAKE STATE_t0
//SENSORS
for (var k = 0; k < c1.sensor_data.length; k++) {
  my_id = 'gs0-' + graph_knt;
  console.log("SENSORS: ",my_id);

  g.nodes.push({
    id: my_id,
    label: my_id,
    x: k * increment,
    y: .2,
    size: .1,
    color: '000' 
});
graph_knt++;
}
 
//GATES AT  STATE_t0

var my_stop = c1.sensor_data.length + c1.gates.length;

for (var k = c1.sensor_data.length; k < my_stop; k++) {
  my_id = 'gs0-' + k;
  console.log("GATES AT S0 : ",my_id);

  g.nodes.push({
    id: my_id,
    label: my_id,
    x: k * increment,
    y: .3,
    size: .1,
    color: '#f00'
  });
  graph_knt++;
} //end of loop on gates


//MAKE CENTER WHICH ARE THE SAME GATES AS THE GATES AS S0

var xx;
for (var k = 0; k < c1.gates.length; k++) {
  xx = c1.sensor_data.length + k; 
  my_id = 'gc-' + xx;
  console.log("GATES AT CENTER : ",my_id);
  g.nodes.push({
    id: my_id,
    label: my_id,
    x: k * increment,
    y: .6,
    size: .1,
    color: '#f00'
  });
}

//STATE_t1
//GATES PLUS OUTPUTS

var zz ;
for (var k = 0; k < c1.gates.length; k++) {
  zz = c1.sensor_data.length + k;
  my_id = 'gs1-' + zz;
  console.log("GATES AT S1 : ",my_id);
  g.nodes.push({
    id: my_id,
    label: my_id,
    x: k * increment,
    y: .9,
    size: .1,
    color: '#f00'
  });
}
//S1 OUTPUT NODES

console.log("GATES LENGTH: ",c1.gates.length);
var start = c1.sensor_data.length + c1.gates.length;
stop = start + c1.outputs.length;

for (var k = start; k < stop; k++) {
  my_id = 'gs1-'+k;
  console.log("OUTPUTS AT S1: ",my_id);
  g.nodes.push({
    id: my_id,
    label: my_id,
    x: k * increment,
    y: .9,
    size: .1,
    color: '00f' 
});
} //end of loop on outputs

//EDGES

var ee = 0;
var source;
var target;
var raw;

//EDGES FROM STATE 0  TO GATES

for (var k = 0; k < c1.gates.length; k++) {
  for (var j = 0; j < c1.gates[k].gate_inputs.length; j++) {
  source = 'gs0-'+c1.gates[k].gate_inputs[j];
  target = 'gc-'+k;
  my_id = 'e0c-'+source+'-'+target;
  console.log("EDGE S0 to CENTER GATES: ",my_id);
  g.edges.push({
    id: my_id,
    label: my_id,
    source: source,
    target: target,
    size: .1,
    color: '#f00'
  });
  } //end of loop on gate_inputs
} //end of loop on gates

//EDGES FROM CENTER GATES TO STATE 1
for (var k = 0; k < c1.gates.length; k++) {
  for (var j = 0; j < c1.gates[k].gate_outputs.length; j++) {
  source = 'gc-'+c1.gates[k]; 
  target = 'gs1-'+c1.gates[k].gate_outputs[j];
  my_id = 'ec1-'+source+'-'+target;

  g.edges.push({
    id: my_id,
    label: my_id,
    source: source,
    target: target,
    size: .1,
    color: '#f00'
  });
  ee++;
  } //end of loop on gate_outputs
} //end of loop on gates


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


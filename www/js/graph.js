function draw_graph() {
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

// Generate a random graph:

var increment = 1.0/N;
//INPUTS
for (i = 0; i < N; i++)
  g.nodes.push({
    id: 'I' + i,
    label: 'I-' + i,
    x: i * increment,
    y: .3,
    size: .1,
    color: '#f00'
  });

//OUTPUTS
for (i = 0; i < N; i++)
  g.nodes.push({
    id: 'O' + i,
    label: 'O-' + i,
    x: i * increment,
    y: .9,
    size: .1,
    color: '#00f'
  });

//GATES
for (i = 0; i < NG; i++)
  g.nodes.push({
    id: 'G' + i,
    label: 'G-' + i,
    x: .4 + ( i * increment),
    y: .6,
    size: .1,
    color: '#0f0'
  });

//EDGES input to gate
for (i = 0; i < E; i++)
  g.edges.push({
    id: 'eig' + i,
    source: 'I' + (Math.random() * N | 0),
    target: 'G' + (Math.random() * NG | 0),
    size: .1,
    color: '#FF0'
  });

//EDGES gate to output
for (i = 0; i < E; i++)
  g.edges.push({
    id: 'ego' + i,
    target: 'G' + (Math.random() * NG | 0),
    source: 'O' + (Math.random() * N | 0),
    size: .1,
    color: '#0FF'
  });

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
    console.log("GRAPH EXISTS");
    s.graph.clear();
    //s.graph.kill();
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


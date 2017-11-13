function Genome() {
    "use strict";
    var genome_length = 5000;
    var genome = [];
    
    for (var i = 0; i < genome_length; i++) {
        genome.push(randomIntFromInterval(0,10000));
    }
    return genome;
}   

function evolve() {

    var crossover_rate = .2;
    circles.sort(function(a, b) {
    return b.reward - a.reward;
    });

   console.log("BEST CIRCLE: ",circles[0]);
   var avg_reward = 0;
   var max_reward = -9999;
   for (var i = 0; i < circles.length; i++) {
       avg_reward += circles[i].reward;
       if (circles[i].reward > max_reward) {
            max_reward = circles[i].reward;
       }
   }
   avg_reward = Math.round(avg_reward/circles.length);
   console.log("ANIM KNT : ",animation_count, " AVG REW: ",avg_reward, "MAX REW: ",circles[0].reward);


   var worst_count = Math.round(.2 * circles.length);
   var worst_index = circles.length - worst_count;
   var mutate_yn = 0;
   var elite_knt = Math.round(worst_count/2);

   // replace worst with best
   for (var j = worst_index; j < circles.length; j++) {
        circles[j] = JSON.parse(JSON.stringify(circles[0]));
        if(Math.random() < .5) {
            circles[j] = new Circle(j);
        }
   } //end of loop on j

    //keep top 2 from mutation risk
    for (var j = 2; j < circles.length; j++) {
       //mutate a few of these suckers.
         mutate_dna_string(circles[j]);
         make_gates(circles[j].genome); 
         if (Math.random() < crossover_rate) {
             crossover_genome(circles[j]);
             make_gates(circles[j].genome); 
         }
   } //end of loop on j

   //clear for next round
   for (var i = 0; i < circles.length; i++) {
    circles[i].x = randomIntFromInterval(20,100);
    circles[i].y = randomIntFromInterval(20,height-20);
    circles[i].vx = randomIntFromInterval(-2,3);
    circles[i].vy = randomIntFromInterval(-2,3);
    circles[i].reward = 0;
   }

} //end of function

function mutate_dna_string(c1) {
   var mutation_rate = .2;
   var spot = 0;
   var number_mutations = mutation_rate * c1.genome.length;
   for (var m = 0; m < number_mutations; m++) {
       spot = randomIntFromInterval(1,c1.genome.length);
       c1.genome[spot] = randomIntFromInterval(1,10000);
   }
} //end of mutate

function crossover_genome(c1) {
    var other_index = randomIntFromInterval(0,circles.length);
    var half = Math.round(circles.length/4);
    other_index = randomIntFromInterval(0,half);
    var c2 = circles[other_index];

    var section_length = randomIntFromInterval(100,1000);
    var start = randomIntFromInterval(0,(c1.genome.length - (section_length+1)));
    var stop = start + section_length;
    if (stop > c1.genome.length ) {
        stop = c1.genome.length-5;
    }
    for (var k = start; k < stop; k++) {
       c1.genome[k]  = c2.genome[k];
    }
} //end of crossover
 


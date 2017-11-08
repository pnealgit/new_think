function evolve() {

    circles.sort(function(a, b) {
    return b.reward - a.reward;
    });

   console.log(animation_count.toString(2));
   console.log("BEST CIRCLE: ",circles[0]);

   var avg_reward = 0;
   var max_reward = -9999;
   for (var i = 0; i < circles.length; i++) {
       avg_reward += circles[i].reward;
       if (circles[i].reward > max_reward) {
            max_reward = circles[i].reward;
       }
   }
   avg_reward = avg_reward/circles.length;
   console.log("ANIM KNT : ",animation_count, " AVG REW: ",avg_reward, "MAX REW: ",max_reward);



   var worst_count = Math.round(.2 * circles.length);
   var worst_index = circles.length - worst_count;
   var new_knt = 0;
   for (var j = worst_index; j < circles.length; j++) {
     if (new_knt < 2) {
        circles[j] = JSON.parse(JSON.stringify(circles[new_knt]));
     } else {
        circles[j] = new Circle(j);
     }
     new_knt++;
   } //end of loop on j


   //clear for next round
   for (var i = 0; i < circles.length; i++) {
    circles[i].x = randomIntFromInterval(20,100);
    circles[i].y = randomIntFromInterval(20,height-20);
    circles[i].vx = randomIntFromInterval(-2,3);
    circles[i].vy = randomIntFromInterval(-2,3);
    circles[i].reward = 0;
   }

   draw_graph();

} //end of function




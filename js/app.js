d3.csv("dataset.csv", function (rawData) {
  var data = { children: rawData }; // Follow the standard for pack layout.
  var pack = d3.layout.pack();
  pack = pack.padding(2)
             .size([1024, 768])
             .sort(function (a, b) {
               return b.value - a.value;
	     }); // set the layout
  var nodes = pack.nodes(data); // transform the data to fit in the layout
  nodes = nodes.filter(function(it) { return it.parent; }); // remove the parent (outside circle)
  var color = d3.scale.category20(); // helper function to pick color
 
  d3.select("svg")
    .selectAll("circle") // select existing circles, or create a placeholder
    .data(nodes) // parse the data
    .enter() // bind the data
    .append("circle") // create circle if placeholder exists
    .attr({
      cx: function (d) { return d.x; },
      cy: function (d) { return d.y; },
      r: function (d) { return d.r; },
      fill: function (d) { return color(d.schoolName); },
      stroke: "#444"
    }).append("svg:title").text(function (d) {
      return d.schoolName + '\n$' +
             Number(d.value.toFixed(1)).toLocaleString(); // format the number to currency
    }); // using title attribute to simulate tooltip

  // notice since dash could not be within the simple object key, we use single quotes to warp
  d3.select("svg")
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .attr({
      x: function (d) { return d.x }, // here we set the text in the center of the circle
      y: function (d) { return d.y },
      "text-anchor": "middle",
      "font-size": "8pt"
    }).text(function (d) {
      if (d.value > 600000000) {
        return d.schoolName;
      } else {
        return "";
      }
    }); // only show school name if the grant is larger than.
});

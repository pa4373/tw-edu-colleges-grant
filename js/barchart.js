var data = [5, 10 , 15, 20, 25];
var color = d3.scale.category20(); // helper function to pick color

var barUnit = 10;
var barHeight = 15;

d3.select('svg')
  .selectAll('rect') // select existing rect, or create a placeholder
  .data(data) // parse the data
  .enter() // bind the data
  .append('rect') // create rect if placeholder exists
  .attr({
    x: 0,
    y: function (d, i) { return i * (barHeight + 3); },
    width: function (d) { return d * barUnit; },
    height: barHeight,
    fill: function (d) { return color(d) }
  });

// notice since dash could not be within the simple object key, we use single quotes to warp
d3.select('svg')
  .selectAll('text')
  .data(data)
  .enter()
  .append('text')
  .attr({
    x: 2,
    y: function (d, i) { return i * (barHeight + 3) + 10; },
    fill: '#111',
    'font-size': '8pt'
  })
  .text(function (d) { return d; });

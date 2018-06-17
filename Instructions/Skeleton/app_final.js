var svgWidth = 500;
var svgHeight = 1000;

var margin = {
  top: 50,
  right: 50,
  bottom: 100,
  left: 100
};

var chartwidth = svgWidth - margin.left - margin.right;
var chartheight = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#svg-area")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("data.csv", function(error, censusdata) {
  if (error) throw error;
console.log('d3.csv cenusdata:', censusdata);
var obesity = censusdata.map(data => data.obesity);
console.log("obesity", obesity);
var poverty = censusdata.map(data => data.poverty);
// console.log("poverty", poverty);
  // Step 1: Parse Data/Cast as numbers
   // ==============================
  censusdata.forEach(function(data) {
    data.obesity = +data.obesity;
    data.poverty = +data.poverty;


  // Step 2: Create scale functions
  // ==============================
  var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(censusdata, data => data.obesity)])
    .range([0, chartwidth]);

  var yLinearScale = d3.scaleLinear()
    .domain([0,d3.max(censusdata, data => data.obesity)]).range([chartheight, 0]);
  // Step 3: Create axis functions
  // ==============================
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 4: Append Axes to the chart
  // ==============================
  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartheight})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

   // Step 5: Create Circles
  // ==============================
  var circlesGroup = chartGroup.selectAll("circle")
  .data(censusdata)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.obesity))
  .attr("cy", d => yLinearScale(d.poverty))
  .attr("r", "15")
  .attr("fill", "red")
  .attr("opacity", ".5");

  // Step 6: Initialize tool tip
  // ==============================
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.abbr}<br>Obesity: ${d.obesity}<br>Poverty: ${d.poverty}`);
    });

  // Step 7: Create tooltip in the chart
  // ==============================
  chartGroup.call(toolTip);

  // Step 8: Create event listeners to display and hide the tooltip
  // ==============================
  circlesGroup.on("click", function(censusdata) {
    toolTip.show(censusdata);
  })
    // onmouseout event
    .on("mouseout", function(censusdata, index) {
      toolTip.hide(censusdata);
    });

  // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (chartheight / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Obesity by State (%)");

  chartGroup.append("text")
    .attr("transform", `translate(${chartwidth / 2}, ${chartheight + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Poverty by State (%)");
  });


});


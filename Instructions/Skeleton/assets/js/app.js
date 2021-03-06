var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

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
console.log('d3.csv cenusdata:', censusdata)
var obesity = censusdata.map(data => data.obesity);
console.log("obesity", obesity);
var poverty = censusdata.map(data => data.poverty);
// // console.log("poverty", poverty);
//   // Step 1: Parse Data/Cast as numbers
//    // ==============================
//   censusdata.forEach(function(data) {
//     data.obesity = +data.obesity;
//     data.poverty = +data.poverty;
//   });


//   // Step 2: Create scale functions
//   // ==============================
//   var xLinearScale = d3.scaleLinear()
//     .domain([20, d3.max(censusdata, d => d.obesity)])
//     .range([0, width]);

//   var yLinearScale = d3.scaleLinear()
//     .domain([0, d3.max(censusdata, d => d.poverty)])
//     .range([height, 0]);

//   // Step 3: Create axis functions
//   // ==============================
//   var bottomAxis = d3.axisBottom(xLinearScale);
//   var leftAxis = d3.axisLeft(yLinearScale);

//   // Step 4: Append Axes to the chart
//   // ==============================
//   chartGroup.append("g")
//     .attr("transform", `translate(0, ${height})`)
//     .call(bottomAxis);

//   chartGroup.append("g")
//     .call(leftAxis);

//    // Step 5: Create Circles
//   // ==============================
//   var circlesGroup = chartGroup.selectAll("circle")
//   .data(censusdata)
//   .enter()
//   .append("circle")
//   .attr("cx", d => xLinearScale(d.obesity))
//   .attr("cy", d => yLinearScale(d.poverty))
//   .attr("r", "15")
//   .attr("fill", "red")
//   .attr("opacity", ".5");

//   // Step 6: Initialize tool tip
//   // ==============================
//   var toolTip = d3.tip()
//     .attr("class", "tooltip")
//     .offset([80, -60])
//     .html(function(d) {
//       return (`${d.abbr}<br>Obesity: ${d.obesity}<br>Poverty: ${d.poverty}`);
//     });

//   // Step 7: Create tooltip in the chart
//   // ==============================
//   chartGroup.call(toolTip);

//   // Step 8: Create event listeners to display and hide the tooltip
//   // ==============================
//   circlesGroup.on("click", function(censusdata) {
//     toolTip.show(censusdata);
//   })
//     // onmouseout event
//     .on("mouseout", function(censusdata, index) {
//       toolTip.hide(censusdata);
//     });

//   // Create axes labels
//   chartGroup.append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 0 - margin.left + 40)
//     .attr("x", 0 - (height / 2))
//     .attr("dy", "1em")
//     .attr("class", "axisText")
//     .text("Obesity by State (%)");

//   chartGroup.append("text")
//     .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
//     .attr("class", "axisText")
//     .text("Poverty by State (%)");
});



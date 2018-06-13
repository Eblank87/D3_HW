// create svg area
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};


// chart area minus margins
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

// create svg container
var svg = d3.select("#svg-area")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

  // shift everything over by the margins
var chartGroup = svg.append("g")
.attr("transform", 
`translate(${margin.left}, 
  ${margin.top})`);


  // Load data from data.csv
d3.csv("../Data/data.csv", function(error, censusData) {
  if (error) return console.warn(error);

  console.log(censusData);

  

 // Step 1: Parse Data/Cast as numbers
   // ==============================
   censusData.forEach(function(data) {
    data.obesity = +data.obesity;
    data.poverty = +data.poverty;
  });

    // Step 2: Create scale functions
  // ==============================
  var xLinearScale = d3.scaleLinear()
    .domain([20, d3.max(censusData, d => d.obesity)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(censusData, d => d.poverty)])
    .range([height, 0]);

      // Step 3: Create axis functions
  // ==============================
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 4: Append Axes to the chart
  // ==============================
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

      // Step 5: Create Circles
  // ==============================
  var circlesGroup = chartGroup.selectAll("circle")
  .data(censusData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.obesity))
  .attr("cy", d => yLinearScale(d.poverty))
  .attr("r", "15")
  .attr("fill", "pink")
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
  circlesGroup.on("click", function(censusData) {
    toolTip.show(censusData);
  })
    // onmouseout event
    .on("mouseout", function(censusData, index) {
      toolTip.hide(censusData);
    });

     // Create axes labels
  chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left + 40)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .attr("class", "axisText")
  .text("Number of Billboard 100 Hits");

  chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
  .attr("class", "axisText")
  .text("Hair Metal Band Hair Length (inches)");
});

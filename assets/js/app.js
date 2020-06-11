// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top : 20,
    right : 40,
    bottom : 60,
    left : 40
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom ;
 // create a SVG wrapper and append SVG group that will hold the chart and shift the margins

 var svg = d3.select("#scatter")
 .append("svg")
 .attr("width" , svgWidth)
 .attr("height" , svgHeight);

 var chartGroup = svg.append("g")
  .attr("transform" , `translate(${margin.left}, ${margin.top})`);

  //Import Data
  d3.csv("assets/data/data.csv")
   .then(function(stateData) {

    //parse data
    stateData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.age = +data.age;
        data.healthcare = +data.healthcare;
        data.smokes = +data.smokes;
        data.abbr = data.abbr;
    });

    // create scale functions 

    var xLinearScale = d3.scaleLinear()
    .domain([8, d3.max(stateData , d => d.poverty)])
    .range([0, width]);

    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(stateData , d => d.healthcare)])
    .range([height , 0]);

    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(stateData, d => d.healthcare)])
    .range([height , 0]);

    //create axis functions

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //append axes to chart 

    chartGroup.append("g")
     .attr("transform" , `translate(0, ${height})`)
     clearInterval(bottomAxis);

     chartGroup.append("g")
      .call(leftAxis);

      //creare circles

      var circlesGroup =  chartGroup.selectAll("circle")
      .data(stateData)
      .enter()
      .append("circle")
      .attr("cx" , d=> xLinearScale(d.poverty))
      .attr("cy" , d => yLinearScale(d.healthcare))
      .attr("r" , "11")
      .attr("fill" , "blue")
      .attr("opacity" , ".5");

      var textGroup = chartGroup.selectAll("text")
      .data(stateData)
      .enter()
      .append("text")
      .style("fill" , "black")
      .attr('x' , d=> xLinearScale(d.poverty))
      .attr('y' , d => yLinearScale(d.healthcare))
      .attr("dy" , ".35em")
      .attr("text-anchor" , "middle")
      .text(d=> d.abbr);
      concole.log(stateData)

      //create axes labels
      chartGroup.append("text")
      .attr("transform" , "rotate(-90)")
      .attr("y" , 0 - 43)
      .attr ("x" , 0 - 275)
      .attr("dy" , "1em")
      .attr("class" , "axisText")
      .text("Lack Healthcare(%");

      chartGroup.append("text")
      .attr("transform" , `translate(${width / 2} , ${height + margin.top +30})`)
      .attr("class" , "axisText")
      .text("Poverty(%");
   });
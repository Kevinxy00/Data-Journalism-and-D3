// D3 Scatterplot Assignment
// Create a scatter plot with D3.js.

// set margins
var margin = {top: 20, right: 20, bottom: 30, left: 40};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

// set x and y scale range
var xScale = d3.scaleLinear().range([0, width]);
var yScale = d3.scaleLinear().range([height, 0]);

var xAxis = d3.axisBottom(xScale);

var yAxis = d3.axisLeft(yScale);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// pull in the data
var csv_data = "Data/data.csv";

d3.csv(csv_data, function(error, data) {
    if (error) throw error;

    data.forEach(function(d){
        // make into a number in case it comes in as string
        d.Divorced_total_2014 = +d.Divorced_total_2014;
        d.Depression_total_2014 = +d.Depression_total_2014;
        console.log(d);
    });

    // set domain
    xScale.domain(d3.extent(data, function(d) {
        return d.Divorced_total_2014;
    }));
    yScale.domain(d3.extent(data, function(d){
        return d.Depression_total_2014;
    }));

    // append svg for x and y axes
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

      svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);


    // scatterplot dots
    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 10)
        .attr("cx", function(d){
            return xScale(d.Divorced_total_2014);
        })
        .attr("cy", function(d){
            return yScale(d.Depression_total_2014)
        })
        .attr("fill", "red")
        .style("opacity", 0.5);

    // append text to each point
    var text = svg.selectAll("dot")
        .data(data)
        .enter()
        .append("text");

    var textLabels = text
        .attr("class", "label")
        .attr("x", function(d){
            console.log("text x: " + Number(d.Divorced_total_2014));
            return xScale(d.Divorced_total_2014)-10;
        })
        .attr("y", function(d){
            return yScale(d.Depression_total_2014)+5;
        })
        .text(function(d){
            console.log(d.State);
            return d.State;
        })
        .style("opacity", 0.7);

    var xLabel = svg.append("text")
        .attr("class", "label")
        .attr("x", width/2)
        .attr("y", height + 30)
        .attr("style", "font-weight:bold")
        .text("Divorced rate (%)");

    var yLabel = svg.append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("x", -height/2)
        .attr("y", -35)
        .attr("dy", ".71em")
        .attr("style", "font-weight:bold")
        .text("Depression rate (%)");
}); // end d3.csv 

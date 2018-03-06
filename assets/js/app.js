// D3 Scatterplot Assignment
// Create a scatter plot with D3.js.

// set margins
var margin = {top: 20, right: 20, bottom: 100, left: 100};
var width = 800 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

// set x and y scale range
var xScale = d3.scaleLinear().range([0, width]);
var yScale = d3.scaleLinear().range([height, 0]);

var xAxis = d3.axisBottom(xScale);

var yAxis = d3.axisLeft(yScale);

// append the svg in the main body
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("style", "background: WhiteSmoke")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// x axis title/label
// divorced rate
svg.append("text")
    .attr("class", "axis-text active")
    .attr("id", "x")
    .attr("x", width/2 -50)
    .attr("y", height + 35)
    .attr("style", "font-weight:bold")
    .attr("data-axis-name", "Divorced_total_2014")
    .text("Divorced rate (%)");
// poverty rate 
svg.append("text")
    .attr("class", "axis-text")
    .attr("id", "x")
    .attr("x", width/2 -50)
    .attr("y", height + 55)
    .attr("style", "font-weight:bold")
    .attr("data-axis-name", "Poverty_rate")
    .text("Poverty rate (%)");
// unemployment rate
svg.append("text")
    .attr("class", "axis-text")
    .attr("id", "x")
    .attr("x", width/2 -50)
    .attr("y", height + 75)
    .attr("style", "font-weight:bold")
    .attr("data-axis-name", "Unemployment_rate")
    .text("Unemployment rate (%)");

// y axis title/label
// depression rate
svg.append("text")
    .attr("class", "axis-text active")
    .attr("id", "y")
    .attr("transform", "rotate(-90)")
    .attr("x", -height/2 - 50)
    .attr("y", -40)
    .attr("dy", ".71em")
    .attr("style", "font-weight:bold")
    .attr("data-axis-name", "Depression_total_2014")
    .text("Depression rate (%)");
// heart attack rate
svg.append("text")
    .attr("class", "axis-text")
    .attr("id", "y")
    .attr("transform", "rotate(-90)")
    .attr("x", -height/2 - 50)
    .attr("y", -60)
    .attr("dy", ".71em")
    .attr("style", "font-weight:bold")
    .attr("data-axis-name", "heart_attack_rate")
    .text("Heart attack rate (%)");
//Dr visits within last year rate
svg.append("text")
    .attr("class", "axis-text")
    .attr("id", "y")
    .attr("transform", "rotate(-90)")
    .attr("x", -height/2 - 110)
    .attr("y", -80)
    .attr("dy", ".71em")
    .attr("style", "font-weight:bold")
    .attr("data-axis-name", "Dr_visit_within_last_year")
    .text("% who visited doctor within the last year");

// pull in the data
var csv_data = "Data/data.csv";

d3.csv(csv_data, function(error, data) {
    if (error) throw error;

    data.forEach(function(d){
        // make into a number in case it comes in as string
        d.Divorced_total_2014 = +d.Divorced_total_2014;
        d.Depression_total_2014 = +d.Depression_total_2014;
        d.Poverty_rate = +d.Poverty_rate;
        d.heart_attack_rate = +d.heart_attack_rate;
        d.Unemployment_rate = +d.Unemployment_rate;
        d.Dr_visit_within_last_year = +d.Dr_visit_within_last_year;
    });

    // get active data-axis-name
    var activeX = d3
        .select("#x")
        .filter(".active").attr("data-axis-name");
    var activeY = d3
        .select("#y")
        .filter(".active").attr("data-axis-name");

    console.log("activeX: " + activeX + "; activeY: " + activeY);
    
    // plot first chart 
    plot_data(activeX, activeY);

    // *** Function that creates graph for selected x and y
    function plot_data(x_data, y_data) {

        // set domain
        xScale.domain(d3.extent(data, function(d) {
            return d[x_data];
        }));
        yScale.domain(d3.extent(data, function(d){
            return d[y_data];
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
                return xScale(d[x_data]);
            })
            .attr("cy", function(d){
                return yScale(d[y_data])
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
                return xScale(d[x_data])-8;
            })
            .attr("y", function(d){
                return yScale(d[y_data])+4;
            })
            .text(function(d){
                console.log(d.State);
                return d.State;
            })
            .style("font-size", "10px")
            .style("font-weight", "bold")
            .style("font-family", "verdana")
            .style("opacity", 0.6);
    } // end plot_data function

}); // end d3.csv 


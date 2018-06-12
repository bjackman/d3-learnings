//Width and height
var w = 600;
var h = 250;

var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
		11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, w])
    .paddingInner(0.05);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, h]);

//Create SVG element
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

var sortAscending = true;

var sortBars = function() {
    var comparator = sortAscending ? d3.ascending : d3.descending;
    sortAscending = !sortAscending;

    svg.selectAll("rect")
        .sort(comparator)
        .transition("sortBars")
        .delay((d, i) => i * 30)
        .duration(1000)
        .attr("x", (d, i) =>  xScale(i));
};

//Create bars
svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
	return xScale(i);
    })
    .attr("y", function(d) {
	return h - yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) {
	return yScale(d);
    })
    .attr("fill", function(d) {
	return "rgb(0, 0, " + Math.round(d * 10) + ")";
    })
    .on("mouseover", function(d) {
        d3.select(this)
            .attr("fill", "orange");

        var xPos = parseFloat(d3.select(this).attr("x")) + (xScale.bandwidth() / 2);
        var yPos = parseFloat(d3.select(this).attr("y")) + 17;

        svg.append("text")
            .attr("class", "tooltip")
            .attr("text-anchor", "middle")
            .attr("x", xPos)
            .attr("y", yPos)
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("font-weight", "bold")
            .attr("fill", "rgb(0, 0, " + Math.round(d * 10) + ")")
            .text(d);

    })
    .on("mouseout", function(d) {
        d3.select(this)
            .transition()
            .duration(250)
            .attr("fill", d => "rgb(0, 0, " + Math.round(d * 10) + ")")

        d3.select(".tooltip").remove();
    })
    .on("click", function() {
        return sortBars()
    })
    .append("title")
    .text(d => d);

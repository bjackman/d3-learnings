//Width and height
var w = 500;
var h = 100;
var barPadding = 1;

var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
		11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .range([0, w])
    .paddingInner(0.09);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, h]);

//Create SVG element
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

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
    });

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
	return d;
    })
    .attr("text-anchor", "middle")
    .attr("x", function(d, i) {
	return xScale(i) + xScale.bandwidth() / 2;
    })
    .attr("y", function(d) {
	return h - yScale(d) + 14;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");

d3.select("p")
    .on("click", function() {

        //New values for dataset
        let newNumber = Math.floor(Math.random() * 25);
        dataset.push(newNumber);

        var bars = svg.selectAll("rect")
            .data(dataset)

        xScale.domain(d3.range(dataset.length));
        // yScale.domain([0, d3.max(dataset)]);

        bars.enter()
            .append("rect")
            .attr("x", w)
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
            .merge(bars)
            .transition().duration(500)
            .attr("x", (d, i) => xScale(i))
            .attr("y", d => h - yScale(d))
            .attr("width", xScale.bandwidth())
            .attr("height", d => yScale(d));

	let labels = svg.selectAll("text")
	    .data(dataset);

        let textMinY = 13;

	labels.enter()
            .append("text")
            .text(function(d) {
	        return d;
            })
            .attr("text-anchor", "middle")
            .attr("x", w + 15)
            .attr("y", function(d) {
                if (yScale(d) > textMinY)
	            return h - yScale(d) + 14;
                else
                    return h - yScale(d) - 6;
            })
            .attr("fill", function(d) {
                if (yScale(d) > textMinY)
                    return "white";
                else
                    return "black";
            })
            .attr("font-family", "sans-serif")
            .merge(labels)
            .transition()
	    .duration(500)
            .attr("font-size", Math.floor(xScale.bandwidth() * 0.8) + "px")
	    .text(function(d) {
		return d;
	    })
	    .attr("x", function(d, i) {
		return xScale(i) + xScale.bandwidth() / 2;
	    })
    });

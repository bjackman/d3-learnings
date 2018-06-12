//Width and height
var w = 500;
var h = 100;
var barPadding = 1;

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
        var numValues = dataset.length;               //Count original length of dataset
        dataset = [];                                       //Initialize empty array
        for (var i = 0; i < numValues; i++) {               //Loop numValues times
            var newNumber = Math.floor(Math.random() * 25); //New random integer (0-24)
            dataset.push(newNumber);                        //Add new number to array
        }

        var duration = 500;

	//Update all rects
	svg.selectAll("rect")
	    .data(dataset)
            .transition()
            .duration(duration)
            .delay(function(d, i) {
                return i * 100;
            })
	    .attr("y", function(d) {
		return h - yScale(d);
	    })
	    .attr("height", function(d) {
		return yScale(d);
	    })
            .attr("fill", function(d) {
	        return "rgb(0, 0, " + Math.round(d * 10) + ")";
            });

        let textMinY = 13;

        d3.selectAll("text")
	    .data(dataset)
            .transition()
            .delay(function(d, i) {
                return i * 100;
            })
            .duration(duration)
            .text(d => d)
            .attr("fill", function(d) {
                if (yScale(d) > textMinY)
                    return "white";
                else
                    return "black";
            })
            .attr("x", function(d, i) {
	        return xScale(i) + xScale.bandwidth() / 2;
            })
            .attr("y", function(d) {
                if (yScale(d) > textMinY)
	            return h - yScale(d) + 14;
                else
                    return h - yScale(d) - 6;
            });

    });

// d3.select("p").on("click", function() {
//     dataset = [ 11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
//             5, 10, 13, 19, 21, 25, 22, 18, 15, 13 ];
//     d3.selectAll("rect")
//         .data(dataset)
//         .attr("y", function(d) {
//             return h - yScale(d);
//         })
//         .attr("height", function(d) {
//             return yScale(d);
//         });
//     console.log("YEAP");
// });

function main() {
    var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                    11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

    var width = 500, height = 150;
    var barPadding = 1;

    var svg = d3.select("body").append("svg")
        .attr("width", width).attr("height", height);

    var rects = svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x",  function(d, i) { return i * (width / dataset.length); })
        .attr("y", function(d) { return height - (5 * d); })
        .attr("width", (width / dataset.length) - barPadding)
        .attr("height", function(d) { return (d * 5); })
        .attr("fill", function(d) { return "rgb(0, 0, " + Math.round(d * 10) + ")"; });

    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) { return d; })
        .attr("x",  function(d, i) {
            return i * (width / dataset.length) + (width / dataset.length - barPadding) / 2;
        })
        .attr("y", function(d) { return height - (5 * d) + 14; })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white")
        .attr("text-anchor", "middle");

    // circles.attr("cx", function(d, i) {
    //         return (i * 50) + 25;
    //     })
    //     .attr("cy", height / 2)
    //     .attr("r", function(d) {
    //         return d;
    //     })
    //     .attr("stroke-width", function(d) { return d / 4; });

    // console.log(circles);
}

window.onload = main;

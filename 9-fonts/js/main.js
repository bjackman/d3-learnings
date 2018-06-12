// Make a canvas, draw text on it, and return the pixel data
// You have to set the size in the font string and also provide it as a
// parameter, because you just do. Get over it. Could probably fix that with
// Font.js or some shit.
function getTextPixels(text, font, size) {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");

    // Measure how big the text will be
    context.font = font

    // Resize the canvas so it's totally filed by the text.

    // There's a fudge factor here to account for vertical spacing.
    canvas.width = context.measureText(text).width * 1.85;
    canvas.height = size;

    // For some reason resizing the canvas resets the font. I wonder if that's
    // supposed to happen?
    // Anyway, set it again
    context.font = font

    // The fudge factor here is also to account for vertical spacing and stuff
    // lke the tails on g characters.
    // The proper way to do this would be with https://opentype.js.org/ or
    // something, I dunno.
    context.fillText(text, 0, canvas.height - (size / 6));

    return context.getImageData(0, 0, canvas.width, canvas.height);
}

// Take an ImageData and return a list of [x, y] pairs where the pixel at [x, y]
// isn't white.
function findNonWhitePixels(imageData) {
    let ret = [];

    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
            // ImageData.data is a linearised array in RGBA order for some
            // reason. Get a slice of the pixel at [x,y] and check if it's
            // [0, 0, 0, 0]. If not, add it to @ret.
            let idx = ((y * imageData.width) + x) * 4;
            let pixelRgba = imageData.data.slice(idx, idx + 4);
            if (pixelRgba.some(d => d != 0)) {
                ret.push([x, y]);
            }
        }
    }

    return ret;
}

function main() {
    function getImageData(text, fontFamily) {
        let fontSize = 61;
        let font = `normal italic ${fontSize}px ${fontFamily}`;
        return getTextPixels(text, font, fontSize);
    }

    let imageData = getImageData("hello", "cursive");
    let pixelCoords = findNonWhitePixels(imageData);

    var margin = {top: 80, right: 40, bottom: 80, left: 40};
    var width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let xScale = d3.scaleLinear()
        .domain([0, imageData.width])
        .range([0, width])

    let yScale = d3.scaleLinear()
        .domain([0, imageData.height])
        .range([0, height])

    svg.selectAll("circle")
        .data(pixelCoords)
        .enter()
        .append("circle")
        .attr("cx", ([x, y]) => xScale(x))
        .attr("cy", ([x, y]) => yScale(y))
        .attr("r", 3)
        .attr("fill", "black");

    svg.on("click", function() {
        console.log("clicked");

        let imageData = getImageData("world", "serif");
        let pixelCoords = findNonWhitePixels(imageData);

        let pixels = d3.selectAll("circle")
            .data(pixelCoords)
            .transition()
            .duration(6000)
            .attr("cx", ([x, y]) => xScale(x))
            .attr("cy", ([x, y]) => yScale(y));
    });
}

main();

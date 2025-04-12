// Sample data


// Set up dimensions
const width = 1200;
const height = 1200;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };


// Create SVG container
const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

const chart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);



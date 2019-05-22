function drawPie(data) {
    var svg = d3.select("svg#pie");

    var g = svg.append("g");

    var width = svg.attr("width"),
        height = svg.attr("height"),
        radius = (0.6 * height) / 2;

    var color = d3
        .scaleOrdinal()
        .domain(data.map(x => x.generation))
        .range(d3.schemeSet2);

    var arc = d3.arc().outerRadius(radius);

    var arclabel = d3
        .arc()
        .innerRadius(radius * 0.8)
        .outerRadius(radius * 1.5);

    var pie = d3.pie().value(d => d.percent)(data);

    var arcs = g
        .selectAll("g.arcs")
        .data(pie)
        .enter()
        .append("g")
        .attr("class", "arcs")
        .attr(
            "transform",
            "translate(" + (1 / 3) * width + "," + height / 2 + ")"
        );

    arcs.append("path")
        .attr("fill", (d, i) => color(i))
        .transition()
        .ease(d3.easeBounce)
        .duration(1500)
        .attrTween("d", tweenPie)
        .transition()
        .ease(d3.easeElastic)
        .delay((d, i) => 500 + i * 50)
        .duration(500)
        .attrTween("d", tweenDonut);

    arcs.append("text")
        .style("opacity", 0)
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .attr("font-family", "Roboto")
        .transition()
        .duration(1500)
        .style("opacity", 1)
        .style("fill", (d, i) => color(i))
        .attr("transform", d => "translate(" + arclabel.centroid(d) + ")")
        .text(
            d =>
                (parseFloat(d.data.percent).toPrecision(2) * 100).toString() +
                "%"
        );

    function tweenPie(b) {
        b.innerRadius = 0;
        b.padAngle = 0.02;
        var i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
        return function(t) {
            return arc(i(t));
        };
    }

    function tweenDonut(b) {
        b.innerRadius = radius * 0.6;
        var i = d3.interpolate({ innerRadius: 0 }, b);
        return function(t) {
            return arc(i(t));
        };
    }

    var total = g
        .append("g")
        .attr("class", "total")
        .attr(
            "transform",
            "translate(" + (1 / 3) * width + "," + height / 2 + ")"
        );

    total
        .append("text")
        .style("opacity", 0)
        .style("text-anchor", "middle")
        .style("font-size", "16px")
        .attr("font-family", "Roboto")
        .attr("x", 0)
        .attr("y", 0)
        .attr("fill", "darkslategrey")
        .transition()
        .delay(2000)
        .duration(2000)
        .style("opacity", 1)
        .text(
            data.map(d => parseInt(d.suicides)).reduce((a, b) => a + b) +
                " Orang"
        );

    var legend = g
        .selectAll("g.legend")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr(
            "transform",
            "translate(" + (1 / 3) * width + "," + height / 3 + ")"
        );

    legend
        .append("circle")
        .transition()
        .ease(d3.easeLinear)
        .delay((d, i) => 2000 + i * 50)
        .duration(500)
        .attr("cx", radius + 50)
        .attr("cy", (d, i) => 0 + i * 20)
        .attr("r", 5)
        .style("fill", (d, i) => color(i));

    legend
        .append("text")
        .style("opacity", 0)
        .attr("font-family", "Roboto")
        .attr("x", radius + 50 + 20)
        .attr("y", (d, i) => 0 + 5 + i * 20)
        .style("fill", (d, i) => color(i))
        .text(d => d.generation)
        .transition()
        .delay((d, i) => 2500 + i * 50)
        .duration(500)
        .style("opacity", 1);

    var title = g
        .append("g")
        .attr("class", "title")
        .attr("transform", "translate(" + width / 2 + "," + 0 + ")");

    title
        .append("text")
        .style("opacity", 0)
        .style("text-anchor", "middle")
        .style("font-size", "18px")
        .attr("font-family", "Roboto")
        .attr("x", 0)
        .attr("y", 0.1 * height)
        .attr("fill", "darkslategrey")
        .transition()
        .delay(2000)
        .duration(2000)
        .style("opacity", 1)
        .text("Jumlah Bunuh Diri Tiap Generasi Tahun 1985 - 2016");
}

function removePie() {
    var svg = d3.select("svg#pie");

    svg.select("g")
        .transition()
        .duration(2000)
        .style("opacity", 0)
        .remove();
}

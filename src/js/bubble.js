function drawBubble(data) {
    var svg = d3.select("svg#bubble"),
        g = svg.append("g");

    var width = svg.attr("width"),
        height = svg.attr("height");

    var color = d3
        .scaleOrdinal()
        .domain(["1", "2"])
        .range(d3.schemeSet1);

    var size = d3
        .scaleLinear()
        .domain([0, Math.max(...data.map(d => d.suicides_no))])
        .range([2, 151]);

    var title = g.append("g").attr("class", "title");

    title
        .append("text")
        .style("opacity", 0)
        .style("text-anchor", "start")
        .style("font-size", "18px")
        .attr("font-family", "Roboto")
        .attr("x", 0)
        .attr("y", 20)
        .attr("fill", "darkslategrey")
        .transition()
        .duration(2000)
        .style("opacity", 1)
        .text("Jumlah Bunuh Diri Tiap Negara");

    title
        .append("text")
        .style("opacity", 0)
        .style("text-anchor", "start")
        .style("font-size", "12px")
        .attr("font-family", "Roboto")
        .attr("x", 0)
        .attr("y", 20 + 20)
        .attr("fill", "darkslategrey")
        .transition()
        .delay(500)
        .duration(2000)
        .style("opacity", 1)
        .text("1985 - 2016");

    var legend = g.append("g").attr("class", "legend");

    legend
        .append("circle")
        .transition()
        .delay(2000)
        .duration(2000)
        .attr("cx", width - 100)
        .attr("cy", 50)
        .attr("r", 5)
        .style("opacity", 0.6)
        .style("fill", color("1"));

    legend
        .append("circle")
        .transition()
        .delay(2000 + 100)
        .duration(2000)
        .attr("cx", width - 100)
        .attr("cy", 50 + 20)
        .attr("r", 5)
        .style("opacity", 0.6)
        .style("fill", color("2"));

    legend
        .append("text")
        .style("opacity", 0)
        .attr("font-family", "Roboto")
        .attr("x", width - 100 + 20)
        .attr("y", 50 + 5)
        .style("fill", color("1"))
        .text(">= 10000")
        .transition()
        .delay(1000)
        .duration(2000)
        .style("opacity", 0.6);

    legend
        .append("text")
        .style("opacity", 0)
        .attr("font-family", "Roboto")
        .attr("x", width - 100 + 20)
        .attr("y", 50 + 20 + 5)
        .style("fill", color("2"))
        .text("< 10000")
        .transition()
        .delay(1000 + 50)
        .duration(2000)
        .style("opacity", 0.6);

    var node = g
        .append("g")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "node")
        .attr("r", d => size(d.suicides_no))
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .style("fill", d => color(d.group))
        .style("opacity", 0.8)
        .on("mouseover", () => tooltip.style("display", "block"))
        .on("mouseout", function() {
            this.style.opacity = 0.8;
            tooltip.style("display", "none");
        })
        .on("mousemove", function(d) {
            this.style.opacity = 1;
            var xPos = d3.mouse(this)[0] - 15;
            var yPos = d3.mouse(this)[1] - 30;
            tooltip.attr("transform", "translate(" + xPos + "," + yPos + ")");
            tooltip.select("text").text(d.country + ":" + d.suicides_no);
        });

    var tooltip = g
        .append("g")
        .attr("class", "tooltip")
        .style("display", "none");

    tooltip
        .append("text")
        .attr("x", 15)
        .attr("dy", 18)
        .style("font-size", "16px")
        .style("opacity", 0.6)
        .attr("font-family", "Roboto")
        .attr("fill", "black");

    var center = d3
            .forceCenter()
            .x(width / 2)
            .y(height / 2),
        charge = d3.forceManyBody().strength(0.1),
        collide = d3
            .forceCollide()
            .strength(0.1)
            .radius(d => {
                return size(d.suicides_no) + 10;
            });

    var simulation = d3
        .forceSimulation(data)
        .force("center", center)
        .force("charge", charge)
        .force("collide", collide)
        .on("tick", d => node.attr("cx", d => d.x).attr("cy", d => d.y));

    var updateStrength = () => {
        charge.strength(0.1 + Math.random());
        collide.strength(0.1 + Math.random()).radius(d => {
            return size(d.suicides_no) + Math.random() * 10;
        });
        simulation.alpha(1).restart();
    };

    setInterval(updateStrength, 3000);
}

function removeBubble() {
    var svg = d3.select("svg#bubble");

    svg.select("g")
        .transition()
        .duration(2000)
        .style("opacity", 0)
        .remove();
}

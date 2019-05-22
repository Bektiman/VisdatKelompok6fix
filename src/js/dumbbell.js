function drawDumbbell(data) {
    var svg = d3.select("svg#dumbbell").style("display", "block"),
        width = svg.attr("width"),
        height = svg.attr("height"),
        margin = { left: 180, top: 50 },
        g = svg.append("g"),
        x_scale = d3
            .scaleLinear()
            .rangeRound([0, width - 2 * margin.left])
            .domain([
                0,
                Math.max(
                    Math.max(...data.map(d => d.Male)),
                    Math.max(...data.map(d => d.Female))
                )
            ])
            .nice(),
        y_scale = d3
            .scalePoint()
            .range([0, height - 2 * margin.top])
            .domain(data.map(d => d.country)),
        x_axis = d3.axisBottom().scale(x_scale),
        y_axis = d3.axisLeft().scale(y_scale);

    g.append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
        .attr("class", "y axis")
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .style("opacity", 1)
        .call(y_axis);

    g.append("g")
        .attr(
            "transform",
            "translate(" + margin.left + ", " + (height - margin.top) + ")"
        )
        .attr("class", "x axis")
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .style("opacity", 1)
        .call(x_axis);

    var title = g
        .append("g")
        .attr("class", "title")
        .attr("transform", "translate(" + margin.left + ", " + 0 + ")");

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
        .delay(500)
        .duration(2000)
        .style("opacity", 1)
        .text("Perbedaan Jumlah Bunuh Diri per Seratus Ribu Orang Tiap Negara");

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
        .delay(500 + 500)
        .duration(2000)
        .style("opacity", 1)
        .text("1985 - 2016");

    var dot_a = g
        .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
        .selectAll(".a")
        .data(data);

    var dot_b = g
        .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
        .selectAll(".b")
        .data(data);

    var connect_line = g
        .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
        .selectAll(".connect-line")
        .data(data);

    dot_a
        .enter()
        .append("circle")
        .style("opacity", 0.6)
        .style("fill", "steelblue")
        .attr("class", "a")
        .attr("cy", height)
        .attr("cx", 0)
        .attr("r", 1e-6)
        .transition()
        .delay((d, i) => 500 + i * 50)
        .duration(2000)
        .attr("cy", d => y_scale(d.country))
        .attr("cx", d => x_scale(d.Female))
        .attr("r", 3);

    dot_b
        .enter()
        .append("circle")
        .style("opacity", 0.6)
        .style("fill", "tomato")
        .attr("class", "b")
        .attr("cy", height)
        .attr("cx", 0)
        .attr("r", 1e-6)
        .transition()
        .delay((d, i) => 500 + i * 50)
        .duration(2000)
        .attr("cy", d => y_scale(d.country))
        .attr("cx", d => x_scale(d.Male))
        .attr("r", 3);

    connect_line
        .enter()
        .append("line")
        .style("stroke", "#ccc")
        .style("stroke-width", "1 px")
        .attr("class", "connect-line")
        .attr("y1", height)
        .attr("x1", 0)
        .attr("y2", height)
        .attr("x2", 0)
        .transition()
        .delay((d, i) => 500 + i * 50)
        .duration(2000)
        .attr("y1", d => y_scale(d.country))
        .attr("x1", d => x_scale(d.Female))
        .attr("y2", d => y_scale(d.country))
        .attr("x2", d => x_scale(d.Male));

    var legend = g
        .append("g")
        .attr("class", "legend")
        .attr(
            "transform",
            "translate(" + margin.left + ", " + margin.top + ")"
        );

    legend
        .append("circle")
        .transition()
        .delay(2000)
        .duration(500)
        .attr("cx", width - 500)
        .attr("cy", 0)
        .attr("r", 5)
        .style("opacity", 0.6)
        .style("fill", "steelblue");

    legend
        .append("circle")
        .transition()
        .delay(2000 + 100)
        .duration(500)
        .attr("cx", width - 500)
        .attr("cy", 20)
        .attr("r", 5)
        .style("opacity", 0.6)
        .style("fill", "tomato");

    legend
        .append("text")
        .style("opacity", 0)
        .attr("font-family", "Roboto")
        .attr("x", width - 500 + 20)
        .attr("y", 0 + 5)
        .style("fill", "steelblue")
        .text("Perempuan")
        .transition()
        .delay(2250)
        .duration(500)
        .style("opacity", 0.6);

    legend
        .append("text")
        .style("opacity", 0)
        .attr("font-family", "Roboto")
        .attr("x", width - 500 + 20)
        .attr("y", 20 + 5)
        .style("fill", "tomato")
        .text("Laki-laki")
        .transition()
        .delay(2250 + 50)
        .duration(500)
        .style("opacity", 0.6);
}

function removeDumbbell() {
    var svg = d3.select("svg#dumbbell");

    svg.select("g")
        .transition()
        .duration(2000)
        .style("opacity", 0)
        .remove();
}

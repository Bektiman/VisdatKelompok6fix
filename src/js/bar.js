function drawBar(data) {
    var svg = d3.select("svg#bar"),
        margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = svg.attr("width") - margin.left - margin.right,
        height = svg.attr("height") - margin.top - margin.bottom,
        g = svg
            .append("g")
            .attr(
                "transform",
                "translate(" + margin.left + "," + margin.top + ")"
            );
    var x0 = d3
        .scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.1);
    var x1 = d3.scaleBand().padding(0.05);
    var y = d3.scaleLinear().rangeRound([height, 0]);
    var z = d3
        .scaleOrdinal()
        .range([
            "#98abc5",
            "#8a89a6",
            "#7b6888",
            "#6b486b",
            "#a05d56",
            "#d0743c"
        ]);

    var keys = data.columns.slice(1);

    x0.domain(data.map(d => d.sex));

    x1.domain(keys).rangeRound([0, x0.bandwidth()]);

    y.domain([
        0,
        Math.max(...d3.max(data, d => keys.map(key => d[key])))
    ]).nice();

    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .style("opacity", 0)
        .transition()
        .duration(2000)
        .style("opacity", 1)
        .call(d3.axisBottom(x0));

    g.append("g")
        .attr("class", "axis")
        .style("opacity", 0)
        .transition()
        .duration(2000)
        .style("opacity", 1)
        .call(d3.axisLeft(y).ticks(null, "s"));

    g.append("g")
        .attr("class", "axisname")
        .append("text")
        .attr("x", 0)
        .attr("y", height - margin.bottom)
        .style("opacity", 0)
        .transition()
        .duration(2000)
        .style("opacity", 1)
        .style("text-anchor", "start")
        .style("font-size", "12px")
        .attr("font-family", "Roboto")
        .attr("fill", "darkslategrey")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", 5)
        .text("Jumlah Bunuh Diri");

    g.append("g")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", d => "translate(" + x0(d.sex) + ",0)")
        .selectAll("rect")
        .data(d => keys.map(key => ({ key: key, value: d[key] })))
        .enter()
        .append("rect")
        .attr("x", d => x1(d.key))
        .attr("y", d => y(d.value))
        .attr("width", x1.bandwidth())
        .style("opacity", 0)
        .transition()
        .delay(1000)
        .duration(2000)
        .style("opacity", 1)
        .attr("height", d => height - y(d.value))
        .attr("fill", d => z(d.key));

    var legend = g
        .append("g")
        .attr("class", "legend")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter()
        .append("g")
        .attr("transform", function(d, i) {
            return "translate(0," + i * 20 + ")";
        });

    legend
        .append("rect")
        .attr("x", width - 19)
        .style("opacity", 0)
        .transition()
        .delay(2000)
        .duration(2000)
        .style("opacity", 1)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

    legend
        .append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .style("opacity", 0)
        .transition()
        .delay(2000)
        .duration(2000)
        .style("opacity", 1)
        .attr("dy", "5px")
        .attr("font-family", "Roboto")
        .attr("font-size", "10px")
        .attr("text-anchor", "end")
        .attr("fill", "darkslategrey")
        .text(function(d) {
            return d;
        });

    var title = g
        .append("g")
        .attr("class", "title")
        .attr("transform", "translate(" + width / 2 + "," + 0 + ")");

    title
        .append("text")
        .attr("x", 0)
        .attr("y", 0.1 * height)
        .attr("fill", "darkslategrey")
        .style("text-anchor", "middle")
        .style("font-size", "16px")
        .attr("font-family", "Roboto")
        .style("opacity", 0)
        .transition()
        .delay(3000)
        .duration(2000)
        .style("opacity", 1)
        .text("Jumlah Bunuh Diri Berdasarkan");

    title
        .append("text")
        .attr("x", 0)
        .attr("y", 0.1 * height + 20)
        .attr("fill", "darkslategrey")
        .style("text-anchor", "middle")
        .style("font-size", "16px")
        .attr("font-family", "Roboto")
        .style("opacity", 0)
        .transition()
        .delay(3000)
        .duration(2000)
        .style("opacity", 1)
        .text("Kelompok Umur dan Jenis Kelamin");

    var subtitle = g
        .append("g")
        .attr("class", "subtitle")
        .attr("transform", "translate(" + width / 2 + "," + 25 + ")");

    subtitle
        .append("text")
        .attr("font-family", "Roboto")
        .attr("x", 0)
        .attr("y", 0.1 * height + 20)
        .attr("fill", "darkslategrey")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .style("opacity", 0)
        .transition()
        .delay(3000 + 500)
        .duration(2000)
        .style("opacity", 1)
        .text("1985 - 2016");
}

function removeBar() {
    var svg = d3.select("svg#bar");

    svg.select("g")
        .transition()
        .duration(2000)
        .style("opacity", 0)
        .remove();
}

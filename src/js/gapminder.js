var dv = null;

function drawGapminder(data_0, data_1, data_2, data_3) {
    window.dv = {
        axis: {},
        data: {
            sub: [],
            max: {}
        },
        draw: {},
        format: {},
        get: {},
        html: {},

        opt: {
            height: d3.select("svg#gapminder").attr("height"),
            width: d3.select("svg#gapminder").attr("width"),
            pad: 50,
            radius: {
                min: 5,
                max: 50
            },
            fill: ["#FF0000", "#0000FF"],
            countries: [
                "Argentina",
                "Austria",
                "Belgium",
                "Brazil",
                "Bulgaria",
                "Chile",
                "Colombia",
                "Costa Rica",
                "Czech Republic",
                "Ecuador",
                "Finland",
                "France",
                "Germany",
                "Greece",
                "Guatemala",
                "Iceland",
                "Ireland",
                "Israel",
                "Italy",
                "Japan",
                "Kazakhstan",
                "Kyrgyzstan",
                "Luxembourg",
                "Malta",
                "Mauritius",
                "Mexico",
                "Netherlands",
                "Norway",
                "Puerto Rico",
                "Republic of Korea",
                "Romania",
                "Russian Federation",
                "Singapore",
                "Spain",
                "Sweden",
                "Turkmenistan",
                "United Kingdom",
                "United States"
            ],
            year: {
                start: 1990,
                end: 2014
            },
            speed: 700
        },
        setup: {},
        scale: {},
        state: {
            year: 1990
        },
        svg: {},
        update: {}
    };

    dv.draw.main = () => {
        dv.svg.main = d3
            .select("svg#gapminder")
            .append("g")
            .style("opacity", 0);
    };

    dv.get.data = () => {
        dv.get.gdp_per_capita();
    };

    dv.get.gdp_per_capita = () => {
        dv.setup.massage(data_0, "gdp_per_capita");
        dv.get.suicides_no();
    };

    dv.get.suicides_no = () => {
        dv.setup.massage(data_1, "suicides_no");
        dv.get.population();
    };

    dv.get.population = () => {
        dv.setup.massage(data_2, "population");
        dv.get.gdp_for_year();
    };

    dv.get.gdp_for_year = () => {
        dv.setup.massage(data_3, "gdp_for_year");
        dv.setup.withData();
    };

    dv.setup.massage = function(data, name) {
        var i;
        if (dv.data.sub.length === 0) {
            for (i = 0; i < dv.opt.countries.length; i++) {
                dv.data.sub[i] = { name: dv.opt.countries[i] };
            }
        }
        dv.data.max[name] = 0;
        for (i = 0; i < data.length; i++) {
            var country = data[i];
            var index = dv.opt.countries.indexOf(country.name);
            if (index !== -1) {
                dv.data.sub[index][name] = {};
                for (
                    var year = dv.opt.year.start;
                    year <= dv.opt.year.end;
                    year++
                ) {
                    var value = Number(country[year].replace(/,/g, ""));
                    dv.data.sub[index][name][year] = value;
                    if (value > dv.data.max[name]) {
                        dv.data.max[name] = value;
                    }
                }
            }
        }
    };

    dv.setup.scales = () => {
        dv.scale.x = d3
            .scaleSqrt()
            .domain([0, dv.data.max.gdp_per_capita])
            .range([0, dv.opt.width]);

        dv.scale.y = d3
            .scaleLinear()
            .domain([dv.opt.pad, dv.data.max.suicides_no])
            .range([dv.opt.height - 50, dv.opt.pad * 2]);

        dv.scale.r = d3
            .scaleLinear()
            .domain([0, dv.data.max.population])
            .range([dv.opt.radius.min, dv.opt.radius.max]);

        dv.scale.fill = d3
            .scaleLinear()
            .domain([0, 15000])
            .range(dv.opt.fill);
        dv.scale.xn = d3
            .scaleLinear()
            .domain([0, dv.data.max.gdp_per_capita])
            .range([0, dv.opt.width]);

        dv.scale.yn = d3
            .scaleLinear()
            .domain([0, 55000])
            .range([dv.opt.height, 0]);
    };

    dv.draw.bubbles = () => {
        dv.svg.bubbles = dv.svg.main
            .append("g")
            .selectAll("circle")
            .data(dv.data.sub)
            .enter()
            .append("circle")
            .attr("cx", d => dv.scale.x(d.gdp_per_capita[dv.state.year]))
            .attr("cy", d => dv.scale.y(d.suicides_no[dv.state.year]))
            .attr("r", d => dv.scale.r(d.population[dv.state.year]))
            .style("fill", d => dv.scale.fill(d.suicides_no[dv.state.year]))
            .style("opacity", 0.5)
            .on("mouseover", d => {
                dv.update.hoverShow(d);
            })
            .on("mouseout", () => {
                dv.update.hoverHide();
            });
    };

    dv.setup.axis = () => {
        dv.axis.x = d3.axisBottom(dv.scale.xn).tickFormat(d3.format("~s"));
        dv.axis.y = d3.axisLeft(dv.scale.yn).tickFormat(d3.format("~g"));
    };

    dv.draw.axis = () => {
        dv.svg.axis = {};

        dv.svg.axis.x = dv.svg.main
            .append("g")
            .attr("class", "axis")
            .attr(
                "transform",
                "translate(" +
                    dv.opt.pad +
                    "," +
                    (dv.opt.height - 1 * dv.opt.pad) +
                    ")"
            )
            .call(dv.axis.x);

        dv.svg.axis.y = dv.svg.main
            .append("g")
            .attr("class", "axis")
            .attr(
                "transform",
                "translate(" + dv.opt.pad + "," + -1 * dv.opt.pad + ")"
            )
            .call(dv.axis.y);

        dv.svg.axis.x
            .append("text")
            .style("text-anchor", "end")
            .style("font-size", "12px")
            .attr("font-family", "Roboto")
            .attr("fill", "darkslategrey")
            .attr("x", dv.opt.width - dv.opt.pad - 10)
            .attr("y", -10)
            .text("PDB");

        dv.svg.axis.y
            .append("text")
            .style("text-anchor", "start")
            .style("font-size", "12px")
            .attr("font-family", "Roboto")
            .attr("fill", "darkslategrey")
            .attr("x", 10)
            .attr("y", dv.opt.pad + 10)
            .text("Jumlah Bunuh Diri");

        d3.selectAll(".axis path")
            .style("fill", "none")
            .style("stroke", "#999")
            .style("shape-rendering", "crispEdges");

        d3.selectAll(".axis line")
            .style("fill", "none")
            .style("stroke", "#999")
            .style("shape-rendering", "crispEdges");

        d3.selectAll(".axis text")
            .style("fill", "#777")
            .style("font-size", "10px");
    };

    dv.draw.year = () => {
        dv.svg.year = dv.svg.main
            .append("text")
            .attr("id", "year")
            .attr("dx", 13 * dv.opt.pad)
            .attr("dy", dv.opt.height - 540)
            .style("font-size", "60px")
            .style("text-anchor", "end")
            .style("fill", "#483D8B")
            .style("font-weight", "100")
            .text(dv.state.year);
    };

    dv.update.bubbles = () => {
        dv.svg.bubbles
            .transition()
            .duration(dv.opt.speed)
            .attr("cx", d => dv.scale.x(d.gdp_per_capita[dv.state.year]))
            .attr("cy", d => dv.scale.y(d.suicides_no[dv.state.year]))
            .attr("r", d => dv.scale.r(d.population[dv.state.year]))
            .style("fill", d => dv.scale.fill(d.suicides_no[dv.state.year]));
    };

    dv.update.year = () => {
        dv.svg.year
            .transition()
            .delay(dv.opt.speed / 2)
            .text(dv.state.year);
    };

    dv.update.incremental = () => {
        dv.state.year++;
        if (dv.state.year > dv.opt.year.end) {
            dv.state.year = dv.opt.year.start;
        }
        dv.update.year();
        dv.update.bubbles();
    };

    dv.draw.play = () => {
        dv.html.play = d3
            .select("#button")
            .append("a")
            .attr("class", "btn waves-effect waves-light red")
            .attr("onclick", "dv.update.player()")
            .text("Play");

        dv.html.play
            .style("opacity", 0)
            .transition()
            .duration(3000)
            .style("opacity", 1);
    };

    dv.update.player = () => {
        if (!dv.state.player) {
            dv.state.player = true;
            dv.html.play.text("Pause");
            dv.player = setInterval(dv.update.incremental, dv.opt.speed);
        } else {
            dv.state.player = false;
            dv.html.play.text("Play");
            clearInterval(dv.player);
        }
    };

    dv.draw.hover = () => {
        dv.html.hover = {};
        dv.html.hover.main = d3
            .select("body")
            .append("html:div")
            .attr("id", "hover")
            .style("display", "none")
            .style("position", "absolute")
            .style("z-index", 1000)
            .style("background-color", "#FFF")
            .style("border", "1px solid #DDD")
            .style("border-radius", "10px")
            .style("padding", "10px")
            .style("opacity", 0)
            .style("transition", "opacity 0.25s")
            .style("pointer-events", "none");

        function addContent(name, text) {
            dv.html.hover[name] = dv.html.hover.main
                .append("html:div")
                .style("padding-bottom", "5px");
            dv.html.hover[name]
                .append("html:span")
                .attr("class", "value")
                .style("font-weight", "bold");
            if (text) {
                dv.html.hover[name]
                    .append("html:span")
                    .attr("class", "descr")
                    .text(text);
            }
        }

        addContent("country");
        addContent("gdp_per_capita", " PDB per kapita");
        addContent("population", " Populasi");
        addContent("suicides_no", " Bunuh diri");
        addContent("gdp_for_year", " PDB tahun itu");
    };

    dv.setup.formatters = () => {
        dv.format.dollar = d3.format("$,.0f");
        dv.format.fix1 = d3.format(".1f");
        dv.format.big = d3.format(",.3r");
    };

    dv.update.hoverShow = d => {
        dv.html.hover.main
            .style("display", "block")
            .style("left", d3.event.pageX + 10 + "px")
            .style("top", d3.event.pageY + 10 + "px")
            .style("opacity", 0.8);
        dv.html.hover.country.select(".value").text(d.name);
        dv.html.hover.gdp_per_capita
            .select(".value")
            .text(dv.format.dollar(d.gdp_per_capita[dv.state.year]));
        dv.html.hover.population
            .select(".value")
            .text(dv.format.big(d.population[dv.state.year] / 1000000) + " M");
        dv.html.hover.suicides_no
            .select(".value")
            .text(dv.format.fix1(d.suicides_no[dv.state.year]));
        dv.html.hover.gdp_for_year
            .select(".value")
            .text(
                dv.format.dollar(d.gdp_for_year[dv.state.year] / 1000000) + " M"
            );
    };

    dv.update.hoverHide = () => {
        dv.html.hover.main.style("opacity", 0);
    };

    dv.setup.withData = () => {
        dv.setup.scales();
        dv.setup.axis();
        dv.draw.axis();
        dv.draw.bubbles();
    };

    dv.setup.withoutData = () => {
        dv.draw.main();
        dv.get.data();
        dv.draw.year();
        dv.draw.play();
        dv.draw.hover();
        dv.setup.formatters();
        dv.svg.main
            .transition()
            .duration(3000)
            .style("opacity", 1);
    };

    dv.setup.withoutData();
}

function removeGapminder() {
    var svg = d3.select("svg#gapminder");

    svg.select("g")
        .transition()
        .duration(2000)
        .style("opacity", 0)
        .remove();

    d3.select("#button a")
        .transition()
        .duration(2000)
        .style("opacity", 0)
        .remove();

    d3.select("#hover")
        .transition()
        .duration(2000)
        .style("opacity", 0)
        .remove();

    if (dv) {
        clearInterval(dv.player);
    }
}

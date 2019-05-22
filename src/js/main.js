setInterval(() => {
    if (window.innerWidth < 1000) {
        if (!Swal.isVisible()) {
            Swal.fire(
                "Peringatan!",
                "Layar Anda tidak mempunyai lebar yang cukup",
                "warning"
            );
        }
    } else Swal.close();
}, 500);

Promise.all([
    d3.csv("data/bubble.csv"),
    d3.csv("data/dumbbell.csv"),
    d3.csv("data/bar.csv"),
    d3.csv("data/pie.csv"),
    d3.csv("data/gapminder_0.csv"),
    d3.csv("data/gapminder_1.csv"),
    d3.csv("data/gapminder_2.csv"),
    d3.csv("data/gapminder_3.csv")
])
    .then(data => {
        var bubbleRemoved = true,
            dumbbellRemoved = true,
            barRemoved = true,
            pieRemoved = true,
            gapminderRemoved = true;
        d3.graphScroll()
            .offset(Math.round(window.innerHeight / 2))
            .container(d3.select("#container"))
            .sections(d3.selectAll("#section > p"))
            .on("active", i => {
                switch (i) {
                    case 0:
                        removeBubble();
                        bubbleRemoved = true;
                        removeDumbbell();
                        dumbbellRemoved = true;
                        removeBar();
                        barRemoved = true;
                        removePie();
                        pieRemoved = true;
                        removeGapminder();
                        gapminderRemoved = true;
                        break;
                    case 1:
                        if (bubbleRemoved) {
                            drawBubble(data[0]);
                            bubbleRemoved = false;
                        }
                        break;
                    case 2:
                        if (bubbleRemoved) {
                            drawBubble(data[0]);
                            bubbleRemoved = false;
                        }
                        break;
                    case 3:
                        removeBubble();
                        bubbleRemoved = true;
                        if (dumbbellRemoved) {
                            drawDumbbell(data[1]);
                            dumbbellRemoved = false;
                        }
                        break;
                    case 4:
                        if (dumbbellRemoved) {
                            drawDumbbell(data[1]);
                            dumbbellRemoved = false;
                        }
                        break;
                    case 5:
                        removeDumbbell();
                        dumbbellRemoved = true;
                        if (barRemoved) {
                            drawBar(data[2]);
                            barRemoved = false;
                        }
                        break;
                    case 6:
                        if (barRemoved) {
                            drawBar(data[2]);
                            barRemoved = false;
                        }
                        break;
                    case 7:
                        removeBar();
                        barRemoved = true;
                        if (pieRemoved) {
                            drawPie(data[3]);
                            pieRemoved = false;
                        }
                        break;
                    case 8:
                        removePie();
                        pieRemoved = true;
                        break;
                    case 9:
                        removePie();
                        pieRemoved = true;
                        break;
                    default:
                        break;
                }
            });
        d3.graphScroll()
            .offset(Math.round(window.innerHeight / 2))
            .container(d3.select("#containerpie"))
            .graph(d3.select("#graphicpie"))
            .sections(d3.selectAll("#sectionpie > p"))
            .on("active", i => {
                if (i == 1) {
                    if (gapminderRemoved) {
                        drawGapminder(data[4], data[5], data[6], data[7]);
                        gapminderRemoved = false;
                    }
                    if (pieRemoved) {
                        drawPie(data[3]);
                        pieRemoved = false;
                    }
                }
            });
    })
    .catch(err => console.log(err));

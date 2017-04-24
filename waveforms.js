let play = false
let coords = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
]
let arrayIndex = -1

createSVGContainers()
drawWaveforms()
// animateWaveforms()

function createSVGContainers() {
    d3.select("#fast-vibrato")
        .append("svg")
        .attr("width", 150)
        .attr("height", 150)
        .attr("id", "wave-fast-vibrato")
    d3.select("#medium-vibrato")
        .append("svg")
        .attr("width", 150)
        .attr("height", 150)
        .attr("id", "wave-medium-vibrato")
    d3.select("#slow-vibrato")
        .append("svg")
        .attr("width", 150)
        .attr("height", 150)
        .attr("id", "wave-slow-vibrato")

    d3.select("#fast-pitchdown")
        .append("svg")
        .attr("width", 150)
        .attr("height", 150)
        .attr("id", "wave-fast-pitchdown")
    d3.select("#medium-pitchdown")
        .append("svg")
        .attr("width", 150)
        .attr("height", 150)
        .attr("id", "wave-medium-pitchdown")
    d3.select("#slow-pitchdown")
        .append("svg")
        .attr("width", 150)
        .attr("height", 150)
        .attr("id", "wave-slow-pitchdown")

    d3.select("#fast-pitchup")
        .append("svg")
        .attr("width", 150)
        .attr("height", 150)
        .attr("id", "wave-fast-pitchup")
    d3.select("#medium-pitchup")
        .append("svg")
        .attr("width", 150)
        .attr("height", 150)
        .attr("id", "wave-medium-pitchup")
    d3.select("#slow-pitchup")
        .append("svg")
        .attr("width", 150)
        .attr("height", 150)
        .attr("id", "wave-slow-pitchup")
}

function drawWaveforms() {
    d3.selectAll("circle").remove()
    let circleSize = 1
    for (var i = 25; i < 125; i++) {
        circleSize += 0.15
        arrayIndex++
        // TOP ROW
        // Q
        x = i
        y = 115 + sin((i) / 12) * (modulationAmount * 25)
        d3.select("#wave-slow-vibrato")
            .append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("id", "circle" + (i - 25))
            .attr("r", 1)
            // coords[0].push([i, 115 + sin((i)/12) * 5])
        coords[0][arrayIndex] = [x, y]
            // W
        x = i
        y = 115 + sin((i + 20) / 6) * (modulationAmount * 25)
        d3.select("#wave-medium-vibrato")
            .append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("id", "circle" + (i - 25))
            .attr("r", 1)
        coords[1][arrayIndex] = [x, y]
            // E
        x = i
        y = 115 + sin((i / 2)) * (modulationAmount * 25)
        d3.select("#wave-fast-vibrato")
            .append("circle")
            .attr("cx", i)
            .attr("cy", y)
            .attr("id", "circle" + (i - 25))
            .attr("r", 1)
        coords[2][arrayIndex] = [x, y]

        // MIDDLE ROW
        // A
        x = mapRange(i, 25, 125, 0, 140)
        y = 150 - ((i) / 2)
        d3.select("#wave-slow-pitchup")
            .append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("id", "circle" + (i - 25))
            .attr("r", (mapRange(circleSize, 1, 15, 1, 10) ** 2) / 50)
        coords[3][arrayIndex] = [x, y]
            // S
        x = mapRange(i, 25, 125, 32.5, 112.5)
        y = 150 - ((i) / 2)
        d3.select("#wave-medium-pitchup")
            .append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("id", "circle" + (i - 25))
            .attr("r", 0.01 + mapRange(circleSize, 1, 15, 1, 10) ** 2 / 50)
        coords[4][arrayIndex] = [x, y]
            // D
        x = mapRange(i, 25, 125, 65, 85)
        y = 150 - ((i) / 2)
        d3.select("#wave-fast-pitchup")
            .append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("id", "pdcircle" + (i - 25))
            .attr("r", 0.01 + mapRange(circleSize, 1, 15, 1, 10) ** 2 / 50)
        coords[5][arrayIndex] = [x, y]

        // BOTTOM ROW
        // Z
        x = mapRange(i, 25, 125, 10, 150)
        y = 150 - ((i) / 2)
        d3.select("#wave-slow-pitchdown")
            .append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("id", "circle" + (i - 25))
            .attr("r", (mapRange(circleSize, 1, 15, 10, 1) ** 2) / 50)
        coords[6][(99 - arrayIndex)] = [x, y]
            // X
        x = mapRange(i, 25, 125, 32.5, 112.5)
        y = 150 - ((i) / 2)
        d3.select("#wave-medium-pitchdown")
            .append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("id", "circle" + (i - 25))
            .attr("r", 0.01 + mapRange(circleSize, 1, 15, 10, 1) ** 2 / 50)
        coords[7][(99 - arrayIndex)] = [x, y]
            // C
        x = mapRange(i, 25, 125, 65, 85)
        y = 150 - ((i) / 2)
        d3.select("#wave-fast-pitchdown")
            .append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("id", "circle" + (i - 25))
            .attr("r", 0.01 + mapRange(circleSize, 1, 15, 10, 1) ** 2 / 50)
        coords[8][(99 - arrayIndex)] = [x, y]
    }
}
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const data = [
    {axis: "Coding Languages", value: 0.3},
    {axis: "System Design", value: 0.8},
    {axis: "Frameworks", value: 0.9},
    {axis: "Algorithms", value: 0.9},
    {axis: "Varsion Control", value: 0.5},
    {axis: "Soft Skills", value: 0.7},
    {axis: "Debugging", value: 0.6},
    {axis: "Career Strategy", value: 0.8},
];

const SearchChart = () => {
    const svgRef = useRef();
    const resources = useSelector(state => state.resources);
    const width = 1600;
    const height = 1600;

    Object.values(resources).forEach(entry => {
        let words = entry.keyWords.split(',')

        for (let word of words) {
            console.log(data.axis === word)
        }

    })


    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        svg
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;")


        const radius = Math.min(width, height) / 2 - 50;
        const angleSlice = (2 * Math.PI) / data.length;

        const rScale = d3.scaleLinear().domain([0, 1]).range([0, radius]);

        const radialLine = d3.lineRadial()
            .radius(d => rScale(d.value))
            .angle((d, i) => i * angleSlice);

        // Create axes
        const axis = svg.append("g").attr("transform", `translate(${width / 2}, ${height / 2})`);
        axis.selectAll(".axis")
            .data(data)
            .enter()
            .append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", (d, i) => rScale(1) * Math.cos(angleSlice * i - Math.PI / 2))
            .attr("y2", (d, i) => rScale(1) * Math.sin(angleSlice * i - Math.PI / 2))
            .attr("stroke", "#aaa")
            .attr("stroke-width", 2);

        // Radar shape
        svg.append("g").attr("transform", `translate(${width / 2}, ${height / 2})`)
            .append("path")
            .datum(data)
            .attr("d", radialLine)
            .attr("fill", "rgba(42, 113, 86, 0.4)")
            .attr("stroke", "#2a7156")
            .attr("stroke-width", 4);


    }, [resources, data])

    return (
        <>
            <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg" viewBox={[0, 0, width, height]} style={{maxWidth: '100%', height: 'auto', font: '10px sans-serif'}}>
                <circle r="770" cx={width / 2} cy={height / 2} fill="none" stroke="rgba(11, 77, 11, 0.5)" strokeWidth="1" />
                <svg ref={svgRef}></svg>
            </svg>
        </>
    )
}

export default SearchChart;

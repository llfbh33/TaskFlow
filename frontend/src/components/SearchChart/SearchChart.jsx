import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';


const SearchChart = () => {
    const svgRef = useRef();
    const resources = useSelector(state => state.resources);
    const width = 1600;
    const height = 1600;
    // const [data, setData] = useState([]);


    // useEffect(() => {


    // }, [resources])



    useEffect(() => {
        let data = [
            {axis: "Coding Languages", value: 0},
            {axis: "System Design", value: 0},
            {axis: "Frameworks", value: 0},
            {axis: "Algorithms", value: 0},
            {axis: "Version Control", value: 0},
            {axis: "Soft Skills", value: 0},
            {axis: "Debugging", value: 0},
            {axis: "Career Strategy", value: 0},
        ]
        let total = Object.values(resources).length;
        for (let i = 0; i < Object.values(resources).length; i++) {
            let words = Object.values(resources)[i].keyWords.split(',');
            for (let word of words) {

                switch (word) {
                    case 'Coding Languages':
                        data[0].value++;
                        break;
                    case "System Design":
                        data[1].value++;
                        break;
                    case "Frameworks":
                        data[2].value++;
                        break;
                    case "Algorithms":
                        data[3].value++;
                        break;
                    case "Version Control":
                        data[4].value++;
                        break;
                    case "Soft Skills":
                        data[5].value++;
                        break;
                    case "Debugging":
                        data[6].value++;
                        break;
                    case "Career Strategy":
                        data[7].value++;
                        break;
                    default:
                        break;
                }
            }
        }

        for (let i = 0; i < data.length; i++) {
            data[i].value = data[i].value / total
        }


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


    }, [resources])

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

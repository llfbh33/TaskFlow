import * as d3 from 'd3';
import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

const BarChart = ({ handleSearch }) => {
    const svgRef = useRef();
    const resources = useSelector(state => state.resources);

    useEffect(() => {
        const data = [
            { bar: "Soft Skills", value: 0 },
            { bar: "System Design", value: 0 },
            { bar: "Frameworks", value: 0 },
            { bar: "Algorithms", value: 0 },
            { bar: "Version Control", value: 0 },
            { bar: "Coding Languages", value: 0 },
            { bar: "Debugging", value: 0 },
            { bar: "Career Strategy", value: 0 },
        ];

        const map = new Map();
        for (let item of data) {
            map.set(item.bar, item);
        }

        for (let resource of Object.values(resources)) {
            let words = resource.keyWords.split(',');

            for (let word of words) {
                let key = word.trim();
                let entry = map.get(key);

                if (entry) {
                    entry.value++;
                }
            }
        }

        const width = 1000;
        const height = 800;
        const margin = { top: 30, right: 30, bottom: 260, left: 80 };

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        svg
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .style("max-width", "100%")
            .style("height", "auto");

        const x = d3.scaleBand()
            .domain(data.map(d => d.bar))
            .range([margin.left, width - margin.right])
            .padding(0.25);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value) || 1])
            .nice()
            .range([height - margin.bottom, margin.top]);

        // X axis
        const xAxis = svg.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(x))

        xAxis
            .selectAll("text")
            .attr("transform", "rotate(-55)")
            .style("text-anchor", "end")
            .attr("font-size", "3em")
            .attr("cursor", "pointer")
            .attr("transition", "all 0.3s ease;")
            .on("mouseover", function () {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("fill", "blue")
                    .attr("font-size", "3.5em");
            })
            .on("mouseout", function () {
                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr("fill", "black")
                    .attr("font-size", "3em");
            })
            .on("click", (event, d) => {
                handleSearch(d);
            });

        // Y axis
        const yAxis = svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y));

        yAxis
            .selectAll(".tick")
            .filter((d, i) => i % 2 !== 0)
            .remove();

        yAxis
            .selectAll("text")
            .style("font-size", "2rem");


        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => x(d.bar))
            .attr("y", d => y(d.value))
            .attr("width", x.bandwidth())
            .attr("height", d => height - margin.bottom - y(d.value))
            .attr("rx", 6)
            .attr("ry", 6)
            .attr("fill", "#69b3a2");

    }, [resources]);

    return <svg ref={svgRef}></svg>;
};

export default BarChart;
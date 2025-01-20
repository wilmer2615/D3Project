document.getElementById('generate-chart').addEventListener('click', () => {
  const input = document.getElementById('data-input').value;
  const data = input.split(',').map(Number).filter((d) => !isNaN(d));

  if (data.length === 0) {
    alert('Please enter valid numbers.');
    return;
  }

  // Clear the existing chart
  d3.select('#chart').selectAll('*').remove();

  // Set dimensions
  const width = 500;
  const height = 100;
  const margin = { top: 20, right: 30, bottom: 30, left: 10 };

  // Create SVG container
  const svg = d3.select('#chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Set scales
  const x = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .nice()
    .range([0, width]);

  const y = d3.scaleBand()
    .domain(data.map((_, i) => i))
    .range([0, height])
    .padding(0.1);

  // Create a color scale with d3.interpolateRainbow for unique colors
  const colorScale = d3.scaleSequential(d3.interpolateRainbow)
    .domain([0, data.length]);

  // Draw horizontal bars
  svg.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('y', (_, i) => y(i)) // Vertical position based on index
    .attr('x', 0) // Start from the left edge
    .attr('height', y.bandwidth()) // Height based on band scale
    .attr('width', (d) => x(d)) // Width based on data value
    .attr('fill', (_, i) => colorScale(i)); // Assign unique color to each bar

  // Add text inside the bars
  svg.selectAll('.text-inside')
    .data(data)
    .enter()
    .append('text')
    .attr('class', 'text-inside')
    .attr('x', (d) => x(d) - 5) // Position text near the end of the bar
    .attr('y', (_, i) => y(i) + y.bandwidth() / 2) // Center text vertically
    .attr('dy', '.35em') // Adjust vertical alignment
    .attr('fill', 'white') // Color for contrast
    .attr('text-anchor', 'end') // Align text to the end of the bar
    .text((d) => d);
});

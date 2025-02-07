import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { NetworkState } from '../types';

interface NetworkVisualizationProps {
  networkState: NetworkState;
  input1: number;
  input2: number;
}

const NetworkVisualization: React.FC<NetworkVisualizationProps> = ({
  networkState,
  input1,
  input2
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const container = svgRef.current.parentElement;
    const width = container ? container.clientWidth : 600;
    const height = container ? container.clientHeight : 400;
    const svg = d3.select(svgRef.current).attr("viewBox", `0 0 ${width} ${height}`).attr("preserveAspectRatio", "xMidYMid meet");

    svg.selectAll("*").remove();

    // Set background
    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#111827');

    const centerX = width / 2;
    const centerY = height / 2;

    // Define network structure
    const layers = [
      [{ x: centerX - 200, y: centerY - 50, value: input1 }, { x: centerX - 200, y: centerY + 50, value: input2 }], // Input layer
      [{ x: centerX, y: centerY - 30 }, { x: centerX, y: centerY + 30 }], // Hidden layer
      [{ x: centerX + 200, y: centerY }] // Output layer
    ];

    // Draw connections
    layers.forEach((layer, i) => {
      if (i < layers.length - 1) {
        layer.forEach((node, j) => {
          layers[i + 1].forEach((nextNode, k) => {
            const weight = networkState.weights[i]?.[j * layers[i + 1].length + k] || 0;
            const opacity = Math.abs(weight);
            const color = weight > 0 ? '#ef4444' : '#4b5563';

            svg.append('line')
              .attr('x1', node.x)
              .attr('y1', node.y)
              .attr('x2', nextNode.x)
              .attr('y2', nextNode.y)
              .attr('stroke', color)
              .attr('stroke-width', 2)
              .attr('opacity', opacity);
          });
        });
      }
    });

    // Draw nodes
    layers.forEach((layer, i) => {
      layer.forEach((node, j) => {
        const g = svg.append('g');

        g.append('circle')
          .attr('cx', node.x)
          .attr('cy', node.y)
          .attr('r', 20)
          .attr('fill', '#1f2937')
          .attr('stroke', '#ef4444')
          .attr('stroke-width', 2);

        if (i === 0) {
          g.append('text')
            .attr('x', node.x)
            .attr('y', node.y)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .attr('fill', '#ffffff')
            .text(node.value);
        }
      });
    });
  }, [networkState, input1, input2]);

  return (
    <div className="w-full h-auto flex justify-center">
      <svg ref={svgRef} className="rounded-lg shadow-lg w-full h-auto" />
    </div>
  );
};

export default NetworkVisualization;

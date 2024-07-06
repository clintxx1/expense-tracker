// app/components/LineChart.tsx
import React from 'react';
import { View } from 'react-native';
import Svg, { Polyline, Line, Text } from 'react-native-svg';

interface LineChartProps {
  data: number[];
  width: number;
  height: number;
  color: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, width, height, color }) => {
  // Prepare data
  const maxX = data.length - 1;
  const maxY = Math.max(...data);

  const points = data.map((point, index) => {
    const x = (index / maxX) * width;
    const y = height - (point / maxY) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <View>
      <Svg width={width} height={height}>
        {/* Draw x and y axis */}
        <Line x1="0" y1={height.toString()} x2={width.toString()} y2={height.toString()} stroke="black" strokeWidth="2" />
        <Line x1="0" y1="0" x2="0" y2={height.toString()} stroke="black" strokeWidth="2" />

        {/* Draw line chart */}
        <Polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
        />

        {/* Optionally, add labels for x and y axis */}
        <Text
          x={(width / 2).toString()}
          y={(height + 20).toString()}
          fontSize="10"
          fill="black"
          textAnchor="middle"
        >
          X Axis
        </Text>
        <Text
          x="-20"
          y={(height / 2).toString()}
          fontSize="10"
          fill="black"
          textAnchor="middle"
          transform={`rotate(-90, -20, ${height / 2})`}
        >
          Y Axis
        </Text>
      </Svg>
    </View>
  );
};

export default LineChart;

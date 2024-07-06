// app/components/BarChart.tsx
import React from 'react';
import { View } from 'react-native';
import Svg, { Rect, Text } from 'react-native-svg';
import { ThemedText } from './ThemedText';

interface BarChartProps {
  data: { label: string; value: number }[];
  width: number;
  height: number;
  barColor: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, width, height, barColor }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  const barWidth = width / data.length;

  return (
    <View>
      <Svg width={"100%"} height={height}>
        {/* Draw bars */}
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * height;
          const x = index * barWidth;
          const y = height - barHeight;

          return (
            <Rect
              key={index}
              x={x}
              y={y}
              width={barWidth - 10} // Adding some spacing between bars
              height={barHeight}
              fill={barColor}
            />
          );
        })}

        {/* Draw labels */}
        {data.map((item, index) => {
          const x = index * barWidth + (barWidth / 2) - 5; // Centering the label under the bar
          const y = height + 15; // Positioning the label below the chart

          return (
            <Text
              key={index}
              x={x}
              y={y}
              fontSize="10"
              fill="black"
              textAnchor="middle"
            >
              {item.label}
            </Text>
          );
        })}

        {/* Draw values */}
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * height;
          const x = index * barWidth + (barWidth / 2) - 5; // Centering the value above the bar
          const y = height - barHeight - 5; // Positioning the value above the bar

          return (
            <Text
              key={index}
              x={x}
              y={y}
              fontSize="10"
              fill="white"
              textAnchor="middle"
            >
              {item.value}
            </Text>
          );
        })}
      </Svg>
    </View>
  );
};

export default BarChart;

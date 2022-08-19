import React, { useEffect } from "react";

import {
  backgroundColor,
  randomAngle,
  randomColor,
  closestRightAngle,
} from "../utils.js";
import { Arc, Line } from "../Shapes.js";

export const handler = ({ inputs, mechanic }) => {
  const { width: realWidth, height: realHeight, margin } = inputs;

  const width = realWidth - 2 * margin;
  const height = realHeight - 2 * margin;
  const radius = Math.min(width, height);

  useEffect(() => {
    mechanic.done();
  }, []);

  const initialAngle = randomAngle();
  const roundedInitialAngle = closestRightAngle(initialAngle);
  const line1 = {
    x1: width / 2,
    y1: height / 2,
    x2: width / 2 + (radius / 2) * Math.sin(initialAngle),
    y2: height / 2 - (radius / 2) * Math.cos(initialAngle),
  };
  const line1Color = randomColor();
  const line1IsDashed = Math.random() > 0.75;
  const showLine1 = true;

  const secondAngleOffset = randomAngle(Math.PI / 8, (3 * Math.PI) / 4);
  const secondAngle = initialAngle + secondAngleOffset;
  const line2 = {
    x1: width / 2,
    y1: height / 2,
    x2: width / 2 + (radius / 2) * Math.sin(secondAngle),
    y2: height / 2 - (radius / 2) * Math.cos(secondAngle),
  };
  const line2Color = randomColor([line1Color]);
  const line2IsDashed = Math.random() > 0.75;
  const showLine2 = true;

  const thirdAngleOffset = randomAngle(Math.PI / 8, (3 * Math.PI) / 4);
  const isThirdAndExtensionOfFirst = Math.random() > 0.5;
  const thirdAngle = isThirdAndExtensionOfFirst
    ? initialAngle + Math.PI
    : secondAngle + thirdAngleOffset;
  const line3 = {
    x1: width / 2,
    y1: height / 2,
    x2: width / 2 + (radius / 2) * Math.sin(thirdAngle),
    y2: height / 2 - (radius / 2) * Math.cos(thirdAngle),
  };
  let line3Color = randomColor([line1Color, line2Color]);
  line3Color = isThirdAndExtensionOfFirst ? line1Color : line3Color;
  let line3IsDashed = Math.random() > 0.75;
  line3IsDashed = isThirdAndExtensionOfFirst ? line1IsDashed : line3IsDashed;
  const showLine3 = true;

  const forthAngleOffset = randomAngle(Math.PI / 8, (1 * Math.PI) / 4);
  const isForthAndExtensionOfSecond = Math.random() > 0.5;
  const isForthAndExtensionOfFirst =
    Math.random() > 0.5 &&
    !isForthAndExtensionOfSecond &&
    thirdAngle < initialAngle + (7 * Math.PI) / 8;
  const forthAngle = isForthAndExtensionOfSecond
    ? secondAngle + Math.PI
    : isForthAndExtensionOfFirst
    ? initialAngle + Math.PI
    : thirdAngle + forthAngleOffset;
  const line4 = {
    x1: width / 2,
    y1: height / 2,
    x2: width / 2 + (radius / 2) * Math.sin(forthAngle),
    y2: height / 2 - (radius / 2) * Math.cos(forthAngle),
  };
  let line4Color = randomColor([line1Color, line2Color, line3Color]);
  line4Color = isThirdAndExtensionOfFirst
    ? line2Color
    : isForthAndExtensionOfFirst
    ? line1Color
    : line4Color;
  let line4IsDashed = Math.random() > 0.75;
  line4IsDashed = isThirdAndExtensionOfFirst
    ? line2IsDashed
    : isForthAndExtensionOfFirst
    ? line1IsDashed
    : line4IsDashed;
  const showLine4 = Math.random() > 0.5;

  const arc1Color = randomColor([line1Color, line2Color]);
  const showArc1 = true;
  const arc1InnerRadius = Math.random() > 0.5 ? 0 : radius / 10;
  const arc2Color = randomColor([arc1Color, line3Color, line2Color]);
  const showArc2 = Math.random() > 0.5;
  const arc2InnerRadius = Math.random() > 0.5 ? 0 : radius / 10;
  const arc3Color = randomColor([arc1Color, arc2Color, line4Color]);
  const showArc3 = Math.random() > 0.5;
  const arc3InnerRadius = Math.random() > 0.5 ? 0 : radius / 10;
  const arc4Color = randomColor([arc1Color, arc2Color, arc3Color]);
  const showArc4 = Math.random() > 0.5;
  const arc4InnerRadius = Math.random() > 0.5 ? 0 : radius / 10;

  return (
    <svg width={realWidth} height={realHeight}>
      <rect width={realWidth} height={realHeight} fill={backgroundColor} />
      <g transform={`translate(${margin}, ${margin})`}>
        <g
          transform={`translate(${width / 2} ${height / 2}) rotate(${
            ((roundedInitialAngle - initialAngle) * 180) / Math.PI
          }) translate(${-width / 2} ${-height / 2})`}
        >
          {showLine1 && showLine2 && showArc1 && (
            <Arc
              radius={radius / 5}
              innerRadius={arc1InnerRadius}
              startAngle={initialAngle}
              endAngle={secondAngle}
              cx={width / 2}
              cy={height / 2}
              fill={arc1Color}
            />
          )}
          {showLine2 && showLine3 && showArc2 && (
            <Arc
              radius={radius / 5}
              innerRadius={arc2InnerRadius}
              startAngle={secondAngle}
              endAngle={thirdAngle}
              cx={width / 2}
              cy={height / 2}
              fill={arc2Color}
            />
          )}
          {showLine3 && showLine4 && showArc3 && (
            <Arc
              radius={radius / 5}
              innerRadius={arc3InnerRadius}
              startAngle={thirdAngle}
              endAngle={forthAngle}
              cx={width / 2}
              cy={height / 2}
              fill={arc3Color}
            />
          )}
          {showLine4 && showLine1 && showArc4 && (
            <Arc
              radius={radius / 5}
              innerRadius={arc4InnerRadius}
              startAngle={forthAngle}
              endAngle={2 * Math.PI + initialAngle}
              cx={width / 2}
              cy={height / 2}
              fill={arc4Color}
            />
          )}

          {showLine1 && (
            <Line
              x1={line1.x1}
              y1={line1.y1}
              x2={line1.x2}
              y2={line1.y2}
              stroke={line1Color}
              dashed={line1IsDashed}
            />
          )}
          {showLine2 && (
            <Line
              x1={line2.x1}
              y1={line2.y1}
              x2={line2.x2}
              y2={line2.y2}
              stroke={line2Color}
              dashed={line2IsDashed}
            />
          )}
          {showLine3 && (
            <Line
              x1={line3.x1}
              y1={line3.y1}
              x2={line3.x2}
              y2={line3.y2}
              stroke={line3Color}
              dashed={line3IsDashed}
            />
          )}
          {showLine4 && (
            <Line
              x1={line4.x1}
              y1={line4.y1}
              x2={line4.x2}
              y2={line4.y2}
              stroke={line4Color}
              dashed={line4IsDashed}
            />
          )}
        </g>
      </g>
    </svg>
  );
};

export const inputs = {
  width: {
    type: "number",
    default: 400,
  },
  height: {
    type: "number",
    default: 300,
  },
  margin: {
    type: "number",
    default: 50,
  },
};

export const settings = {
  engine: require("@mechanic-design/engine-react"),
};
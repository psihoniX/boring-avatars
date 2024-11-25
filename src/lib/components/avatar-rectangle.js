import * as React from 'react';
import { hashCode, getUnit, getRandomColor, getBoolean } from '../utilities';

const ELEMENTS = 4;

function generateColors(name, colors, width, height) {
  const numFromName = hashCode(name);
  const range = colors && colors.length;

  const elementsProperties = Array.from({ length: ELEMENTS }, (_, i) => ({
    color: getRandomColor(numFromName + i, colors, range),
    translateX: getUnit(numFromName * (i + 1), width / 2 - (i + 17), 1),
    translateY: getUnit(numFromName * (i + 1), height / 2 - (i + 17), 2),
    rotate: getUnit(numFromName * (i + 1), 360),
    isSquare: getBoolean(numFromName, 2),
  }));

  return elementsProperties;
}

const AvatarRectangle = (props) => {
  const { name, colors, title, square, width, height, ...otherProps } = props;
  const properties = generateColors(name, colors);
  const maskID = React.useId();

  const W = width || 200; // Default width if not provided
  const H = height || 100; // Default height if not provided

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width={W}
      height={H}
      {...otherProps}
    >
      {title && <title>{name}</title>}
      <mask id={maskID} maskUnits="userSpaceOnUse" x={0} y={0} width={W} height={H}>
        <rect
          width={W}
          height={H}
          rx={undefined} // Adjust corner radius for non-square
          fill="#FFFFFF"
        />
      </mask>
      <g mask={`url(#${maskID})`}>
        <rect width={W} height={H} fill={properties[0].color} />
        <rect
          x={(W - 60) / 2}
          y={(H - 20) / 2}
          width={W}
          height={properties[1].isSquare ? H : H / 8}
          fill={properties[1].color}
          transform={
            'translate(' +
            properties[1].translateX +
            ' ' +
            properties[1].translateY +
            ') rotate(' +
            properties[1].rotate +
            ' ' +
            W / 2 +
            ' ' +
            H / 2 +
            ')'
          }
        />
        <circle
          cx={W / 2}
          cy={H / 2}
          fill={properties[2].color}
          r={Math.min(W, H) / 5}
          transform={'translate(' + properties[2].translateX + ' ' + properties[2].translateY + ')'}
        />
        <line
          x1={0}
          y1={H / 2}
          x2={W}
          y2={H / 2}
          strokeWidth={2}
          stroke={properties[3].color}
          transform={
            'translate(' +
            properties[3].translateX +
            ' ' +
            properties[3].translateY +
            ') rotate(' +
            properties[3].rotate +
            ' ' +
            W / 2 +
            ' ' +
            H / 2 +
            ')'
          }
        />
      </g>
    </svg>
  );
};

export default AvatarRectangle;
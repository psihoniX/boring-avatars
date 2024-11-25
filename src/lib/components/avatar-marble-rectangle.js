import * as React from 'react';
import { hashCode, getUnit, getRandomColor } from '../utilities';

const ELEMENTS = 5;

function generateColors(name, colors) {
  const numFromName = hashCode(name);
  const range = colors && colors.length;

  const elementsProperties = Array.from({ length: ELEMENTS }, (_, i) => ({
    color: getRandomColor(numFromName + i, colors, range),

    // Scale and shift values to desired ranges
    translateX: 200 + Math.abs(getUnit(numFromName * (i + 1), 800, 1)), // [200, 1000]
    translateY: 200 + Math.abs(getUnit(numFromName * (i + 1), 200, 2)), // [200, 400]

    scale: 1.2 + getUnit(numFromName * (i + 1), 2000 / 20) / 10,
    rotate: getUnit(numFromName * (i + 1), 360, 1),
  }));

  return elementsProperties;
}

const AvatarMarbleRectangle = (props) => {
  const { name, colors, title, square, width, height, ...otherProps } = props;
  const properties = generateColors(name, colors);
  const maskID = React.useId();

  const W = width || 1440; // Default width if not provided
  const H = height || 150; // Default height if not provided

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
          rx={undefined}
          fill="#FFFFFF"
        />
      </mask>
      <g mask={`url(#${maskID})`}>
        <rect width={W} height={H} fill={properties[0].color} />
        <path
          filter={`url(#filter_${maskID})`}
          d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z"
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
            ') scale(' +
            properties[2].scale +
            ')'
          }
        />
        <path
          filter={`url(#filter_${maskID})`}
          style={{
            mixBlendMode: 'overlay',
          }}
          d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z"
          fill={properties[2].color}
          transform={
            'translate(' +
            properties[2].translateX +
            ' ' +
            properties[2].translateY +
            ') rotate(' +
            properties[2].rotate +
            ' ' +
            W / 2 +
            ' ' +
            H / 2 +
            ') scale(' +
            properties[2].scale +
            ')'
          }
        />
        <path
          filter={`url(#filter_${maskID})`}
          style={{
            mixBlendMode: 'overlay',
          }}
          d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z"
          fill={properties[3].color}
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
            ') scale(' +
            properties[3].scale +
            ')'
          }
        />
        <path
          filter={`url(#filter_${maskID})`}
          style={{
            mixBlendMode: 'overlay',
          }}
          d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z"
          fill={properties[0].color}
          transform={
            'translate(' +
            properties[0].translateX +
            ' ' +
            properties[0].translateY +
            ') rotate(' +
            properties[0].rotate +
            ' ' +
            W / 2 +
            ' ' +
            H / 2 +
            ') scale(' +
            properties[0].scale +
            ')'
          }
        />
        <path
          filter={`url(#filter_${maskID})`}
          d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z"
          fill={properties[4].color}
          transform={
            'translate(' +
            properties[4].translateX +
            ' ' +
            properties[4].translateY +
            ') rotate(' +
            properties[4].rotate +
            ' ' +
            W / 2 +
            ' ' +
            H / 2 +
            ') scale(' +
            properties[2].scale +
            ')'
          }
        />
      </g>
      <defs>
        <filter
          id={`filter_${maskID}`}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation={7} result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  );
};

export default AvatarMarbleRectangle;

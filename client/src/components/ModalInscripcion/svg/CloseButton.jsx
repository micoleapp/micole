import React from 'react'

export default function CloseButton() {
    return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="36"
          fill="none"
          viewBox="0 0 38 36"
        >
          <g filter="url(#filter0_d_2555_129)">
            <ellipse cx="19" cy="16" fill="#fff" rx="15" ry="14"></ellipse>
          </g>
          <path stroke="#6C6666" strokeWidth="2" d="M27 8L11 24M11 8l16 16"></path>
          <defs>
            <filter
              id="filter0_d_2555_129"
              width="38"
              height="36"
              x="0"
              y="0"
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              ></feColorMatrix>
              <feOffset dy="2"></feOffset>
              <feGaussianBlur stdDeviation="2"></feGaussianBlur>
              <feComposite in2="hardAlpha" operator="out"></feComposite>
              <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
              <feBlend
                in2="BackgroundImageFix"
                result="effect1_dropShadow_2555_129"
              ></feBlend>
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_2555_129"
                result="shape"
              ></feBlend>
            </filter>
          </defs>
        </svg>
      );
}

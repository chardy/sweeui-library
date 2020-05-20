import React from 'react'

const Star = ({ w=24, h=24, fill="#000000", stroke="black", strokeWidth="20" }) => (
  <svg x="0px" y="0px" width={`${w}px`} height={`${h}px`} viewBox="0 0 128 128">
    <path transform="matrix(0.128,0,0,0.128,0,3)" stroke={stroke} strokeWidth={strokeWidth} fill={fill} d="M 993 356 C 987 337 971 323 951 320 L 672 280 L 547 29 C 538 11 519 0 500 0 C 480 0 461 11 452 29 L 327 280 L 48 320 C 28 323 12 337 6 356 C 0 375 5 396 19 409 L 221 605 L 173 882 C 170 901 178 921 194 933 C 203 939 214 943 225 943 C 233 943 242 941 250 937 L 500 806 L 749 937 C 757 941 766 943 774 943 C 785 943 796 939 805 933 C 821 921 829 901 826 882 L 778 605 L 980 409 C 994 396 1000 375 993 356 z"/>
  </svg>
)

export default Star
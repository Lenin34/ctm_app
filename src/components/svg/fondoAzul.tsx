import * as React from "react";
import Svg, { G, Path, Defs, LinearGradient, Stop } from "react-native-svg";
import {Dimensions} from "react-native";
const { width } = Dimensions.get('window');
const aspectRatio = 577 / 393;
const height = width * aspectRatio;
/* SVGR has dropped some elements not supported by react-native-svg: filter */
function SVGComponent (props) {
  return(
      <Svg
          width={width}
          height={width * aspectRatio}
          viewBox="0 0 393 577"
          fill="none"
          {...props}
      >
        <G filter="url(#filter0_f_6029_889)">
          <Path
              d="M47.1176 38.3016C4.7094 57.6138 -19.2976 57.4126 -26 54.898V589H417.276V226.897C414.534 225.388 400.458 215.43 366.093 187.669C323.137 152.968 309.427 199.739 243.621 98.6522C177.815 -2.43494 100.128 14.1614 47.1176 38.3016Z"
              fill="url(#paint0_linear_6029_889)"
              fillOpacity={0.5}
          />
        </G>
        <Defs>
          <LinearGradient
              id="paint0_linear_6029_889"
              x1={366.413}
              y1={102.975}
              x2={106.225}
              y2={591.635}
              gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#0B3F61" />
            <Stop offset={0.33} stopColor="#374752" />
            <Stop offset={0.67} stopColor="#949494" />
            <Stop offset={0.9951} stopColor="#7E7E7E" />
          </LinearGradient>
        </Defs>
      </Svg>
  );
}
export default SVGComponent;

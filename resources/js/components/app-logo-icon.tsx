import { SVGAttributes } from 'react';
import webdedevhqLogo from '../icons/webdevhq-logo.svg';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {

    return (
        <svg
            {...props}
            viewBox="0 0 2134 2134"
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            fillRule="evenodd"
            clipRule="evenodd"
        >
            <g id="Diamant">
                <path
                    d="M2142.943,1076.276l-1057.057,1057.057l-1076.276,-1076.276l1057.057,-1057.057l1076.276,1076.276Z"
                    fill="#1e90ff"
                />
                <path
                    d="M2046.707,1080.461l-956.636,956.636l-970.43,-970.43l956.636,-956.636l970.43,970.43Z"
                    fill="#1677ff"
                />
                <path
                    id="Schatten"
                    d="M1930.587,1195.823l-725.155,725.155l-491.733,-491.733c-200.112,-200.112 -200.112,-525.043 -0,-725.155c200.112,-200.112 525.043,-200.112 725.155,0l491.733,491.733Z"
                    fill="#ffffff"
                    fillOpacity={0.05}
                />
            </g>

            <circle
                cx="1076.276"
                cy="1066.667"
                r="444.144"
                fill="none"
                stroke="#ffffff"
                strokeWidth="141.32"
            />

            <circle
                cx="1076.276"
                cy="1066.667"
                r="137.999"
                fill="#ffffff"
            />
        </svg>
    );
}

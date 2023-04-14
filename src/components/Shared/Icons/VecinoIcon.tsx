import React from "react";

interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
}

const VecinoIcon: React.FC<CustomIconProps> = ({
  fill = "#000000",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      viewBox="0.0 0.0 570.0787401574803 569.9527559055118"
      fill="none"
      stroke="none"
      strokeLinecap="square"
      strokeMiterlimit="10"
      {...props}
    >
      <clipPath id="p.0">
        <path
          d="m0 0l570.07874 0l0 569.95276l-570.07874 0l0 -569.95276z"
          clipRule="nonzero"
        />
      </clipPath>
      <g clipPath="url(#p.0)">
        <path
          fill={fill}
          fillOpacity="0.0"
          d="m0 0l570.07874 0l0 569.95276l-570.07874 0z"
          fillRule="evenodd"
        />
        <path
          fill={fill}
          d="m418.07086 28.047245l123.410645 128.46457l-52.251648 0l0 0c-12.264343 153.35794 -45.74817 279.88626 -90.75171 342.93155c-45.00351 63.045288 -96.497406 55.56189 -139.5646 -20.282318l0 0c38.675415 -68.109985 66.87686 -184.93 77.89053 -322.64923l-52.25168 0z"
          fillRule="evenodd"
        />
        <path
          fill={fill}
          d="m182.70064 541.9055c-42.21115 0 -82.693436 -54.13849 -112.54123 -150.50562c-29.847786 -96.367096 -46.616104 -227.06897 -46.616104 -363.35266l152.42578 0l0 0c0 136.28369 16.76831 266.98557 46.616104 363.35266c29.847794 96.36713 70.33009 150.50562 112.541245 150.50562z"
          fillRule="evenodd"
        />
        <path
          fill={fill}
          fillOpacity="0.0"
          d="m258.91354 479.16104l0 0c38.675415 -68.109985 66.87686 -184.93 77.89053 -322.64923l-52.25168 0l133.51846 -128.46457l123.410645 128.46457l-52.251648 0l0 0c-18.14389 226.8779 -81.527954 385.3937 -154.10342 385.3937l-152.4258 0c-42.21115 0 -82.693436 -54.13849 -112.54123 -150.50562c-29.847786 -96.367096 -46.616104 -227.06897 -46.616104 -363.35266l152.42578 0l0 0c0 136.28369 16.76831 266.98557 46.616104 363.35266c29.847794 96.36713 70.33009 150.50562 112.541245 150.50562"
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
};
export default VecinoIcon;

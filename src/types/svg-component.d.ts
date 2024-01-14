
declare module '~virtual/svg-component' {
  const SvgIcon: (props: {
    name: "community",
    className?:string
    style?: React.CSSProperties
  })=> JSX.Element;
  export const svgNames: ["community"];
  export type SvgName = "community";
  export default SvgIcon;
}

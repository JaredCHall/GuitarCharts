import { JSX } from "preact";

interface FingeringChartProps extends JSX.HTMLAttributes<HTMLDivElement> {
  keyName: string;
  position: string;
  showIntervals: boolean;
  mode: string;
}


export function FingeringChart(props: FingeringChartProps) {
  return (
      <table>
        <tbody>
          <tr><td>Key:</td><td>{props.keyName}</td></tr>
          <tr><td>Position:</td><td>{props.position}</td></tr>
          <tr><td>Mode:</td><td>{props.mode}</td></tr>
          <tr><td>Intervals:</td><td>{props.showIntervals ? '1' : '0'}</td></tr>
        </tbody>
      </table>

  );
}

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { RootState } from "../store/store";
import { useAppSelector } from "../store/hooks";
import { Data } from "../interface/ApiData.interface";
import { Spin } from "antd";

interface FormattedData {
  period: string;
  [key: string]: string | number;
}

function GraphView(): JSX.Element {
  let { graphData, loading, isSearched } = useAppSelector(
    (state: RootState) => state.graphData
  );
  let formattedData: FormattedData[] = [];

  if (graphData.length > 0) {
    formattedData = graphData.reduce((acc: FormattedData[], cur: Data) => {
      const existingIndex = acc.findIndex((data) => data.period === cur.period);
      if (existingIndex > -1) {
        acc[existingIndex][`${cur.group}대`] = cur.ratio;
      } else {
        acc.push({
          period: cur.period,
          [`${cur.group}대`]: cur.ratio,
        });
      }
      return acc;
    }, []);
  }
  const groups = Array.from(new Set(graphData.map((data) => data.group)));
  const colorGenerator = (group: string) => {
    const colors = [
      "#00FFFF",
      "#FFA500",
      "#800080",
      "#008080",
      "#7B68EE",
      "#FFB6C1",
    ];
    return colors[parseInt(group) / 10];
  };

  return (
    <>
      {loading ? (
        <div>
          <Spin />
        </div>
      ) : !loading && formattedData.length !== 0 ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ResponsiveContainer width={"90%"} height={500}>
            <LineChart
              data={formattedData}
              margin={{
                top: 5,
                right: 20,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Legend />
              {groups.map((group, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={`${group}대`}
                  stroke={colorGenerator(group)}
                  activeDot={{ r: 7 }}
                  strokeWidth={1.9}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div>{isSearched && <p>데이터를 찾을 수 없습니다.</p>}</div>
      )}
    </>
  );
}
export default GraphView;

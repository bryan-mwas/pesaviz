import { ResponsivePie } from "@nivo/pie";

export function PieComponent(props: { data: { id: string; value: number }[] }) {
  return (
    <ResponsivePie
      data={props.data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      colors={{ scheme: "category10" }}
      innerRadius={0.5}
      valueFormat={(v) =>
        v.toLocaleString("en-US", {
          style: "currency",
          currency: "KES",
        })
      }
      padAngle={0.7}
      cornerRadius={4}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      arcLinkLabelsTextColor={"#333333"}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
    />
  );
}

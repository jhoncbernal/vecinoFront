import React from "react";
import { Chart } from "react-google-charts";
import { IonCard, IonCardHeader, IonTitle, IonCardContent } from "@ionic/react";


const ChartsContainer: React.FC<any> = () => {
    return (
      <>
      <IonCard>
        <IonCardHeader color='primary'><IonTitle>Pagos por torre</IonTitle></IonCardHeader>
        <IonCardContent>
          <IonCard>
      <Chart
      height={"400px"}
  chartType="Bar"
  loader={<div>Loading Chart</div>}
  data={[
    ["Torres", "Personas al dia", "Personas en mora"],
    ["T1", 104, 0],
    ["T2", 80, 24],
    ["T3", 52, 52],
    ["T4", 60, 54],
    ["T5", 30, 74],
    ["T6", 10, 94],
    ["T7", 52, 52],
    ["T8", 90, 14],
    ["T9", 40, 64],
    ["T10", 60, 54],
  ]}
  options={{
    // Material design options
    chart: {
      title: "",
      subtitle: "Marzo",
    },
  }}
  // For tests
  rootProps={{ "data-testid": "2" }}
/></IonCard></IonCardContent></IonCard>

<IonCard>
        <IonCardHeader color='primary'><IonTitle>% Cartera vencida por torre</IonTitle></IonCardHeader>
        <IonCardContent>
        <IonCard>
        <Chart
  height={"400px"}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    ["Language", "Speakers (in millions)"],
    ["T1",  0],
    ["T2",  0.019166],
    ["T3",  0.041666],
    ["T4",  0.042500],
    ["T5",  0.059166],
    ["T6",  0.075000],
    ["T7",  0.042500],
    ["T8",  0.010833],
    ["T9",  0.050833],
    ["T10", 0.042500],
  ]}
  options={{
    legend: "none",
    pieSliceText: "label",
    pieStartAngle: 100,
  }}
  rootProps={{ "data-testid": "4" }}
/></IonCard></IonCardContent></IonCard>

</>
    );
  };
export default ChartsContainer;

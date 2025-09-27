import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import api from "../services/api"; // your API service

export default function Chart() {
  const chartRef = useRef(null);   // keep root reference
  const dataRef = useRef([{ date: new Date().getTime(), value: 0 }]); // initial data

  useLayoutEffect(() => {
    // 1️⃣ Create root and theme
    const root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root)]);

    // 2️⃣ Create chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
      })
    );

    // 3️⃣ Create axes
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "second", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    // Add X-axis title
    xAxis.children.push(
      am5.Label.new(root, {
        text: "Time (seconds)",
        fontSize: 20,
        fill: am5.color(0x000000),
        x: am5.p50,
        y: am5.p50,  // position below the axis
      })
    );
      

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );
    // Add Y-axis title
    yAxis.children.push(
      am5.Label.new(root, {
        text: `Feature X`,
        rotation: -90,
        fontSize: 20,
        fill: am5.color(0x000000),
        textAlign: "center",
        x: -40,
        y: am5.p50,  // position below the axis
      })
    );


    // 4️⃣ Create line series
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Tilt",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" }),
      })
    );

    // 5️⃣ Assign initial data
    series.data.setAll(dataRef.current);
    series.setAll({
        strokeWidth: 5
    });

    // 6️⃣ Cursor
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "none" })
    );
    cursor.lineY.set("visible", true);

    // 7️⃣ Function to fetch new value and update chart
    async function addNewValue() {
      try {
        const response = await api.getLastData("tilt"); // fetch new value
        const newValue = response.data.value;
        const now = new Date().getTime();
        console.log(newValue);

        dataRef.current.push({ date: now, value: newValue });

        // Keep last 60 points
        if (dataRef.current.length > 60) dataRef.current.shift();

        series.data.setAll(dataRef.current);

        
        // Zoom to show latest data
        xAxis.zoomToDates(
          new Date(dataRef.current[0].date),
          new Date(dataRef.current[dataRef.current.length - 1].date)
        );
      } catch (err) {
        console.error("Error fetching tilt data:", err);
      }
    }

    // 8️⃣ Update every second
    const interval = setInterval(() => {
      addNewValue();
    }, 1000);

    // 9️⃣ Cleanup on unmount
    return () => {
      clearInterval(interval);
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }} />;
}

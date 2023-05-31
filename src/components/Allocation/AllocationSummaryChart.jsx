import { useTheme } from "@rneui/themed";
import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import Pie from "react-native-pie";
import Typography from "../../global/Typography";
import { formatNumber } from "../../helper";

const AllocationSummaryChart = ({ expenseRemainInfo }) => {
  const screenWidth = Dimensions.get("window").width;
  const { theme } = useTheme();
  const { expenses, salary } = expenseRemainInfo;
  const usedPercentage = expenses / salary < 1 ? expenses / salary : 1;
  const chartConfig = {
    backgroundColor: theme.colors.primary,
    backgroundGradientFrom: theme.colors.primary,
    backgroundGradientTo: theme.colors.primary,
    color: index => {
      if (index == 0.2) {
        return "rgba(0,0,0, 0.2)"; // Customize the color for progress value 0.5
      }

      if (usedPercentage == 1) return theme.colors.error;
      else if (usedPercentage >= 0.5) return "orange";
      else return theme.colors.success;
    },
    fillShadowGradientTo: "rgba(0, 0, 0, 0.1)",
  };
  const data = [usedPercentage];
  const style = StyleSheet.create({
    container: {
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
      padding: 0,
      paddingVertical: 25,
      flex: 1,
    },

    progressChart: {
      position: "absolute",
      alignSelf: "center",
      color: "blue",
    },
  });

  return (
    <View style={style.container}>
      <ProgressChart
        data={data}
        width={screenWidth}
        height={500}
        radius={120}
        style={style.progressChart}
        hideLegend={true}
        chartConfig={chartConfig}
      />
      <Typography
        textAlign="center"
        color={theme.colors.white}
        variant="titleBold"
      >
        {formatNumber(expenses)}
      </Typography>
      <Typography
        textAlign="center"
        color={theme.colors.white}
        variant="smallest"
      >
        terpakai dari {formatNumber(salary)}
      </Typography>
    </View>
  );
};

export default AllocationSummaryChart;

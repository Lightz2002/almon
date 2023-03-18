import { useTheme, Input } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { formatNumber } from "../../helper";
import { PieChart } from "react-native-chart-kit";
import Typography from "../../global/Typography";

const AllocationSalary = ({ handleSalaryChange, salary, allocations }) => {
  const { theme } = useTheme();
  const style = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    input: {
      borderWidth: 1,
      backgroundColor: theme.colors.white,
      fontSize: 8,
      fontFamily: "poppins-regular",
      width: "70%",
      borderRadius: 5,
      padding: 5,
    },

    pie: {
      width: "50%",
    },
  });

  const chartConfig = {
    backgroundColor: "#FFAC00",
    backgroundGradientFrom: "#FFAC00",
    backgroundGradientTo: "#A8006D",
    color: (opacity = 1) => `rgba(255, 255, 255, 1)`,
    style: {
      borderRadius: 16,
    },
  };

  const width = Dimensions.get("window").width;
  const height = 220;

  let pieData = [
    {
      name: "Allocation",
      amount: 100,
      color: "#FFAC00",
    },
  ];

  // allocations = allocations.map(allocation => {
  //   return {
  //     name: allocation.expense_category_name,
  //     amount: +allocation.amount,
  //     color: allocation.color,
  //   };
  // });
  if (allocations.length > 0) pieData = allocations;

  return (
    <View style={[style.container]}>
      <View>
        {allocations.length > 0 ? (
          <Typography variant="mainMedium" color={theme.colors.white}>
            {formatNumber(salary)}
          </Typography>
        ) : (
          <Input
            placeholder="Masukkan gaji anda disini"
            inputContainerStyle={style.input}
            containerStyle={{ paddingHorizontal: 0 }}
            keyboardType="phone-pad"
            onChangeText={newSalary => handleSalaryChange(newSalary)}
            value={
              formatNumber(salary, "no-currency") == 0
                ? ""
                : formatNumber(salary, "no-currency")
            }
          />
        )}
      </View>
      <PieChart
        width={width}
        height={height}
        hasLegend={false}
        data={allocations}
        accessor="amount"
        chartConfig={chartConfig}
        style={style.pie}
      />
    </View>
  );
};

export default AllocationSalary;

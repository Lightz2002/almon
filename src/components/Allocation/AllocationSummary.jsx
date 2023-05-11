import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import AllocationSummaryChart from "./AllocationSummaryChart";
import AllocationSummaryList from "./AllocationSummaryList";
import Loading from "../../global/Loading";
import { useIsFocused } from "@react-navigation/native";
import { expenseSummary } from "../../api";

const AllocationSummary = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [expenseRemainPerCategory, setExpenseRemainPerCategory] = useState([]);
  const [expenseRemainInfo, setExpenseRemainInfo] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchExpenseSummary = async () => {
      try {
        let data = await expenseSummary();
        if (data.status === 200) {
          data = data.data;
          setExpenseRemainPerCategory(data.categories);
          setExpenseRemainInfo({
            salary: data.salary,
            expenses: data.expenses,
            remain: data.remain,
          });
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };

    if (isFocused) {
      fetchExpenseSummary();
    }
  }, [isFocused]);

  const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={[style.container]}>
      <AllocationSummaryChart expenseRemainInfo={expenseRemainInfo} />
      <AllocationSummaryList
        expenseRemainPerCategory={expenseRemainPerCategory}
      />
    </View>
  );
};

export default AllocationSummary;

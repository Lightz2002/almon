import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import AllocationList from "./AllocationList";
import AllocationSalary from "./AllocationSalary";
import { useUpdateUser, useUser } from "../../contexts/UserContext";
import { generateAllocation, getAllocation, updateSalary } from "../../api";
import Loading from "../../global/Loading";
import { useIsFocused } from "@react-navigation/native";

const Allocation = () => {
  const user = useUser();
  const isFocused = useIsFocused();
  const [allocations, setAllocations] = useState([]);
  const [salary, setSalary] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const updateUser = useUpdateUser();
  useEffect(() => {
    const fetchAllocation = async () => {
      try {
        let response = await getAllocation(user?.id);
        if (response.status === 200) response = response.data.data;
        if (response.length === 0) {
          /* kalau ad gaji dan kalau g ad */
          if (user?.monthly_salary > 0) {
            response = await generateAllocation(user?.id);
            if (response.status === 200) response = response.data.data;
          } else {
            response = [];
          }
        }

        if (user?.monthly_salary > 0) {
          setSalary(user.monthly_salary);
        }
        setAllocations(response);
        setIsLoading(false);
      } catch (e) {}
    };

    if (isFocused) {
      fetchAllocation();
    }
  }, [isFocused]);

  const handleSubmitSalary = async () => {
    try {
      let response = await updateSalary({
        monthly_salary: salary,
      });
      if (response.status === 200) {
        response = response.data.data;
        updateUser({ ...user, monthly_salary: salary });
      }
      setAllocations(response);
    } catch (e) {
      console.log(e.response);
    }
  };

  const handleSalaryChange = salary => {
    let convertedSalary = salary.replace(/[.,]/g, "");
    if (convertedSalary.length <= 12) {
      convertedSalary = +convertedSalary;
      setSalary(convertedSalary);
    }
  };

  const style = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={[style.container]}>
      <AllocationSalary
        salary={salary}
        allocations={allocations}
        handleSalaryChange={handleSalaryChange}
        handleSubmitSalary={handleSubmitSalary}
      />
      <AllocationList
        allocations={allocations}
        handleSubmitSalary={handleSubmitSalary}
      />
    </View>
  );
};

export default Allocation;

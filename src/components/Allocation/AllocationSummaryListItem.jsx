import { ListItem, Image, useTheme } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "../../global/Typography";
import { formatNumber } from "../../helper";

const AllocationSummaryListItem = ({ expenseRemainPerCategory }) => {
  const { icon, name, allocation, expense } = expenseRemainPerCategory;
  const { theme } = useTheme();

  const isOverExpenseLimit = expense >= allocation;

  const style = StyleSheet.create({
    icon: {
      width: 30,
      height: 30,
    },
    iconContainer: {
      padding: 8,
      backgroundColor: isOverExpenseLimit
        ? theme.colors.error
        : "rgba(224, 224, 224, 0.4)",
      borderRadius: 50,
    },
  });
  return (
    <ListItem containerStyle={style.container}>
      <View style={[style.iconContainer]}>
        <Image source={{ uri: icon }} style={style.icon} />
      </View>
      <ListItem.Content>
        <Typography variant="body2Medium">{name}</Typography>
        <Typography variant="small">
          <Typography
            variant="small"
            color={
              isOverExpenseLimit ? theme.colors.error : theme.colors.success
            }
          >
            {`${formatNumber(expense)}`}
          </Typography>
          {` dari ${formatNumber(allocation)}`}
        </Typography>
      </ListItem.Content>
    </ListItem>
  );
};

export default AllocationSummaryListItem;

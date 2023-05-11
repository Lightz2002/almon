import * as Font from "expo-font";
import "intl";
import "intl/locale-data/jsonp/id"; // or any other locale you need

export const fetchFonts = async () => {
  return Font.loadAsync({
    "poppins-regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "poppins-bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "poppins-medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "poppins-light": require("../assets/fonts/Poppins-Light.ttf"),
  });
};

export const limit = (str, length) => {
  if (typeof str !== "string") return "";
  return str.substring(0, length).concat("...");
};

export const formatNumber = (number, options = "default") => {
  if (isNaN(number)) number = 0;

  let formatOptions = {
    style: "currency",
    currency: "IDR",
  };

  switch (options) {
    case "no-currency":
      formatOptions = {};
      break;
    case "no-minimum-fraction":
      formatOptions.minimumFractionDigits = 0;
      break;
  }

  return new Intl.NumberFormat("id-ID", formatOptions)
    .format(number)
    .replace(/^(\D+)/, "$1 ")
    .replace(/\s+/, " ");
};

export const formatDate = (date, format = "default") => {
  let options = { year: "numeric", month: "numeric", day: "numeric" };

  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let y = date.getFullYear();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  switch (format.toLowerCase()) {
    case "dd-mm-yyyy":
      return `${dd}-${mm}-${y}`;
    case "yyyy-mm-dd":
      return `${y}-${mm}-${dd}`;
    case "yyyy-m-dd":
      options = { ...options, month: "short" };
      break;
    case "full":
      options = { ...options, weekday: "long", month: "long" };
      break;
  }
  return date.toLocaleString("id-Id", options);
};

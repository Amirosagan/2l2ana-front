import { format, isValid } from "date-fns";

export const formatDate = (date) => {
  return isValid(new Date(date))
    ? format(new Date(date), "MMMM dd, yyyy")
    : "Invalid date";
};

import { SegmentedControl } from "@mantine/core";
import classes from "./SortByControl.module.css";

const SortByControl = () => {
  return (
    <SegmentedControl
      radius="xl"
      size="md"
      data={["Top", "Hot", "Controversial", "Date"]}
      classNames={classes}
    />
  );
};

export default SortByControl;

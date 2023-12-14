import { SegmentedControl } from "@mantine/core";
import classes from "./SortByControl.module.css";
import { useNavigate } from "react-router-dom";

const SortByControl = () => {
  const navigate = useNavigate();
  return (
    <SegmentedControl
      radius="sm"
      size="sm"
      data={["Top", "Hot", "Controversial", "Date"]}
      classNames={classes}
      onChange={(value) =>
        navigate({ pathname: "/posts", search: "?sortBy=" + value.toLowerCase() })
      }
    />
  );
};

export default SortByControl;

import React from "react";
import { Select, Space } from "antd";

export const WorkoutSelector = ({
  level,
  gender,
  onLevelChange,
  onGenderChange,
}) => {
  return (
    <Space className="flex items-start flex-col">
      <Select
        value={level}
        onChange={onLevelChange}
        className="w-40"
        options={[
          { value: "Beginner", label: "Beginner" },
          { value: "Intermediate", label: " Intermediate" },
          { value: "Pro", label: "Pro" },
        ]}
      />
      <Select
        value={gender}
        onChange={onGenderChange}
        className="w-32"
        options={[
          { value: "Men", label: "Men" },
          { value: "Women", label: "Women" },
        ]}
      />
    </Space>
  );
};

export default WorkoutSelector;

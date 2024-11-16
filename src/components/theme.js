import { Switch } from "antd";
import React from "react";

export default function Theme({ setIsDarkMode, isDarkMode }) {
  const onChange = (checked) => {
    setIsDarkMode(checked);
  };
  return (
    <div>
      <Switch
        checkedChildren="Dark"
        unCheckedChildren="Light"
        onChange={onChange}
      />
    </div>
  );
}

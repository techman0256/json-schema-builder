
import React from "react";

interface JSONTextareaProps {
  data: any;
  rows?: number;
  cols?: number;
  readOnly?: boolean;
}

const JSONTextarea: React.FC<JSONTextareaProps> = ({
  data,
  rows = 20,
  cols = 80,
  readOnly = true,
}) => {
  const formattedJSON = JSON.stringify(data, null, 2);

  return (
    <textarea
      value={formattedJSON}
      readOnly={readOnly}
      rows={rows}
      cols={cols}
      style={{
        width: "100%",
        fontFamily: "monospace",
        whiteSpace: "pre",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        resize: "vertical",
        backgroundColor: "#f9f9f9",
      }}
    />
  );
};

export default JSONTextarea;

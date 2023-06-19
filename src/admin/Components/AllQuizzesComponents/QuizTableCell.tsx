import React from "react";
import TableCell from "@mui/material/TableCell";

interface Column {
  id: "number" | "title" | "description" | "id" | "short_code";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

interface QuizTableCell {
  column: Column;
  value: any;
  deleteQuiz?: any;
  row_id?: any;
}

export default function QuizTableCell({ column, value,  deleteQuiz, row_id }: QuizTableCell) {
  const [copied, setCopied] = React.useState(false);
  return (
    <TableCell key={column.id} align={column.align}>
      {column.format && typeof value === "number" ? (
        column.format(value)
      ) : column.id === "short_code" ? (
        <>
          <span
            style={{
              cursor: "pointer",
              backgroundColor: "#dcdcde",
              padding: "8px 10px",
              borderRadius: "2px",
              transition: "opacity 0.3s",
              opacity: copied ? 0.5 : 1,
            }}
            onClick={() => {
              const valueToCopy = String(value);
              navigator.clipboard.writeText(valueToCopy);
              setCopied(true);

              // Reset the copied state after a delay
              setTimeout(() => {
                setCopied(false);
              }, 5000);
            }}
          >
            {value}
          </span>
          {/* {copied && (
            <span style={{ color: "gray", marginLeft: "5px" }}>Copied</span>
          )} */}
        </>
      ) : (
        value
      )}

      {column.id === "title" && (
        <>
          <br />
          <button
            className="text-[#ff3232] font-bold"
            onClick={() => {
              deleteQuiz(row_id);
            }}
          >
            Delete
          </button>
        </>
      )}
    </TableCell>
  );
}

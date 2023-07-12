import * as React from "react";
import { useState } from "react";
import QuizTableCell from "./QuizTableCell";
import { TableRow } from "@mui/material";

interface Column {
  id: "number" | "title" | "description" | "id" | "short_code";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: "number",
    label: "#",
    minWidth: 170,
  },
  { id: "title", label: "Title", minWidth: 170 },
  { id: "description", label: "Description", minWidth: 370 },
  { id: "short_code", label: "Short Code", minWidth: 170 },
];

interface QuizTableRowProps {
  key: any;
  row: any;
  index: any;
  refresh: any;
  setRefresh: any;
}

export default function QuizTableRow({
  row,
  index,
  refresh,
  setRefresh,
}: QuizTableRowProps) {
  const [hover, setHover] = useState(true);
  const [active, setActive] = useState(true);

  return (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      key={index}
      className={!active ? "opacity-50" : ""}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {columns.map((column, index) => {
        const value = row[column.id];
        return (
          <QuizTableCell
            key={index}
            column={column}
            value={value}
            row_id={row.id}
            refresh={refresh}
            setRefresh={setRefresh}
            active={active}
            setActive={setActive}
          />
        );
      })}
    </TableRow>
  );
}

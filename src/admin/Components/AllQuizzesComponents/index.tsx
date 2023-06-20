import * as React from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import QuizTableRow from "./QuizTableRow";

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
    minWidth: 70,
  },
  { id: "title", label: "Title", minWidth: 250 },
  { id: "description", label: "Description", minWidth: 370 },
  { id: "short_code", label: "Short Code", minWidth: 170 },
];

interface Data {
  number: number;
  id: string;
  title: string;
  description: string;
  short_code: string;
}

function createData(
  number: number,
  id: string,
  title: string,
  description: string
): Data {
  const short_code = `[quizbit id="${id}"]`;
  return { number, id, title, description, short_code };
}

export default function AllQuizzesFunction() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [refresh, setRefresh] = useState(false);
  const [rows, setRows] = useState<Data[]>([]);
  const home_url = (window as any).userLocalize.home_url;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  React.useEffect(() => {
    axios
      .get(home_url + "/wp-json/quizbit/v1/quiz/all-quzzes")
      .then((response) => {
        const responseData = response.data; 

        if (Array.isArray(responseData.data)) {
          const rows = responseData.data.map((quiz: any, index: number) => {
            const title = quiz.title || "No Title";
            const description = quiz.description || "No Description";
            return createData(index + 1, quiz.id, title, description);
          });
          setRows(rows);
        } else {
          console.error("Invalid data format");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [refresh]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <QuizTableRow
                    key={index}
                    row={row}
                    index={index}
                    setRefresh={setRefresh}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[1, 5, 10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

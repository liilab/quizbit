import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import QuizTableCell from "./QuizTableCell";

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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [refresh, setRefresh] = React.useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [rows, setRows] = React.useState<Data[]>([]);

  React.useEffect(() => {
    axios
      .get("http://localhost/wordpress/wp-json/quizbit/v1/quiz/all-quizes")
      .then((response) => {
        const responseData = response.data; // Store the response data

        if (Array.isArray(responseData.data)) {
          // Check if the data property is an array
          const rows = responseData.data.map((quiz: any, index: number) => {
            const title = quiz.title || "No Title";
            const description = quiz.description || "No Description";
            return createData(index + 1, quiz.id, title, description); // Add return statement here
          });

          setRows(rows);
        } else {
          console.error("Invalid data format"); // Handle the case when data is not an array
        }
      })
      .catch((error) => {
        // Handle the error response
        console.error(error); // You can customize this based on your needs
      });
  }, [refresh]);

  function deleteQuiz(id: string) {
    axios
      .delete(`http://localhost/wordpress/wp-json/quizbit/v1/quiz/delete/${id}`)
      .then((response) => {
        console.log(response);
        setRefresh(!refresh);
      })
      .catch((error) => {
        // Handle the error response
        console.error(error); // You can customize this based on your needs
      });
  }

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
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <QuizTableCell
                          column={column}
                          value={value}
                          row_id={row.id}
                          deleteQuiz={deleteQuiz}
                        />
                      );
                    })}
                  </TableRow>
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

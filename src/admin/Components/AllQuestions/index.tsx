import * as React from "react";
import { useEffect, useState } from "react";
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
import EmptyQuiz from "../../../assets/images/empty-quiz.png";


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
  { id: "title", label: "Title", minWidth: 350 },
  { id: "description", label: "Description", minWidth: 570 },
  { id: "short_code", label: "Short Code", minWidth: 270 },
];

interface Data {
  number: number;
  id: string;
  title: string;
  description: string;
  isactive: string;
  short_code: string;
}

function createData(
  number: number,
  id: string,
  title: string,
  description: string,
  isactive: string
): Data {
  const short_code = `[quizbit id="${id}"]`;
  return { number, id, title, description, isactive, short_code };
}

export default function AllQuestionsFunction() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [refresh, setRefresh] = useState(false);
  const [rows, setRows] = useState<Data[]>([]);
  const home_url = (window as any).userLocalize.home_url;
  const site_url = (window as any).userLocalize.site_url;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    axios.interceptors.request.use(
      function (config) {
        config.headers["X-WP-Nonce"] = (window as any).userLocalize.nonce;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    axios
      .get(home_url + "/wp-json/quizbit/v1/quiz/all-quizzes")
      .then((response) => {
        const responseData = response.data;


        if (Array.isArray(responseData.data)) {
          const rows = responseData.data.map((quiz: any, index: number) => {
            const title = quiz.title || "No Title";
            const description = quiz.description || "No Description";
            const isactive = quiz.isactive || "0";
            return createData(index + 1, quiz.id, title, description, isactive);
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

  if (rows[0]) {
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
                <TableCell
                  key="actions"
                  align="right"
                  style={{ minWidth: 100, fontWeight: "bold" }}
                ></TableCell>
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
                      refresh={refresh}
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
    
  } else {
   return (
      <>
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-2xl font-bold">No Quiz Found</p>
          <p>
            Click on <b>Add New Quiz</b> button to create a new quiz.
          </p>
          <img
            src={EmptyQuiz}
            alt="No Quiz Found"
            className="w-1/4 mx-auto"
          />
        </div>
      </>
    );
  }
}

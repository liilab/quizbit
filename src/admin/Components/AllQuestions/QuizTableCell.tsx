import React, { useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import axios from "axios";
import { Link } from "react-router-dom";

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
  row_id?: any;
  refresh?: any;
  setRefresh?: any;
  active: boolean;
  setActive?: any;
}

export default function QuizTableCell({
  column,
  value,
  row_id,
  refresh,
  setRefresh,
  active,
  setActive,
}: QuizTableCell) {
  const [copied, setCopied] = useState(false);

  const home_url = (window as any).userLocalize.home_url;

  function deleteQuiz(id: string) {
    axios
      .delete(home_url + `/wp-json/quizbit/v1/quiz/delete/${id}`)
      .then((response) => {
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    axios
      .get(home_url + `/wp-json/quizbit/v1/quiz/getstatus/${row_id}`)
      .then((response) => {
        setTimeout(() => {
          if (response.data.isactive == 1) setActive(true);
          else setActive(false);
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [active, row_id]);

  function updateStatus(id: string, status: boolean) {
    axios
      .put(home_url + `/wp-json/quizbit/v1/quiz/updatestatus/${id}`, {
        isactive: status,
      })
      .then((response) => {
        console.log(response);
        setRefresh(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <TableCell key={column.id} align={column.align}>
        {column.format && typeof value === "number" ? (
          column.format(value)
        ) : column.id === "short_code" ? (
          <span
            style={{
              cursor: "pointer",
              backgroundColor: "#E4E6E8",
              padding: "8px 10px",
              borderRadius: "2px",
              transition: "opacity 0.3s",
              opacity: copied ? 0.5 : 1,
            }}
            onClick={() => {
              const valueToCopy = String(value);
              navigator.clipboard.writeText(valueToCopy);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 5000);
            }}
          >
            {value}
          </span>
        ) : column.id === "title" ? (
          <div className="flex flex-row gap-3">
            <div className="font-medium">{value}</div>
          </div>
        ) : (
          value
        )}

        {column.id === "title" && (
          <>
            <div
              className={
                column.id !== "title"
                  ? "hidden"
                  : "mt-3 flex flex-row gap-3 items"
              }
            >
              <button className="text-blue-400 text-[0.85rem]">
                <Link to={`/add-new?id=${row_id}`}>Edit</Link>
              </button>
              |
              <button
                className="text-red-400 text-[0.85rem]"
                onClick={() => {
                  deleteQuiz(row_id);
                }}
              >
                Delete
              </button>
              |
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={active}
                  onChange={() => {
                    setActive(!active);
                    updateStatus(row_id, !active);
                  }}
                />
                <div className="w-10 h-5 bg-gray-300 rounded-full  peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[5px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#864DB6]"></div>
                <span
                  className={`ml-3 text-sm font-bold ${
                    active ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  {active ? "Active" : "Inactive"}
                </span>
              </label>
            </div>
          </>
        )}
      </TableCell>
    </>
  );
}

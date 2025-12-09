import React from "react";

const tableWrapper = {
  width: "100%",
  overflowX: "hidden",
  overflowY: "hidden",
};

const tableContainer = {
  background: "#fff",
  borderRadius: "8px",
  padding: "20px",
  border: "1px solid #f1f1f1",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  tableLayout: "fixed",
};

const thStyle = {
  padding: "12px",
  fontWeight: "600",
  color: "#333",
  borderBottom: "1px solid #f1f1f1",
  background: "#fafafa",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #f1f1f1",
  color: "#000",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
};

const DashboardTable = ({ title, columns, data }) => {
  return (
    <div style={tableContainer}>
      <div style={tableWrapper}>
        <table style={tableStyle}>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index} style={thStyle}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{ padding: "20px", textAlign: "center" }}
                >
                  No Data Found
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      style={{
                        ...tdStyle,
                        maxWidth: col.field === "title" ? "150px" : "auto", // truncate title
                        cursor: col.field === "title" ? "pointer" : "default",
                      }}
                      title={col.field === "title" ? row[col.field] : undefined} // tooltip
                    >
                      {row[col.field]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default DashboardTable;

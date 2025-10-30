// src/components/datatable/DatatableHeading.tsx
import React from "react";
import { CSVLink } from "react-csv";
import { useRouter } from "next/navigation";
import DownloadIcon from "@mui/icons-material/Download";
import { Color } from "@/assets/colors";

export interface CSVRow {
  [key: string]: string | number | boolean | undefined;
}

interface DatatableHeadingProps {
  title: string;
  url?: string;
  data?: CSVRow[];
}

const DatatableHeading: React.FC<DatatableHeadingProps> = ({
  title,
  url,
  data = [],
}) => {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px",
        backgroundColor: "#fff",
      }}
    >
      <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>
        {title}
      </div>

      <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
        {data.length > 0 && (
          <CSVLink
            filename={`${title}.csv`}
            data={data}
            style={{
              color: "#000",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
            aria-label="Download CSV"
          >
            <DownloadIcon fontSize="small" />
          </CSVLink>
        )}

        {url && (
          <div
            onClick={() => router.push(url)}
            style={{
              fontWeight: "500",
              backgroundColor: Color.primary,
              color: Color.white,
              padding: "8px 16px",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            <span>Add</span>
            <strong style={{ fontSize: "18px" }}>+</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatatableHeading;
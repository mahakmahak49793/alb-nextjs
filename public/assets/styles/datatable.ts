import { Color } from "../colors";

export const DataTableCustomStyles = {
    cells: {
        style: {
            textAlign: "center" as const,
            color: Color.datatableFontColor, 
            whiteSpace: "nowrap" as const,
            width: "150px",
            fontSize: "15px"
        },
    },
    rows: {
        style: {
            minHeight: '65px',
            backgroundColor: "#fff",
        },
    },
    headRow: {
        style: {
            whiteSpace: 'nowrap' as const,
            fontSize: "15.5px",
            fontWeight: "500" as const, 
            color: Color.white,
            backgroundColor: Color.primary,
        }
    }
};
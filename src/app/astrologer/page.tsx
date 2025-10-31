"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import { CSVLink } from "react-csv";
import DataTable, { TableColumn } from "react-data-table-component";
import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  TextField,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DeepSearchSpace } from "@/utils/common-function";

import { Color } from "@/assets/colors";
import MainDatatable from "@/components/datatable/MainDatatable";
import { api_url, base_url, get_astrologer } from "@/lib/api-routes";
import DatatableHeading from "@/components/datatable/DatatableHeading";
import {
  SwitchOnSvg,
  SwitchOffSvg,
  ViewSvg,
  EditSvg,
  WalletSvg,
  CrossSvg,
} from "@/components/svgs/page";

// ---------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------
interface Astrologer {
  _id: string;
  astrologerName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  isVerified: boolean;
  chat_status?: "online" | "offline";
  call_status?: "online" | "offline";
  video_call_status?: "online" | "offline";
}

type AstrologerColumn = TableColumn<Astrologer>;

// CSV Row Type
interface CSVRow {
  [key: string]: string | number | boolean | undefined;
}

export default function AstrologerPage() {
  const router = useRouter();

  // State
  const [astrologers, setAstrologers] = useState<Astrologer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const filteredData = DeepSearchSpace(astrologers, searchText);

  // Wallet Modal
  const [walletModal, setWalletModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [inputFieldDetail, setInputFieldDetail] = useState<{
    amount: string;
    type: "credit" | "deduct" | "";
  }>({ amount: "", type: "" });
  const [inputFieldError, setInputFieldError] = useState<{
    amount?: string;
    type?: string;
  }>({});

  // Edit Status Modal
  const [editState, setEditState] = useState<{
    open: boolean;
    astro: Astrologer | null;
  }>({ open: false, astro: null });

  // -----------------------------------------------------------------
  // Data Fetching
  // -----------------------------------------------------------------
  const fetchAstrologers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${base_url}${get_astrologer}`);
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      const sorted = (data.astrologers || []).sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setAstrologers(sorted);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAstrologers();
  }, []);

  // -----------------------------------------------------------------
  // CSV Data (Transformed for Export)
  // -----------------------------------------------------------------
  const csvData: CSVRow[] = useMemo(() => {
    return filteredData.map((astro, index) => ({
      "S.No.": index + 1,
      Name: astro.astrologerName,
      Email: astro.email,
      Mobile: astro.phoneNumber,
      "Created Date": moment(astro.createdAt).format("Do MMM YYYY"),
      Status: astro.isVerified ? "Verified" : "Unverified",
    }));
  }, [filteredData]);

  // -----------------------------------------------------------------
  // Wallet Handlers
  // -----------------------------------------------------------------
  const openWallet = (astro: Astrologer) => {
    setUserId(astro._id);
    setWalletModal(true);
  };

  const closeWallet = () => {
    setWalletModal(false);
    setInputFieldDetail({ amount: "", type: "" });
    setInputFieldError({});
  };

  const handleInputFieldError = (
    field: "amount" | "type",
    msg: string | null
  ) => {
    setInputFieldError((prev) => ({ ...prev, [field]: msg ?? undefined }));
  };

  const handleInputField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputFieldDetail((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<"credit" | "deduct">) => {
    const { name, value } = e.target;
    if (name === "type") {
      setInputFieldDetail((prev) => ({
        ...prev,
        type: value as "credit" | "deduct",
      }));
    }
  };

  const validateWallet = () => {
    let ok = true;
    const { amount, type } = inputFieldDetail;

    if (!amount) {
      handleInputFieldError("amount", "Please Enter Amount");
      ok = false;
    } else if (Number(amount) <= 0) {
      handleInputFieldError("amount", "Please Enter Amount Greater Than Zero");
      ok = false;
    } else {
      handleInputFieldError("amount", null);
    }

    if (!type) {
      handleInputFieldError("type", "Please Select Type");
      ok = false;
    } else {
      handleInputFieldError("type", null);
    }
    return ok;
  };

  const submitWallet = async () => {
    if (!validateWallet()) return;

    const payload = {
      transactions: [
        { astrologerId: userId, amount: Number(inputFieldDetail.amount) },
      ],
      type: inputFieldDetail.type,
    };

    try {
      const res = await fetch("/api/astrologers/wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      await fetchAstrologers();
      closeWallet();
    } catch (e) {
      console.error(e);
    }
  };

  // -----------------------------------------------------------------
  // Verify Toggle
  // -----------------------------------------------------------------
  const toggleVerify = async (astro: Astrologer) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/astrologer/verify-astrologer-profile`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            astrologerId: astro._id,
            isVerified: !astro.isVerified,
          }),
        }
      );
      await fetchAstrologers();
    } catch (e) {
      console.error(e);
    }
  };

  // -----------------------------------------------------------------
  // Edit Status Modal
  // -----------------------------------------------------------------
  const openEdit = (astro: Astrologer) => setEditState({ open: true, astro });
  const closeEdit = () => setEditState({ open: false, astro: null });

  const changeStatus = async (
    field: "chat_status" | "call_status" | "video_call_status",
    id: string,
    current: string | undefined
  ) => {
    const newVal = current === "online" ? "offline" : "online";
    try {
      await fetch("/api/astrologers/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ astrologerId: id, field, value: newVal }),
      });
      await fetchAstrologers();
      closeEdit();
    } catch (e) {
      console.error(e);
    }
  };

  // -----------------------------------------------------------------
  // Table Columns
  // -----------------------------------------------------------------
  const columns: AstrologerColumn[] = useMemo(
    () => [
      {
        name: "S.No.",
        selector: (_row, index) => (index !== undefined ? index + 1 : 0),
        width: "80px",
      },
      { name: "Name", selector: (row) => row.astrologerName },
      { name: "Email", selector: (row) => row.email, width: "250px" },
      { name: "Mobile", selector: (row) => row.phoneNumber },
      {
        name: "Created Date",
        selector: (row) => moment(row.createdAt).format("Do MMM YYYY"),
        width: "140px",
      },
      {
        name: "Status",
        cell: (row) => (
          <div style={{ cursor: "pointer" }} onClick={() => toggleVerify(row)}>
            {row.isVerified ? <SwitchOnSvg /> : <SwitchOffSvg />}
          </div>
        ),
        width: "140px",
        center: true,
      },
      {
        name: "Action",
        cell: (row) => (
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <div
              onClick={() => {
                sessionStorage.setItem(
                  "selectedAstrologer",
                  JSON.stringify(row)
                );
                router.push("/astrologer/view-astrologer");
              }}
              style={{ cursor: "pointer" }}
            >
              <ViewSvg />
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation(); // Prevent row click if in a table
                router.push(`/astrologer/edit-astrologer?id=${row._id}`);
              }}
            >
              <EditSvg />
            </div>
            <div style={{ cursor: "pointer" }} onClick={() => openWallet(row)}>
              <WalletSvg />
            </div>
            <MoreVertIcon
              onClick={() => openEdit(row)}
              sx={{ cursor: "pointer" }}
            />
          </div>
        ),
        width: "200px",
        center: true,
      },
    ],
    [router]
  );

  // -----------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------
  return (
    <>
      <div
        style={{
          padding: "20px",
          backgroundColor: "#fff",
          marginBottom: "20px",
          boxShadow: "0px 0px 5px lightgrey",
          borderRadius: "10px",
        }}
      >
        <DatatableHeading
          title="List Of Astrologers"
          url="/astrologer/add-astrologer"
          data={csvData}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "20px",
            alignItems: "center",
            marginBottom: "20px",
            backgroundColor: "#fff",
          }}
        >
          <input
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search your data..."
            style={{
              padding: "8px 12px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
              width: "100%",
              maxWidth: "250px",
              fontSize: "15px",
              outline: "none",
            }}
          />
        </div>

        <MainDatatable
          columns={columns}
          data={filteredData}
          isLoading={isLoading}
        />
      </div>

      {/* Wallet Modal */}
      <Dialog
        open={walletModal}
        PaperProps={{
          sx: { maxWidth: { xs: "90vw", sm: "50vw" }, width: "100%" },
        }}
      >
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 500, color: Color.black }}
                >
                  Wallet
                </Typography>
                <div onClick={closeWallet} style={{ cursor: "pointer" }}>
                  <CrossSvg />
                </div>
              </div>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label={
                  <>
                    Amount <span style={{ color: "red" }}>*</span>
                  </>
                }
                variant="outlined"
                fullWidth
                name="amount"
                value={inputFieldDetail.amount}
                onChange={handleInputField}
                error={!!inputFieldError.amount}
                helperText={inputFieldError.amount}
                onFocus={() => handleInputFieldError("amount", null)}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={!!inputFieldError.type}>
                <InputLabel id="type-label">Type *</InputLabel>
                <Select
                  labelId="type-label"
                  label="Type *"
                  name="type"
                  value={inputFieldDetail.type}
                  onChange={handleSelectChange}
                  onFocus={() => handleInputFieldError("type", null)}
                >
                  <MenuItem value="" disabled>
                    ---Select Type---
                  </MenuItem>
                  <MenuItem value="credit">Add</MenuItem>
                  <MenuItem value="deduct">Deduct</MenuItem>
                </Select>
                {inputFieldError.type && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ ml: 2, mt: 0.5 }}
                  >
                    {inputFieldError.type}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Grid container justifyContent="flex-end">
                <Button
                  onClick={submitWallet}
                  sx={{
                    bgcolor: Color.primary,
                    color: Color.white,
                    px: 3,
                    py: 1,
                    borderRadius: 1,
                    fontWeight: 500,
                    textTransform: "none",
                    "&:hover": { bgcolor: Color.primary },
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {/* Edit Status Modal */}
      <Dialog open={editState.open} onClose={closeEdit}>
        <DialogContent sx={{ minWidth: 300, maxWidth: 500 }}>
          {editState.astro && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {editState.astro.astrologerName}
                  </Typography>
                  <Button
                    onClick={closeEdit}
                    sx={{
                      minWidth: 32,
                      bgcolor: "grey.500",
                      color: "white",
                      borderRadius: "50%",
                      p: 0.5,
                      "&:hover": { bgcolor: "grey.600" },
                    }}
                  >
                    ×
                  </Button>
                </div>
              </Grid>

              {(
                ["chat_status", "call_status", "video_call_status"] as const
              ).map((field) => {
                const status = editState.astro![field];
                return (
                  <React.Fragment key={field}>
                    <Grid item xs={5}>
                      {field === "chat_status" && "Change Chat Status"}
                      {field === "call_status" && "Change Call Status"}
                      {field === "video_call_status" &&
                        "Change Video Call Status"}
                    </Grid>
                    <Grid item xs={7}>
                      <Button
                        onClick={() =>
                          changeStatus(field, editState.astro!._id, status)
                        }
                        fullWidth
                        sx={{
                          bgcolor:
                            status === "online" ? "success.main" : "error.main",
                          color: "white",
                          textTransform: "none",
                          fontWeight: 500,
                        }}
                      >
                        {status === "online"
                          ? `Set ${field.replace("_status", "")} Offline`
                          : `Set ${field.replace("_status", "")} Online`}
                      </Button>
                    </Grid>
                  </React.Fragment>
                );
              })}
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

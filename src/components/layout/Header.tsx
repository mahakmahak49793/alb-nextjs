"use client";

import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { Color } from "@/assets/colors";
import Swal from "sweetalert2";
import * as CommonActions from "@/redux/actions/commonActions";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import GroupIcon from "@mui/icons-material/Group";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import {
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isSidebarOpen } = useAppSelector((state: any) => state?.commonReducer);
  const router = useRouter();

  const [userToggle, setUserToggle] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Handle menu open/close
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle change password modal
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Handle logout
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Color?.primary,
      cancelButtonColor: "grey",
      confirmButtonText: "Logout",
    });

    if (result.isConfirmed) {
      try {
        setData(null);
        localStorage.clear();
        router.push("");
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Check user data and redirect if not logged in
  useEffect(() => {
    try {
      const userData = localStorage.getItem("userDetails");
      setData(userData);
      if (!userData) {
        router.push("");
      }
    } catch (e) {
      console.error(e);
    }
  }, [data, userToggle, router]);

  // Handle sidebar toggle on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        dispatch(CommonActions.setIsSidebarOpen(true));
      } else if (window.innerWidth < 900) {
        dispatch(CommonActions.setIsSidebarOpen(false));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  return (
    <>
      {/* Header with Tailwind CSS */}
      <header className="bg-white w-full text-gray-500 py-1 px-4 border-b border-gray-300">
        <div className="h-12 flex justify-between items-center relative">
          <div>
           <div 
  onClick={() => dispatch(CommonActions.setIsSidebarOpen(!isSidebarOpen))}
  className="flex justify-center items-center bg-[#EF4444] text-white rounded-lg w-8 h-8 cursor-pointer hover:bg-red-800 transition-colors"
>

              <FaBars className="text-base" />
            </div>
          </div>

          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              className="border border-gray-100 flex items-center"
              style={{ color: Color.primary, textTransform: "none" }}
            >
              <GroupIcon className="mr-1 text-lg" />
              Admin
            </Button>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ "aria-labelledby": "basic-button" }}
              className="mt-1"
            >
              <div className="flex flex-col gap-2 p-1">
                {/* Uncomment if change password functionality is needed */}
                {/* <MenuItem onClick={handleModalOpen} className="text-sm">
                  Change Password
                </MenuItem> */}

                <div 
                  onClick={handleLogout}
                  className="flex justify-center items-center bg-red-700 text-white rounded cursor-pointer hover:bg-red-800 transition-colors"
                >
                  <MenuItem className="flex items-center text-white text-sm py-1">
                    <VpnKeyIcon className="h-4 w-4 mr-2" />
                    Logout
                  </MenuItem>
                </div>
              </div>
            </Menu>
          </div>
        </div>
      </header>

      {/* Change Password Dialog */}
      <Dialog open={modalOpen} onClose={handleModalClose} maxWidth="sm" fullWidth>
        <DialogContent className="p-6">
          <Grid container spacing={3}>
            <Grid item xs={12} className="flex justify-between items-center">
              <div className="text-xl font-medium">Change Password</div>
              <div
                className="bg-red-700 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-800 transition-colors text-sm"
                onClick={handleModalClose}
              >
                Close
              </div>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                type="text"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="mb-4"
              />
            </Grid>

            <Grid item xs={12} className="relative">
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <div
                className="bg-red-700 text-white py-3 px-4 rounded text-center text-xl cursor-pointer hover:bg-red-800 transition-colors"
                onClick={() => {
                  // Add password change logic here
                  handleModalClose();
                }}
              >
                Submit
              </div>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
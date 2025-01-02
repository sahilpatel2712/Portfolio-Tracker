import React from "react";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router";
import { LogoutIcon } from "../assets/svgs";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { userLogOut } from "../redux/auth/authSlice";
import { stringAvatar } from "../utils/avtarUtils";

const Header = () => {
  const path = useLocation();
  const username = useAppSelector((state) => state.auth.userName);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleClose();
    dispatch(
      userLogOut(() => {
        navigate("/signin", { replace: true });
      })
    );
  };
  return (
    <div className="bg-bgColor-custom mb-4 px-3 py-1 rounded-md max-w-[1600px] w-full">
      <ul className="flex items-center gap-5 justify-end">
        <li
          className={`cursor-pointer text-lg ${
            path.pathname === "/dashboard" ? "text-blue-500" : ""
          }`}
        >
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li
          className={`block lg:hidden cursor-pointer text-lg ${
            path.pathname === "/stocks" ? "text-blue-500" : ""
          }`}
        >
          <Link to="/stocks">Stocks</Link>
        </li>
        <li
          className={`cursor-pointer text-lg ${
            path.pathname === "/portfolio" ? "text-blue-500" : ""
          }`}
        >
          <Link to="/portfolio">Portfolio</Link>
        </li>
        <li className="cursor-pointer">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            disableElevation={true}
            disableTouchRipple={true}
            disableFocusRipple={true}
          >
            {username && <Avatar {...stringAvatar(username)} />}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose} style={{ fontWeight: "600" }}>
              Hi, {username}
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
              style={{ fontWeight: "600", color: "red" }}
            >
              <span>{LogoutIcon()}</span> Logout
            </MenuItem>
          </Menu>
        </li>
      </ul>
    </div>
  );
};

export default Header;

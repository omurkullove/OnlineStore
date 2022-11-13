// import * as React from "react";

import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "../../styles/Navbar.css";
import { useNavigate } from "react-router-dom";
import StorefrontSharpIcon from "@mui/icons-material/StorefrontSharp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAutho } from "../Authorization/AuthoConetextProvider";
import { Logout } from "@mui/icons-material";

const pages = [
  {
    type: "Products",
    path: "/products",
    id: 1,
  },
  {
    type: "Sport",
    path: "/sport",
    id: 2,
  },
  {
    type: "Clothes",
    path: "/clothes",
    id: 3,
  },
  {
    type: "Electronics",
    path: "/electronics",
    id: 4,
  },
];
// const pages = ["Products", "Sport", "Clothes", "Electronics"];
const settings = [
  {
    type: "Register",
    path: "/register",
    id: 1,
  },
  {
    type: "login",
    path: "/login",
    id: 2,
  },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const { fetchByParams } = useProducts();

  //custom

  const navigate = useNavigate();

  const API = " http://localhost:8000/products";
  const [products, setProducts] = useState([]);

  const { oneUserFromLs, getUserFromLs, logout, deleteAccount } = useAutho();

  async function render() {
    let { data } = await axios(`${API}/${window.location.search}`);
    setProducts([...data]);
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setSearchParams({
      q: search,
    });
  }, [search]);

  useEffect(() => {
    render();
  }, [searchParams]);

  useEffect(() => {
    getUserFromLs();
  }, []);
  // console.log(oneUserFromLs.name[0]);

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#FFFBFB", color: "#544856" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StorefrontSharpIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="button"
            // href="/?q="
            className="buttonHome-link"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Jost",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}>
            Online Store
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}>
              {pages.map(page => (
                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => navigate(page)}></Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <StorefrontSharpIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}>
            Online Store
          </Typography>
          {/* Navigate Buttons */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(page => (
              <Button
                key={page.id}
                onClick={() => navigate(page.path)}
                sx={{ my: 2, color: "white", display: "block" }}>
                {page.type}
              </Button>
            ))}
          </Box>

          {/* Search Box */}
          <Box className="searchBlock">
            <SearchIcon />
            <input
              className="inputSearch"
              type="text"
              onChange={e => setSearch(e.target.value)}
              value={search}
              required
              placeholder="Search"
            />
          </Box>
          {/* Profile Icon */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={oneUserFromLs && oneUserFromLs.name[0]}
                  src="..."
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {settings.map(setting => (
                <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => navigate(setting.path)}>
                    {setting.type}
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem>
                <Typography onClick={() => logout()}>logout</Typography>
              </MenuItem>
              <MenuItem>
                <Typography
                  onClick={() =>
                    deleteAccount(oneUserFromLs && oneUserFromLs.id)
                  }>
                  Delete Account
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          {/* Cart Icon */}
          <Box style={{ color: "#431969", marginLeft: "50px" }}>
            <Button
              onClick={() => navigate("/cart")}
              sx={{ my: 2, color: "white", display: "block" }}>
              <ShoppingCartIcon />
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
 
  MdRestaurant,
  
} from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaFileInvoice } from "react-icons/fa";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import customer from "views/admin/customer";
import bill from "views/admin/Bill";
import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  {
    name: "Menu",
    layout: "/admin",
    path: "/menu",
    icon: (
      <Icon as={GiHamburgerMenu} width="20px" height="20px" color="inherit" />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Create Dish / Drink",
    layout: "/admin",
    icon: <Icon as={MdRestaurant} width="20px" height="20px" color="inherit" />,
    path: "/Create-Dish/Drink",
    component: DataTables,
    secondary: true,
  },
  {
    name: "Staff",
    layout: "/admin",
    path: "/staff",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile,
  },
  {
    name: "Customer",
    layout: "/admin",
    path: "/customer",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: customer,
  },
  {
    name: "Bill",
    layout: "/admin",
    path: "/Bill",
    icon: (
      <Icon as={FaFileInvoice} width="20px" height="20px" color="inherit" />
    ),
    component: bill,
  },

  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignInCentered,
  },
  {
    name: "RTL Admin",
    layout: "/rtl",
    path: "/rtl-default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: RTL,
  },
];

export default routes;

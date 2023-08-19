import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdPerson,
  MdHome,
 
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
import Order from "views/admin/Order";
import Taxes from "views/admin/Taxes";
import FoodManagerTable from "api/FoodManager";
import DrinkManagerTable from "api/DrinkManager";



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
    name: "Billing",
    layout: "/admin",
    path: "/Bill",
    icon: (
      <Icon as={FaFileInvoice} width="20px" height="20px" color="inherit" />
    ),
    component: bill,
  },
  {
    name: "Current Orders",
    layout: "/admin",
    path: "/Order",
    icon: (
      <Icon as={FaFileInvoice} width="20px" height="20px" color="inherit" />
    ),
    component: Order,
  },
  {
    name: "Taxes",
    layout: "/admin",
    path: "/Taxes",
    icon: (
      <Icon as={FaFileInvoice} width="20px" height="20px" color="inherit" />
    ),
    component: Taxes,
  },
  {
    name: "Food Manager",
    layout: "/admin",
    path: "/food-managers",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: FoodManagerTable,
  },
  {
    name: "Drink Manager",
    layout: "/admin",
    path: "/drink-managers",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: DrinkManagerTable,
  },
];

export default routes;

import React from "react";

import { Icon } from "@chakra-ui/react";
import { MdPerson, MdHome, MdRestaurant } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaFileInvoice } from "react-icons/fa";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import customer from "views/admin/customer";
import bill from "views/admin/Bill";
import BillByTableNo from "views/admin/BillByTableNo";
import Order from "views/admin/Order";
import Taxes from "views/admin/Taxes";
import FoodManagerTable from "views/admin/FoodManager";
import DrinkManagerTable from "views/admin/DrinkManager";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  {
    name: "Menu Items",
    layout: "/admin",
    path: "/menu",
    icon: (
      <Icon as={GiHamburgerMenu} width="20px" height="20px" color="inherit" />
    ),
    component: NFTMarketplace,
  },
  {
    name: "Create Dish / Drink",
    layout: "/admin",
    icon: <Icon as={MdRestaurant} width="20px" height="20px" color="inherit" />,
    path: "/create-menu",
    component: DataTables,
  },
  {
    name: "Staff",
    layout: "/admin",
    path: "/staff",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile,
  },
  {
    name: "Customers",
    layout: "/admin",
    path: "/customers",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: customer,
  },
  {
    name: "Billing",
    layout: "/admin",
    path: "/billing",
    icon: (
      <Icon as={FaFileInvoice} width="20px" height="20px" color="inherit" />
    ),
    component: bill,
  },
  {
    name: "Bill by Table Number.",
    layout: "/admin",
    path: "/bill-by-table-no",
    icon: (
      <Icon as={FaFileInvoice} width="20px" height="20px" color="inherit" />
    ),
    component: BillByTableNo,
  },
  {
    name: "Current Orders",
    layout: "/admin",
    path: "/current-orders",
    icon: (
      <Icon as={FaFileInvoice} width="20px" height="20px" color="inherit" />
    ),
    component: Order,
  },
  {
    name: "Taxes",
    layout: "/admin",
    path: "/taxes",
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

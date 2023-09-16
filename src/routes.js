/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdPerson,
  MdHome,
  MdRestaurant,
  MdDocumentScanner,
  MdDateRange,
  MdPersonSearch,
  MdContactPhone,
  MdOutlineGroupAdd,
  MdFastfood,
  MdGroups,
  MdCalendarToday,
  MdOutlineLiquor,
  MdRestaurantMenu,
  MdCurrencyRupee,
  MdContentPaste,
  MdMenuBook
} from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaFileInvoice } from "react-icons/fa";

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
import Members from "views/admin/Members";
import MemberByPhoneNumber from "views/admin/MemberByPhoneNumber";
import BillByMemberID from "views/admin/BillByMemberID";
import OrderByDate from "views/admin/OrderByDate";
import billByDate from "views/admin/billByDate/index";

import {
  isUserAdmin,
  isUserDrink,
  isUserFood,
} from "views/auth/signIn/UserAuth";

const allroutes = [
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
    icon: <Icon as={MdFastfood} width="20px" height="20px" color="inherit" />,
    component: NFTMarketplace,
  },
  {
    name: "Create Menu",
    layout: "/admin",
    icon: <Icon as={MdMenuBook} width="20px" height="20px" color="inherit" />,
    path: "/create-menu",
    component: DataTables,
  },
  {
    name: "Waiter (Staff)",
    layout: "/admin",
    path: "/staff",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile,
  },
  {
    name: "Active Customers",
    layout: "/admin",
    path: "/customers",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: customer,
  },
  // {
  //   name: "Billing",
  //   layout: "/admin",
  //   path: "/billing",
  //   icon: (
  //     <Icon as={FaFileInvoice} width="20px" height="20px" color="inherit" />
  //   ),
  //   component: bill,
  // },
  {
    name: "Bill by Member ID",
    layout: "/admin",
    path: "/bill-by-member-id",
    icon: (
      <Icon as={MdDocumentScanner} width="20px" height="20px" color="inherit" />
    ),
    component: BillByMemberID,
  },
  {
    name: "Current Orders",
    layout: "/admin",
    path: "/current-orders",
    icon: (
      <Icon as={MdContentPaste} width="20px" height="20px" color="inherit" />
    ),
    component: Order,
  },
  {
    name: "Orders By Date",
    layout: "/admin",
    path: "/orderbydate",
    icon: (
      <Icon as={MdCalendarToday} width="20px" height="20px" color="inherit" />
    ),
    component: OrderByDate,
  },

  {
    name: "Bills By Date",
    layout: "/admin",
    path: "/billbydate",
    icon: <Icon as={MdDateRange} width="20px" height="20px" color="inherit" />,
    component: billByDate,
  },

  {
    name: "Food Manager",
    layout: "/admin",
    path: "/food-managers",
    icon: <Icon as={MdRestaurantMenu} width="20px" height="20px" color="inherit" />,
    component: FoodManagerTable,
  },
  {
    name: "Drink Manager",
    layout: "/admin",
    path: "/drink-managers",
    icon: (
      <Icon as={MdOutlineLiquor} width="20px" height="20px" color="inherit" />
    ),
    component: DrinkManagerTable,
  },
  {
    name: "All Members",
    layout: "/admin",
    path: "/members",
    icon: <Icon as={MdGroups} width="20px" height="20px" color="inherit" />,
    component: Members,
  },
  {
    name: "Member By PhoneNo.",
    layout: "/admin",
    path: "/memberbyphonenumber",
    icon: (
      <Icon as={MdPersonSearch} width="20px" height="20px" color="inherit" />
    ),
    component: MemberByPhoneNumber,
  },
  {
    name: "Taxes",
    layout: "/admin",
    path: "/taxes",
    icon: (
      <Icon as={MdCurrencyRupee} width="20px" height="20px" color="inherit" />
    ),
    component: Taxes,
  },
];
console.log(isUserDrink());
console.log(isUserFood());
console.log(isUserAdmin());

function Routes() {
  const [routes, setRoutes] = React.useState([]);
  const [isUserDrinkRole, setIsUserDrinkRole] = useState(false); // Initialize to false initially
  const [isUserFoodRole, setIsUserFoodRole] = useState(false);
  const [isUserAdminRole, setIsUserAdminRole] = useState(false);

  useEffect(() => {
    setIsUserDrinkRole(isUserDrink());
    setIsUserFoodRole(isUserFood());
    setIsUserAdminRole(isUserAdmin());
  }, []);

  useEffect(() => {
    const filteredRoutes = allroutes.filter((route) => {
      if (isUserAdminRole) {
        return route.layout === "/admin";
      } else if (isUserDrinkRole) {
        if (route.name === "Food Manager") {
          return false;
        }
        return route.layout === "/admin";
      } else if (isUserFoodRole) {
        if (route.name === "Drink Manager") {
          return false;
        }
        return route.layout === "/admin";
      }
      return true;
    });
    setRoutes(filteredRoutes);
  }, [isUserDrinkRole, isUserFoodRole, isUserAdminRole]);
  return routes;
}

export default Routes;

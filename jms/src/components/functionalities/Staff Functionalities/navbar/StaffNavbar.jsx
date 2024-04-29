import React from 'react'
import Sidebar from '../../../header/LeftSidebar'

function StaffNavbar() {
    const StaffSidebarData = [
        { title: "Dashboard", path: "/", icon: "fa fa-home" },
        {
          title: "Products",
          path: "/products/products",
          icon: " fa fa-users",
          category: "staffs",
        },
        {
          category: "Selling Histroy",
          title: "Category",
          icon: " fa fa-square",
          path: "/products/category",
        },
        {
          title: "Manging Products",
          icon: " fa fa-product-hunt",
          path: "/products/products",
        },
        {
          category: "Orders",
          title: "Orders Section",
          icon: " fa fa-shopping-cart",
          path: "/orders/products",
        },
        {
          category: "Barcodes",
          title: "Barcodes",
          path: "/barcodes/generate-barcodes",
          icon: "fa fa-barcode",
        },
        { title: "Reports", path: "/reports", icon: "fa fa-bar-chart" },
      ];
    
      const srtIcon = [
        {
          path: "/",
          icon: "fa fa-envelope",
          text: "Inbox",
        },
    
        {
          path: "/",
          icon: "fa fa-bell",
          text: "Notifications",
        },
        {
          path: "/profile",
          icon: "fa fa-user",
          text: "Profile",
        },
      ];
  return (
    <div>
        <Sidebar sideItem={StaffSidebarData} head={"Staff"} srtIcon={srtIcon} />
    </div>
  )
}

export default StaffNavbar
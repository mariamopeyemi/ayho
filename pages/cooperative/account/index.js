import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from 'next/image';
import AppLayout from "../../../components/layouts/AppLayout";
import ManagerSwitcher from "../../../components/ManagerSwitcher";
import CompanyInfo from "./CompanyInfo";
import AccountAdmin from "./AccountAdmin";
import AccountRole from "./AccountRole";


const ACCOUNTS = [
  {title:"Company Info", id:"COMPANY_INFO"},
  {title:"Admin", id:"COMPANY_ADMIN"},
  {title:"Roles & Permission", id:"COMPANY_ROLES"},
  
]
const Account = () => {
  const router = useRouter();
  const [activeTable, setActiveTable] = useState("Company Info");
  return (
    <AppLayout>
       {/* { createPlan && <CreatePlanModal
        toggle={()=>setCreatePlan(false)}
        open={()=>setCreatePlan(true)} />} */}

        <ManagerSwitcher
            handleChange={(item) => {
              setActiveTable(item);
            }}
            items={ACCOUNTS}
          ></ManagerSwitcher>
            
       
          <>
            {activeTable === "COMPANY_INFO" && <CompanyInfo />}
            {activeTable === "COMPANY_ADMIN" && <AccountAdmin />}
            {activeTable === "COMPANY_ROLES" && <AccountRole />}
          
          </>
     
    </AppLayout>
  );
};

export default Account;
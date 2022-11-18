import toast from "react-hot-toast";
import GoalSavings from "./GoalSavings";
import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";
import FixedSavings from "./fixed/FixedSavings";
import React, { useState } from "react";
import AppLayout from "../../../components/layouts/AppLayout";
import ManagerSwitcher from "../../../components/ManagerSwitcher";
import CreateGoalPlanModal from "../../../components/modal/saving/goal/CreateGoalPlanModal";
import CreateFixedPlanModal from "../../../components/modal/saving/fixed/CreateFixedPlanModal";

const PLANS = [
  {title:"Group Saving", id:"GROUP_SAVING"},
  {title:"Fixed Saving", id:"FIXED_SAVING"},
  
]


const Savings = () => {
  const [plan, setPlan] = useState("");
  const [trigger, setTrigger] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activeTable, setActiveTable] = useState("GROUP_SAVING");
// the trigger state is to cause auto repload or update of the fetch all upon creation of savings
  return (
    <AppLayout>
       { plan==="FIXED_SAVING" && <CreateFixedPlanModal
         activeTab={plan}
         toggle={setPlan}
         name="FIXED_SAVING"
         trigger={trigger}
         setTrigger={setTrigger}
        />}

       { plan==="GROUP_SAVING" && <CreateGoalPlanModal
        activeTab={plan}
        toggle={setPlan}
        name="GROUP_SAVING"
        trigger={trigger}
        setTrigger={setTrigger}
         />}

      <div className="flex flex-row justify-between">
      <ManagerSwitcher
        handleChange={(item) => {
          setActiveTable(item);
        }}
        items={PLANS}
      ></ManagerSwitcher>

      <div className="md:w-[200px] mr-2">
      <LoadingButton
            onClick={()=>setPlan(activeTable)}
            loading={loading}
            variant="contained"
          >
            Create Plan
          </LoadingButton>
      </div>
     </div>
      <>
        {activeTable === "GROUP_SAVING" && 
          <GoalSavings trigger={trigger} />
        }
        {activeTable === "FIXED_SAVING" && 
          <FixedSavings  trigger={trigger}  />
        }
      </>
     
    </AppLayout>
  );
};

export default Savings;

import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useRouter } from "next/router";
import AddNewAdminModal from '../../../components/modal/account/AddNewAdminModal';
import AccountAdminTable from '../../../components/tables/account/AccountAdminTable';

const AccountAdmin = () => {
  const [newAdmin, setNewAdmin] = useState(false);
  const router = useRouter();
  function viewPage(){
      router.push("/cooperative/account/view");
  }

  return (
    <div>
      {/* { P Modal */}
      { newAdmin && <AddNewAdminModal
        toggle={()=>setNewAdmin(false)}
        open={()=>setNewAdmin(true)} 
        />}
      <AccountAdminTable viewClick={viewPage} />
      <div className=' flex justify-end my-[2rem]'>
      <Button onClick={setNewAdmin} variant="filled" className=' text-white w-[150px] bg-[#137C4B] hover:text-[#137C4B]'>Add New Admin</Button>
            
      </div>
    </div>
  )
}

export default AccountAdmin;
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { LoadingButton } from '@mui/lab';
import React, {useState, useEffect} from 'react';
import Search from '../../../components/form-elements/Search';
import AppLayout from '../../../components/layouts/AppLayout';
import MembersTable from '../../../components/tables/members/MembersTable';
import MemberTypeModal from '../../../components/modal/member/MemberTypeModal';
import NextOfKinInfoModal from '../../../components/modal/member/NextOfKinInfoModal';
import ExistingMemberModal from '../../../components/modal/member/ExistingMemberModal';
import PersonalDetailsModal from '../../../components/modal/member/PersonalDetailsModal';
import {addNewCoopMember, getAllCoopMember} from '../../../services/cooperative-admin.js';
import ModeOfIdentificationModal from '../../../components/modal/member/ModeOfIdentificationModal';


const View = () => {
  const router = useRouter();
  const [kin, setKin] = useState(false);
  const [trigger, setTrigger] =useState(true);
  const [memberType, setMemberType] = useState(false);
  const [members, setMembers] = useState([]);
  const [indentityMode, setIndentityMode] = useState(false);
  const [personalDetails, setPersonalDetails] = useState(false);
  const [existingMemberType, setExistingMemberType] = useState(false);
  const [memberData, setMemberData] =useState({
        firstName:'',
        lastName:'',
        email:'',
        state:'',
        address:'',
        phoneNumber:'',
        nokFirstName:'',
        nokLastName:'',
        nokEmail:'',
        nokPhone:'',
        nokLocation:'',
        nokRelationship:'',
  });

  
  
  const handleMemberCreation = async () => {

    try {
      console.log(memberData, "create mem----")
        await addNewCoopMember(memberData);
        console.log('this is to create members?, it has created ')
       setMemberData({
          firstName:'',
          lastName:'',
          email:'',
          state:'',
          gender:'',
          address:'',
          phoneNumber:'',
          nokFirstName:'',
          nokLastName:'',
          nokEmail:'',
          nokPhone:'',
          nokLocation:'',
          nokRelationship:'',
        })
        setTrigger(!trigger)
        setKin(false)
        toast.success('successfully added', {duration:10000})

    } catch (error) {
      console.log(error,"it did not work")
      toast.error('Try creating members again', { duration: 10000 });
    }}


  function viewPage(id){
    router.push({
      pathname: '/cooperative/members/view',
      query: { id},
    })
  }
  // function editPage(){
  //   router.push("/cooperative/members/edit");
  // }
  function editPage(id){
    router.push({
      pathname: '/cooperative/members/edit',
      query: { id},
    })
  }
  function viewNewMember(){
    setMemberType(false)
    setPersonalDetails(true)
  }
  function viewExistingMember(){
    setMemberType(false)
    setExistingMemberType(true)
  }
  function viewId(){
    setPersonalDetails(false)
    setIndentityMode(true)
  }
  function backtoViewId(){
    setKin(false)
    setIndentityMode(true)
  }
  function backtoViewPersonalDetails(){
    setIndentityMode(false)
    setPersonalDetails(true)
  }
  function viewKin(){
    setIndentityMode(false)
    setKin(true)
  }
  useEffect (() =>  {
    
    const handleFetchMember = async () => {
    try {
     const myData= await getAllCoopMember();
     const newData= myData.data.data;
      setMembers(newData); 
      console.log('================i fixed this so work hereeeee====================');
      console.log(newData);
      console.log('====================================');
    } catch (error) {
      // toast.error("Error getting members of a cooperative. Try again later" , { duration: 10000 });
    }}
    handleFetchMember()
    }, [trigger])
  
  return (
    <AppLayout>
        {/* { member type Modal */}
        { memberType && <MemberTypeModal
          toggle={()=>setMemberType(false)}
          open={()=>setMemberType(true)} 
          existingMember={viewExistingMember}
          newMember={viewNewMember}
         />}
        { existingMemberType && <ExistingMemberModal
          toggle={()=>setExistingMemberType(false)}
          open={()=>setExistingMemberType(true)} 
          existingMember={viewExistingMember}
          newMember={viewNewMember}
         />}

        {/* { Personal details Modal */}
        { personalDetails && <PersonalDetailsModal
        toggle={()=>setPersonalDetails(false)}
        open={()=>setPersonalDetails(true)} 
        onClick={viewId}
        memberData={memberData} 
        setMemberData={setMemberData}
        />}


        {/* {Mode of Identification modal} */}
        { indentityMode && <ModeOfIdentificationModal
        toggle={()=>setIndentityMode(false)}
        open={()=>setIndentityMode(true)} 
        onClick={viewKin}
        onClickBack={backtoViewPersonalDetails}
        memberData={memberData} 
        setMemberData={setMemberData}
        />}
        
        {/* {Next of kin modal} */}
        { kin && <NextOfKinInfoModal
        toggle={()=>setKin(false)}
        open={()=>setKin(true)} 
        onClickBack={backtoViewId}
        memberData={memberData} 
        setMemberData={setMemberData}
        onClick={handleMemberCreation}
        />}

        <div className='flex flex-row justify-between w-[100%] my-[3rem] '>
          <div className='w-[78%] '><Search /> </div>
          <div className='w-[20%] m-[0px] '>
            <LoadingButton
                onClick={setMemberType}
                // loading={loading}
                variant="contained"
              >
                Add Members
              </LoadingButton></div>
        </div>
        {/* {members?  <MembersTable members={members.users} viewClick={viewPage} editClick={editPage} />: <>loading....</>} */}
        {members?  <MembersTable members={members} viewClick={viewPage} editClick={editPage} />: <>loading....</>}
       
    </AppLayout>
  )
}

export default View;
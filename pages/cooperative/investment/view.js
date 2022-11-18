import { useRouter } from "next/router";
import React, {useState, useEffect} from 'react';
import Header from '../../../components/layouts/Header';
import AppLayout from '../../../components/layouts/AppLayout';
import SuccessModal from '../../../components/modal/SuccessModal';
import DeclineModal from '../../../components/modal/investment/DeclineModal';
import {displaySingleInvestment} from '../../../services/cooperative-admin.js';
import InvestmentDetails from '../../../components/pages/investment/InvestmentDetails';

const View = () => {
  const router = useRouter();
  const { id } = router.query;
  const [decline, setDecline] = useState(false);
  const [inputValue, setInputValue] =useState([]);
  const [transferSuccess, setTransferSuccess] = useState(false);
  
  useEffect (() =>  {
    const handleSubmit = async (id) => {
    try {
      const myData= await displaySingleInvestment(id)
      const newData= myData?.data;
      console.log(newData)
      setInputValue(newData)
      
      } catch (error) {
        // toast.error(data?.message, { duration: 10000 });
      }
      }
      if(id){
        console.log(id)
        handleSubmit(id)
      }
      }, [id])
  
  return (
    <AppLayout>
        {/* { Decline Modal */}
        { decline && <DeclineModal
        toggle={()=>setDecline(false)}
        open={()=>setDecline(true)} />}


        {/* {Transfer to wallet SUCCESS modal} */}
        { transferSuccess && <SuccessModal
        msg='Alhiyu Samabara will be notified on the approval.'
        btnText='Ok'
        toggle={()=>setTransferSuccess(false)}
        open={()=>setTransferSuccess(true)} />}

        <Header  withBack='true' withRed='true' 
            unColoredBtnTitle='Decline' coloredBtnTitle='Approve' 
            coloredBtnClick={setTransferSuccess} unColoredBtnClick={setDecline}
            />
        <InvestmentDetails 
            roi={inputValue?.roi}
            endDate={inputValue?.endDate}
            location={inputValue?.location}
            duration={inputValue?.duration}
            startDate={inputValue?.startDate}
            companyName={inputValue?.companyName}
            targetAmount={inputValue?.targetAmount}
            availableUnit={inputValue?.availableUnit}
            amountPerUnit={inputValue?.amountPerUnit}
            titleOfBusiness={inputValue?.titleOfBusiness}
            establishmentDate={inputValue?.establishmentDate}
        />
        <div className='bg-white p-[3rem] rounded-xl flex flex-col my-[3rem] '>
            <p className='text-[24px] text-[#666668]'>Description</p>
            <hr className=' border-solid border-[#EBEBEB] my-[2.5rem] ' />
            <p className='text-[16px] text-[#9999B4]'>{inputValue?.description} </p>
            {/* <p className='text-[16px] text-[#9999B4]'>Sambara farms is a livestock farm. We rear cows, goats, sheeps and have a poultry.
                Velit, egestas non proin sed elementum, a, molestie eu. Ut donec eget adipiscing nullam lectus egestas. Purus a congue metus, vulputate ut enim. Rhoncus ultricies 
                volutpat faucibus pretium, tortor scelerisque. Ut cursus proin cursus sit pretium nulla. Tincidunt nunc, tristique dolor vulputate id suspendisse pharetra nibh. 
                Lorem scelerisque adipiscing donec facilisi aliquam. Commodo lacus vehicula ultricies interdum euismod massa mattis mus sapien. Sagittis risus, amet, tortor in
                neque fringilla tellus hac. Leo elit in tortor sit mi viverra sed adipiscing. Mi habitant arcu semper quisque. Felis potenti turpis commodo fames orci. 
                Sed nullam elementum at donec aliquam orci cursus lorem. 
                Mattis et morbi fermentum suspendisse viverra elit fermentum pellentesque adipiscing. Vestibulum, vitae orci netus nisl. Ornare lobortis nunc vulputate nulla. Ultricies lectus.</p> */}
            
            
        </div>
        <div className='bg-white p-[3rem] rounded-xl flex flex-col my-[3rem] !min-h-[30rem]'>
            <p className='text-[24px] text-[#666668]'>Documents</p>
            <hr className=' border-solid border-[#EBEBEB] my-[2.5rem] ' />
     </div>
    </AppLayout>
  )
}

export default View;

// {
//   companyName,
//   titleOfBusiness,
//   roi,
//   startDate,
//   endDate,
//   establishmentDate,
//   location,
//   duration,
//   category,
//   targetAmount,
//   amountPerUnit,
//   availableUnit,
//   description,
//   documents,
//   images,
//   approvalStatus,
//   reasonsForDecline,
//   cooperativeId
// }
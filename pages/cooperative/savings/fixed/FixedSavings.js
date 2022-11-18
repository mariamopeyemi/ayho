import Image from 'next/image';
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import React,{useState, useEffect} from 'react';
import PlanCard from '../../../../components/cards/PlanCard';
import { displayFixedSavings } from "../../../../services/cooperative-admin.js"
import { CircularProgress, Skeleton } from '@mui/material';

const FixedSavings = ({trigger}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [emptySavings, setEmptySavings] =useState('');
  const [fixedDataValue, setFixedDataValue] =useState([]);
 

  function view(id){
    router.push({
      pathname: '/cooperative/savings/fixed/view',
      query: { id},
    })
  }
  // ty to create a modal after succesful creation, load and display all with your timer
   
  // display fixed goal
    useEffect (() =>  {
      const handleFix = async () => {
        // setLoading(true);
        try {
        const fixData= await displayFixedSavings()
        console.log('this is fetching fixed savings for display')
        const newData= fixData?.data;
        if (newData.length >= 1) {
          setEmptySavings(false);
          setLoading(false)
        } else {
          setEmptySavings(true);
          setLoading(false)
        }
        // setTimeout(() => {
        //   setLoading(true)
        // }, 1000);
        setFixedDataValue(fixData?.data?.data);
      } catch (error) {
        toast.error("Error getting fixed savings. Try again later" , { duration: 10000 });
      }}
      handleFix()
    }, [trigger])
  return (
    <>
    {loading && (
      // <div className='flex justify-center align-center mt-[25%]'>
      //   <CircularProgress color="inherit" />
      // </div>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] lg:grid-cols-[repeat(2,_minmax(300px,_1fr))] gap-[2.7rem] mt-[3.2rem]">
            <Skeleton variant="rectangular" className=" rounded-primary w-full" animation="wave" height={190} />
            {/* w-[450px] h-[190px] */}
            <Skeleton variant="rectangular" className=" rounded-primary w-full" animation="wave" height={190} />
            <Skeleton variant="rectangular" className=" rounded-primary w-full" animation="wave" height={190} />
            <Skeleton variant="rectangular" className=" rounded-primary w-full" animation="wave" height={190} />
          </div>
        )}
    {emptySavings ?
     <div className="mt-[15%] flex flex-col justify-center content-center ">
        <div className="items-center  mx-[auto]"><Image src='/images/empty2.png' alt='empty' width='100px' height='100px' /></div>
        <p className="items-center  mx-[auto]">No Saving plan</p>
      </div> 
      :
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] lg:grid-cols-[repeat(2,_minmax(300px,_1fr))] gap-[1.7rem] mt-[3.2rem]">
      {/* <div className="flex flex-wrap gap-[1.5rem]"> */}
      {fixedDataValue?.map((item, index) => {
        return (
          <PlanCard key={index} onClick={()=>view(item.id)} amount={item.amountTobeSaved} title={item.title}  percentage='10' status={item.statusOfPlan} fixed='true' />
        );})}
    {/* <PlanCard amount='600,000,' percentage='10' fixed='true' status='Matured' title='Agro-Allied Savings'  onClick={view} /> */}
 </div>}
    </>
  )
}

export default FixedSavings;

// {!loading && (!activeSaving || activeSaving?.length < 1) && <EmptyState className={"min-h-[75vh]"} caption={`No ${activeTab} plan.`} img={"/empty-savings.png"}></EmptyState>}
        
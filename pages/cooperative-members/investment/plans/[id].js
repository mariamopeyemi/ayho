import { Button, Dialog } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import GoBack from "../../../../components/general/GoBack";
import GreyBox from "../../../../components/general/GreyBox";
import Label from "../../../../components/general/Label";
import AppLayout from "../../../../components/layouts/AppLayout";
import PlainContainer from "../../../../components/layouts/PlainContainer";
import PlainContainerTitle from "../../../../components/layouts/PlainContainerTitle";
import InvestDetailsPopup from "../../../../components/pages/cooperative-members-section/popups/InvestDetails";

const PlansDetails = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [openedTab, setOpenedTab] = useState(null);
  const [prevModalAddCard, setPrevModalAddCard] = useState();
  const handleClose = () => {
    setOpen(false);
  };
  const openModal = (name) => {
    setOpen(true);
    setActiveModal(name);
  };

  return (
    <>
      <Dialog scroll="body" onClose={handleClose} open={open}>
        <InvestDetailsPopup onClose={handleClose}></InvestDetailsPopup>
      </Dialog>
      <AppLayout>
        <div className="flex items-center justify-between">
          <GoBack name={router?.query?.id} link={"/cooperative-members/investment/plans"}></GoBack>
          <Label type={router?.query?.label} text={router?.query?.status}></Label>
        </div>
        <main className="grid gap-[1.8rem] mt-[2.8rem]">
          <PlainContainer>
            <div className="flex items-center justify-between">
              <div className=" flex items-center">
                <img src={"/cashew.png"} className="w-[9.5rem] h-[9.5rem] rounded-full"></img>
                <div className="flex flex-col ml-[3.2rem] mr-auto">
                  <p className=" text-[2.2rem] leading-[37px] font-medium text-pv_dark font-rubik">{router?.query?.name ?? "Cassava Farm Fund"}</p>
                  <p className="text-label font-medium text-[1.6rem]">{"ARM Investment Managers Limited"}</p>
                </div>
              </div>
              <Button
                onClick={() => {
                  setOpen(true);
                }}
                className="max-w-[183px]"
              >
                Invest Now
              </Button>
            </div>
          </PlainContainer>
          <PlainContainer>
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-[1.7rem]">
              <GreyBox className={" py-[2.6rem] px-[2.5rem]"} subTitle={"21/07/2022"} title={"Start Date"}></GreyBox>
              <GreyBox className={" py-[2.6rem] px-[2.5rem]"} subTitle={"21/07/2022"} title={"End Date"}></GreyBox>
              <GreyBox className={" py-[2.6rem] px-[2.5rem]"} subTitle={"40"} title={"Available Unit"}></GreyBox>
              <GreyBox className={" py-[2.6rem] px-[2.5rem]"} subTitle={"N20,000"} title={"Amount per Unit"}></GreyBox>
              <GreyBox className={" py-[2.6rem] px-[2.5rem]"} subTitle={"10%"} title={"ROI"}></GreyBox>
              <GreyBox className={" py-[2.6rem] px-[2.5rem]"} subTitle={"6 Months"} title={"Duration"}></GreyBox>
              <GreyBox className={" py-[2.6rem] px-[2.5rem]"} subTitle={"Abuja"} title={"Location"}></GreyBox>
            </div>
          </PlainContainer>
          <PlainContainerTitle title="Description">
            <p className=" text-label font-medium text-[1.4rem] leading-[26px] mt-[1.6rem]">
              Velit, egestas non proin sed elementum, a, molestie eu. Ut donec eget adipiscing nullam lectus egestas. Purus a congue metus, vulputate ut enim. Rhoncus ultricies volutpat faucibus
              pretium, tortor scelerisque. Ut cursus proin cursus sit pretium nulla. Tincidunt nunc, tristique dolor vulputate id suspendisse pharetra nibh. Lorem scelerisque adipiscing donec facilisi
              aliquam. Commodo lacus vehicula ultricies interdum euismod massa mattis mus sapien. Sagittis risus, amet, tortor in neque fringilla tellus hac. Leo elit in tortor sit mi viverra sed
              adipiscing. Mi habitant arcu semper quisque. Felis potenti turpis commodo fames orci. Sed nullam elementum at donec aliquam orci cursus lorem. Mattis et morbi fermentum suspendisse
              viverra elit fermentum pellentesque adipiscing. Vestibulum, vitae orci netus nisl. Ornare lobortis nunc vulputate nulla. Ultricies lectus.
            </p>
          </PlainContainerTitle>
        </main>
      </AppLayout>
    </>
  );
};

export default PlansDetails;

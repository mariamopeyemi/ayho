import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import StatCard from "../../../../../components/cards/StatCard";
import CopyLink from "../../../../../components/general/CopyLink";
import CurrencySymbol from "../../../../../components/general/CurrencySymbol";
import DocBox from "../../../../../components/general/DocBox";
import GoBack from "../../../../../components/general/GoBack";
import Label from "../../../../../components/general/Label";
import AppLayout from "../../../../../components/layouts/AppLayout";
import PlainContainer from "../../../../../components/layouts/PlainContainer";
import PlainContainerTitle from "../../../../../components/layouts/PlainContainerTitle";
import ImpressionBox from "../../../../../components/pages/cooperative-members-section/investment/ImpressionBox";
import { MembersContext } from "../../../../../context/MembersProvider";
import { getSingleInvestmentApplication } from "../../../../../services/cooperative-members.js";
import formatNumberWithCommas from "../../../../../utils/addCommas";
import formatDate from "../../../../../utils/formatDate";
import getTimeAgo from "../../../../../utils/getTimeAgo";

const Title = ({ text, className }) => {
  return <p className={` text-pv_dark text-[1.6rem] leading-[29px] font-medium mb-[1.6rem] ${className}`}>{text}</p>;
};

const TextValue = ({ text, value, className }) => {
  return (
    <p className={`font-medium text-[1.5rem] flex items-center capitalize ${className}`}>
      <span className=" text-label">{text}: &nbsp;</span>
      <span className="text-text font-medium">{value}</span>
    </p>
  );
};

const ApplicationDetails = () => {
  const router = useRouter();

  const { investmentApplications, setInvestmentApplications } = useContext(MembersContext);
  const application = investmentApplications?.hash[router?.query?.id];
  const [loading, setLoading] = useState(false);

  const fetchApplication = async () => {
    const respData = await getSingleInvestmentApplication(router?.query?.id);
    if (respData?.status) {
      setInvestmentApplications((val) => ({ ...val, hash: { ...val?.hash, [router?.query?.id]: respData?.data } }));
    }
  };
  useEffect(() => {
    if (router?.isReady) {
      if (!application) {
        setLoading(true);
      }

      fetchApplication();
      setLoading(false);
    }
  }, [router?.isReady]);
  return (
    <AppLayout>
      <div className="flex items-center justify-between">
        <GoBack name={application?.companyName} link={"/cooperative-members/investment/applications"}></GoBack>
        <Label type={router?.query?.label} text={router?.query?.status}></Label>
      </div>
      <main className="mt-[2.4rem] grid gap-[1.6rem]">
        {/* Active Stat */}
        {(router?.query?.status == "active" || router?.query?.status == "completed") && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[1.2rem]">
            <PlainContainer className={" !h-full col-span-1"}>
              <div className=" flex items-center">
                <img src={"/cashew.png"} className="w-[7.5rem] h-[7.5rem] rounded-full"></img>
                <div className="flex flex-col ml-[1.6rem] mr-auto">
                  <p className=" text-[1.8rem] font-semibold text-text font-rubik">{"Fish Farm"}</p>
                  <p className="text-label font-medium text-[1.6rem]">{"Abuja"}</p>
                </div>
              </div>
            </PlainContainer>
            <PlainContainer className={" !p-[1.2rem] col-span-1 lg:col-span-2 grid md:!grid-cols-2 gap-[2.5rem]"}>
              <StatCard
                rightContent={
                  <Link href={`/cooperative-members/investment/applications/${router?.query?.id}/investors?status=${router?.query?.status}&label=${router?.query?.label}`}>
                    <a className="w-[57px] h-[57px] rounded-full bg-white grid justify-center items-center cursor-pointer group">
                      <img className="h-[14px] group-hover:translate-x-1" alt="arrow" src="/investors-arrow.svg"></img>
                    </a>
                  </Link>
                }
                titleClassName={" !mb-[.3rem]"}
                className={"!h-[11rem]"}
                bgColor="#F44771"
                title={"No of investors "}
                value={300}
              ></StatCard>
              <StatCard titleClassName={" !mb-[.3rem]"} className={"!h-[11rem]"} bgColor="linear-gradient(263.32deg, #230B34 0.96%, #8B31CA 100%" title={"Raised Amount "} value={"300,000"}></StatCard>
            </PlainContainer>
          </div>
        )}
        {/* Pending Stat */}
        {router?.query?.status == "pending" && (
          <PlainContainer className={" flex items-center justify-between flex-wrap"}>
            <div className=" flex items-center">
              <img src={"/cashew.png"} className="w-[4.7rem] h-[4.7rem] rounded-full"></img>
              <div className="flex flex-col ml-[1.6rem] mr-auto">
                <p className=" text-[1.5rem] font-medium text-text">{application?.titleOfBusiness}</p>
                <p className="text-label font-medium text-[1.4rem]">{application?.location}</p>
              </div>
            </div>
            <div className="bg-[#E7EBED] rounded-primary h-[7.5rem] p-[1.6rem] text-[1.4rem] font-medium flex items-center">
              <span className="text-pv_dark mr-3 w-full max-w-[410px] md:mr-[8rem]">Application has been sent</span>
              <span className="text-text whitespace-nowrap">{getTimeAgo(new Date(application?.createdAt).getTime())} </span>
            </div>
          </PlainContainer>
        )}
        {/* Details */}
        <PlainContainer className={"grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-[2.4rem]"}>
          <div className="grid gap-[1.8rem]">
            <TextValue
              text={"Amount per slot"}
              value={
                <span>
                  <CurrencySymbol />
                  &nbsp;
                  {formatNumberWithCommas(application?.amountPerUnit)}
                </span>
              }
            ></TextValue>
            <TextValue text={"Duration"} value={application?.duration}></TextValue>
            <TextValue
              text={"Target Amount"}
              value={
                <span>
                  <CurrencySymbol />
                  &nbsp;
                  {formatNumberWithCommas(application?.targetAmount)}
                </span>
              }
            ></TextValue>
          </div>
          <div className="grid gap-[1.8rem] justify-self-start">
            <TextValue text={"Start Date"} value={formatDate(application?.startDate)}></TextValue>
            <TextValue text={"End Date"} value={formatDate(application?.endDate)}></TextValue>
            <TextValue text={"Category"} value={application?.category}></TextValue>
          </div>
          <div className="grid gap-[1.8rem] justify-self-start items-start">
            <TextValue text={"ROI"} value={application?.roi}></TextValue>
            <TextValue text={"Unit"} value={application?.availableUnit}></TextValue>
            <div></div>
          </div>
          <div className="grid gap-[1.8rem] justify-self-start">
            <TextValue text={"Application Date"} value={formatDate(application?.createdAt)}></TextValue>
            <TextValue text={"Establishment Date"} value={formatDate(application?.establishmentDate)}></TextValue>
            <div></div>
          </div>
        </PlainContainer>

        {/* Impressions */}
        {(router?.query?.status == "Active" || router?.query?.status == "Completed") && (
          <PlainContainerTitle title="Impressions">
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-[1.6rem] mt-[3.4rem]">
              <ImpressionBox value={50} title="Views" type="warn"></ImpressionBox>
              <ImpressionBox value={60} title="Clicks" type="error"></ImpressionBox>
              <ImpressionBox value={90} title="Available Slots" type="success"></ImpressionBox>
              <ImpressionBox value={12} title="Purchased Slots" type="active"></ImpressionBox>
            </div>
          </PlainContainerTitle>
        )}

        {/* Share  */}
        {(router?.query?.status == "Active" || router?.query?.status == "Completed") && (
          <PlainContainerTitle title="Share Fish Farm">
            <div className={"grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-[1.6rem] mt-[2.9rem]"}>
              <CopyLink></CopyLink>
              <div className=" bg-input rounded-primary h-[5.6rem] flex items-center text-[1.6rem] text-label p-[2.4rem]">
                <span>counter:</span>
                <span>0</span>
              </div>
            </div>
          </PlainContainerTitle>
        )}

        {/* Description */}
        <PlainContainerTitle title="Description">
          <p className=" text-label font-medium text-[1.4rem] leading-[26px] mt-[1.6rem]">{application?.description}</p>
        </PlainContainerTitle>

        {/* Docs */}
        <PlainContainerTitle title="Documents">
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-[1.6rem] mt-[2.6rem]">
            <DocBox title={"Pitch Deck"}></DocBox>
            <DocBox title={"CAC"}></DocBox>
            <DocBox title={"CAC"}></DocBox>
            <DocBox title={"CAC"}></DocBox>
          </div>
        </PlainContainerTitle>
      </main>
    </AppLayout>
  );
};

export default ApplicationDetails;

import React from "react";
import EmptyState from "../../../components/general/EmptyState";
import AppLayout from "../../../components/layouts/AppLayout";

const Notifications = () => {
  return (
    <AppLayout>
      <EmptyState className={"min-h-[75vh]"} caption={"No Notifications."} img={"/zero-message.png"}></EmptyState>
    </AppLayout>
  );
};

export default Notifications;

import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/cooperative-members/investment/applications");
  }, []);
  return <div></div>;
};

export default Index;

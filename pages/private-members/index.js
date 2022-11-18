import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router?.replace("/private-members/dashboard");
  }, []);
  return <div>Private members</div>;
};

export default Index;

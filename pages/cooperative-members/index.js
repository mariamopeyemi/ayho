import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router?.replace("/cooperative-members/dashboard");
  }, []);
  return <div>Cooperative members</div>;
};

export default Index;

import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router?.replace("/cooperative/dashboard");
  }, []);
  return <div>Cooperative Admin</div>;
};

export default Index;

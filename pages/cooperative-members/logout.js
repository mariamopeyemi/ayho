import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContextProvider";

const Logout = () => {
  const router = useRouter();
  const { logOut } = useContext(AuthContext);
  useEffect(() => {
    logOut();
    router.push("/signin");
  }, []);
  return <div></div>;
};

export default Logout;

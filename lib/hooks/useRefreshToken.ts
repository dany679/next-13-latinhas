"use client";

import axios from "@/lib/axios";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();
  console.log(session);
  console.log(session?.user);
  const refreshToken = async () => {
    console.log(axios.getUri());
    console.log(session?.user);
    console.log(session?.tokens);
    console.log(session?.jwt);
    const res = await axios.post("/auth/refresh", {
      refresh: session?.user.refreshToken,
    });
    console.log(res);

    if (session) session.user.accessToken = res.data.accessToken;
    else signIn();
  };
  return refreshToken;
};

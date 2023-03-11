import React, { FC, useEffect, ComponentType, useMemo } from "react";
import { DASHBOARD_PAGE_URL, LOGIN_URL } from "../routes";
import { useRouter } from "next/router";
import { Bars } from "react-loader-spinner";
import { useAuth } from "../providers/auth";
import { getToken } from "../utils/auth";
import { useConfigurations } from "../providers/configurations";

/**
 *
 * @param Component - the component that is passed into the HOC can be either a function component or class component.
 *
 * @see https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb
 */

export const withAuth =
  <P extends object>(Component: ComponentType<P>): FC<P> =>
  (...props) => {
    const { isInProgress, activeUserInfo, checkAuth } = useAuth();
    const { getAllConfigurations, configurations } = useConfigurations();

    const router = useRouter();
    const { push, replace } = router;

    useEffect(() => {
      if (!activeUserInfo?.accessToken) {
        const hasValidToken = getToken();
        checkAuth(hasValidToken);
        if (!hasValidToken) {
          replace(LOGIN_URL);
        }
      } else {
        push(DASHBOARD_PAGE_URL);
      }
    }, []);

    useEffect(() => {
      if (activeInfo?.id && !configurations?.userId) {
        getAllConfigurations(activeInfo?.id);
      }
    }, [activeUserInfo?.id]);

    const activeInfo = useMemo(() => {
      return activeUserInfo;
    }, [activeUserInfo]);

    return isInProgress?.loginUser ? (
      <Bars
        height="250px"
        width="100%"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{ marginTop: "15%" }}
        wrapperClass=""
        visible={true}
      />
    ) : activeInfo ? (
      <Component {...(props as P)} id={router.query.id} />
    ) : null;
  };

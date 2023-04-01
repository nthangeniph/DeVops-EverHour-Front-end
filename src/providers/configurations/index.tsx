import React, { FC, useReducer, useContext, PropsWithChildren } from "react";
import { useGet, useMutate } from "restful-react";
import { useAuth } from "../auth";
import { getFlagSetters } from "../utils/flagsSetters";
import {
  getConfigurationAction,
  getConfigurationErrorAction,
  getConfigurationSuccessAction,
  updateConfigAction,
  updateConfigSuccessAction,
  updateConfigErrorAction,
  updateIsTrackedAction,
} from "./actions";
import {
  ConfigurationActionsContext,
  ConfigurationStateContext,
  IConfigurationUpdateInput,
} from "./contexts";
import { configurtationReducer } from "./reducer";

const ConfigurationProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [state, dispatch] = useReducer(configurtationReducer, {});
  const { activeUserInfo } = useAuth();
  const { refetch: getConfigurationHttp } = useGet({
    path: `/api/configurations/getConfigById`,
    lazy: true,
  });
  const { mutate: updateConfigurationHttp } = useMutate({
    path: "/api/configurations/update",
    verb: "PATCH",
  });
  const getAllConfigurations = (userId: string) => {
    dispatch(getConfigurationAction());
    getConfigurationHttp({
      path: `/api/configurations/getConfigById`,
      queryParams: { userId },
    })
      .then(({ configuration }) => {
        dispatch(getConfigurationSuccessAction(configuration));
      })
      .catch((error) => {
        dispatch(getConfigurationErrorAction(error));
      });
  };
  const updateConfigurations = (payload: IConfigurationUpdateInput) => {
    dispatch(updateConfigAction());

    updateConfigurationHttp(payload)
      .then((res) => {
        dispatch(updateConfigSuccessAction(res));
      })
      .catch((error) => {
        dispatch(updateConfigErrorAction(error));
      });
  };
  const updateIsTracked = (isTracked: boolean) => {
    dispatch(updateIsTrackedAction(isTracked));
  };
  return (
    <ConfigurationStateContext.Provider value={state}>
      <ConfigurationActionsContext.Provider
        value={{
          ...getFlagSetters(dispatch),
          updateConfigurations,
          getAllConfigurations,
          updateIsTracked,

          /* NEW_ACTION_GOES_HERE */
        }}
      >
        {children}
      </ConfigurationActionsContext.Provider>
    </ConfigurationStateContext.Provider>
  );
};

function useConfigState() {
  const context = useContext(ConfigurationStateContext);
  if (!context) {
    throw new Error(
      "useConfigState must be used within a ConfigurationProvider"
    );
  }
  return context;
}

function useConfigActions() {
  const context = useContext(ConfigurationActionsContext);
  if (context === undefined) {
    throw new Error(
      "useConfigActions must be used within a ConfigurationProvider"
    );
  }
  return context;
}

function useConfigurations() {
  return { ...useConfigActions(), ...useConfigState() };
}

export {
  ConfigurationProvider,
  useConfigActions,
  useConfigState,
  useConfigurations,
};

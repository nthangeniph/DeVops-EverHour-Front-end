import "../styles/globals.css";
import App from "next/app";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RestfulProvider } from "restful-react";
import { DevOpsProvider } from "../providers/devOps";
import { EverHourProvider } from "../providers/everHour";
import { AuthProvider } from "../providers/auth";
import { getToken } from "../utils/auth";
import { ConfigurationProvider } from "../providers/configurations";

interface IState {
  headers: { [key: string]: string };
  tokenIsSet: boolean;
}

class Main extends App<{}, {}, IState> {
  static async getInitialProps({
    Component,
    ctx,
  }: {
    Component: any;
    ctx: any;
  }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
  }

  constructor(props: any) {
    super(props);
    this.state = {
      headers: {},
      tokenIsSet: false,
    };
  }

  checkAccessToken(redirect: boolean = false) {
    //@ts-ignore
    if (!localStorage.getItem(ACCESS_TOKEN_NAME)) {
      this.setState({ headers: {}, tokenIsSet: false });
      if (redirect) {
        // window.location.href = DASHBOARD_PAGE_URL;
      }
    }
  }

  //demo prepararion donec
  render() {
    const { Component, pageProps, router } = this.props;
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    return (
      //@ts-ignore
      <RestfulProvider
        base={BASE_URL}
        requestOptions={{
          headers: {
            authorization: getToken()?.accessToken,
          },
        }}
      >
        <AuthProvider>
          <DevOpsProvider>
            <EverHourProvider>
              <ConfigurationProvider>
                <DndProvider backend={HTML5Backend}>
                  <Component {...pageProps} {...(router?.query || {})} />
                </DndProvider>
              </ConfigurationProvider>
            </EverHourProvider>
          </DevOpsProvider>
        </AuthProvider>
      </RestfulProvider>
    );
  }
}

export default Main;

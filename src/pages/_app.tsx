import "../styles/globals.css";
import type { AppProps } from "next/app";
import App from "next/app";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RestfulProvider } from "restful-react";
import { BASE_URL } from "../api/utils/constants";
import { DevOpsProvider } from "../providers/devOps";
import { EverHourProvider } from "../providers/everHour";

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

    return (
      //@ts-ignore
      <RestfulProvider
        base={BASE_URL}
        requestOptions={{
          headers: {
            authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTI2YjRiZDU3YTQ4NDU0OTFmODMzNSIsInVzZXJuYW1lIjoiTnRoYW5nZW5pcGhAZ21haWwuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY2NzQ2ODQ1OCwiZXhwIjoxNjY3NTA0NDU4fQ.JVB7-xb8fxIw0jYv6d-wxZ0BVRfT8B05d5akgTn3jLo",
          },
        }}
      >
        <DevOpsProvider>
          <EverHourProvider>
            <DndProvider backend={HTML5Backend}>
              <Component {...pageProps} {...(router?.query || {})} />
            </DndProvider>
          </EverHourProvider>
        </DevOpsProvider>
      </RestfulProvider>
    );
  }
}

export default Main;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import App from "next/app";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RestfulProvider } from "restful-react";
import { BASE_URL } from "../api/utils/constants";
import { DevOpsProvider } from "../providers/devOps";

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
        requestOptions={{ headers: {authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTI2YjRiZDU3YTQ4NDU0OTFmODMzNSIsInVzZXJuYW1lIjoiTnRoYW5nZW5pcGhAZ21haWwuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY2NzI5NDg5MiwiZXhwIjoxNjY3MzMwODkyfQ.1WxK_Usc2tHbnbjrcI7IOoyfibBeLFPHZV3MoJcokQE'} }}
      >
        <DevOpsProvider>
        <DndProvider backend={HTML5Backend}>
          <Component {...pageProps} {...(router?.query || {})} />
        </DndProvider>
        </DevOpsProvider>
      </RestfulProvider>
    );
  }
}

export default Main;

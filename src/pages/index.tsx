import type { NextPage } from "next";
import DragDrop from "../components/DragDrop";
import styles from "../styles/Home.module.css";
import { Layout } from "antd";
import style from "./style.module.scss";
import { BsFileEarmarkCodeFill } from "react-icons/bs";
import { withAuth } from "../hocs/withAuth";
import { useEffect } from "react";
import ReactGA from "react-ga";

const Home: NextPage = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);
  return (
    <div className={styles.container}>
      <DragDrop />

      <Layout.Footer className={style.footer}>
        <span style={{ cursor: "pointer" }}>
          {" "}
          <BsFileEarmarkCodeFill
            style={{ marginRight: "5px", cursor: "pointer" }}
            color="green"
            size={15}
          />{" "}
          Developed with Passion By P Nthangeni
        </span>
      </Layout.Footer>
    </div>
  );
};

export default withAuth(Home);

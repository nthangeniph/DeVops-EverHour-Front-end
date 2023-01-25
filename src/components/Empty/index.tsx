import React from "react";
import { Empty } from "antd";
import Style from "./style.module.scss";

interface IEmpty {
  onEmpty: () => void;
  description: string;
  buttonDescription: string;
}
export const EmptyData: React.FC<IEmpty> = ({
  onEmpty,
  buttonDescription,
  description,
}) => (
  <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 60,
      margin: "auto",
    }}
    description={description}
  >
    <div className={Style.Description}>
      <span style={{ margin: "0 auto" }}>
        <button className={Style.antBtnAntBtnPrimary} onClick={onEmpty}>
          {buttonDescription}
        </button>
      </span>
    </div>
  </Empty>
);

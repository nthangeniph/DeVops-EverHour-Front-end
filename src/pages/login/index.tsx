import React, { useEffect, useState } from "react";
import { Button, Form, Input, Tabs, Divider } from "antd";
import { EditOutlined, LockFilled } from "@ant-design/icons";
import style from "./style.module.scss";
import Image from "next/image";
import { useAuth } from "../../providers/auth";
import { ILogin, ISignUp } from "../../providers/auth/contexts";
import profilePic from "../../../public/pngtree-line-art-drawing-two-people-working-together-puzzle-png-image_3621638-removebg-preview.png";

const Login = () => {
  const { loginUser, signUpUser, accountDetails, isInProgress, succeeded } =
    useAuth();
  const [activeTab, setActiveTab] = useState<string>("1");

  useEffect(() => {
    if (accountDetails?.user?.username) {
      setActiveTab(() => "1");
    }
  }, [accountDetails]);

  const onChange = (key: string) => {
    console.log(key);
  };

  const handleSignUp = (values: ISignUp) => {
    //@ts-ignore
    delete values.confirm;
    signUpUser(values);
  };

  const handleLogin = (values: ILogin) => {
    loginUser(values);
  };
  const isLogigin = isInProgress?.loginUser || succeeded?.loginUser;

  const validateMessages = {
    required: "'${name}' is required!",
  };

  return (
    <div className={style.container}>
      <Image
        src={profilePic}
        alt="Picture of the company"
        className={style.cover}
      />

      <div className={style.tabContainer}>
        <Tabs
          centered
          defaultActiveKey={activeTab}
          onChange={onChange}
          items={[
            {
              label: (
                <span>
                  <LockFilled />
                  Sign In
                </span>
              ),
              key: "1",
              children: (
                <Form
                  className={style.loginForm}
                  validateMessages={validateMessages}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 17 }}
                  onFinish={(values) => handleLogin(values)}
                >
                  <Form.Item
                    label="Email/UserName"
                    name="username"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true }]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <br />
                  <Form.Item>
                    <Button
                      className={style.loginBtn}
                      htmlType="submit"
                      type="primary"
                      disabled={isLogigin}
                      loading={isLogigin}
                    >
                      Sign In
                    </Button>
                  </Form.Item>
                </Form>
              ),
            },
            {
              label: (
                <span>
                  <EditOutlined />
                  Sign Up
                </span>
              ),
              key: "2",
              children: (
                <Form
                  className={style.signUpForm}
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 16 }}
                  onFinish={handleSignUp}
                >
                  <Divider>Everhour</Divider>
                  <Form.Item label="XApiKey" name="xApiKey">
                    <Input />
                  </Form.Item>
                  <Divider>DevOps</Divider>
                  <Form.Item label="PAT" name="pat">
                    <Input />
                  </Form.Item>
                  <Form.Item label="UserName" name="devOpsUsername">
                    <Input />
                  </Form.Item>
                  <Form.Item label="DisplayName" name="devOpsDisplayName">
                    <Input />
                  </Form.Item>
                  <Divider>Credentials</Divider>
                  <Form.Item label="Email Address" name="username">
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The two passwords that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      className={style.loginBtn}
                      htmlType="submit"
                      type="primary"
                    >
                      Sign Up
                    </Button>
                  </Form.Item>
                </Form>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Login;

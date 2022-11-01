import React from "react";
import { Button, Form, Input, Tabs } from "antd";
import { EditOutlined, LockFilled } from "@ant-design/icons";
import style from "./style.module.scss";

const Login = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div className={style.container}>
      <div className={style.infoContainer}>
        <p>A fun way of tracking time spent on your DevOps items</p>
      </div>
      <div className={style.tabContainer}>
        <Tabs
          centered
          defaultActiveKey="1"
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
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 17 }}
                  onFinish={(values) => console.log(values)}
                >
                  <Form.Item label="Email/UserName" name="username">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Password" name="password">
                    <Input />
                  </Form.Item>
                  <br />
                  <Form.Item>
                    <Button
                      className={style.loginBtn}
                      htmlType="submit"
                      type="primary"
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
                  onFinish={(values) => console.log(values)}
                >
                  <Form.Item label="Email Address" name="username">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Everhour API Key" name="xApiKey">
                    <Input />
                  </Form.Item>
                  <Form.Item label="DevOps PAT" name="pat">
                    <Input />
                  </Form.Item>
                  <Form.Item label="DevOps UserName" name="devOpsUsername">
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="DevOps DisplayName"
                    name="devOpsDisplayName"
                  >
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

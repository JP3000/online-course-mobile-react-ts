import { Button, DotLoading, Form, Input, NavBar } from "antd-mobile";
import { useLocation, useNavigate } from "react-router-dom";
import { IUserParams } from "../../api/user";
import { useUserStore } from "../../store/user";
import qs from "query-string";

export default function Login() {
  const navigate = useNavigate();
  const { loginFetch, isLoading } = useUserStore((state) => state);
  const { search } = useLocation();
  // console.log("search", search);
  const { target } = qs.parse(search);

  const onFinish = (values: IUserParams) => {
    console.log(values);
    // userLogin(values).then((res) => {
    //   console.log(res);
    // });
    loginFetch(values, navigate, target as string);
  };
  const initialValues = {
    username: "edison",
    password: "123123",
  };
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <NavBar onBack={handleBack}>登录</NavBar>
      <Form
        layout="horizontal"
        onFinish={onFinish}
        initialValues={initialValues}
        footer={
          <Button
            block
            type="submit"
            color="primary"
            size="large"
            disabled={isLoading}
          >
            {isLoading ? <DotLoading /> : "提交"}
          </Button>
        }
      >
        <Form.Item
          name="username"
          label="账号"
          rules={[{ required: true, message: "账号不能为空" }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: "密码不能为空" }]}
        >
          <Input placeholder="请输入密码" />
        </Form.Item>
      </Form>
    </>
  );
}

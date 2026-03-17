import { Button, DotLoading, Form, Input, NavBar } from "antd-mobile";
import { useLocation, useNavigate } from "react-router-dom";
import { IUserParams } from "../../api/user";
import { useUserStore } from "../../store/user";
import qs from "query-string";

export default function Login() {
  const navigate = useNavigate();
  const { loginFetch, isLoading } = useUserStore((state) => state);
  const { search } = useLocation();
  const parsed = qs.parse(search);
  const target = typeof parsed.target === "string" ? parsed.target : "";

  const onFinish = (values: IUserParams) => {
    loginFetch(values, navigate, target);
  };
  const initialValues = {
    username: "admin",
    password: "admin",
  };
  const handleBack = () => {
    if (target) {
      navigate("/today", { replace: true });
      return;
    }

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

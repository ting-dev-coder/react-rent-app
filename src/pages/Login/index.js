import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import NavHeader from '../../components/Header'
import {
  Form,
  Input
} from 'antd-mobile'
function Login() {
  const location = useLocation(),
    params = location.state,
    navigate = useNavigate(),
    [form] = Form.useForm()
  const login = () => {
    const values = form.getFieldsValue()
    console.log(values)
  }
  const onFinish = (values) => {
    console.log(values)
  }
  return (
    <div className={styles.root}>
      {/* 頂部導航 */}
      <NavHeader className={styles.navHeader}>會員登入</NavHeader>

      {/* 登入表單 */}
      <Form
        onFinish={onFinish}
        form={form}
        layout='horizontal'
        footer={
          <button className={styles.submit} type="submit">
            登入
          </button>
        }
      >
        <Form.Item
          className={styles.formItem}
          name='account'
          rules={[{ required: true, message: '帳號不能為空' }]}
        >
          <Input onChange={console.log} placeholder='請輸入帳號' />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: '密碼不能為空' }]}
        >
          <Input onChange={console.log} placeholder='請輸入密碼' />
        </Form.Item>
      </Form>
      <div>
        還沒有帳號，去註冊~
      </div>
    </div>
  )
}

export default Login
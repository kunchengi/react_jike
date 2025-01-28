import { Card, Form, Input, Button } from 'antd';
import logo from '@/assets/logo.png'
import './index.scss'
export default function Login() {
    return (
        <div className='login'>
            {/* 卡片 */}
            <Card className='login-container'>
                <img className='login-logo' alt='logo' src={logo} />
                {/* 登录表单 */}
                <Form>
                    <Form.Item>
                        <Input size='large' placeholder='请输入手机号' />
                    </Form.Item>
                    <Form.Item>
                        <Input size='large' placeholder='请输入验证码' />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' size='large' htmlType='submit' block>登录</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

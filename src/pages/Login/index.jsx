import { Card, Form, Input, Button } from 'antd';
import logo from '@/assets/logo.png'
import './index.scss'
export default function Login() {
    return (
        <div className='login'>
            {/* 卡片 */}
            <Card className='login-container'>
                <img className='login-logo' alt='logo' src={logo} />
                {/* 登录表单，可以通过 validateTrigger 改变校验时机，这边写为失焦时校验 */}
                <Form validateTrigger='onBlur'>
                    <Form.Item
                        // 表单名，一般与接口字段名一致
                        name="mobile"
                        // 校验规则，如果有多个规则，会按顺序校验
                        rules={[
                            {
                                required: true,// 是否必填
                                message: '请输入手机号',
                            },
                            // 手机号为有效格式
                            {
                                pattern: /^1[3-9]\d{9}$/,// 手机号正则表达式
                                message: '请输入正确的手机号'
                            },
                        ]}
                    >
                        <Input size='large' placeholder='请输入手机号' />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码',
                            },
                        ]}
                    >
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

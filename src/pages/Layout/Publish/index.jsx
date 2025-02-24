import { Card, Form, Input, Button, Breadcrumb, Select, Space } from "antd"
import { Link } from "react-router-dom"
import './index.scss'
export default function Publish() {
    return (
        <div className="publish">
            <Card title={<Breadcrumb items={[
                { title: <Link to="/">首页</ Link> },
                { title: "发布文章" }
            ]} />}>
                <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} initialValues={{ type: 1 }}>
                    <Form.Item label="标题" name="title" rules={[{ required: false, message: '请输入文章标题' }]}>
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item label="频道" name="channel_id" rules={[{ required: true, message: '请输入文章频道' }]}>
                        <Select
                            placeholder="请选择频道"
                            style={{ width: 400 }}
                        >
                            <option value={0}>推荐</option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="内容" name="content" rules={[{ required: true, message: '请输入文章内容' }]}>
                        {/* 富文本编辑器 */}
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">{"发布文章"}</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

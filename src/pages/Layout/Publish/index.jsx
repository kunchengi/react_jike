import { Card, Form, Input, Button, Breadcrumb, Select, Space, message } from "antd"
import { Link } from "react-router-dom"
// 导入富文本编辑器包
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useRef, useState } from "react";
import { getChannelAPI, createArticleAPI } from "@/apis/article";
import './index.scss'
export default function Publish() {

    // 频道列表
    const [ channelList, setChannelList ] = useState([]);

    useEffect(() => {
        // 封装函数，在函数体内调用接口
        const getChannels = async () => {
            const res = await getChannelAPI();
            // 设置频道列表
            setChannelList(res.data.channels);
        }
        // 调用函数
        getChannels();
    }, []);

    // 表单提交
    const onFinish = async (formValue) => {
        // 按照接口文档的格式处理收集到的表单数据
        const { title, channel_id, content } = formValue;
        const articleData = {
            title,
            content,
            // 封面，暂时没有上传图片，所以图片数组为空
            cover: {
                type: 0,
                images: []
            },
            channel_id
        };
        const sussess = await createArticleAPI(articleData);
        if(sussess?.message === 'OK')
        {
            message.success('发布成功');
        }
    }

    const quillRef = useRef(null);

    return (
        <div className="publish">
            <Card title={<Breadcrumb items={[
                { title: <Link to="/">首页</ Link> },
                { title: "发布文章" }
            ]} />}>
                <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} initialValues={{ type: 1 }} onFinish={onFinish}>
                    <Form.Item label="标题" name="title" rules={[{ required: false, message: '请输入文章标题' }]}>
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item label="频道" name="channel_id" rules={[{ required: true, message: '请输入文章频道' }]}>
                        <Select
                            placeholder="请选择频道"
                            style={{ width: 400 }}
                        >
                            {/* 循环遍历渲染频道列表 */}
                            {/* value属性用户选中后会自动收集起来，作为接口的提交字段 */}
                            {channelList.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="内容" name="content" rules={[{ required: true, message: '请输入文章内容' }]}>
                        {/* 富文本编辑器 */}
                        <ReactQuill ref={quillRef} className="publish-quill" theme="snow" placeholder="请输入文章内容" />
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

import { Card, Form, Input, Button, Breadcrumb, Select, Space, message, Radio, Upload } from "antd"
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from "react-router-dom"
// 导入富文本编辑器包
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useRef, useState } from "react";
import { createArticleAPI, getArticleById } from "@/apis/article";
// 引入自定义hook
import { useChannel } from "@/hooks/useChannel";
import './index.scss'
export default function Publish() {

    // 调用自定义hook，获取频道列表
    const { channelList } = useChannel();
    // 表单提交
    const onFinish = async (formValue) => {
        // 校验封面类型是否和封面列表数量相同
        if (imageType !== imageList.length) return message.warning('封面类型和图片数量不匹配');
        // 按照接口文档的格式处理收集到的表单数据
        const { title, channel_id, content } = formValue;
        const articleData = {
            title,
            content,
            // 封面，暂时没有上传图片，所以图片数组为空
            cover: {
                type: imageType,// 封面类型，0-无图，1-单图，3-三图
                images: imageList.map(item => item.response.data.url)// 图片列表
            },
            channel_id
        };
        const sussess = await createArticleAPI(articleData);
        if (sussess?.message === 'OK') {
            message.success('发布成功');
        }
    }

    const quillRef = useRef(null);

    // 图片列表
    const [imageList, setImageList] = useState([]);
    // 上传回调，上传的过程中不断执行，直到上传完成
    const onChange = (value) => {
        console.log(value);
        // 拿到上传好的文件列表并保存
        setImageList(value.fileList);
    }

    // 封面类型
    const [imageType, setImageType] = useState(0);
    // 修改封面类型
    const onTypeChange = (e) => {
        // 获取选中的值
        const type = e.target.value;
        setImageType(type);
    }

    // 编辑文章跳转过来的数据回填
    const [searchParams] = useSearchParams();
    const articleId = searchParams.get('id');
    // 获取from的实例
    const [form] = Form.useForm();
    useEffect(() => {
        // 通过id获取数据
        async function getArticleDetail() {
            // 调用接口
            if (!articleId) return;
            const res = await getArticleById(articleId);
            const cover = res.data.cover;
            // setFieldsValue会将对象回填到表单，对象的key要和表单的name一致
            /**
                cover的结构为：
                {
                    "type": 3,
                    "images": [
                        "http://geek.itheima.net/uploads/1742456939696.png",
                        "http://geek.itheima.net/uploads/1742456943130.png",
                        "http://geek.itheima.net/uploads/1742456970012.png"
                    ]
                }
             */
            // 得将type写出来才能回填封面类型
            form.setFieldsValue({
                ...res.data,
                type: cover.type

            });
            // 回填图片列表
            setImageType(cover.type);
            // 显示图片列表
            setImageList(cover.images.map(item => ({
                url: item
            })));
        }
        getArticleDetail();
    }, [articleId, form])

    return (
        <div className="publish">
            <Card title={<Breadcrumb items={[
                { title: <Link to="/">首页</ Link> },
                { title: "发布文章" }
            ]} />}>
                {/* initialValues：表单的初始值 */}
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 0 }}
                    onFinish={onFinish}
                    form={form}// 绑定form实例
                >
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
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={onTypeChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {/* listType：选择文件框的样式
                        showUploadList：是否显示上传列表
                        action: 上传文件的地址，选择文件后调用
                        onChange：上传回调，上传的过程中不断执行，直到上传完成
                        maxCount: 最大上传数量，为1时，再次上传会替换当前文件。大于1时，超出限制后上传无效
                        当前封面类型不为无图时，才显示上传图片的组件 */}
                        {imageType > 0 && <Upload
                            listType="picture-card"
                            showUploadList
                            action="http://geek.itheima.net/v1_0/upload"
                            name="image"
                            onChange={onChange}
                            maxCount={imageType}
                            fileList={imageList}// 上传的图片列表
                        >
                            <div style={{ marginTop: 8 }}>
                                <PlusOutlined />
                            </div>
                        </Upload>}
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

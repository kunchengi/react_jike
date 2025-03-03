import { Link } from 'react-router-dom'
import { Card, Form, Breadcrumb, Button, Select, DatePicker, Radio, Tag, Table, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
// 语言包，时间选择器汉化处理
import locale from 'antd/es/date-picker/locale/zh_CN'

const { Option } = Select
const { RangePicker } = DatePicker
export default function Article() {


  // 状态枚举
  const status = {
    1: <Tag color='warning'>待审核</Tag>,
    2: <Tag color='success'>审核通过</Tag>
  }

  // 筛选状态
  const filterRadios = [
    { text: '全部', val: '' },
    { text: '待审核', val: 1 },
    { text: '审核通过', val: 2 }
  ]

  // 表格列数据
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => <img src={cover.images[0] ?? img404} width={80} height={60} alt='cover' />
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => status[data]
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size='middle'>
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} />
          </Space>
        )
      }
    }
  ]

  // 表格数据
  const data = [
    {
      id: '8218',
      comment_count: 0,
      cover: {
        images: []
      },
      like_count: 0,
      pubdate: '2023-05-10 12:45:31',
      read_count: 2,
      status: 2,
      title: 'react学习笔记'
    }
  ]

  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link>首页</Link> },
            { title: '文章列表' }
          ]} />}
        style={{ marginTop: 20 }}
      >
        <Form initialValues={{ status: null }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="渠道" name="channel_id">
            <Select
              placeholder="请选择渠道"
              defaultValue="lucy"
              style={{ width: 120 }}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </Select>
          </Form.Item>
          <Form.Item label="日期" name="date">
            {/* 传入locale，汉化成中文 */}
            <RangePicker locale={locale} />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' style={{ marginLeft: 40 }}>筛选</Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格区域 */}
      <Card title={`根据筛选条件共查询到 count 条结果：`}>
        <Table rowKey="tableId" columns={columns} dataSource={data} />
      </Card>
    </div>
  )
}

import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, Form, Breadcrumb, Button, Select, DatePicker, Radio, Tag, Table, Space, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
// 语言包，时间选择器汉化处理
import locale from 'antd/es/date-picker/locale/zh_CN'
import { useChannel } from '@/hooks/useChannel'
import { delArticleAPI, getArticleListAPI } from '@/apis/article'

const { Option } = Select
const { RangePicker } = DatePicker
export default function Article() {

  const navigate = useNavigate()

  const { channelList } = useChannel()

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
      dataIndex: 'status',// 字段名
      // 条件渲染
      // render: data => data === 1 ? <Tag color='warning'>待审核</Tag> : <Tag color='success'>审核通过</Tag>
      // 通过枚举值渲染
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
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={()=>{navigate(`/layout/publish?id=${data.id}`)}}/>
            <Popconfirm
              title="删除文章?"
              description="是否删除？删除后将无法恢复！"
              onConfirm={() => onConfirm(data)}
              onCancel={() => console.log('取消')}
              okText="确认"
              cancelText="取消"
            >
              <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  // 筛选功能
  // 1. 准备参数
  const [reqData, setReqData] = useState({
    status: '',// 状态
    channel_id: '',// 频道id
    begin_pubdate: '',// 开始时间
    end_pubdate: '',// 结束时间
    page: 1,// 当前页码
    per_page: 4// 每页条数
  })

  // 获取文章列表
  const [list, setList] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() => {
    async function getList() {
      const res = await getArticleListAPI(reqData)
      console.log(res)
      setList(res.data.results)
      setCount(res.data.total_count)
    }
    getList()
  }, [reqData])

  // 2. 获取筛选数据
  const onFinish = (fromValue) => {
    // 3. 把表单收集到的数据，设置到reqData中
    setReqData({
      ...reqData,
      status: fromValue.status,
      channel_id: fromValue.channel_id,
      begin_pubdate: fromValue.date ? fromValue.date[0].format('YYYY-MM-DD') : '',
      end_pubdate: fromValue.date ? fromValue.date[1].format('YYYY-MM-DD') : '',
    })
    // 4. 当reqData变化时，useEffect会重新发送请求
  }

  // 切换页数，page:当前页码，pageSize:每页条数
  const onPageChange = (page, pageSize) => {
    setReqData({
      ...reqData,
      page: page,
    })
  }

  // 确认删除
  const onConfirm = async (data) => {
    await delArticleAPI(data.id);
    // 删除成功后，重新请求数据
    setReqData({
      ...reqData
    })
  }

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
        <Form initialValues={{ status: '' }} onFinish={onFinish} >
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 150 }}
            >
              {/* 渲染文章频道列表 */}
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
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
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table rowKey="tableId" columns={columns} dataSource={list} pagination={{
          total: count,// 总数
          pageSize: reqData.per_page,// 每页条数
          onChange: onPageChange
        }} />
      </Card>
    </div>
  )
}

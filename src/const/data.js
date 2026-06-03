export const businessData = [
  {
    id: 'trip',
    name: '出差',
    desc: 'XXX',
    api: '/business/trip',
    form: JSON.stringify({
      name: {
        label: '姓名',
        valueType: 'string',
        formItemType: 'input',
        required: true,
      },
      reason: {
        label: '事由',
        valueType: 'string',
        formItemType: 'textfield',
        required: true,
      },
      date: {
        label: '日期',
        valueType: 'dateRange',
        formItemType: 'dateRange',
        required: true,
      },
    }),
  },
  {
    id: 'report',
    name: '发布调研报告',
    desc: 'XXX',
    api: '/business/report',
    form: JSON.stringify({
      title: {
        label: '标题',
        valueType: 'string',
        formItemType: 'input',
        required: true,
      },
      brief: {
        label: '简要介绍',
        valueType: 'string',
        formItemType: 'textfield',
        required: true,
      },
      author: {
        label: '作者',
        valueType: 'string',
        formItemType: 'input',
        required: true,
      },
      file: {
        label: '文档',
        valueType: 'file',
        formItemType: 'file',
        required: true,
      },
      titlePage: {
        label: '封面',
        valueType: 'image',
        formItemType: 'image',
        required: true,
      },
    }),
  },
]

export const flowData = [
  {
    id: 'flow1',
    name: '销售副岗出差',
    desc: 'XXX',
    businessId: 'trip',
    businessName: '出差',
    version: '1',
    useStatus: 'used',
    publishStatus: 'published',
    mdUser: '张三',
    mdTime: '2021/09/20 10:36:15'
  },
  {
    id: 'flow2',
    name: '销售主岗出差',
    desc: 'XXX',
    businessId: 'trip',
    businessName: '出差',
    version: '1',
    useStatus: 'notUsed',
    publishStatus: 'notPublished',
    mdUser: '张三',
    mdTime: '2021/09/21 08:11:03'
  },
  {
    id: 'flow3',
    name: '研究员发布调研报告',
    desc: 'XXX',
    businessId: 'report',
    businessName: '发布调研报告',
    version: '1',
    useStatus: 'used',
    publishStatus: 'published',
    mdUser: '李四',
    mdTime: '2021/09/22 13:15:22'
  },
  {
    id: 'flow4',
    name: '研究员组长发布调研报告',
    desc: 'XXX',
    businessId: 'report',
    businessName: '发布调研报告',
    version: '1',
    useStatus: 'notUsed',
    publishStatus: 'notPublished',
    mdUser: '李四',
    mdTime: '2021/09/23 09:17:42'
  },
]

export const flowVersionData = {
  'flow1': [
    {
      id: 'flow1-v2',
      name: '销售副岗出差',
      desc: 'XXX',
      businessId: 'trip',
      businessName: '出差',
      version: '2',
      useStatus: 'notUsed',
      publishStatus: 'notPublished',
      mdUser: '张三',
      mdTime: '2021/09/21 08:11:03'
    },
    {
      id: 'flow1-v1',
      name: '销售副岗出差',
      desc: 'XXX',
      businessId: 'trip',
      businessName: '出差',
      version: '1',
      useStatus: 'used',
      publishStatus: 'published',
      mdUser: '张三',
      mdTime: '2021/09/20 10:36:15'
    },
  ]
}

export const conditionData = [
  {
    id: 'isApproval',
    name: '审批是否通过',
    desc: 'XXX',
    type: 'dic',
    api: '/condition/do/isA',
    conditionApi: '/condition/get/isApproval',
  },
  {
    id: 'isChina',
    name: '申请人是否是中国大陆用户',
    desc: 'XXX',
    type: 'dic',
    api: '/condition/do/isChina',
    conditionApi: '/condition/get/isChina',
  },
  {
    id: 'isIndustry',
    name: '申请人是否是某行业',
    desc: 'XXX',
    type: 'tree',
    api: '/condition/do/isIndustry',
    conditionApi: '/condition/get/isIndustry',
  },
  {
    id: 'isLeader',
    name: '申请人是否是主岗',
    desc: 'XXX',
    type: 'dic',
    api: '/condition/do/isLeader',
    conditionApi: '/condition/get/dic',
  },
  {
    id: 'name',
    name: '姓名',
    desc: 'XXX',
    type: 'string',
    api: '/condition/do/weight',
    conditionApi: '/condition/get/dic',
  },
  {
    id: 'weight',
    name: '体重',
    desc: 'XXX',
    type: 'number',
    unit: 'kg',
    api: '/condition/do/weight',
    conditionApi: '/condition/get/dic',
  },
]

export const conditionValueData = {
  'isApproval': [
    { label: '通过', value: '01' },
    { label: '否决', value: '02' },
  ],
  'isChina': [
    { label: '是', value: '01' },
    { label: '否', value: '02' },
  ],
  'isLeader': [
    { label: '是', value: '01' },
    { label: '否', value: '02' },
  ],
  'isIndustry': [
    {
      label: '所有行业',
      value: '1',
      parent: '0',
      children: [
        {
          label: '计算机',
          value: '1-1',
          parent: '1',
          children: [
            {
              label: '软件',
              value: '1-1-1',
              parent: '1-1',
            },
            {
              label: '硬件',
              value: '1-1-2',
              parent: '1-1',
            },
          ],
        },
        {
          label: '自然资源',
          value: '1-2',
          parent: '1',
          children: [
            {
              label: '石油天然气',
              value: '1-2-1',
              parent: '1-2',
            },
            {
              label: '稀有矿产',
              value: '1-2-2',
              parent: '1-2',
            },
          ],
        },
      ],
    },
  ],
  'weight': [
    { label: '50千克', value: '50' },
    { label: '100千克', value: '100' },
  ],
}

export const dataSourceData = [
  {
    id: 'location',
    name: '常用地区',
    desc: '北京，上海...',
    type: 'dic',
    api: '/data/get/dict',
  },
  {
    id: 'actionType',
    name: '出差类型',
    desc: '路演，调研，会议，其他...',
    type: 'dic',
    api: '/data/get/dict',
  },
  {
    id: 'industry',
    name: '行业',
    desc: '金属化工,医药生物...',
    type: 'tree',
    api: '/data/get/industry',
  },
]

export const maxParamCount = 3

export const findUserRuleData = [
  {
    id: 'findUserRule1',
    name: '某部门某职位',
    desc: 'XXX',
    api: 'findUserByConditionA',
    param1Type: 'org',
    param1: '',
    param2Type: 'tag',
    param2: '',
    param3Type: '',
    param3: '',
  },
  {
    id: 'findUserRule2',
    name: '固定人员',
    desc: 'XXX',
    api: 'findUserFromOrgTree',
    param1Type: 'user',
    param1: '',
    param2Type: '',
    param2: '',
    param3Type: '',
    param3: '',
  },
  {
    id: 'findUserRule3',
    name: '固定角色',
    desc: 'XXX',
    api: 'findUserFromRole',
    param1Type: 'role',
    param1: '',
    param2Type: '',
    param2: '',
    param3Type: '',
    param3: '',
  },
  {
    id: 'findUserRule4',
    name: '未外出的负责VIP客户的销售二组组长',
    desc: 'XXX',
    api: 'findUserFromOrgAndHasTags',
    param1Type: 'org',
    param1: '销售二组',
    param2Type: 'tags',
    param2: '未外出,VIP客户,组长',
    param3Type: '',
    param3: '',
  },
]

export const orgTreeData = [
  {
    label: '兴业证券',
    id: '1',
    parent: '0',
    children: [
      {
        label: '运维销售组',
        id: '1-1',
        parent: '1',
        children: [
          {
            label: '销售一组',
            id: '1-1-1',
            parent: '1-1',
          },
          {
            label: '销售二组',
            id: '1-1-2',
            parent: '1-1',
          },
        ],
      },
      {
        label: '研究员组',
        id: '1-2',
        parent: '1',
        children: [
          {
            label: '研究员一组',
            id: '1-2-1',
            parent: '1-2',
          },
          {
            label: '研究员二组',
            id: '1-2-2',
            parent: '1-2',
          },
        ],
      },
    ],
  },
]

export const orgUserData = {
  '1-2': [
    {
      id: '100001',
      name: '张三',
      tags: '研究员,金融',
    },
    {
      id: '100002',
      name: '李四',
      tags: '研究员,计算机',
    },
    {
      id: '100003',
      name: '王五',
      tags: '销售'
    },
  ]
}

export const roleTreeData = [
  {
    label: '管理员',
    id: '1',
    parent: '0',
    children: [
      {
        label: '请假审批人员',
        id: '1-1',
        parent: '1',
        children: [
          {
            label: '年假，长假',
            id: '1-1-1',
            parent: '1-1',
          },
          {
            label: '短期',
            id: '1-1-2',
            parent: '1-1',
          },
        ],
      },
      {
        label: '出差审批',
        id: '1-2',
        parent: '1',
        children: [
          {
            label: '数字会议',
            id: '1-2-1',
            parent: '1-2',
          },
          {
            label: '调研，路演',
            id: '1-2-2',
            parent: '1-2',
          },
        ],
      },
    ],
  },
]

export const roleUserData = {
  '1-2': [
    {
      id: '100001',
      name: '张三',
      tags: '研究员,金融',
    },
    {
      id: '100002',
      name: '李四',
      tags: '研究员,计算机',
    },
    {
      id: '100003',
      name: '王五',
      tags: '销售'
    },
  ]
}

export const taskTodoData = [
  {
    id: 'task1',
    name: '请假',
    type: 'approval',
    status: 'running',
    businessName: '请假',
    ctUser: '赵六',
    ctTime: '2021/09/03',
    currentApprovalUser: '赵六',
  },
  {
    id: 'task2',
    name: '出差',
    type: 'share',
    status: 'running',
    businessName: '出差',
    ctUser: '赵六',
    ctTime: '2021/09/02',
    currentApprovalUser: '洋洋',
  },
  {
    id: 'task3',
    name: '调研XXX',
    type: 'notice',
    status: 'running',
    businessName: '调研',
    ctUser: '赵六',
    ctTime: '2021/09/01',
    currentApprovalUser: '冉冉',
  },
  {
    id: 'task4',
    name: '请假：2021/8/15 至 2021/9/15',
    type: 'notice',
    status: 'running',
    businessName: '请假',
    ctUser: '赵六',
    ctTime: '2021/08/25',
    currentApprovalUser: '小青',
  },
]
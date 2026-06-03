export const dictLabel = (key, value) => {
  const item = dict[key].find(t => t.value === value)
  return item ? item.label : ''
}

export const dictItems = (key) => {
  return dict[key] || []
}

const dict = {
  dataType: [
    { label: '字典', value: 'dic' },
    { label: '树形字典', value: 'tree' },
    { label: '字符串', value: 'string' },
    { label: '整数', value: 'integer' },
    { label: '数字', value: 'number' },
  ],
  useStatus: [
    { label: '未使用', value: 'notUsed' },
    { label: '已使用', value: 'used' },
  ],
  publishStatus: [
    { label: '未发布', value: 'notPublished' },
    { label: '已发布', value: 'published' },
  ],
  taskType: [
    { label: '审批', value: 'approval' },
    { label: '阅示', value: 'notice' },
    { label: '会签', value: 'share' },
  ],
  taskTypeListener: [
    { label: '审批', value: 'com.xingye.flowable.listener.ApprovalListener' },
    { label: '阅示', value: 'com.xingye.flowable.listener.NoticeListener' },
    { label: '会签', value: 'com.xingye.flowable.listener.ShareListener' },
  ],
  taskStatus: [
    { label: '进行中', value: 'running' },
    { label: '已完成', value: 'finished' },
    { label: '已拒绝', value: 'refused' },
    { label: '已撤回', value: 'revoked' },
    { label: '已追回', value: 'recovered' },
  ],
  passRule: [
    { label: '一票通过', value: 'anyOneYes' },
    { label: '一票否决', value: 'anyOneNo' },
    { label: '全部通过', value: 'allYes' },
    { label: '全部否决', value: 'allNo' },
    { label: '百分比通过', value: 'percentYes' },
    { label: '一定数量通过', value: 'someYes' },
  ],
  conditionParamType: [
    { label: '人员', value: 'user' },
    { label: '部门', value: 'org' },
    { label: '角色', value: 'role' },
    { label: '标签', value: 'tag' },
    { label: '多个标签', value: 'tags' },
  ],
}
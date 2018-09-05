/**
 * Created by hq5544 on 2017/4/27.
 */
var reasonList = [
  {
    reason: '出借人没有及时反馈证据',
    result: '出借人已被平台拉黑，不能继续借款或出借',
    advice: '出借人可以继续补充证据，证明没有裸条行为',
    code: 1,
  }, {
    reason: '借款人没有提供有力证据',
    result: '驳回举报，不做任何处理',
    advice: '借款人可以继续补充证据，证明确实有裸条行为',
    code: 2,
  }, {
    reason: '出借人提供了有力证据',
    result: '驳回举报，不做任何处理',
    advice: '借款人可以继续补充证据，证明确实有裸条行为',
    code: 3,
  }, {
    reason: '借款人提供了有力证据',
    result: '出借人已被平台拉黑，不能继续借款或出借',
    advice: '出借人可以继续补充证据，证明没有裸条行为',
    code: 4,
  }, {
    reason: '借款人补充的证据无效',
    result: '驳回举报，不做任何处理',
    advice: '借款人可以继续补充证据，证明确实有裸条行为',
    code: 5,
  }, {
    reason: '借款人补充了有力证据',
    result: '出借人已被平台拉黑，不能继续借款或出借',
    advice: '出借人可以继续补充证据，证明没有裸条行为',
    code: 6,
  }, {
    reason: '出借人补充了有力证据',
    result: '驳回举报，取消出借人拉黑状态',
    advice: '借款人可以继续补充证据，证明确实有裸条行为',
    code: 7,
  }, {
    reason: '出借人补充的证据无效',
    result: '不做任何处理',
    advice: '出借人可以继续补充证据，证明没有裸条行为',
    code: 8,
  }, {
    reason: '出借人没有及时反馈证据',
    result: '确认借款人相关还款并消除相关逾期记录，出借人被标记1次，标记3次不能再使⽤补借条，还有可能被拉黑',
    advice: '出借人可以继续补充证据，证明借款人没有真实还款',
    code: 9,
  }, {
    reason: '借款人没有提供有力证据',
    result: '驳回举报，不做任何处理',
    advice: '借款人可以继续补充证据，证明确实已还款',
    code: 10,
  }, {
    reason: '出借人提供了有力证据',
    result: '驳回举报，不做任何处理',
    advice: '借款人可以继续补充证据，证明确实已还款',
    code: 11,
  }, {
    reason: '借款人提供了有力证据',
    result: '确认借款人相关还款并消除相关逾期记录，出借人被标记1次，标记3次不能再使⽤补借条，还有可能被拉黑',
    advice: '出借人可以继续补充证据，证明借款人没有真实还款',
    code: 12,
  }, {
    reason: '借款人补充的证据无效',
    result: '驳回举报，不做任何处理',
    advice: '借款人可以继续补充证据，证明确实已还款',
    code: 13,
  }, {
    reason: '借款人补充了有力证据',
    result: '确认借款人相关还款并消除相关逾期记录，出借人被标记1次，标记3次不能再使⽤补借条，还有可能被拉黑',
    advice: '出借人可以继续补充证据，证明借款人没有真实还款',
    code: 14,
  }, {
    reason: '出借人补充了有力证据',
    result: '驳回举报，恢复借款人还款状态和逾期记录，取消出借人标记和相关限制',
    advice: '借款人可以继续补充证据，证明确实已还款',
    code: 15,
  }, {
    reason: '出借人补充的证据无效',
    result: '不做任何处理',
    advice: '出借人可以继续补充证据，证明借款人没有真实还款',
    code: 16,
  }, {
    reason: '出借人没有及时反馈证据',
    result: '该借条变为“有争议”无需还款，消除借款人相关逾期记录，出借人被标记1次，标记3次不能再使⽤补借条，还有可能被拉黑',
    advice: '出借人可以继续补充证据，证明确实已出借',
    code: 17,
  }, {
    reason: '借款人没有提供相关证据',
    result: '驳回举报，不做任何处理',
    advice: '借款人可以继续补充证据，证明出借人确实没有出借',
    code: 18,
  }, {
    reason: '出借人没有提供有力证据',
    result: '该借条变为“有争议”无需还款，消除借款人相关逾期记录，出借人被标记1次，标记3次不能再使⽤补借条，还有可能被拉黑',
    advice: '出借人可以继续补充证据，证明确实已出借',
    code: 19,
  }, {
    reason: '出借人提供了有力证据',
    result: '驳回举报，不做任何处理',
    advice: '借款人可以继续补充证据，证明出借人确实没有出借',
    code: 20,
  }, {
    reason: '借款人提供了有力证据',
    result: '该借条变为“有争议”无需还款，消除借款人相关逾期记录，出借人被标记1次，标记3次不能再使⽤补借条，还有可能被拉黑',
    advice: '出借人可以继续补充证据，证明确实已出借',
    code: 21,
  }, {
    reason: '借款人补充了有力证据',
    result: '该借条变为“有争议”无需还款，消除借款人相关逾期记录，出借人被标记1次，标记3次不能再使⽤补借条，还有可能被拉黑',
    advice: '出借人可以继续补充证据，证明确实已出借',
    code: 22,
  }, {
    reason: '借款人补充的证据无效',
    result: '驳回举报，不做任何处理',
    advice: '借款人可以继续补充证据，证明出借人确实没有出借',
    code: 23,
  }, {
    reason: '出借人补充的证据无效',
    result: '不做任何处理',
    advice: '出借人可以继续补充证据，证明确实已出借',
    code: 24,
  }, {
    reason: '出借人补充了有力证据',
    result: '驳回举报，取消借条有争议状态，恢复借款人相关逾期记录，取消出借人标记和相关限制',
    advice: '借款人可以继续补充证据，证明出借人确实没有出借',
    code: 25,
  }, {
    reason: '借款人没有提供有力的还款证据',
    result: '驳回举报，不做任何处理',
    advice: '借款人还清应还⾦额后上传还款凭证',
    code: 26
  }, {
    reason: '借款人没有还完应还的⾦额',
    result: '驳回举报，不做任何处理',
    advice: '借款人还清应还⾦额后上传还款凭证',
    code: 27
  }, {
    reason: '出借人没有提供有力证据且借款人已还款',
    result: '该借条变为“有争议”无需还款，消除借款人相关逾期记录，出借人被标记1次，标记3次不能再使⽤补借条，还有可能被拉黑',
    advice: '出借人可以继续补充证据，证明借款人确实没还清应还⾦额',
    code: 28
  }, {
    reason: '借款人没有还完应还的⾦额',
    result: '驳回举报，不做任何处理',
    advice: '借款人还清应还⾦额后上传还款凭证',
    code: 29
  }, {
    reason: '借款人补充了有力证据',
    result: '该借条变为“有争议”无需还款，消除借款人相关逾期记录，出借人被标记1次，标记3次不能再使⽤补借条，还有可能被拉黑',
    advice: '出借人可以继续补充证据，证明借款人确实没还清应还⾦额',
    code: 30
  }, {
    reason: '出借人补充的证据无效',
    result: '不做任何处理',
    advice: '出借人可以继续补充证据，证明借款人确实没还清应还⾦额',
    code: 31
  }, {
    reason: '出借人补充了有力证据',
    result: '驳回举报，取消借条有争议状态，恢复借款人相关逾期记录，取消出借人标记和相关限制',
    advice: '借款人可以继续补充证据，证明确实已还清应还⾦额',
    code: 32
  },
]

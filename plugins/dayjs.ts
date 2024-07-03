import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import Duration from 'dayjs/plugin/duration'
import 'dayjs/locale/de'

export default defineNuxtPlugin(() => {
  dayjs.extend(RelativeTime)
  dayjs.extend(Duration)
  dayjs.locale('vi')
})
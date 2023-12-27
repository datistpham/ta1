import React, { useState } from 'react'
import { Tabs } from 'antd'
import useStyleYourWork from './style'
import ダッシュボード from './Dashboard'
import カレンダー from './calendar/Calendar'
import 今次 from './recent/Recent'

const YourWork = props => {
  const [tab, setTab] = useState('recent')
  const classes = useStyleYourWork()

  const tabItems = [
    { label: '今次', key: 'recent' },
    { label: 'ダッシュボード', key: 'dashboard' },
    { label: 'カレンダー', key: 'calendar' }
  ]

  const handleOnChange = (value) => {
    setTab(value)
  }

  return (
    <div className={classes.yourWork}>
      <div className={classes.sidebar}>
        <Tabs tabBarStyle={{ width: '180px', marginLeft: '30px' }} tabPosition='left' items={tabItems} onChange={handleOnChange}/>
      </div>
      <div className={classes.content}>
        {tab === 'recent' && <今次 setTab={setTab}/>}
        {tab === 'dashboard' && <ダッシュボード/>}
        {tab === 'calendar' && <カレンダー/>}
      </div>
    </div>
  )
}

export default YourWork
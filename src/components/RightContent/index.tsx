import { Statistic, Space } from 'antd'
import {
  UserSwitchOutlined,
  UserOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons'
import React from 'react'
import { useModel } from 'umi'
import { useAsync } from 'react-use'
import styles from './index.less'

export type SiderTheme = 'light' | 'dark'

const GlobalHeaderRight: React.FC<{}> = () => {
  const state = useAsync(async () => {
    const response = await fetch(
      'https://disease.sh/v2/countries/Canada?yesterday=false&strict=true',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const result = await response.json()
    return result
  }, [])

  const { countryInfo: { flag } = {}, cases, deaths, recovered, active, country } =
    state?.value || {}

  const { initialState } = useModel('@@initialState')

  if (!initialState || !initialState.settings) {
    return null
  }

  const { navTheme, layout } = initialState.settings
  let className = styles.right

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`
  }
  const valueStyle = { color: '#fff' }
  return (
    <Space className={className}>
      <img src={flag} width="64px" height="32px" alt={country} />
      <Statistic
        title="Active"
        value={active}
        style={valueStyle}
        valueStyle={valueStyle}
        prefix={<UserSwitchOutlined />}
      />
      <Statistic
        title="Confirmed"
        value={cases}
        style={valueStyle}
        valueStyle={{ color: '#FFFF00' }}
        prefix={<UserOutlined />}
      />
      <Statistic
        title="Recovered"
        value={recovered}
        style={valueStyle}
        valueStyle={{ color: '#3f8600' }}
        prefix={<UserAddOutlined style={{ color: '#3f8600' }} />}
      />
      <Statistic
        title="Death"
        value={deaths}
        style={valueStyle}
        valueStyle={{ color: '#cf1322' }}
        prefix={<UserDeleteOutlined style={{ color: '#cf1322' }} />}
      />
    </Space>
  )
}
export default GlobalHeaderRight

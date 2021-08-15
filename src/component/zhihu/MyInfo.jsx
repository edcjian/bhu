import React from 'react';
import {Tag} from "antd";
import {Link} from "react-router-dom";

export const MyInfo = () => {
    const data = [
        {name: '回答问题', path: '/answer'},
        {name: '发视频', path: '/video'},
        {name: '写想法', path: '/idea'},
        {name: '写文章', path: '/article'}
    ]
    const icon = ['live', '书店', '圆桌', '专栏', '付费咨询', '百科']
    const menu = [
        {name: '我的收藏', path: ''},
        {name: '我关注的问题', path: ''},
        {name: '我的邀请', path: ''},
        {name: '我的余额', path: ''},
        {name: '站务中心', path: ''},
        {name: '帮助中心', path: ''},
        {name: '版权服务中心', path: ''}]

    return <div className="info">
      <div className="tag">
          {data.map(it => <Link to={it.path} >{it.name}</Link>)}
      </div>
        <div style={{display: 'flex', height: '50px'}}>
            <div>稍后答</div>
            <div>草稿箱</div>
        </div>
        <div>
            <div>创作中心</div>
            <div>
                <span>
                今日阅读 (播放) 数
                4
                昨日数据
                29
                </span>
                <span>
            今日赞同数
            0
            昨日数据
                0
                </span>
            </div>
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {icon.map(it => <Tag color="cyan">
                {it}
            </Tag>)}
        </div>
        <div style={{display:'flex',flexDirection:'column'}}>
            {menu.map(it => <Link to={it.path} className="tag">{it.name}</Link>)}
        </div>
    </div>
}

import React from 'react';
import {Tag} from "antd";
import './style/hot.scss'
import {range} from "../tool";

export const Hot =()=>{
    const data =['全站','科学','数码','体育','时尚','影视']
    return <div className="hot">
        <div>
            {data.map(it=><Tag color="gold">{it}</Tag>)}
        </div>

            {range(5).map(it=>
                <div className="item">
                <div >如何看待东京奥运会上日本拳手田中亮明坐着轮椅晋级？</div>
            <div >微博 #日拳手被打到躺轮椅吸氧仍判赢# 东京#奥运会# 拳击比赛</div>
            <div>1000热度    分享</div>
                </div>
                )}

        </div>

}

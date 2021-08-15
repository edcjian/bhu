import React, { useContext, useEffect} from 'react';
import './style/zhihu.scss'
import { Tabs} from "antd";
import {useReactive} from "ahooks";
import request from "../request";

import {Banner} from "./Banner";
import {Page} from "./Page";
import {Hot} from "./Hot";
import {MyInfo} from "./MyInfo";

import {LoginContext} from "./LoginProvider";
const {TabPane} = Tabs;

export const Zhihu = ({history}) => {
const user=useContext(LoginContext)
const state=useReactive({
    problems:[],
    answer:[],
    proId:[],
    count:123
})
    useEffect(() => {
        async function fetchData() {
            try {
                const ans = await request.get(
                    `problem?select=*,answer!problemId(id,content,userId(name))&answer.limit=1`)
             console.log(ans)

                const  res=await request.get(``)


                state.problems=ans
            }
            catch (e){

            }
        }
        fetchData()
    }, []);


    return <div className="con">
<Banner history={history}/>
        <div className="center">
            <div >
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="关注" key="1">
                        {
                            state.problems.map((it,index) =>
                                    <Page {...it} key={index}/>
                            )
                        }
                    </TabPane>
                    <TabPane tab="推荐" key="2">
                    </TabPane>
                    <TabPane tab="热榜" key="3">
                        <Hot/>
                    </TabPane>
                    <TabPane tab="视频" key="4">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>

            </div>
            <MyInfo/>
        </div>

    </div>


}

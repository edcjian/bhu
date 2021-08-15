import React, {useContext, useEffect, useState} from 'react';
import './style/user.scss'
import {Answer} from "./Answer";
import {Button, Tabs} from "antd";
import request from "../request";
import {MyUpload} from "./MyUpload";
import {LoginContext} from "./LoginProvider";
import {Banner} from "./Banner";
import {MyForm} from "../MyForm";


const {TabPane} = Tabs;
export const User = ({match}) => {
    const {id} = useContext(LoginContext)
    const [data, setData] = useState();
    const [other, setOther] = useState();
    const s = [
        '回答 ',
        '视频 ',
        '提问 ',
        '文章 ',
        '专栏 ',
        '想法 ',
        '收藏 ',
        '关注 ']
    const [url, setUrl] = useState(false);
    const [info, setInfo] = useState({
        work:'',
        name:'',
        intro:''
    });
    const [isVisible, setIsVisible] = useState(false);
   let path =match.params.id??id

    const e=`/user?id=eq.${path}`
    const link = `/answer?select=id,content,anumber,problemId(title),userId&userId=eq.${path}`
    useEffect(() => {
        async function fetchData() {
            const data = await request.get(
                link);
            const userInfo = await request.get(
                e);
            setData(data)
            setInfo(userInfo[0])

        }

        fetchData()
    }, [e, link]);

const forms ={
    isVisible:isVisible,
    formData:Object.entries(info),
    finish:()=>{

    }
}
    return <div>
        <Banner />

        <div className="header">
            <img src={info?.avatar} alt='' className="avatar"/>
            <div className="intro">
                <div style={{fontSize: 40}}>
                    {info?.name}{info?.work}
                </div>
                <div> {info?.intro}</div>
                <div>男</div>


                <Button type="primary " onClick={()=>{setIsVisible(true)}} onDoubleClick= {()=>{setIsVisible(false)}} >编辑资料</Button>
                <MyUpload id={id} events={setUrl}/>
            </div>
            <MyForm {...forms}/>
        </div>
        <div className="content">
            <Tabs defaultActiveKey="1">
               {s.map((it,key)=>
                   <TabPane tab={it} key={key}>
                   {it}
               </TabPane>)}

            </Tabs>
            {data?.map(it =>
                <Answer {...it}/>
            )}
        </div>
    </div>
}


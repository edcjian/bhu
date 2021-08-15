import React, {Fragment, useContext, useEffect, useState} from 'react';
import like from "../../img/like.png";
import pinlun from "../../img/pinlun.png";
import fen from "../../img/fen.png";
import shou from "../../img/shou.png";
import './style/action.scss'
import {Button, Collapse, Form} from "antd";
import _ from "lodash";
import Modal from "antd/es/modal/Modal";
import {myContext} from "./Problem";
import {useReactive, useRequest} from "ahooks";
import request from "../request";
import TextArea from "antd/es/input/TextArea";
import {LoginContext} from "./LoginProvider";


const {Panel} = Collapse;
export  const Editor = ({parentId, answerId,event,id}) => {


    const state = useReactive({
        form: {}
    })

    function save(e) {
        let s = {}
        s.text = e.target.value
        s.parentId = parentId
        s.userId = id
        s.answerId = answerId
        state.form = s
    }

    async function submit() {
        try {
            await request.post(`comment`, state.form)
        } catch (err) {

        }
    }

    return <>
        <Form.Item>
            <TextArea rows={4} onChange={save}/>
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" type="primary" onClick={() => submit()}>
                Add Comment
            </Button>
        </Form.Item>
    </>
}

function MyComment({comment, depth = 0, answerId,id}) {

    if (!comment || !comment.length) {

        return (depth===0)?<div style={{paddingLeft: depth * 15}}
                    onClick={() => Modal.info({
                        content: (
                            <Editor answerId={answerId} id={id}/>
                        )
                    })}
        >这里还没有评论</div>:null

    }
    return comment.map(({parentId, userId: {name}, text, children}) => (
        <Fragment>
            <div style={{paddingLeft: depth * 15}}
                 onClick={() => Modal.info({
                     content: (
                         <Editor answerId={answerId} parentId={parentId} id={id}/>
                     )
                 })}
            >{name}{parentId} {text}</div>
            <MyComment comment={children} depth={depth + 1} e/>
        </Fragment>
    ))
}

export const Action = ({user,isFavorite}) => {
    const {comment, answerId} = useContext(myContext)
    const  {id} =useContext(LoginContext)


    let a = _.cloneDeep(comment)

    function children(arg) {
        let arr = []
        for (let i = 0; i < a?.length; i++) {
            if (a[i].parentId === arg) {
                arr.push(a[i])
                a[i].children = children(a[i].id)
            }
        }
        return arr
    }

    const [state, setstate] = useState(false);
    const [flag, setFlag] = useState(isFavorite);

    async function Favorites() {
        console.log(flag)

  !flag?await request.post(`/answer2user`,{userId:id, favAnswerId:answerId})
       :await request.delete(`/answer2user?favAnswerId=eq.${answerId}`)

        setFlag(flag=>!flag)

    }

    return <div className="myAction">
        <Modal title="Basic Modal"
               visible={state}
               onOk={() => setstate(false)}>
            <MyComment comment={children(null)} answerId={answerId} id={id}/>
        </Modal>
        <div className="icon">赞同</div>
        <div className="icon" onClick={()=>{}}><img src={like} alt=""/>喜欢</div>
        <div className="icon"><img src={pinlun} alt="" onClick={() => setstate(true)}/>评论</div>
        <div className="icon"><img src={fen} alt=""/>分享</div>
        <div className="icon" onClick={()=>Favorites()}><img src={shou} alt=""/>{(flag)?"取消收藏":"收藏"}</div>
    </div>
}

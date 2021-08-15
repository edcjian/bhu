import {useReactive} from "ahooks";
import request from "../request";
import {message, Tag} from "antd";
import {createContext, useState, useEffect, useContext} from "react";
import {Answer} from "./Answer";

import './style/problem.scss'
import {MyEditor} from "./MyEditor";
import {Banner} from "./Banner";
import {LoginContext} from "./LoginProvider";


export const myContext = createContext(0)


export function Problem({problem, match, history}) {
    const {id} = useContext(LoginContext)
    let state = useReactive({
            answer: [],
            problem: '',
            hasMore: false,
            loading: false,
            count: 1678,
            isVisible: false,

        }
    )
    const ids = match.params.id
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        async function fetchData() {

            const res = await request.get('/problem?id=eq.' + ids)

            state.problem = res[0]
            const ans = await request.get(
                `answer?select=id,comment!answerId(id,parentId,text,userId(name,intro)),
                    content,anumber,problemId(title,id),userId(id,name,intro,avatar)&problemId=eq.${ids}`)

            const aid = ans?.map(it => it.id)
            console.log(ans)
            let re = await request.get(`answer2user?userId=eq.${id}&favAnswerId=in.(${aid})`)
            console.log(re)
            for (let i = 0; i < ans.length; i++) {
                for (let j = 0; j < re.length; j++) {
                    ans[i].isFavorite = (ans[i].id === re[j].favAnswerId)
                }
            }

            state.answer = ans
            console.log(state.answer)
        }

        fetchData()
    }, [flag]);
    let handleInfiniteOnLoad = () => {
        message.warning('Infinite List loaded all');
        state.loading = true
        if (state.answer.length > 2) {
            state.hasMore = false
            state.loading = false

        }


    }

    function invite() {

    }

    function attention() {

    }

    return <div className="details">
        <Banner history={history}/>
        <div className="header">
            <div>
                {state.problem.tag?.split(',')?.map(it =>
                    <Tag color="blue">{it}</Tag>)}
            </div>

            <div style={{fontColor: 'Blue', fontSize: '40px'}}>{state.problem.title}</div>
            <div>{state.problem.topic}</div>
            <div className="action">
                <div onClick={() => attention()}>关注问题</div>
                <div onClick={() => {
                    state.isVisible = true
                }}
                     onDoubleClick={() => {
                         state.isVisible = false
                     }}
                >写回答
                </div>
                <div onClick={() => invite()}>邀请回答</div>
                <div>好问题</div>
                <div>添加评论</div>
                <div>分享</div>
            </div>
        </div>
        <div className="content">
            <MyEditor isVisible={state.isVisible} problemId={state.problem.id} events={setFlag}/>
            {
                state.answer.map((it, index) =>
                    <myContext.Provider value={{
                        comment: it.comment,
                        answerId: it.id
                    }}>
                        <Answer {...it} key={index}/>
                    </myContext.Provider>
                )
            }
        </div>

    </div>

}


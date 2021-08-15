import {Link, useHistory} from "react-router-dom";
import React from 'react'
import './style/page.scss'
import {Action} from "./Action";


export function Answer({id, content, comment,isFavorite, anumber, problemId, userId}) {
    const links = `https://www.zhihu.com/question/476259609/answer/${id}`
const  {id:uid,name, avatar, intro} =userId
    function show() {

    }
const his =useHistory()

    const img = {
        style: {
            height: '40px',
            border: '2px solid',
            borderRadius: '10px',
            width: '40px'
        },

        onClick: ()=>{his.push(`/user/${uid}`)},
        src:avatar
    }
    return <div className="page">
        <div className="title">

            <div style={{display: 'flex', flexDirection: 'row'}}>
                <img {...img}  alt=""/>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div>{name}</div>
                    <div> {intro}</div>
                </div>

            </div>
        </div>

        <div className="article">

            {content}
            <Link to='/detail'>阅读全文</Link>


        </div>

        <Action user={userId} isFavorite={isFavorite}/>


    </div>

}

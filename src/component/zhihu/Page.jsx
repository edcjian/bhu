import React from 'react';
import {Action} from "./Action";
import './style/page.scss'
import {Link} from "react-router-dom";
export const Page =({answer,id,title})=>{

let content = answer?.[0]?.content
    let  name=answer?.[0]?.userId?.name
    return <div className="page">
        <Link to={"/problem/"+id}> {title} </Link>

            <div>{name}:  {content}</div>
            <Action/>



    </div>
}
/*
{text,content,problemId:{title,id},userId:{name}}*/

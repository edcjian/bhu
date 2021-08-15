import React, {useContext, useEffect} from 'react';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import {useReactive} from "ahooks";
import {Button} from "antd";
import request from "../request";
import {LoginContext} from "./LoginProvider";


export const MyEditor = ({isVisible, problemId,history,events}) => {
    const { id }=useContext(LoginContext)
    const state = useReactive({
        editorState: BraftEditor.createEditorState(null)
    })


    const submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        const htmlContent = state.editorState.toText()
        const data = {
            userId: id,
            problemId: problemId,
            content: htmlContent


        }

        try {
            await request.post('/answer', data)
let res=await request.get('/answer')
            events(true)

        }
    catch (err){

    }

    }

    const handleEditorChange = (editorState) => {

        state.editorState = editorState
    }

    const editorProps = {
        value: state.editorState,
        onChange: handleEditorChange,
        onSave: submitContent,
        height: 500,


    }


    return (isVisible === true) ? <div>
        <BraftEditor
            {...editorProps} />
        <Button onClick={() => {
        }}>提交</Button>
    </div> : <div/>
}

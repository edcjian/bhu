import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form, Input, Menu, Select, Tabs} from "antd";
import './style/header.scss'

import Modal from "antd/es/modal/Modal";
import {Editor} from "./Action";
import TextArea from "antd/es/input/TextArea";
import request from "../request";
import {LoginContext} from "./LoginProvider";
import {Option} from "antd/es/mentions";

export const Banner =({history})=>{
    const  {id,avatar } =useContext(LoginContext)



    const [form] = Form.useForm();
    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            </Menu.Item>
            <Menu.Item  disabled>
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item (disabled)
                </a>
            </Menu.Item>
            <Menu.Item disabled>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item (disabled)
                </a>
            </Menu.Item>
            <Menu.Item danger>a danger item</Menu.Item>
        </Menu>
    );

    async function finish(value) {

        value.userId = id
        await request.post(
            `/problem`, value)
    }

    const adds = <div>
        <Form  form={form} name="control-hooks" onFinish={finish}>
        <Form.Item name="title" >
            <TextArea  rows={4} placeholder="写下你的问题"/>
        </Form.Item>
        <Form.Item name="topic" >
            <TextArea  rows={4} placeholder="准确地描述问题更容易得到解答"/>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          发布问题
        </Button>


    </Form>
    </div>

    return      <div className="myHeader">
        <Input
            placeholder="input search text"
            enterButton="Search"
            style={{width: 300, height: 40}}
            // onSearch={}
        />
   <Button type="primary"         onClick={() => Modal.info({content: (adds)})}
   >提问</Button>

          <Select defaultValue="setting" style={{ width: 120 }} onChange={(value)=>history.push('/'+value)}>
              <Option value="user" >我的主页</Option>
              <Option value="setting">设置</Option>
              <Option value="exit">退出</Option>
          </Select>

    </div>
}

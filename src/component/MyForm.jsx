import React from 'react';
import {Form, message,Input, Button, Select} from "antd";
import useForm from "antd/es/form/hooks/useForm";


export const MyForm =({finish,isVisible})=>{
    const [form] = useForm();

   const formData=["name", "work"]
/*    {Object.entries(formData).map((it, index) =>
        <Form.Item key={index} name={it[0]} label={it[0]} rules={[{required: true}]}>
            <Input placeholder={it[1]}/>
        </Form.Item>)

    }*/
    return    isVisible? <Form height="200px" weight="500px"   form={form} name="control-hooks" onFinish={finish}>
        {formData.map((it,index)=>
            <Form.Item name={it} label={it} rules={[{ required: true }]}>
                <Input />
            </Form.Item>)

        }
        <Form.Item >
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            <Button htmlType="button" onClick={()=>form.resetFields()}>
                Reset
            </Button>
            <Button type="link" htmlType="button" >
                Fill form
            </Button>
        </Form.Item>
{/*        <Button type="link" htmlType="button" onClick={()=>form.setFieldsValue(formData)}>
            Fill form
        </Button>*/}
    </Form>:null
}

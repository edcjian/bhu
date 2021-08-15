import useForm from "antd/es/form/hooks/useForm";
import {Button, Form, Input} from "antd";
import request from "../request";
import {useState} from "react";


export function Login({events, user}) {

   const flex={
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    }
    const [form] = useForm();
    const [state, setState] = useState(0);

    const login = async (values) => {

        const {name, pass} = values

        const res = await request.get(`user?name=eq.${name}&&pass=eq.${pass}`)

        if (!isEmpty(res)) {
            events(true)
            user(res[0])
        }

    }
    const register = async (values) => {

        await request.post('user', values)
        await login(values)
    }

    return <div style={{
        width: 400,
        height: 500,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    }}>
        <div>
            <Form name="control-hooks" onFinish={(state === 0) ? login : register}>
            <Form.Item name="name" label="用户名" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name="pass" label="密码" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item style={flex}>
                <Button type="primary" htmlType="submit">
                    登录
                </Button>
                <Button type="primary" onClick={() => setState(1)}>
                    注册
                </Button>
            </Form.Item>

        </Form>
        </div>

    </div>

}

function isEmpty(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

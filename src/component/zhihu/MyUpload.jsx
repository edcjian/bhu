import {Form, Upload, message, Button} from 'antd';
import {UploadOutlined} from '@ant-design/icons';

import React from 'react';
import {useReactive} from "ahooks";
import OSS from "ali-oss";
import request from "../request";
export  const client =new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAI4GEFg8MqCaHmeH8eACh5',
    accessKeySecret: 'c9AXiJT7AI7Y2glvaOrcxxtah3CACT',
    bucket: 'edcjian',
})
export const MyUpload = ({id,value,events}) => {
    const state = useReactive({

    })
    const props = {
        accept: 'image/*',
        name: 'file',
        async onChange(info) {
            let s = info.file.originFileObj
            if (info.file.status !== 'uploading') {
                
             let res=   await client.multipartUpload(`pic${id}.jpg`,s)
                const {requestUrls} =res.res

                const  data=requestUrls?.[0]?.split('?')?.[0]??''
                
                await  request.patch(`user?id=eq.${id}`,{id,avatar:data})
                events(true)
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return <Upload {...props}>
        <Button icon={<UploadOutlined/>}>Click to Upload</Button>
    </Upload>

}

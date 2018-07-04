/**
 * @desc
 *
 * @使用场景
 *
 * @company qianmi.com
 * @Date    2018/7/4
 **/

import {MeasureClient} from '../measure-client';

describe('基本使用', async () => {
  let measureClient = new MeasureClient({
    traceId: 'UA-XXXXX-Y',
    clientId:"123123",//随机数;
    host: 'cashPad.com',
    send: request => {
      console.log(request);
    },
    userAgent: 'xxxxxxxxx',
    ip: '127.0.0.1',
  });


  it('页面浏览',async () => {
    measureClient.sendPageView({
        title:"结算页",
        path:"/pay"
    });
  });


  it('事件发送',async () => {
    measureClient.sendEvent({
       category:"category",
        action:"action",
        label:"label",
        value:0,
    });
  });

  it('计时',async()=>{

    measureClient.sendTime({
      category:"category",
      variable:"variable",
      label:"label",
      time:100
    });
  });
});

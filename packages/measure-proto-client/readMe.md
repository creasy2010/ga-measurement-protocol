## 流程标记用户

## useage


```typescript
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

    //发送页面浏览记录
   measureClient.sendPageView({
         title:"结算页",
         path:"/pay"
   });

    //发送事件
   measureClient.sendEvent({
         category:"category",
         action:"action",
         label:"label",
         value:0,
    });


   //发送记时
    measureClient.sendTime({
      category:"category",
      variable:"variable",
      label:"label",
      time:100
    });
```

## TODO
* 要将uuid放在包里? 还是外部传入;
* 电子商务类跟踪;
* 用户基础信息跟踪;

## 问题

生成 客户端实例,统计页面访问 事件, 计时等信息, 最终生成相应的json对象;

json对象通过 XX通道发送到服务端, 服务端转发到google-analytics-collection


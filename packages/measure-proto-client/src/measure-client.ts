/**
 * @desc
 *
 * @使用场景
 *
 * @company qianmi.com
 * @Date    2018/7/4
 **/

//维度信息;;
export interface IDimensions {
  cd1?:string;
  cd2?:string;
  cd3?:string;
  cd4?:string;
  cd5?:string;
  cd6?:string;
  cd7?:string;
  cd8?:string;
  cd9?:string;
  cd10?:string;
  cd11?:string;
  cd12?:string;
  cd13?:string;
  cd14?:string;
  cd15?:string;
  cd16?:string;
  cd17?:string;
  cd18?:string;
  cd19?:string;
  cd20?:string;
}

enum hitTypeEnum{
  pageview="pageview",
  event="event",
  timing="timing",
  screenview="screenview",
}

interface IBaseRequest extends IDimensions{
  v:number;     //version
  tid:string;   // Tracking ID / Property ID.
  cid:string;   //Anonymous Client ID.
}

export interface IViewRequest extends IBaseRequest{
  t:hitTypeEnum.pageview //
  dh:string; // Document hostname. eg:mydemo.com
  dp:string; // Page eg:/home
  dt:string; // Title.
}

export interface IEventRequest extends IBaseRequest{
  t:hitTypeEnum.event //
  ec:string; //Event Category. Required.
  ea:string; //Event Action. Required.
  el:string; // Event label.
  ev:number; // Event value.
}

export interface ITimeingRequest extends IBaseRequest{
  t:hitTypeEnum.timing //
  utc:string  // Timing category.
  utv:string  // Timing variable.
  utt:number  // Timing time.
  utl:string  // Timing label.
}


export interface ISendRequest {
  (request:IViewRequest|IEventRequest|ITimeingRequest):void;
}

export interface IMeasureClientCons {
  traceId:string;
  host:string;
  clientId:string;//不传则uuid自动生成;
  userId?:string;
  send:ISendRequest;

  ip:string;

  userAgent?:string;
  //全局的维度设置;;
  dimensions?:IDimensions;
}

export class MeasureClient {

  constructor(param:IMeasureClientCons) {
    this.envInfo = param;
    this._baseInfo ={
        v: 1,
      tid:this.envInfo.traceId,
      cid:this.envInfo.clientId,
      ...this.envInfo.dimensions
    }
  }

  envInfo:IMeasureClientCons;

  _baseInfo:IBaseRequest;

  sendPageView(pageView:{host?:string;title:string;path:string,dimensions?:IDimensions}) {

    this.envInfo.send(Object.assign({},this._baseInfo,{
      dh:pageView.host||this.envInfo.host,
      dp:pageView.path,
      dt:pageView.title,
      t:hitTypeEnum.pageview,
      ... pageView.dimensions
    }) as IViewRequest);
  }

  sendEvent(event:{
    category:string;
    action:string;
    label:string;
    value:number;
    dimensions?:IDimensions
  }) {

    this.envInfo.send(Object.assign({},this._baseInfo,{
      ec:event.category,
      ea:event.action,
      el:event.label,
      ev:event.value,
      t:hitTypeEnum.event,

      ... event.dimensions
    }) as IEventRequest);

  }

  sendTime(time:{
    category:string;
    variable:string;
    label:string;
    time:number;//ms
    dimensions?:IDimensions
  }) {
    this.envInfo.send(Object.assign({},this._baseInfo,{
      utc:time.category,
      utv:time.variable,
      utt:time.time,
      utl:time.label,

      t:hitTypeEnum.timing,
      ... time.dimensions
    }) as ITimeingRequest);
  }
}
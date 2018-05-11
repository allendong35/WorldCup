import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import frog from '@cfp/frog';
import "./index.scss";
import nebulas from 'nebulas';
import NebPay from '../../lib/nebpay';

const country = ['-请选择-', '俄罗斯', ' 伊朗', '日本', '韩国', '沙特阿拉伯', '澳大利亚', '比利时', '德国', '英格兰', '西班牙', '波兰', '冰岛', '塞尔维亚', '葡萄牙', '法国', '瑞士', '克罗地亚', '瑞典', '丹麦', '巴西', '乌拉圭', '阿根廷', '哥伦比亚', '秘鲁', '墨西哥', '哥斯达黎加', '巴拿马', '尼日利亚', '埃及', '塞内加尔', '摩洛哥', '突尼斯'];

const match = [{ name: '-请选择-' }, { name: '--小组赛--' }, { name: '-A组-' },
{ num: 1, name: '俄罗斯vs沙特阿拉伯' },
{ num: 2, name: '埃及vs乌拉圭' },
{ num: 17, name: '俄罗斯vs埃及' },
{ num: 19, name: '乌拉圭vs沙特阿拉伯' },
{ num: 33, name: '乌拉圭vs俄罗斯' },
{ num: 34, name: '沙特阿拉伯vs埃及' },
{ name: '-B组-' },
{ num: 3, name: '摩洛哥vs伊朗' },
{ num: 4, name: '葡萄牙vs西班牙' },
{ num: 18, name: '葡萄牙vs摩洛哥' },
{ num: 20, name: '伊朗vs西班牙' },
{ num: 35, name: '伊朗vs葡萄牙' },
{ num: 36, name: '西班牙vs摩洛哥' },
{ name: '-C组-' },
{ num: 5, name: '法国vs澳大利亚' },
{ num: 7, name: '秘鲁vs丹麦' },
{ num: 21, name: '丹麦vs澳大利亚' },
{ num: 22, name: '法国vs秘鲁' },
{ num: 37, name: '丹麦vs法国' },
{ num: 38, name: '澳大利亚vs秘鲁' },
{ name: '-D组-' },
{ num: 6, name: '阿根廷vs冰岛' },
{ num: 8, name: '克罗地亚vs尼日利亚' },
{ num: 23, name: '阿根廷vs克罗地亚' },
{ num: 25, name: '尼日利亚vs冰岛' },
{ num: 39, name: '尼日利亚vs阿根廷' },
{ num: 40, name: '冰岛vs克罗地亚' },
{ name: '-E组-' },
{ num: 9, name: '哥斯达黎加vs塞尔维亚' },
{ num: 11, name: '巴西vs瑞士' },
{ num: 24, name: '巴西vs哥斯达黎加' },
{ num: 26, name: '塞尔维亚vs瑞士' },
{ num: 43, name: '塞尔维亚vs巴西' },
{ num: 44, name: '瑞士vs哥斯达黎加' },
{ name: '-F组-' },
{ num: 10, name: '德国vs墨西哥' },
{ num: 12, name: '瑞典vs韩国' },
{ num: 28, name: '韩国vs墨西哥' },
{ num: 29, name: '德国vs瑞典' },
{ num: 41, name: '韩国vs德国' },
{ num: 42, name: '墨西哥vs瑞典' },
{ name: '-G组-' },
{ num: 13, name: '比利时vs巴拿马' },
{ num: 14, name: '突尼斯vs英格兰' },
{ num: 27, name: '比利时vs突尼斯' },
{ num: 30, name: '英格兰vs巴拿马' },
{ num: 47, name: '英格兰vs比利时' },
{ num: 48, name: '巴拿马vs突尼斯' },
{ name: '-H组-' },
{ num: 15, name: '哥伦比亚vs日本' },
{ num: 16, name: '波兰vs塞内加尔' },
{ num: 31, name: '日本vs塞内加尔' },
{ num: 32, name: '波兰vs哥伦比亚' },
{ num: 45, name: '日本vs波兰' },
{ num: 46, name: '塞内加尔vs哥伦比亚' }
];

var Account = nebulas.Account,
    neb = new nebulas.Neb();
neb.setRequest(new nebulas.HttpRequest("https://testnet.nebulas.io"));
// var nebPay = new NebPay();
var serialNumber;
var intervalQuery;
var dappAddress = "n1uPwfwZPwKo9rk5KgHcinZxzpcJPCvALmJ";
// 1a9e21b735bfaefa63edf95fe96e7c971278cdd45ca6aa933539347df5a4a0b7
export default class IndexPage extends Component {
  static displayName = 'worldCup';
  static propTypes = {

  }
  constructor(props) {
    super(props);

    this.state = {
      selectName: '',
      selectMatchNum: 0,
      selectMatch: '',
      content: '',
      record:[],
    };
  }
  _selectRender = () => {
    const names = country.map((item, index) => {
      return <option key={index}>{item}</option>;
    });
    const matchs = match.map((item, index) => {
      return <option key={index}>{item.name}</option>;
    })
    return (
      <div className="selectDiv">
        <span className="country">国家</span>
        <select className="select" value={this.state.selectName} onChange={(item) => {
          this.setState({
            selectName: item.target.value,

            selectMatch: "",
            selectMatchNum: 0
          })
          this._getRecord(item.target.value);
        }}>
          {names}
        </select>
        <span>比赛</span>
        <select value={this.state.selectMatch} onChange={(e) => {
          match.map((item, index) => {
            if (item.name === e.target.value) {
              if (item.num) {
                this.setState({
                  selectMatch: item.name,
                  selectMatchNum: item.num,
                  selectName: "",
                })
              }
            }
          })
          this._getRecord("",item.num);
        }}>
          {matchs}
        </select>
      </div>
    );
  }

//   _submit() {
//     var to = dappAddress;
//     var value = "0";
//     var callFunction = "save";
//     var callArgs
//     if (this.state.selectName!== '') {
//       callArgs = `["${this.state.selectName}",{"author":"DW","content":"${this.state.content}"}]`;
//     }else{
//       callArgs = `["${this.state.selectMatchNum}",{"author":"DW","content":"${this.state.content}"}]`;
//     }
//     serialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
//       listener: (resp)=>this.cbPush(resp)        //设置listener, 处理交易返回信息
//     });

//     intervalQuery = setInterval(()=> {
//       this.funcIntervalQuery();
//     }, 5000);
//   }

//   funcIntervalQuery() {
//     nebPay.queryPayInfo(serialNumber)   //search transaction result from server (result upload to server by app)
//       .then(function (resp) {
//         console.log("tx result: " + resp)   //resp is a JSON string
//         var respObject = JSON.parse(resp)
//         if (respObject.code === 0) {
//           alert(`set ${this.state.content} succeed!`)
//           clearInterval(intervalQuery)
//         }
//       })
//       .catch(function (err) {
//         console.log(err);
//       });
//   }

//  cbPush(resp) {
//     console.log("response of push: " + JSON.stringify(resp))
// }

_submitRecord(){
  var from = Account.NewAccount().getAddressString();

      var value = "0";
      var nonce = "0"
      var gas_price = "1000000"
      var gas_limit = "200000"
      var callFunction = "save";
      var callArgs;
      if (this.state.selectName!== '') {
              callArgs = `["${this.state.selectName}",{"author":"DW","content":"${this.state.content}"}]`;
            }else{
              callArgs = `["${this.state.selectMatchNum}",{"author":"DW","content":"${this.state.content}"}]`;
            }
      var contract = {
          "function": callFunction,
          "args": callArgs
      }
      console.log("response of push: " + callArgs)
      neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then((resp)=> {
          this.cbPush(resp)
      }).catch(function (err) {
          //cbSearch(err)
          console.log("error:" + err.message)
      })

}

cbPush(resp) {
  var result = resp.result    ////resp is an object, resp.result is a JSON string
  console.log("return of rpc call: " + JSON.stringify(result))

  if (result !== 'null'){
      //if result is not null, then it should be "return value" or "error message"
      try{
          result = JSON.parse(result)
      }catch (err){
          //result is the error message
      }
      this.forceUpdate();
  }else{
  }
}

  _getRecord(name,num){
    var from = Account.NewAccount().getAddressString();

        var value = "0";
        var nonce = "0"
        var gas_price = "1000000"
        var gas_limit = "200000"
        var callFunction = "get";
        var callArgs
        if (name!== '') {
          callArgs = `["${name}"]`;
        }else{
          callArgs = `["${num}"]`;
        }
        var contract = {
            "function": callFunction,
            "args": callArgs
        }
        console.log("response of push: " + callArgs)
        neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then((resp)=> {
            this.cbResult(resp)
        }).catch(function (err) {
            //cbSearch(err)
            console.log("error:" + err.message)
        })

  }

  cbResult(resp) {
    var result = resp.result    ////resp is an object, resp.result is a JSON string
    console.log("return of rpc call: " + JSON.stringify(result))

    if (result !== 'null'){
        //if result is not null, then it should be "return value" or "error message"
        try{
            result = JSON.parse(result)
        }catch (err){
            //result is the error message
        }
        this.setState({
          record:result.value
        });
        this.forceUpdate();
    }else{
      this.setState({
        record:[]
      });
    }
}

  changeContent(e) {
    this.setState({
      content: e.target.value
    })
  }
  render() {
    return (
      <div className={'mod mod-profitList ani'}>

        <div className="head" />
        <span className='subTitle'>世界评论区</span>
        {this._selectRender()}

        {((this.state.selectName !== '') || (this.state.selectMatch !== '')) &&
          <div className="content" >

            {this.state.selectName !== '' &&
              <div className="countryInfo">
                <span>{this.state.selectName}</span>
              </div>
            }

            {this.state.selectMatch !== '' &&
              <div className="countryInfo">
                <span>{this.state.selectMatch}</span>
              </div>
            }

            <div className="commitView">
              <div className="commit">

                {this.state.record.length>0 && this.state.record.map((item,index)=>{
                  return (
                  <div key={index} >
                    <span>{item.author}</span>
                    <span>:</span>
                    <span>{item.content}</span>
                  </div>)
                })}

              </div>
              <div className="add_banner">
                <input type="text" id="add_value" ref="myTextInput" placeholder="input contents for your keyword" onChange={(e) => this.changeContent(e)} />

                <button id="push" onClick={() => this._submitRecord()}>submit</button>
              </div>
            </div>

          </div>}
      </div>
    );
  }
};

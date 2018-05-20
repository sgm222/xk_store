import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import appLayout from 'SharedStyles/appLayout.css';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from "material-ui/TextField";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import  'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
let myChart, oneChart, twoChart;
let orders = [], counts = [], orderdata=[], shops=[], good=[], goodstype=[];
let types = ['水果','蔬菜','粮油','肉制品','天然干货','其他'];
class DA extends Component {
    getLocalTime = (nS) =>{
        return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');
    } 
    componentDidMount() {
         // 基于准备好的dom，初始化echarts实例
        myChart = echarts.init(document.getElementById('main'));
        oneChart = echarts.init(document.getElementById('one'));
        twoChart = echarts.init(document.getElementById('two'));
        myChart.setOption({
            color: '#61a0a8',
            title: { text: '商城每日订单量' },
            tooltip: {},
            xAxis: {
                data: orders
            },
            yAxis: {},
            series: [{
                name: '每日订单量',
                type: 'bar',
                data: orderdata
            }]
        });
        oneChart.setOption({
            color: '#c23531',
            title: { text: '商城销量' },
            tooltip: {},
            xAxis: {
                data: shops
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: good
            }]
        });
        twoChart.setOption({
            title : {
                text: '销售商品种类百分比',
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: types
            },
            series : [
                {
                    name: '商品种类',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data: goodstype,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        })
    }
    componentWillReceiveProps(){
        myChart.setOption({
            color: '#61a0a8',
            title: { text: '商城每日订单量' },
            tooltip: {},
            xAxis: {
                data: orders
            },
            yAxis: {},
            series: [{
                name: '每日订单量',
                type: 'bar',
                data: orderdata
            }]
        });
        
        oneChart.setOption({
            color: '#c23531',
            title: { text: '商城销量' },
            tooltip: {},
            xAxis: {
                data: shops
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: good
            }]
        });
        twoChart.setOption({
            title : {
                text: '销售商品种类百分比',
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: types
            },
            series : [
                {
                    name: '商品种类',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data: goodstype,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        })
    }
    render() {
        const { order, goods, shop } = this.props;
        orders = [], counts = [], orderdata=[], shops=[], good=[], goodstype=[];
        if(order.fetchingOrder) {
            order.order.map(item => {
                let time = this.getLocalTime(item.time).split(' ')[0];
                if(orders.indexOf(time) === -1) {
                    orders.push(time);
                    counts[time] = 1;
                } else {
                    counts[time]++;
                }
            })
            orders.map(item => {
                orderdata.push(counts[item]);
            })
        }
        if(shop.fetchingShop && shop.shop.result && goods.fetchingGoods && goods.goods.result) {
            shop.shop.result.result.map(it => {
                shops.push(it.name);
                let sum = 0;
                goods.goods.result.result.map(item => {
                    if(item.shopId === it.userId) {
                        sum += item.salecount;
                    }
                })
                good.push(sum);
            });   
        }
        if(goods.fetchingGoods && goods.goods.result) {
            types.map((item,idx) => {
                let data = {value:0, name:item};
                goods.goods.result.result.map(it => {
                    if(it.type === item) {
                        data.value += it.salecount;
                    }
                })
                goodstype.push(data);
            }) 
        }
        
        return (
            <div>
                <div id="main" style={{ width: 400, height: 400, display:'inine-block', float:'left', marginLeft: '280px', marginTop:"20px" }}></div>
                <div id="one" style={{ width: 400, height: 400, display:'inine-block', float:'right', marginRight: '100px', marginTop:"20px" }}></div>
                <div id="two" style={{ width: 400, height: 400, display:'inine-block', marginLeft: '280px', marginTop:"20px" }}></div>
            </div>
       );
    }
}

export default connect(
  (state) => { return {
    goods: state.goods,
    user: state.user,
    order: state.order,
    shop: state.shop
  }; },
  (dispatch) => { return {
  }; }
)(DA);

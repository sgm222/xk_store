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
let myChart, twoChart;
let orders = [], counts = [], orderdata=[], types=[], goodstype=[];
class SellerDA extends Component {
    getLocalTime = (nS) =>{
        return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');
    } 
    componentDidMount() {
         // 基于准备好的dom，初始化echarts实例
        myChart = echarts.init(document.getElementById('main'));
        twoChart = echarts.init(document.getElementById('two'));
        myChart.setOption({
            color: '#61a0a8',
            title: { text: '店铺每日订单量' },
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
       
        twoChart.setOption({
            title : {
                text: '销售商品百分比',
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
                    name: '商品',
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
            title: { text: '店铺每日订单量' },
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
        
        twoChart.setOption({
            title : {
                text: '销售商品百分比',
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
                    name: '商品',
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
        orders = [], counts = [], orderdata=[], types=[], goodstype=[];
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
        if(goods.fetchingGoods && goods.goods.result) {
                goods.goods.result.result.map(item => {
                    let data = {value:item.salecount, name:item.name};
                    types.push(item.name);
                    goodstype.push(data);
                })
        }
        
        return (
            <div>
                <div id="main" style={{ width: 400, height: 400, marginLeft: '280px', marginTop:"20px" }}></div>
                <div id="two" style={{ width: 400, height: 400, marginLeft: '280px', marginTop:"20px" }}></div>
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
)(SellerDA);

import React, {Component} from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from "material-ui/TextField";
import Card from "material-ui/Card";
import Avatar from "material-ui/Avatar";
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import bigg from 'SharedStyles/bigg.jpg';
import Button from 'Components/Button';
import { DialogAlert } from 'Components/DialogAlert/index';
import { Link } from 'react-router';
import { fetchGoodsById } from './api';

let nameTF, typeTF, priceTF, weightTF, salecountTF, countTF, directionTF, uploadInput, file;
class AddGoods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            add: true,
            fetchingGoods: false,
            open: false,
            failureOpen: false,
            selectedFileName: "",
            type: "水果",
            nameError: "",
            priceError: "",
            weightError: "",
            salecounteError: "",
            countError: "",
            directionError: "",
            error: "",
            _id: "",
            name: "",
            price: "",
            weight: "",
            salecount: "",
            count: "",
            direction: ""
        }
    }
    componentDidMount() {
        uploadInput = this.refs.uploadInput;
        nameTF = this.refs.nameTF;
        typeTF = this.refs.typeTF;
        priceTF = this.refs.priceTF;
        weightTF = this.refs.weightTF;
        salecountTF = this.refs.salecountTF;
        countTF = this.refs.countTF;
        directionTF = this.refs.directionTF; 
    }
    componentWillMount() {
        const { goodsId } = this.props.params;
        if(goodsId) {
            fetchGoodsById(goodsId).then(
                (response) => {
                    return response.data;
                }
            ).then(
                (json) => {
                    let goods = json.result.result[0];
                    if(goods) {
                        this.setState({
                            add: false,
                            fetchingGoods: true,
                            _id: goods._id,
                            name: goods.name,
                            type: goods.type,
                            price: goods.price,
                            weight: goods.weight,
                            salecount: goods.salecount,
                            count: goods.count,
                            direction: goods.direction,
                            selectedFileName: goods.fileName
                        })
                    }
                }
            )
        }
    }
    onUpLoadClick() {
        uploadInput.click();
    }

    avatarSelected(event) {
        file = uploadInput.files[0];
        this.setState({
            selectedFileName: file.name
        });
    }
    handleChange(e) {
        let value = e.target.value;
        this.setState({type: value})
    }
    onAdd(goodsId = '') {
        let nameStr = nameTF.getValue();
        let typeStr = typeTF.value;
        let priceStr = priceTF.getValue();
        let weightStr = weightTF.getValue();
        let salecountStr = salecountTF.getValue();
        let countStr = countTF.getValue();
        let directionStr = directionTF.getValue();    
        let infoFinished = true;
        if (nameStr === "") {
            this.setState({
                nameError: "不能为空"
            });
            infoFinished = false;
        }
        if (priceStr === "") {
            this.setState({
                priceError: "不能为空"
            });
            infoFinished = false;
        }
        if (weightStr === "") {
            this.setState({
                weightError: "不能为空"
            });
            infoFinished = false;
        }
        if (salecountStr === "") {
            this.setState({
                salecountError: "不能为空"
            });
            infoFinished = false;
        }
        if (countStr === "") {
            this.setState({
                countError: "不能为空"
            });
            infoFinished = false;
        }
        if (!infoFinished) {
            return;
        }
        console.log(this.state.selectedFileName);
        let formData = new FormData();
        formData.append('avatar', file);
        formData.append('name', nameStr);
        formData.append('type', typeStr);
        formData.append('price', priceStr);
        formData.append('weight', weightStr);
        formData.append('salecount', salecountStr);
        formData.append('count', countStr);
        formData.append('direction', directionStr);
        formData.append('fileName', this.state.selectedFileName);
        let url = goodsId === '' ? "/api/goods/AddGoods" : `/api/goods/ModifyGoods/${goodsId}`;
        fetch(url, {
            method: "post",
            body: formData,
            credentials: 'include'     
        }).then(
            (response) => {
                return response.json();
            }
        ).then(
            (json) => {
                if (json.result) {
                    let result=json.result;
                    if (result.redirect) {
                        this.setState({open: true});
                        setTimeout(function() {
                            window.location.href = result.redirect;
                        },2000);
                    }
                    else {
                        this.setState({failureOpen: true})
                    }
                }
            }
        ).catch(
           console.error('error')
        )
    }

    render() {
        if(!this.state.fetchingGoods && !this.state.add) {
            return(
                <span style={{
                    marginLeft:"300px",
                    marginTop: "50px",
                    display: "block"
                }}>Loading~~~~</span>
            );
        } else {
        return (
            <MuiThemeProvider>
            <Card style={{
                        marginTop: "50px",
                        width: "400px",
                        marginLeft: '280px',
                        padding: '50px'
                    }}>
                <div>商品名称*</div>
                <TextField style={{ flex: 1,height:"32px",marginBottom:"0.5em"}}
                                       errorText={this.state.nameError}
                                       disabled={!this.state.add}
                                       value={this.state.name || ""}
                                       onChange={
                                        (event, str) => {
                                            this.setState({name: str});
                                            if (this.state.nameError !== "") {
                                                this.setState({
                                                    nameError: ""
                                                })
                                            }
                                        }}
                                       ref="nameTF"
                                       id="nameTF"
                                       name="nameTF"/>
                <div>种类*</div>
                <select value={this.state.type}
                        ref="typeTF"
                        style={{
                            width: '256px',
                            height: '32px',
                            borderColor: '#e0e0e0',
                            margin: '10px 0px'
                        }}
                        onChange={
                            (event, value) => {
                                this.setState({
                                    type: value,
                                })
                        }}>
                      <option value="水果">水果</option>
                      <option value="蔬菜">蔬菜</option>
                      <option value="粮油">粮油</option>
                      <option value="肉制品">肉制品</option>
                      <option value="天然干货">天然干货</option>
                      <option value="茶">茶</option>
                </select>
                <div>价格*</div>
                <TextField style={{flex: 1,height:"32px",marginBottom:"0.5em"}}
                            errorText={this.state.priceError}
                            value={this.state.price || ""}
                            onChange={
                                (event, str) => {
                                    this.setState({price: str});
                                    if (this.state.priceError !== "") {
                                        this.setState({
                                            priceError: ""
                                        })
                                    }
                            }}
                            ref="priceTF"
                            id="priceTF"
                            name="priceTF"/>
                <div>净重*</div>
                <TextField style={{flex: 1,height:"32px",marginBottom:"0.5em"}}
                            errorText={this.state.weightError}
                            value={this.state.weight || ""}
                            onChange={
                                (event, str) => {
                                    this.setState({weight: str});
                                    if (this.state.weightError) {
                                        this.setState({
                                            weightError: ""
                                        })
                                    }
                            }}
                            ref="weightTF"
                            id="weightTF"
                            name="weightTF"/>           
                <div>销量*</div>
                <TextField style={{flex: 1,height:"32px",marginBottom:"0.5em"}}
                            errorText={this.state.salecountError}
                            value={this.state.salecount || ""}
                            onChange={
                                (event, str) => {
                                    this.setState({salecount: str});
                                    if (this.state.salecountError !== "") {
                                        this.setState({
                                            salecountError: ""
                                        })
                                    }
                            }}
                            ref="salecountTF"
                            id="salecountTF"
                            name="salecountTF"/> 
                <div>库存*</div>
                <TextField style={{flex: 1,height:"32px",marginBottom:"0.5em"}}
                            errorText={this.state.countError}
                            value={this.state.count || ""}
                            onChange={
                                (event, str) => {
                                    this.setState({count: str});
                                    if (this.state.countError !== "") {
                                        this.setState({
                                            countError: ""
                                        })
                                    }
                            }}
                            ref="countTF"
                            id="countTF"
                            name="countTF"/>   
                <div>详情</div>
                <TextField style={{flex: 1,height:"32px",marginBottom:"0.5em"}}
                            errorText={this.state.directionError}
                            value={this.state.direction || ""}
                            onChange={
                                (event, str) => {
                                    this.setState({direction: str});
                                    if (this.state.directionError !== "") {
                                        this.setState({
                                            directionError: ""
                                        })
                                    }
                            }}
                            ref="directionTF"
                            id="directionTF"
                            name="directionTF"/> 
                 <div style={{flex: 1,height:"32px",marginBottom:"10px",marginTop:"10px"}}>
                                <span>图片</span>
                                <Button onClick={() => this.onUpLoadClick()}
                                              style={{backgroundColor:"#eee"}}
                                              secondary={true}
                                              style={{marginLeft: "0.5em",backgroundColor:"#ddd"}}
                                >选择文件</Button>
                            </div>
                            <div style={{flex: 1,height:"20px"}}>
                                {this.state.selectedFileName}
                            </div>
                            <input type="file"
                                   multiple="multiple"
                                   accept="image/*"
                                   ref="uploadInput"
                                   name="uploadInput"
                                   style={{display: "none"}}
                                   onChange={(event) => this.avatarSelected(event)}/> 
                {this.state.add && <Button onClick={() => this.onAdd()}
                                          primary={true}
                                          style={{width: "120px", alignSelf: "center", borderRadius:"5px", backgroundColor:"#6FCE53", color:"#fff"}}
                >添加</Button>}
                {!this.state.add && <Button onClick={() => this.onAdd(this.state._id)}
                                          primary={true}
                                          style={{width: "120px", alignSelf: "center", borderRadius:"5px", backgroundColor:"#6FCE53", color:"#fff"}}
                >修改</Button>}
                <Button
                        primary={true}
                        style={{width: "120px", marginLeft:"20px", alignSelf: "center", borderRadius:"5px", backgroundColor:"#6FCE53", color:"#fff"}}
                ><Link to="/Goods" style={{color:"#fff"}}>返回</Link></Button>      
                 <Dialog
                    modal={false}
                    open={this.state.open}
                    >
                    {this.state.add ? '添加成功' : '修改成功'}
                </Dialog>
                <Dialog
                    modal={false}
                    open={this.state.failureOpen}
                    >
                    {this.state.add ? '添加失败' : '修改失败'}
                </Dialog>
            </Card>
            </MuiThemeProvider>
        );
    }
    }
}
export default connect(
    (state) => { return {
        goodsDetail: state.goodsDetail,
    }; },
    (dispatch) => { return {
        fetchGoodsById: (goodsId) => { dispatch(fetchGoodsById(goodsId)); },
    }; }
)(AddGoods);
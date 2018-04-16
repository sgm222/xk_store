import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from "material-ui/TextField";
import Card from "material-ui/Card";
import Avatar from "material-ui/Avatar";
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import bigg from 'SharedStyles/bigg.jpg';
import Button from 'Components/Button';
let nameTF, typeTF, priceTF, weightTF, salecountTF, countTF, directionTF;
class AddGoods extends React.Component {
    constructor(props) {
        console.log('addgoods');
        super(props);
        this.state = {
            type: 1,
            nameError: "",
            priceError: "",
            weightError: "",
            salecounteError: "",
            countError: "",
            directioError: "",
            error: ""
        }
    }
    componentDidMount() {
        nameTF = this.refs.nameTF;
        typeTF = this.refs.typeTF;
        priceTF = this.refs.priceTF;
        weightTF = this.refs.weightTF;
        salecountTF = this.refs.salecountTF;
        countTF = this.refs.countTF;
        directionTF = this.refs.directionTF; 
    }
    handleChange(e) {
        let value = e.target.value;
        console.log(this);
        this.setState({type: value})
    }
    genderSelected(event, index, value) {
        this.setState({
            selectedGender: value
        })
    }

    onUpLoadClick() {
        console.log("onUpLoadClick=");
        uploadInput.click();
    }

    avatarSelected(event) {
        file = uploadInput.files[0];
        console.info("file=" + file.name);
        this.setState({
            selectedFileName: file.name
        });
    }

    onAdd() {
        console.log('onadd');
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
        let body = {
            'name': nameStr,
            'type': typeStr,
            'price': priceStr,
            'weight': weightStr,
            'salecount': salecountStr,
            'count': countStr,
            'direction': directionStr
        }
        console.log(typeStr);
        let url = "/api/goods/AddGoods";
        fetch(url, {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'     //很重要，设置session,cookie可用
        }).then(
            (response) => {
                return response.json();
            }
        ).then(
            (json) => {
                console.log(JSON.stringify(json));
                if (json.result) {
                    let result=json.result;
                    if (result.redirect) {
                        window.location = result.redirect;
                    }
                    else {
                        this.setState({
                            error: "添加失败，请重试"
                        })
                    }
                }
            }
        ).catch(
            (ex) => {
                console.error('parsing failed', ex);
            });
    }

    render() {
        return (
            <MuiThemeProvider>
            <Card style={{
                        marginTop: "1em",
                        width: "20em",
                        marginLeft: '240px'
                    }}>
                <div>商品名称*</div>
                <TextField style={{ flex: 1,height:"32px",marginBottom:"0.5em"}}
                                       errorText={this.state.nameError}
                                       onChange={
                                        (event, str) => {
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
                        onChange={
                            (event, value) => {
                                this.setState({
                                    type: value
                                })
                        }}>
                      <option value="1">水果</option>
                      <option value="2">蔬菜</option>
                      <option value="3">粮油</option>
                      <option value="4">肉制品</option>
                      <option value="5">天然干货</option>
                      <option value="6">茶</option>
                </select>
                <div>价格*</div>
                <TextField style={{flex: 1,height:"32px",marginBottom:"0.5em"}}
                            errorText={this.state.priceError}
                            onChange={
                                (event, str) => {
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
                            onChange={
                                (event, str) => {
                                    if (this.state.weightError !== "") {
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
                            onChange={
                                (event, str) => {
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
                            onChange={
                                (event, str) => {
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
                            onChange={
                                (event, str) => {
                                    if (this.state.directionError !== "") {
                                        this.setState({
                                            directionError: ""
                                        })
                                    }
                            }}
                            ref="directionTF"
                            id="directionTF"
                            name="directionTF"/>  
                 <Button onClick={() => this.onAdd()}
                                          primary={true}
                                          style={{width: "256px", alignSelf: "center", borderRadius:"5px", backgroundColor:"#6FCE53", color:"#fff"}}
                            >添加</Button>       
            </Card>
            </MuiThemeProvider>
        );
    }
}
export default AddGoods;
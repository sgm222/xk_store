import React, {Component} from 'react';
import {RadioGroup, Radio} from 'react-radio-group';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from "material-ui/TextField";
import Card from "material-ui/Card";
import Avatar from "material-ui/Avatar";
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import bigg from 'SharedStyles/bigg.jpg';
import Button from 'Components/Button';
let uploadInput;
let userNameTF;
let passTF;
let passConfirmTF;
let file;
let typeTF;
class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGender: 1,
            avatarUrl: "",
            selectedFileName: "",
            nameError: "",
            passError: "",
            passConfirmError: "",
            selectedValue : '1'
        }
    }
    handleChange(event) { 
        this.setState({selectedValue:event});
    } 
    
    componentDidMount() {
        uploadInput = this.refs.uploadInput;
        userNameTF = this.refs.userNameTF;
        passTF = this.refs.passTF;
        passConfirmTF = this.refs.passConfirmTF;
        typeTF = this.refs.typeTF;
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
        this.setState({
            selectedFileName: file.name
        });
    }

    onSignUp() {
        let userNameStr = userNameTF.getValue();
        let passStr = passTF.getValue();
        let passConfirmStr = passConfirmTF.getValue();
        let typeStr = typeTF.props.selectedValue;
        let infoFinished = true;
        let reg = /^(?![^a-zA-Z]+$)(?!\D+$){6,20}/;
        if ("" === userNameStr) {
            this.setState({
                nameError: "不能为空"
            });
            infoFinished = false;
        }
        if ("" === passStr) {
            this.setState({
                passError: "不能为空"
            });
            infoFinished = false;
        }
        if (!reg.test(passStr)) {
            this.setState({
                passError: "请输入6-20位字母数字组合密码"
            });
            infoFinished = false;
        }
        if ("" === passConfirmStr) {
            this.setState({
                passConfirmError: "不能为空"
            });
            infoFinished = false;
        }

        if (passConfirmStr !== passStr) {
            this.setState({
                passError: "密码不一致",
                passConfirmError: "密码不一致"
            });
            infoFinished = false;
        }
        if (!infoFinished) {
            return;
        }
        let formData = new FormData();
        formData.append('avatar', file);
        formData.append('userName', userNameStr);
        formData.append('passWord', passStr);
        formData.append('passConfirm', passConfirmStr);
        formData.append('type', typeStr);
        let url = "/api/user/SignUp";
        fetch(url, {
            method: "post",
            body: formData,
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
                    } else if (result.userOccupied) {
                        this.setState({
                            nameError: "用户名已被占用"
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
      <div className="login-banner">
      <div className="login-main">
        <div className="login-banner-bg"><span></span></div>
        <div className="login-box2">
          <h3 className="title">注册</h3>
          <div className="clear"></div>
          <div className="login-form">
            <MuiThemeProvider>
            <Card style={{
                        marginTop: "1em",
                        marginLeft: "1em",
                        width: "20em",
                    }}>
                        <div style={{
                            padding: "1em",
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            <div >
                                用户名*
                            </div>
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
                                       ref="userNameTF"
                                       id="userNameTF"
                                       name="userNameTF"/>
                            <div>
                                密码*
                            </div>
                            <TextField style={{flex: 1,height:"32px",marginBottom:"0.5em"}}
                                       errorText={this.state.passError}
                                       onChange={(event, str) => {
                                           if (this.state.passError !== "") {
                                               this.setState({
                                                   passError: ""
                                               })
                                           }
                                       }}
                                       type="password"
                                       ref="passTF"
                                       id="passTF"
                                       name="passTF"/>
                            <div>
                                重复密码*
                            </div>
                            <TextField style={{flex: 1,height:"32px",marginBottom:"0.5em"}}
                                       errorText={this.state.passConfirmError}
                                       onChange={(event, str) => {
                                           if (this.state.passConfirmError !== "") {
                                               this.setState({
                                                   passError: "",
                                                   passConfirmError: ""
                                               })
                                           }
                                       }}
                                       type="password"
                                       ref="passConfirmTF"
                                       id="passConfirmTF"
                                       name="passConfirmTF"/>
                            <RadioGroup name="typeTF" 
                                        ref="typeTF"
                                        selectedValue={this.state.selectedValue} 
                                        onChange={(event)=>{this.handleChange(event)}}> 
                                <Radio value="1" />卖家
                                <Radio value="2" style={{marginLeft: "20px"}}/>管理员
                            </RadioGroup>
                            <div style={{flex: 1,height:"32px",marginBottom:"10px",marginTop:"10px"}}>
                                <span>头像</span>
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
                             <Button onClick={() => this.onSignUp()}
                                          primary={true}
                                          style={{width: "256px", height:'36px', alignSelf: "center", borderRadius:"5px", backgroundColor:"#6FCE53", color:"#fff"}}
                            >注册</Button>
                        </div>
                    </Card>
                    </MuiThemeProvider>
          </div>
        </div>
      </div>
    </div>
        );
    }
}
export default SignUp;
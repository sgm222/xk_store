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
import { fetchShopById } from './api';
import { onDel } from './actions';
let nameTF,  corporationTF, telTF, idcardTF, qualificationTF, directionTF, uploadInput, file;
class CreateShop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            add: true,
            fetchingShop: false,
            open: false,
            failureOpen: false,
            selectedFileName: "",
            nameError: "",
            corporationError: "",
            telError: "",
            idcardError: "",
            qualificationError: "",
            error: "",
            _id: "",
            name: "",
            corporation: "",
            tel: "",
            idcard: "",
            qualification: "",
        }
    }
    componentDidMount() {
        const {onDel} = this.props;
        uploadInput = this.refs.uploadInput;
        nameTF = this.refs.nameTF;
        corporationTF = this.refs.corporationTF;
        telTF = this.refs.telTF;
        idcardTF = this.refs.idcardTF;
        qualificationTF = this.refs.qualificationTF;
        directionTF = this.refs.directionTF; 
    }
    componentWillMount() {
        const { shopId } = this.props.params;
        if(shopId) {
            fetchShopById(shopId).then(
                (response) => {
                    return response.data;
                }
            ).then(
                (json) => {
                    let shop = json.result.result[0];
                    if(shop) {
                        this.setState({
                            add: false,
                            fetchingShop: true,
                            _id: shop._id,
                            name: shop.name,
                            corporation: shop.corporation,
                            tel: shop.tel,
                            idcard: shop.idcard,
                            qualification: shop.qualification,
                            direction: shop.direction,
                            selectedFileName: shop.fileName
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
    onAdd(shopId = '') {
        let nameStr = nameTF.getValue();
        let corporationStr = corporationTF.getValue();
        let telStr = telTF.getValue();
        let idcardStr = idcardTF.getValue();
        let qualificationStr = qualificationTF.getValue();    
        let infoFinished = true;
        let telreg = /^1[34578]\d{9}$/;
        let idcardreg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (nameStr === "") {
            this.setState({
                nameError: "不能为空"
            });
            infoFinished = false;
        }
        if (corporationStr === "") {
            this.setState({
                corporationError: "不能为空"
            });
            infoFinished = false;
        }
        if (telStr === "") {
            this.setState({
                telError: "不能为空"
            });
            infoFinished = false;
        }
        if (!telreg.test(telStr)) {
            this.setState({
                telError: "请输入正确的11位电话号码"
            });
            infoFinished = false;
        }
        if (idcardStr === "") {
            this.setState({
                idcardrror: "不能为空"
            });
            infoFinished = false;
        }
        if (!idcardreg.test(idcardStr)) {
            this.setState({
                telError: "请输入正确身份证号"
            });
            infoFinished = false;
        }
        if (qualificationStr === "") {
            this.setState({
                qualificationError: "不能为空"
            });
            infoFinished = false;
        }
        if(this.state.selectedFileName === "") {
            this.setState({
                selectedFileName: "请上传营业执照"
            });
            infoFinished = false;
        }
        if (!infoFinished) {
            return;
        }
        let formData = new FormData();
        formData.append('avatar', file);
        formData.append('name', nameStr);
        formData.append('corporation', corporationStr);
        formData.append('tel', telStr);
        formData.append('idcard', idcardStr);
        formData.append('qualification', qualificationStr);
        formData.append('fileName', this.state.selectedFileName);
        let url = shopId === '' ? "/api/shop/AddShop" : `/api/shop/ModifyShop/${shopId}`;
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
        if(!this.state.fetchingShop && !this.state.add) {
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
            <div style={{
                        marginTop: "50px",
                        width: "400px",
                        marginLeft: '280px',
                        padding: '50px'
                    }}>
                <div>店铺名称*</div>
                <TextField style={{ flex: 1,height:"32px",marginBottom:"0.5em"}}
                                       errorText={this.state.nameError} 
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
               
                <div>法人名称*</div>
                <TextField style={{flex: 1,height:"32px",marginBottom:"0.5em"}}
                            errorText={this.state.corporationError}
                            value={this.state.corporation || ""}
                            onChange={
                                (event, str) => {
                                    this.setState({corporation: str});
                                    if (this.state.corporationError !== "") {
                                        this.setState({
                                            corporationError: ""
                                        })
                                    }
                            }}
                            ref="corporationTF"
                            id="corporationTF"
                            name="corporationTF"/>
                <div>法人手机号*</div>
                <TextField style={{flex: 1,height:"32px",marginBottom:"0.5em"}}
                            errorText={this.state.telError}
                            value={this.state.tel || ""}
                            onChange={
                                (event, str) => {
                                    this.setState({tel: str});
                                    if (this.state.telError) {
                                        this.setState({
                                            telError: ""
                                        })
                                    }
                            }}
                            ref="telTF"
                            id="telTF"
                            name="telTF"/>         
                <div>法人身份证号*</div>
                <TextField style={{flex: 1,height:"32px",marginBottom:"0.5em"}}
                            errorText={this.state.idcardrror}
                            value={this.state.idcard || ""}
                            onChange={
                                (event, str) => {
                                    this.setState({idcard: str});
                                    if (this.state.idcardrror !== "") {
                                        this.setState({
                                            idcardrror: ""
                                        })
                                    }
                            }}
                            ref="idcardTF"
                            id="idcardTF"
                            name="idcardTF"/> 
                
                <div>资质证号*</div>
                <TextField style={{flex: 1,height:"32px",marginBottom:"0.5em"}}
                            errorText={this.state.qualificationError}
                            value={this.state.qualification || ""}
                            onChange={
                                (event, str) => {
                                    this.setState({qualification: str});
                                    if (this.state.qualificationError !== "") {
                                        this.setState({
                                            qualificationError: ""
                                        })
                                    }
                            }}
                            ref="qualificationTF"
                            id="qualificationTF"
                            name="qualificationTF"/>   
                 <div style={{flex: 1,height:"32px",marginBottom:"10px",marginTop:"10px"}}>
                                <span>营业执照*</span>
                                <Button onClick={() => this.onUpLoadClick()}
                                              style={{backgroundColor:"#eee"}}
                                              secondary={true}
                                              style={{marginLeft: "0.5em",backgroundColor:"#ddd"}}
                                >选择文件</Button>
                            </div>
                            <div style={{flex: 1,height:"20px",marginBottom:'25px',color:'red'}}>
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
                                          style={{width: "120px", height:'36px', alignSelf: "center", borderRadius:"5px", backgroundColor:"#6FCE53", color:"#fff"}}
                >创建</Button>}
                {!this.state.add && <Button onClick={() => this.onAdd(this.state._id)}
                                          primary={true}
                                          style={{width: "120px", height:'36px', alignSelf: "center", borderRadius:"5px", backgroundColor:"#6FCE53", color:"#fff"}}
                >修改</Button>}
                <Button
                        primary={true}
                        style={{width: "120px", height:'36px', marginLeft:"20px", alignSelf: "center", borderRadius:"5px", backgroundColor:"#6FCE53", color:"#fff"}}
                ><Link to="/Shop" style={{color:"#fff"}}>返回</Link></Button>      
                 <Dialog
                    modal={false}
                    open={this.state.open}
                    >
                    {this.state.add ? '创建成功' : '修改成功'}
                </Dialog>
                <Dialog
                    modal={false}
                    open={this.state.failureOpen}
                    >
                    {this.state.add ? '创建失败' : '修改失败'}
                </Dialog>
            </div>
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
        fetchShopById: (shopId) => { dispatch(fetchShopById(shopId)); },
        onDel: (shopId) => { dispatch(onDel(shopId)); },
    }; }
)(CreateShop);
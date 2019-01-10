//选择用户头像的UI组件

import React,{Component} from 'react';
import {List, Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeadSelector extends Component{

  static propTypes = {
    setHeader: PropTypes.func.isRequired
  }

  state = {
    icon: null //图片对象
  }

  constructor(props) {
    super(props)
    this.headerList = []
    for (let i = 0; i < 20; i++) {
      this.headerList.push({
        text: '头像'+ (i+1), 
        icon: require('./images/头像'+ (i+1) +'.png' )
      })
    }
  }

  // 解构el为{text, icon}
  handleClick = ({text, icon}) => { 
    this.setState({icon})
    this.props.setHeader(text)
  }

   render(){
     //头部界面
    const { icon } = this.state

     const listHeader = !icon ? '请选择头部' : (
      <div>
      已选择图像:<img src={icon}/>
      </div>
     )
       return (

            <List renderHeader={() => listHeader } >
              <Grid data={this.headerList} 
                    columnNum={5}
                    onClick={this.handleClick} />
            </List>

       )
   }
}
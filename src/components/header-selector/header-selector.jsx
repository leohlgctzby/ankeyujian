//选择用户头像的UI组件

import React,{Component} from 'react';
import {List, Grid} from 'antd-mobile'

export default class HeadSelector extends Component{

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

   render(){
     //头部界面
     const listHeader = '请选择头部'
       return (

            <List renderHeader={() => listHeader } >
              <Grid data={this.headerList} 
                    columnNum={5}/>
            </List>

       )
   }
}
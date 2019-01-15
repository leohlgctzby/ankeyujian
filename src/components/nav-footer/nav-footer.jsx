import React,{Component} from 'react';
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const Item = TabBar.Item

//希望在非路由组件中使用路由库的api，可以使用withRoute()

class NavFooter extends Component{

  static propTypes = {
    navList: PropTypes.array.isRequired
  }

   render(){
     const {navList} = this.props
     const path = this.props.location.pathname; //请求的路径，路由组件才有location,需要引入withRoute()

       return (
           <TabBar>
            {
              navList.map((nav) => (
                <Item key={nav.path} 
                      title={nav.text}
                      icon={{uri: require('./images/' + nav.icon + '.png')}}
                      // selectIcon={{uri: require('./images/' + nav.icon + '-selected.png')}}
                      selectedIcon={{uri: require('./images/' + nav.icon + '.png')}}
                      selected={path===nav.path} 
                      onPress={() => this.props.history.replace(nav.path)} /> //跳转路由用history
              ) )
            }
           </TabBar>
       )
   }
}

//向外暴露withRouter()包装产生的组件
//内部会向组件传入一些路由组件特有的属性：history，match，location
export default withRouter(NavFooter) 
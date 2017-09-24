/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity,
} from 'react-native';

// 引入JSON数据
var CarData = require('./Car.json');
// 屏幕宽度

var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');

export default class ListSectionView extends Component {

  // 构造
  constructor(props) {
    super(props);
    //获取组的数据

    var getSectionData = (dataBlob, sectionID)=> {
      return dataBlob[sectionID];
    };

    // 获取行数据
    var getRowData = (dataBlob, sectionID,rowID) => {
      return dataBlob[sectionID + ':' + rowID];
    };

    // 设置初始化状态
    this.state = {
      dataSource: new ListView.DataSource({
        getSectionData: getSectionData,
        getRowData: getRowData,
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2

      })
    };
  }


  render() {
    return (

        <View style={styles.outViewStyle}>
           <View style={styles.TopViewStyle}>
              <Text style={{fontSize:30,color:'white'}}>汽车品牌</Text>
            </View>

            <ListView
              dataSource={this.state.dataSource}
              renderRow={this._renderRow}
              renderSectionHeader={this._renderSection}
            />
        </View>
    );
  }

  // 耗时操作 数据请求。
  componentDidMount() {

    {
      this.setDataSources()
    }

  }

  setDataSources() {

    // 获得JSON数据数组
    const carArray = CarData.data;

    var dataBlob = {}, sectionIDs = [], rowIDs = [], Cars = [];

    //遍历获取section的下标和内容
    for (var i = 0; i < carArray.length; i++) {

      // 将每组的title存入到dataBlob中
      dataBlob[i] = carArray[i].title;
      // 将组号存入sectionIDs中
      sectionIDs.push(i);
      //将每组中有多少行数组
      rowIDs[i] = [];

      // 取出每一组中的行的内容
      Cars = carArray[i].cars;

      for (var j = 0; j < Cars.length; j++) {
        //将行号存入数组中
        rowIDs[i].push(j);
        // 将每行的内容存入到dataBlob中
        dataBlob[i + ':' + j] = Cars[j];
      }
    }

    this.setState({

      dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)

    });
  }
  // setDataSources(){
  //
  //   // 取出JSON数组
  //   const CarArray = CarData.data;
  //
  //   var dataBlob={},sectionIDs = [],rowIDs = [],Cars = [];
  //
  //   //遍历 取出section中的下标和内容
  //   for(var i = 0; i < CarArray.length; i++){
  //     // 将每组的标题存入到dataBlob中
  //     dataBlob[i] = CarArray[i].title;
  //     // 将组号存入到sectionIDs数组中
  //     sectionIDs.push(i);
  //
  //     //每组中的有多少行的占位数组
  //     rowIDs[i] = [];
  //
  //     //将每组中有多少行的数组取出
  //     Cars = CarArray[i].cars;
  //
  //     //遍历行
  //     for (var j = 0;j < Cars.length;j++){
  //
  //       // 将行号存入rowIDs中
  //       rowIDs[i].push(j);
  //       // 每组中的行添加到dataBlob中
  //       dataBlob[i + ':' + j] = Cars[j];
  //     }
  //
  //   }
  //   // 刷新状态
  //   this.setState({
  //     dataSource:this.state.dataSource.cloneWithRowsAndSections(dataBlob,sectionIDs,rowIDs)
  //   });
  //
  // }
  //每一行数据
  _renderRow(rowData) {
    return (
    <TouchableOpacity activeOpacity={0.5}>
      <View style={styles.cellStyles}>
        <Image source={{uri:rowData.icon}} style={styles.imageStyles}/>
        <Text style={{fontSize:30}}>{rowData.name}</Text>
      </View>
    </TouchableOpacity>
    )
  }
  //每一组数据
  _renderSection(sectionData){
    return (
        <View style={styles.sectionHeaderStyle}>
          <Text style={{fontSize:20,color:'red'}}>{sectionData}</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  outViewStyle:{
    flex:1,
  },

  TopViewStyle:{

      width:width,
      height:80,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'orange'

  },

  sectionHeaderStyle:{
    backgroundColor:'#ccc',
    height:25,
    // alignItems:'center',
    justifyContent:'center'
  },
  cellStyles:{
    flexDirection:'row',
    borderBottomColor:'#ccc',
    borderBottomWidth:1,
    padding:10,
    alignItems:'center'
  },
  imageStyles:{
    width: 90,
    height:90,
    marginRight:10
  },

});

AppRegistry.registerComponent('ListSectionView', () => ListSectionView);

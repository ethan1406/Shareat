/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import axios from 'axios';

type Props = {};

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? 'red' : 'black';
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text style={{color: textColor}}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default class CheckSplitScreen extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      selectedIndex: 0,
      selected: (new Map(): Map<string, boolean>)
    };
  }

  _handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index
    });
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios.get('https://www.shareatpay.com/party/5b346f48d585fb0e7d3ed3fc/6')
    .then(response => {
      this.setState({data: response.data.orders, loading: false});
    }).catch(err => {
      this.setState({ err, loading: false });
    });
  }


  _keyExtractor = (item, index) => item._id;

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
  };

  _renderItem = ({item}) => (
    <MyListItem
      id={item._id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.name}
    />
  );

  render() {
    return (
      <View style={styles.container} resizeMode='contain'>
        <SegmentedControlTab
          values={['First', 'Second']}
          tabStyle={styles.tabStyle}
          activeTabStyle={styles.activeTabStyle}
          tabTextStyle={styles.tabTextStyle}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this._handleIndexChange}
        />
        <FlatList
          data={this.state.data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  activeTabStyle: {
    backgroundColor: '#F3A545'
  },
  tabStyle: {
    borderColor:'#F3A545',
  },
  tabTextStyle: {
    color: '#F3A545'
  }
});
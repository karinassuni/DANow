import React, { Component } from 'react'
import {
  ListView,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import EventCard from './EventCard'

export default class EventList extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(this.props.events),
    }
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(event) =>
          <TouchableOpacity activeOpacity={0.85}>
            <EventCard event={event}></EventCard>
          </TouchableOpacity>
        }
        style={styles.container}
        showHorizontalScrollIndicator={false}
        showVerticalScrollIndicator={false}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
})

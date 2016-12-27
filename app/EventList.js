import React, { Component } from 'react'
import {
  ListView,
  StyleSheet,
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
        renderRow={(event) => <EventCard event={event}></EventCard>}
        style={styles.container}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

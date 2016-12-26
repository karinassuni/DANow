import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import dateFormat from 'dateformat'

dateFormat.masks.time12Only = "h:MMTT"

export default class EventCard extends Component {
  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.name}>{this.props.event.name}</Text>
        <Text style={styles.time}>
          {dateFormat(this.props.event.start, "time12Only")}
          {' - '}
          {dateFormat(this.props.event.end, "time12Only")}
        </Text>
        <Text style={styles.organizations}>
          {"Hosted by " + this.props.event.organizations.join(', ')}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F5FCFF",
    padding: 10,
    marginBottom: 3
  },
  name: {
    fontWeight: "bold",
    marginBottom: 2,
    fontSize: 14
  },
  organizations: {
    fontStyle: "italic"
  time: {
    fontSize: 14
  },
  }
})

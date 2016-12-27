import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native'
import dateFormat from 'dateformat'

export default class EventCard extends Component {
  constructor(props) {
    super(props)
    // Used later to determine poster height following from device width
    this.state = {
      posterAspectRatio: 0,
    }
  }

  componentDidMount() {
    if (this.props.event.poster) {
      Image.getSize(this.props.event.poster, (width, height) => {
        this.setState({posterAspectRatio: width/height})
      })
    }
  }

  render() {
    let deviceWidth = Dimensions.get("window").width
    let posterHeight = deviceWidth/this.state.posterAspectRatio
    if (!isFinite(posterHeight)) {
      posterHeight = 0
    }

    let time = this._renderTime()
    let organizations = this._renderOrganizations()

    return (
      <View style={styles.card}>
        <Text style={styles.name}>
          {this.props.event.name}
        </Text>
        <Image
          source={{uri: this.props.event.poster}}
          style={{
            resizeMode: "contain",
            width: deviceWidth,
            height: posterHeight,
            alignSelf: "center",
            marginBottom: 5,
          }}
          >
        </Image>
        {time}
        {organizations}
      </View>
    )
  }

  _renderTime() {
    let event = this.props.event
    let start = event.start
    let end = event.end

    let isAllDayEvent = start.valueOf() == end.valueOf()
    if (isAllDayEvent) {
      return (
        <Text style={styles.time}>
          {dateFormat(start, "dddd mmm d") + ", all day"}
        </Text>
      )
    }
    else {
      return (
        <Text style={styles.time}>
          {dateFormat(start, "dddd mmm d, h:MMTT")}
          {' to '}
          {dateFormat(end, "h:MMTT")}
        </Text>
      )
    }
  }

  _renderOrganizations() {
    let organizations = this.props.event.organizations
    if (organizations.length) {
      return (
        <Text style={styles.organizations}>
          {"Hosted by " + organizations.join(', ')}
        </Text>
      )
    }
    else {
      return false
    }
  }
}

const styles = StyleSheet.create({
  card: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 3,
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: "center"
  },
  time: {
    fontSize: 14,
    paddingTop: 3,
    paddingBottom: 3,
    textAlign: "center"
  },
  organizations: {
    color: "grey",
    paddingTop: 3,
    paddingBottom: 3,
    textAlign: "center"
  },
})

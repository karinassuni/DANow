import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native'
import dateFormat from 'dateformat'

dateFormat.masks.time12Only = "h:MMTT"

export default class EventInfo extends Component {
  constructor(props) {
    super(props)
    // Used later to determine poster height following from device width
    this.state = {
      posterAspectRatio: 0,
    }
  }

  componentDidMount() {
    Image.getSize(this.props.event.poster, (width, height) => {
      this.setState({posterAspectRatio: width/height})
    })
  }

  render() {
    let deviceWidth = Dimensions.get("window").width
    let posterHeight = deviceWidth/this.state.posterAspectRatio
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
        <Image
          source={{uri: this.props.event.poster}}
          style={{
            resizeMode: "contain",
            width: deviceWidth,
            height: posterHeight,
            alignSelf: "center",
          }}
          >
        </Image>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  name: {
    fontWeight: "bold",
    marginBottom: 2,
    fontSize: 24,
  },
  boldText: {
	fontWeight: "bold",
    fontSize: 14,
  },
  description: {
    fontSize: 14,
  },
})

AppRegistry.registerComponent('EventInfo', () => EventInfo);
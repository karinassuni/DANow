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
    Image.getSize(this.props.event.poster, (width, height) => {
      this.setState({posterAspectRatio: width/height})
    })
  }

  render() {
    let deviceWidth = Dimensions.get("window").width
    let posterHeight = deviceWidth/this.state.posterAspectRatio
    if (!isFinite(posterHeight)) {
      posterHeight = 0
    }
    
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
          }}
          >
        </Image>
        <Text style={styles.time}>
          {dateFormat(this.props.event.start, "dddd mmm d, h:MMTT")}
          {' to '}
          {dateFormat(this.props.event.end, "h:MMTT")}
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
    marginBottom: 3
  },
  time: {
    fontSize: 14,
    marginTop: 5,
    paddingTop: 3,
    paddingBottom: 3,
  },
  organizations: {
    color: "grey",
    paddingTop: 3,
    paddingBottom: 3,
  },
})

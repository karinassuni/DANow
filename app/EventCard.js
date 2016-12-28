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

    let marginHorizontal = 8 * 2
    let organizations = this._renderOrganizations()

    return (
      <View
        style={styles.card}
        shadowRadius={3}
        shadowOffset={{height: 4}}
        shadowOpacity={0.2}
        >
        <View style={styles.poster}>
          <Image
            source={{uri: this.props.event.poster}}
            style={{
              resizeMode: "contain",
              width: deviceWidth - marginHorizontal,
              height: posterHeight,
              alignSelf: "center",
            }}
            >
          </Image>
        </View>
        <View style={styles.text}>
          <Text style={styles.name}>
            {this.props.event.name}
          </Text>
          <Text style={styles.time}>
            {dateFormat(this.props.event.start, "dddd, mmm d")}
          </Text>
          {organizations}
        </View>
      </View>
    )
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
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginVertical: 3,
    marginHorizontal: 8,
    backgroundColor: "white",
  },
  poster: {
    overflow: "hidden",
  },
  text: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 5,
  },
  time: {
    fontSize: 14,
    paddingTop: 3,
    paddingBottom: 3,
  },
  organizations: {
    fontSize: 12,
    color: "grey",
    paddingTop: 3,
    paddingBottom: 3,
  },
})

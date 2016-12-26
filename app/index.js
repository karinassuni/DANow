import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import EventCard from './EventCard'

const testEvents = [
  {
    organizations: [
      "African American Studies Department",
      "BLC",
      "Euphrat",
      "Equity Office"
    ],
    description: "Join De Anza students, faculty and staff for open mic in the Euphrat Museum of Art. Participate in the fusion of spoken word, poetry and hip hop.\n\nIf you are a poet, singer, rapper, spoken word artist, or someone who wants to come join the show, we hope to see you. Come out for good vibes, good beats and good talent!",
    end: "2016-11-03T19:00:00-07:00",
    location: "Euphrat Museum of Art",
    start: "2016-11-03T17:00:00-07:00",
    name: "First Thursday: Open Mic Series"
  },
  {
    organizations: [
      "African American Studies Department",
      "BLC",
      "Euphrat",
      "Equity Office"
    ],
    description: "Join De Anza students, faculty and staff for open mic in the Euphrat Museum of Art. Participate in the fusion of spoken word, poetry and hip hop.\n\nIf you are a poet, singer, rapper, spoken word artist, or someone who wants to come join the show, we hope to see you. Come out for good vibes, good beats and good talent!",
    end: "2016-11-03T19:00:00-07:00",
    location: "Euphrat Museum of Art",
    start: "2016-11-03T17:00:00-07:00",
    name: "First Thursday: Open Mic Series"
  }
]

export default class DANow extends Component {
  render() {
    return (
      <View style={styles.container}>
        {testEvents.map(e => (
          <EventCard event={e}></EventCard>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

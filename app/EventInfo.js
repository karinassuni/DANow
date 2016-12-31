import React, { Component } from 'react'
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  View
} from 'react-native'

import dateFormat from 'dateformat'
import Hyperlink from 'react-native-hyperlink';
import Icon from 'react-native-vector-icons/MaterialIcons';
var SendIntentAndroid = require('react-native-send-intent');


dateFormat.masks.dayOnly = "dddd, mmm d"
dateFormat.masks.time12Only = "h:MM TT"

export default class EventInfo extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
	  
    return (
	
	  <ScrollView>
			<Image
			  source={{uri: this.props.event.poster}}
			  style={{
				//flex:1, 
				//flexDirection: 'row',
				resizeMode: "contain",
				width: 400,
				height: 400,
				alignSelf: "center",
			  }}
			  >
			</Image>
		
        <View style={{padding: 10}}>
		

			<Text style={styles.name} selectable={true}>{this.props.event.name}</Text>
	  
		  <View style={styles.rowContainer}>
			<MyIcon name='access-time' />
			<Text style={styles.bigText} selectable={true}>
			  {dateFormat(this.props.event.start, "dayOnly")}
			  {' at '}
			  {dateFormat(this.props.event.start, "time12Only")}
			  {' - '}
			  {dateFormat(this.props.event.end, "time12Only")}
			</Text>
		</View>
		
		<View style={styles.rowContainer}>
			<MyIcon name='place' />
			<Text style={styles.bigText} selectable={true}>
				{this.props.event.location}
			</Text>
		</View>		
		
		<View style={{flexDirection: 'row', justifyContent: 'space-between', 
			paddingBottom: 10, paddingTop: 10}}>
		  <TextIconButton
			onPress={this._onPressAddToCalendar}
			icon='event'
			title='Add to Calendar'
		  />
		  <TextIconButton
			onPress={this._onPressShare}
			icon='share'
			title='Share'
		  />
		</View>
		
		<Hyperlink linkStyle={{color:'#2980b9'}} onPress={(url) => this._goToURL(url)}>
            <Text style={styles.bigText} selectable={true}>
               {this.props.event.description}
            </Text>
        </Hyperlink>
		
		<Text style={styles.normalText}  selectable={true}>
          {"\nHosted by " + this.props.event.organizations.join(', ')}
        </Text>
		
	 </View>
	 </ScrollView>
    );
  }
  
  _goToURL(url) {
	Linking.canOpenURL(url).then(supported => {
	  if (supported) {
		Linking.openURL(url);
	  } else {
		console.log('Don\'t know how to open URI: ' + url);
	  }
	});
  }
  
  _onPressImage(src) //function is called but doesn't work as intended
  {
	  React.createClass({
	  render() {
		return (
		  <View style={{flex: 1, alignItems: 'stretch'}}>
			<Image style={{flex: 1}} source={{uri: {src}}} />
		  </View>
		);
	  }
	});
  }
  
  _onPressShare()
  {
	  SendIntentAndroid.sendText({
		  title: 'Please share this text',
		  text: 'Lorem ipsum dolor sit amet, per error erant eu, antiopam intellegebat ne sed',
		  type: SendIntentAndroid.TEXT_PLAIN
		});
  }
  
  _onPressAddToCalendar()
  {
	  SendIntentAndroid.addCalendarEvent({
		  title: 'Go To The Park',
		  description: "It's fun to play at the park.",
		  startDate: '2016-01-25 10:00',
		  endDate: '2016-01-25 11:00',
		  recurrence: 'weekly',
		  location: 'The Park'
		});
  }
}

class MyIcon extends Component {
  render() {
    return (
	  <Icon name={this.props.name} style={{paddingRight: 5}} size={28} color='grey' // "#4F8EF7"
	  borderRadius={20}/>
    );
  }
}

class TextIconButton extends Component {
  render() {
    return (
	  <TouchableOpacity onPress={this.props.onPress}>
		<View style={{flexDirection: 'row', color: 'darkgrey'}}>
		  <Icon name={this.props.icon} style={{paddingRight: 5}} size={28} color='#4F8EF7'
		  borderRadius={20}/>
		  <Text style={styles.buttonText}>
			  {this.props.title}
		  </Text>
		</View>
	  </TouchableOpacity>
	  
    );
  }
}

const styles = StyleSheet.create({
  name: {
	//alignSelf: "center",
    padding: 5,
	//fontWeight: 'bold',
	paddingLeft: 40,
    fontFamily: 'sans-serif',
	marginBottom: 3,
    fontSize: 18
  },
  bigText: {
	fontFamily: 'sans-serif',
    fontSize: 16,
	textAlignVertical : 'center'
  },
   rowContainer: {
    //flex: 1,
    flexDirection: 'row',
	padding: 5,

    //flexWrap: 'wrap',
    //width: 294
	//height: 1
  },
  
  normalText: {
	fontFamily: 'sans-serif',
    fontSize: 14, 
	textAlignVertical : 'center'
  },
  
   buttonText: {
	fontFamily: 'sans-serif',
    fontSize: 16, 
	color: '#4F8EF7',
	textAlignVertical : 'center'
  },
})


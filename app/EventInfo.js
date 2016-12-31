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
dateFormat.masks.shareFmt = 'yyyy-mm-dd HH:MM'


export default class EventInfo extends Component {
  constructor(props) {
    super(props)
	
	// Used later to determine poster height following from device width
	this.state = {
      posterAspectRatio: 0,
    }
	
	this._onPressImage = this._onPressImage.bind(this)
	this._onPressShare = this._onPressShare.bind(this)
	this._onPressAddToCalendar = this._onPressAddToCalendar.bind(this)
	
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
	
	  <ScrollView>
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
		
		<Text style={styles.bigText}  selectable={true}>
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
	  let message = this.props.event.name + " is happening at " + this.props.event.location +
			" on " + dateFormat(this.props.event.start, "dayOnly") + ' from ' + dateFormat(this.props.event.start, "time12Only") + ' - ' + dateFormat(this.props.event.end, "time12Only")
	  SendIntentAndroid.openChooserWithOptions({
		  subject: this.props.event.name,
		  text: message
		}, 'Share event');
  }
  
  _onPressAddToCalendar()
  {	
  
	//Alert.alert(dateFormat(this.props.event.start, 'shareFmt'));
	
	SendIntentAndroid.addCalendarEvent({
	  title: this.props.event.name,
	  description: this.props.event.description,
	  startDate: dateFormat(this.props.event.start, 'shareFmt'),
	  endDate: dateFormat(this.props.event.end, 'shareFmt'),
	  recurrence: '',
	  location: this.props.event.location
	});
		
	SendIntentAndroid.openCalendar();


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
		<View style={{flexDirection: 'row'}}>
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
    padding: 5,
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
    flexDirection: 'row',
	padding: 5,
  },
  
   buttonText: {
	fontFamily: 'sans-serif',
    fontSize: 16, 
	color: '#4F8EF7',
	textAlignVertical : 'center'
  },
})


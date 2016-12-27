import React, { Component } from 'react'
import {
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'

import dateFormat from 'dateformat'
import Hyperlink from 'react-native-hyperlink';
import Icon from 'react-native-vector-icons/MaterialIcons';

dateFormat.masks.dayOnly = "dddd, mmm d"
dateFormat.masks.time12Only = "h:MM TT"

export default class EventInfo extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
	let deviceWidth = Dimensions.get("window").width
    return (
	  <View>
	  {/*<View style={{backgroundColor: '#2980b9', width: deviceWidth, height: 30}}>*/}
			<Text style={styles.name} selectable={true}>{this.props.event.name}</Text>
				{/*</View>*/}
      <View style={{padding: 10}}>
		<View style={styles.container}>
			<MyIcon name='event' />
			<Text style={styles.boldText} selectable={true}>
			  {dateFormat(this.props.event.start, "dayOnly")}
			  {' at '}
			  {dateFormat(this.props.event.start, "time12Only")}
			  {' - '}
			  {dateFormat(this.props.event.end, "time12Only")}
			</Text>
		</View>
		
		<View style={styles.container}>
			<MyIcon name='place' />
			<Text style={styles.normalText}>
			  {'Location: '}
			</Text>
			<Text style={styles.boldText}>
				{this.props.event.location}
			</Text>
		</View>

		
		<Hyperlink linkStyle={{color:'#2980b9'}} onPress={(url) => this._goToURL(url)}>
            <Text style={styles.normalText} selectable={true}>
                {this.props.event.description}
            </Text>
        </Hyperlink>
		
		<Text style={styles.normalText}  selectable={true}>
          {"Hosted by " + this.props.event.organizations.join(', ')}
        </Text>
		
	 </View>
	 </View>
    )
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
}

class MyIcon extends Component {
  render() {
    return (
	  <Icon name={this.props.name} size={30} color="#4F8EF7" borderRadius={20}/>
    );
  }
}

const styles = StyleSheet.create({
  name: {
	//alignSelf: "center",
    padding: 5,
	//fontWeight: 'bold',
    fontFamily: 'sans-serif',
	marginBottom: 3,
    fontSize: 18,
  },
  boldText: {
	fontFamily: 'sans-serif',
    fontSize: 16,
	textAlignVertical : 'center'
  },
   container: {
    //flex: 1,
    flexDirection: 'row',
	padding: 5,

    //flexWrap: 'wrap',
    //width: 294
	//height: 1
  },
  normalText: {
	fontFamily: 'sans-serif',
    fontSize: 16, 
	textAlignVertical : 'center'
  }
})


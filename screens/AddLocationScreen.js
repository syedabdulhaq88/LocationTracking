import * as WebBrowser from 'expo-web-browser';
import React from 'react';

import {ActivityIndicator,AsyncStorage,
  Alert,Modal,Picker,  Platform,  ScrollView, 
   StyleSheet,  Text,  TouchableOpacity,  View} from 'react-native';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Card, Avatar ,Divider , ListItem,Input ,Button} from 'react-native-elements';
import DateTimePicker from "react-native-modal-datetime-picker";
import {  Location } from "expo";
import { Camera } from "expo-camera";
import * as Permissions from 'expo-permissions'
const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...'
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...'
  }
];



export default class AddLocationScreen extends React.Component {



constructor(props){
 super()
  this.state  = {
    activeSections: [],

    calenderpickupTimeStart: false,
    calenderpickupTimeEnd: false,
    calenderdeliveryTimeStart: false,
    calenderdeliveryTimeEnd: false,
    calenderbookingCutoff: false,
    calenderofficeTimeStart: false,
    calenderofficeTimeEnd: false,
    calendercSTimeStart: false,
    calendercSTimeEnd: false,

    hasCameraPermission:false,
    hasLocationPermission:false,
    currentCameraVisible : false,
    ImageOne:null,ImageTwo:null,ImageThree:null,ImageFour:null,

    LocationId:0,
    LocationName:null,
    AreaName:null,
    LocationNameWithID :null,
    LocationCode :null,
  
    LocationTypeId :0,

   
    AreaId :0,
    Longitude :null,
    Latitude :null,
   
   
    Fax :null,
    PostalCode :null,
    LandLine :null,

    strPickupTimeStart :" ",
    strPickupTimeEnd :" ",
    strDeliveryTimeStart :" ",
    strDeliveryTimeEnd :" ",
    strBookingCutoff :" ",
    strOfficeTimeStart :" ",
    strOfficeTimeEnd :" ",
    strCSTimeStart :" ",
    strCSTimeEnd :" ",

    Address :null,
   
    ContactPerson :null,
    Mobile :null,
    Email :null,
    Webpage :null,
    SocialSite :null,
    IsComputerized :0,
    IsBankOnly :0,
 
    BillingCityId :0,
  
    IsActive :0,
    IsDeleted :0,
    CreatedBy :0,
    CreatedDate :null,
    ModifiedBy :0,
    ModifiedDate :null,

    //Not belong to this table
    CityId :0,
    CityName :null,
    BarCode :null,
    CityCode   :null,     
    LocationTypeName :null,
    CountryId :0,
    CountryName :null,
    AreaName :null,
    ProvinceId :0,
    ProvinceName :null,
    ZoneId :0,
    ZoneName :null,
   
    GoogleCoordinates :null,


    Shop_Plot :null,
    Building :null,
    Block_Phase_Street :null,
    LandMark :null,

    GoogleCode :null,
    WhatThreeWord1 :null,
    WhatThreeWord2 :null,
    WhatThreeWord3 :null,
    URL :null,



    ZoneList :[],
    CityList:[],
    LocationTypeList:[],
    AreaList:[],
    Locationlist:[],
    User_Email:"",
    loader:false
  }
  this.showDateTimePicker = this.showDateTimePicker.bind(this);
  this.hideDateTimePicker = this.hideDateTimePicker.bind(this);
  this.handleDatePicked = this.handleDatePicked.bind(this);
  this.SaveLocation = this.SaveLocation.bind(this);

  this._openCamera = this._openCamera.bind(this);
  this._closeCamera = this._closeCamera.bind(this);
  this.ImageOnePic = this.ImageOnePic.bind(this);
  this.ImageTwoPic = this.ImageTwoPic.bind(this);
  this.ImageThreePic = this.ImageThreePic.bind(this);
  this.ImageFourPic = this.ImageFourPic.bind(this);
  this.changeZone = this.changeZone.bind(this);
  this.resetForm = this.resetForm.bind(this);
  this._getLocationAsync = this._getLocationAsync.bind(this);
  
}

async componentDidMount() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  this.setState({ hasCameraPermission: status === "granted" });

  // this.setState({ Created_By: await AsyncStorage.getItem("User_ID") });

  // this.setState({  strPickupTimeStart: " ",
  //   strPickupTimeEnd: " ",
  //   strDeliveryTimeStart: " ",
  //   strDeliveryTimeEnd: " ",
  //   strBookingCutoff: " ",
  //   strOfficeTimeStart: " ",
  //   strOfficeTimeEnd: " ",
  //   strCSTimeStart: " ",
  //   strCSTimeEnd: " " });


  let account= await  AsyncStorage.getItem("Account");
  if(account != null){
    
     this.setState({ User_Email: JSON.parse(account).user.email });
  }




  //const res = await  fetch("http://192.168.0.11/QAERP/api/Setup/AllDataForMob",

 

   const res = await  fetch("http://192.168.0.79/LEOP/api/Setup/AllDataForMob",
   {
     method: "GET",
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json"
     }
   }).then(responseJson => responseJson.json())
   .then(responseJson => {
   if (responseJson == 1) {
       Alert.alert("Error", "Network Issue")
     }
     else if (responseJson == 2) {
       Alert.alert("Error", "Network Issue")
     }
     else {
      this._storeData(responseJson);
     }
   }).catch(function (error) {
     Alert.alert("Connection Slow", error.message)
   });



}  
   
_storeData = async (responseJson) => {

  if (responseJson.m_Item1.length > 0) {
    let Zones=responseJson.m_Item1;
    await AsyncStorage.setItem("Zones",JSON.stringify(Zones));
    this.setState({ ZoneList: Zones });
  }
  if (responseJson.m_Item2.length > 0) {
    let Cities=responseJson.m_Item2;
    await AsyncStorage.setItem("Cities",JSON.stringify(Cities));
  }
  if (responseJson.m_Item3.length > 0) {
    let LocationTypes=responseJson.m_Item3;
    await AsyncStorage.setItem("LocationTypes",JSON.stringify(LocationTypes));
    this.setState({ LocationTypeList: LocationTypes });
  }
  if (responseJson.m_Item4.length > 0) {
    let Locations=responseJson.m_Item4;
    await AsyncStorage.setItem("Locations",JSON.stringify(Locations));
  }
  if (responseJson.m_Item5.length > 0) {
    let Areas=responseJson.m_Item5;
    await AsyncStorage.setItem("Areas",JSON.stringify(Areas));
  }

}

changeZone = async (zid) => {
 
  if(zid != ""){
    this.setState({ ZoneId:zid });
    let cities= await  AsyncStorage.getItem("Cities");
   
//     var lucky =JSON.parse(cities).filter(function (valie) {
//       console.log(valie.ZoneId);
//       if(valie.ZoneId = zid){
//       return  valie;
//       }
//  });
var lucky =JSON.parse(cities).filter(arr => arr.ZoneId === zid);

    this.setState({ CityList: lucky });
  }
  else{
    this.setState({ ZoneId:"" });
    this.setState({ CityList: [] });
  }
}




    showDateTimePicker = () => {
      this.setState({ 
        calenderpickupTimeStart: true 
      });
    };
   
    hideDateTimePicker = () => {
      this.setState({  calenderpickupTimeStart: false,
        calenderpickupTimeEnd: false,
        calenderdeliveryTimeStart: false,
        calenderdeliveryTimeEnd: false,
        calenderbookingCutoff: false,
        calenderofficeTimeStart: false,
        calenderofficeTimeEnd: false,
        calendercSTimeStart: false,
        calendercSTimeEnd: false });
    };
   
    handleDatePicked = date => {
      console.log("A date has been picked: ", date);
      this.hideDateTimePicker();
    };

    _getLocationAsync = async () => {

     
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        Alert.alert("Kindly Allow Location");
      }
      this.setState({ hasLocationPermission: status === "granted" });
      if (status !== 'granted') {
        Alert.alert("Kindly Allow Location");
      }
      else{
        let location = await Location.getCurrentPositionAsync({});
        console.log(location.coords);
        this.setState({ Longitude: location.coords.longitude });
        this.setState({ Latitude: location.coords.latitude });
      }
    };

    
    _openCamera = async () => {
      this.setState({ currentCameraVisible: true });
    };
    _closeCamera = async () => {
      this.setState({ currentCameraVisible: false });
    };
    ImageOnePic = async () => {
      if (this.camera) {
       
        let photo = await this.camera.takePictureAsync({
          quality: 0,
          base64: true
        });
        this.setState({ ImageOne: photo.base64 });
        this._getLocationAsync();
      }
    };
    ImageTwoPic = async () => {
      if (this.camera) {
       
        let photo = await this.camera.takePictureAsync({
          quality: 0,
          base64: true
        });
        this.setState({ ImageTwo: photo.base64 });
        this._getLocationAsync();
      }
    };
  
    ImageThreePic = async () => {
      if (this.camera) {
        
        let photo = await this.camera.takePictureAsync({
          quality: 0,
          base64: true
        });
        this.setState({ ImageThree: photo.base64 });
        this._getLocationAsync();
      }
    };
    ImageFourPic = async () => {
      if (this.camera) {
       
        let photo = await this.camera.takePictureAsync({
          quality: 0,
          base64: true
        });
        this.setState({ ImageFour: photo.base64 });
        this._getLocationAsync();
      }
    };
    SaveLocation = async ()=>{

      if(this.state.LocationName == ""){
        Alert.alert("Required","Required Location");
        return false;
       }
       if(this.state.AreaName == ""){
        Alert.alert("Required","Required Area");
        return false;
       }
       if(this.state.CityId == ""){
        Alert.alert("Required","Required City");
        return false;
       }
       if(this.state.ZoneId == ""){
        Alert.alert("Required","Required Zone");
        return false;
       }
       if(this.state.LocationTypeId == ""){
        Alert.alert("Required","Required Location Type");
        return false;
       }


       if(this.state.ImageOne == ""){
        Alert.alert("Required","Required ImageOne");
        return false;
       }
      //  if(this.state.ImageTwo == ""){
      //   Alert.alert("Required","Required ImageTwo");
      //   return false;
      //  }
      //  if(this.state.ImageThree == ""){
      //   Alert.alert("Required","Required ImageThree");
      //   return false;
      //  }
      //  if(this.state.ImageFour == ""){
      //   Alert.alert("Required","Required ImageFour");
      //   return false;
      //  }
     


this.setState({loader:true});

//const res = await  fetch("http://192.168.0.11/QAERP/api/Setup/AddMobileLocation",

      const res = await  fetch("http://192.168.0.79/LEOP/api/Setup/AddMobileLocation",
      {
        method: "POST",
        body: JSON.stringify({

          LocationId:this.state.LocationId,
          LocationName:this.state.LocationName,
          AreaName:this.state.AreaName,
          LocationNameWithID :this.state.LocationNameWithID,
          LocationCode :this.state.LocationCode,
          LocationTypeId :this.state.LocationTypeId,
          AreaId :this.state.AreaId,
          Longitude :this.state.Longitude,
          Latitude :this.state.Latitude,
          Fax :this.state.Fax,
          PostalCode :this.state.PostalCode,
          LandLine :this.state.LandLine,
          strPickupTimeStart :this.state.strPickupTimeStart,
          strPickupTimeEnd :this.state.strPickupTimeEnd,
          strDeliveryTimeStart :this.state.strDeliveryTimeStart,
          strDeliveryTimeEnd :this.state.strDeliveryTimeEnd,
          strBookingCutoff :this.state.strBookingCutoff,
          strOfficeTimeStart :this.state.strOfficeTimeStart,
          strOfficeTimeEnd :this.state.strOfficeTimeEnd,
          strCSTimeStart :this.state.strCSTimeStart,
          strCSTimeEnd :this.state.strCSTimeEnd,
          Address :this.state.Address,
          ContactPerson :this.state.ContactPerson,
          Mobile :this.state.Mobile,
          Email :this.state.Email,
          Webpage :this.state.Webpage,
          SocialSite :this.state.SocialSite,
          IsComputerized :this.state.IsComputerized,
          IsBankOnly :this.state.IsBankOnly,
          BillingCityId :this.state.BillingCityId,
          IsActive :this.state.IsActive,
          IsDeleted :this.state.IsDeleted,
          CreatedBy :this.state.CreatedBy,
          CreatedDate :this.state.CreatedDate,
          ModifiedBy :this.state.ModifiedBy,
          ModifiedDate :this.state.ModifiedDate,
          CityId :this.state.CityId,
          CityName :this.state.CityName,
          BarCode :this.state.BarCode,
          CityCode   :this.state.CityCode,    
          LocationTypeName :this.state.LocationTypeName,
          CountryId :this.state.CountryId,
          CountryName :this.state.CountryName,
          AreaName :this.state.AreaName,
          ProvinceId :this.state.ProvinceId,
          ProvinceName :this.state.ProvinceName,
          ZoneId :this.state.ZoneId,
          ZoneName :this.state.ZoneName,
          GoogleCoordinates :this.state.GoogleCoordinates,
          Shop_Plot :this.state.Shop_Plot,
          Building :this.state.Building,
          Block_Phase_Street :this.state.Block_Phase_Street,
          LandMark :this.state.LandMark,
      
          GoogleCode :this.state.GoogleCode,
          WhatThreeWord1 :this.state.WhatThreeWord1,
          WhatThreeWord2 :this.state.WhatThreeWord2,
          WhatThreeWord3 :this.state.WhatThreeWord3,
          URL :this.state.URL,

          ImageOne:this.state.ImageOne,
          ImageTwo:this.state.ImageTwo,
          ImageThree:this.state.ImageThree,
          ImageFour:this.state.ImageFour,
          User_Email :this.state.User_Email
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(responseJson => responseJson.json())
      .then(responseJson => {
        this.setState({loader:false});
        if (responseJson == 1) {
          Alert.alert("Error", "Network Issue")
        }
        else if (responseJson == 2) {
          Alert.alert("Error", "Network Issue")
        }
        else {
          Alert.alert("Success", "Record Save Successfully");

          this.resetForm();
        }

      })
      .catch(function (error) {
        this.setState({loader:false});
        Alert.alert("Connection Slow", error.message)
      });
    };
  resetForm = async () => {

    this.setState({

     

      calenderpickupTimeStart: false,
      calenderpickupTimeEnd: false,
      calenderdeliveryTimeStart: false,
      calenderdeliveryTimeEnd: false,
      calenderbookingCutoff: false,
      calenderofficeTimeStart: false,
      calenderofficeTimeEnd: false,
      calendercSTimeStart: false,
      calendercSTimeEnd: false,
  
    
      currentCameraVisible : false,
      ImageOne:null,ImageTwo:null,ImageThree:null,ImageFour:null,
  
      LocationId:0,
      LocationName:null,
      AreaName:null,
      LocationNameWithID :null,
      LocationCode :null,
    
     // LocationTypeId :0,
  
     
      AreaId :0,
      Longitude :null,
      Latitude :null,
     
     
      Fax :null,
      PostalCode :null,
      LandLine :null,
  
      strPickupTimeStart :" ",
      strPickupTimeEnd :" ",
      strDeliveryTimeStart :" ",
      strDeliveryTimeEnd :" ",
      strBookingCutoff :" ",
      strOfficeTimeStart :" ",
      strOfficeTimeEnd :" ",
      strCSTimeStart :" ",
      strstrCSTimeEnd :" ",
  
      Address :null,
     
      ContactPerson :null,
      Mobile :null,
      Email :null,
      Webpage :null,
      SocialSite :null,
      IsComputerized :0,
      IsBankOnly :0,
   
      BillingCityId :0,
    
      IsActive :0,
      IsDeleted :0,
      CreatedBy :0,
      CreatedDate :null,
      ModifiedBy :0,
      ModifiedDate :null,
  
     
     // CityId :0,
      CityName :null,
      BarCode :null,
      CityCode   :null,     
      LocationTypeName :null,
      CountryId :0,
      CountryName :null,
      AreaName :null,
      ProvinceId :0,
      ProvinceName :null,
      //ZoneId :0,
      ZoneName :null,
     
      GoogleCoordinates :null,
  
  
      Shop_Plot :null,
      Building :null,
      Block_Phase_Street :null,
      LandMark :null,
  
      GoogleCode :null,
      WhatThreeWord1 :null,
      WhatThreeWord2 :null,
      WhatThreeWord3 :null,
      URL :null
  
  
  
     
    });
    
  }
  // _renderSectionTitle = section => {
  //   return (
  //     <View style={styles.content}>
  //       <Text>{section.content}</Text>
  //     </View>
  //   );
  // };
  // _renderHeader = section => {
  //   return (
  //     <View style={styles.header}>
  //       <Text style={styles.headerText}>{section.title}</Text>
  //     </View>
  //   );
  // };
  // _renderContent = section => {
  //   return (
  //     <View style={styles.content}>
  //       <Text>{section.content}</Text>
  //     </View>
  //   );
  // };
  // _updateSections = activeSections => {
  //   this.setState({ activeSections });
  // };
 
render(){

  const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } 
   

    return (
     
      <View style={styles.content}>
      <ScrollView>
 
<Collapse >
    <CollapseHeader style={styles.panel_header}>
      <View>
        <Text style={styles.panel_header_text}>Info</Text>
      </View>
    </CollapseHeader>
    <CollapseBody>
     
    <Picker  style={styles.pickerContainer}  selectedValue={this.state.ZoneId}
      initValue="Select Zone" onValueChange={ZoneId => this.changeZone(ZoneId) }  >
     <Picker.Item key="" value="" label="Select Zone" />
        {
          this.state.ZoneList.map((item, index) => (
          <Picker.Item key={item.ZoneId} value={item.ZoneId} label={item.ZoneName} />  ))
        }
      </Picker>
    
    <Picker  style={styles.pickerContainer}  selectedValue={this.state.CityId} 
      initValue="Select City" onValueChange={CityId => this.setState({CityId}) }  >
     <Picker.Item key="" value="" label="Select City" />
        {
          this.state.CityList.map((item, index) => (
          <Picker.Item key={item.CityId} value={item.CityId} label={item.CityName} />  ))
        }
      </Picker>


      <Picker  style={styles.pickerContainer}  selectedValue={this.state.LocationTypeId} 
      initValue="Select Location Type" onValueChange={LocationTypeId => this.setState({LocationTypeId}) }  >
     <Picker.Item key="" value="" label="Select Location Type" />
        {
          this.state.LocationTypeList.map((item, index) => (
          <Picker.Item key={item.LocationTypeId} value={item.LocationTypeId} label={item.LocationTypeName} />  ))
        }
      </Picker>

    <Input  name='LocationName' placeholder=' Location Name '   onChangeText={LocationName => this.setState({ LocationName })}
  leftIcon={{ type: 'font-awesome', name: 'map-marker' }}  value={this.state.LocationName}/>
   <Input  name='AreaName' placeholder=' Area Name'   onChangeText={AreaName => this.setState({ AreaName })}
  leftIcon={{ type: 'font-awesome', name: 'map-marker' }} value={this.state.AreaName}/>


    <Input  name='Shop_Plot_Flat' placeholder=' Shop/Plot/Flat #' onChangeText={Shop_Plot => this.setState({ Shop_Plot })}
  leftIcon={{ type: 'font-awesome', name: 'building' }} value={this.state.Shop_Plot} />
   <Input  name='Block_Phase_Street' placeholder=' Block/Phase/Street'   onChangeText={Block_Phase_Street => this.setState({ Block_Phase_Street })}
  leftIcon={{ type: 'font-awesome', name: 'road' }} value={this.state.Block_Phase_Street}/>
  <Input  name='LandMark' placeholder=' LandMark'   onChangeText={LandMark => this.setState({ LandMark })}
  leftIcon={{ type: 'font-awesome', name: 'map-marker' }} value={this.state.LandMark} />
    <Input  name='Building' placeholder=' Building'   onChangeText={Building => this.setState({ Building })}
  leftIcon={{ type: 'font-awesome', name: 'building' }} value={this.state.Building} />
  

    </CollapseBody>
</Collapse>
<Collapse>
<CollapseHeader style={styles.panel_header}>
      <View>
        <Text style={styles.panel_header_text}>Contact Info</Text>
      </View>
    </CollapseHeader>
    <CollapseBody>


    <Input  name='Fax' placeholder='Fax'   onChangeText={Fax => this.setState({ Fax })}
  leftIcon={{ type: 'font-awesome', name: 'fax' }}  keyboardType="decimal-pad" value={this.state.Fax}/>
      <Input  name='Postal_Code' placeholder=' Postal Code'   onChangeText={PostalCode => this.setState({ PostalCode })}
  leftIcon={{ type: 'font-awesome', name: 'building' }}  keyboardType="decimal-pad" value={this.state.PostalCode} />
      <Input  name='LandLine' placeholder=' LandLine'   onChangeText={LandLine => this.setState({ LandLine })}
  leftIcon={{ type: 'font-awesome', name: 'phone' }}  keyboardType="numeric" value={this.state.LandLine}/>
       <Input  name='Contact_Person' placeholder=' Contact Person'   onChangeText={ContactPerson => this.setState({ ContactPerson })}
  leftIcon={{ type: 'font-awesome', name: 'user' }} value={this.state.ContactPerson} />
      <Input  name='Mobile' placeholder=' Mobile'   onChangeText={Mobile => this.setState({ Mobile })}
  leftIcon={{ type: 'font-awesome', name: 'mobile' }} value={this.state.Mobile}/>
      <Input  name='Email' placeholder=' Email'   onChangeText={Email => this.setState({ Email })}
  leftIcon={{ type: 'font-awesome', name: 'globe' }} keyboardType="email-address" value={this.state.Email}/>
   <Input  name='Web-Page' placeholder=' Web Page'   onChangeText={Webpage => this.setState({ Webpage })}
  leftIcon={{ type: 'font-awesome', name: 'globe' }} value={this.state.Webpage}/>
     <Input  name='SocialSite' placeholder=' Social Site'   onChangeText={SocialSite => this.setState({ SocialSite })}
  leftIcon={{ type: 'font-awesome', name: 'globe' }}  value={this.state.SocialSite}/>







    </CollapseBody>

    </Collapse>


    <Collapse> 
    <CollapseHeader style={styles.panel_header}>
      <View>
        <Text style={styles.panel_header_text}>Timing</Text>
      </View>
    </CollapseHeader>
    <CollapseBody>




    <Button  type="outline"  icon={ <Icon  name="arrow-right"  size={15} color="white" /> }
  title={ " Pickup Time Start " + String(this.state.strPickupTimeStart) }  onPress={calenderpickupTimeStart => this.setState({ calenderpickupTimeStart:true }) } />
   <DateTimePicker isVisible={this.state.calenderpickupTimeStart} mode="time"
      onConfirm={
        pickupTimeStart => this.setState({ calenderpickupTimeStart:false ,
          strPickupTimeStart:String(pickupTimeStart).split(" ")[4]  }) 
      } onCancel={this.hideDateTimePicker}     />



<Button  type="outline"  icon={ <Icon  name="arrow-right"  size={15} color="white" /> }
  title={"Pickup Time End "+ String(this.state.strPickupTimeEnd)  }  onPress={calenderpickupTimeEnd => this.setState({ calenderpickupTimeEnd:true }) } />
   <DateTimePicker isVisible={this.state.calenderpickupTimeEnd} mode="time"
      onConfirm={
        calenderpickupTimeEnd => this.setState({ calenderpickupTimeEnd:false ,
    
          strPickupTimeEnd:String(calenderpickupTimeEnd).split(" ")[4]  
        
        }) 
      } onCancel={this.hideDateTimePicker}     />


<Button  type="outline"  icon={ <Icon  name="arrow-right"  size={15} color="white" /> }
  title={"Delivery Time Start " + String(this.state.strDeliveryTimeStart)}  onPress={calenderdeliveryTimeStart => this.setState({ calenderdeliveryTimeStart:true }) } />
   <DateTimePicker isVisible={this.state.calenderdeliveryTimeStart} mode="time"
      onConfirm={
        calenderdeliveryTimeStart => this.setState({ calenderdeliveryTimeStart:false ,
          strDeliveryTimeStart:String(calenderdeliveryTimeStart).split(" ")[4]  
        }) 
      } onCancel={this.hideDateTimePicker}     />


<Button  type="outline"  icon={ <Icon  name="arrow-right"  size={15} color="white" /> }
  title={"Delivery Time End "+ String(this.state.strDeliveryTimeEnd) }  onPress={calenderdeliveryTimeEnd => this.setState({ calenderdeliveryTimeEnd:true }) } />
   <DateTimePicker isVisible={this.state.calenderdeliveryTimeEnd} mode="time"
      onConfirm={
        calenderdeliveryTimeEnd => this.setState({ calenderdeliveryTimeEnd:false ,
        strDeliveryTimeEnd:String(calenderdeliveryTimeEnd).split(" ")[4]  
        }) 
      } onCancel={this.hideDateTimePicker}     />

<Button  type="outline"  icon={ <Icon  name="arrow-right"  size={15} color="white" /> }
  title={"Booking Cut Off "+ String(this.state.strBookingCutoff) }  onPress={calenderbookingCutoff => this.setState({ calenderbookingCutoff:true }) } />
   <DateTimePicker isVisible={this.state.calenderbookingCutoff} mode="time"
      onConfirm={
        calenderbookingCutoff => this.setState({ calenderbookingCutoff:false ,
        strBookingCutoff:String(calenderbookingCutoff).split(" ")[4]
        
        }) 
      } onCancel={this.hideDateTimePicker}     />
 
 <Button  type="outline"  icon={ <Icon  name="arrow-right"  size={15} color="white" /> }
  title={"Office Time Start "+ String(this.state.strOfficeTimeStart) }  onPress={calenderofficeTimeStart => this.setState({ calenderofficeTimeStart:true }) } />
   <DateTimePicker isVisible={this.state.calenderofficeTimeStart} mode="time"
      onConfirm={
        calenderofficeTimeStart => this.setState({ calenderofficeTimeStart:false ,
        strOfficeTimeStart:String(calenderofficeTimeStart).split(" ")[4]
        }) 
      } onCancel={this.hideDateTimePicker}     />
   

   <Button  type="outline"  icon={ <Icon  name="arrow-right"  size={15} color="white" /> }
  title={"Office Time End " + String(this.state.strOfficeTimeEnd)}  onPress={calenderofficeTimeEnd => this.setState({ calenderofficeTimeEnd:true }) } />
   <DateTimePicker isVisible={this.state.calenderofficeTimeEnd} mode="time"
      onConfirm={
        calenderofficeTimeEnd => this.setState({ calenderofficeTimeEnd:false ,
        strOfficeTimeEnd:String(calenderofficeTimeEnd).split(" ")[4]
        }) 
      } onCancel={this.hideDateTimePicker}  />

<Button  type="outline"  icon={ <Icon  name="arrow-right"  size={15} color="white" /> }
  title={"CS Time Start " + String(this.state.strCSTimeStart)}  onPress={calendercSTimeStart => this.setState({ calendercSTimeStart:true }) } />
   <DateTimePicker isVisible={this.state.calendercSTimeStart} mode="time"
      onConfirm={
        calendercSTimeStart => this.setState({ calendercSTimeStart:false ,
        strCSTimeStart:String(calendercSTimeStart).split(" ")[4]
        }) 
      } onCancel={this.hideDateTimePicker}     />
  
  
  <Button  type="outline"  icon={ <Icon  name="arrow-right"  size={15} color="white" /> }
  title={"CS Time End " +  String(this.state.strCSTimeEnd)}  onPress={calendercSTimeEnd => this.setState({ calendercSTimeEnd:true }) } />
   <DateTimePicker isVisible={this.state.calendercSTimeEnd} mode="time"
      onConfirm={
        calendercSTimeEnd => this.setState({ calendercSTimeEnd:false ,
        strCSTimeEnd:String(calendercSTimeEnd).split(" ")[4]
        }) } onCancel={this.hideDateTimePicker}     />





    </CollapseBody>
    </Collapse>
    <Collapse>
    <CollapseHeader style={styles.panel_header}>
      <View>
        <Text style={styles.panel_header_text}>Images</Text>
      </View>
    </CollapseHeader>
    <CollapseBody>
    
    <Card>
      <View style={{flex: 1, flexDirection: 'row'}}>
<Avatar rounded showEditButton
 size="large"
 source={{ uri:  "data:image/png;base64," + this.state.ImageOne }}
 onPress={ this._openCamera } rounded />
 <Avatar rounded showEditButton
 size="large"
 source={{ uri:  "data:image/png;base64," + this.state.ImageTwo }}
 onPress={this._openCamera } rounded  />
 <Avatar rounded showEditButton
 size="large"
 source={{ uri:  "data:image/png;base64," + this.state.ImageThree }}
 onPress={this._openCamera } rounded  />
 <Avatar rounded showEditButton
 size="large"
 source={{ uri:  "data:image/png;base64," + this.state.ImageFour }}
 onPress={ this._openCamera } rounded  />
 </View>

</Card>



<Modal animationType="slide" transparent={false} visible={this.state.currentCameraVisible}
                onRequestClose={() => {  this._closeCamera;  }}     >
                <Camera
                  style={{ flex: 1 }}
                  type={this.state.type}
                  ref={ref => { this.camera = ref;  }} >
                  <View  style={{ flex: 1, backgroundColor: "transparent", flexDirection: "row", height: 200 }}   >
                    <TouchableOpacity
                      style={{  flex: 1,  alignSelf: "flex-end", alignItems: "center" }}
                      onPress={() => {
                        this.setState({
                          type: this.state.type === Camera.Constants.Type.back
                              ? Camera.Constants.Type.front
                              : Camera.Constants.Type.back
                        });
                      }}   >
                      <Text
                        style={{
                          fontSize: 18,
                          marginBottom: 10,
                          color: "white"
                        }}
                      >
                        {"  "}Flip{"  "}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ flex: 2,  alignSelf: "flex-end",  alignItems: "center" }} onPress={this.ImageOnePic}    >
                      <Text  style={{ fontSize: 18, marginBottom: 10, color: "white" }}  >  One    </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{  flex: 2,  alignSelf: "flex-end",  alignItems: "center"  }}  onPress={this.ImageTwoPic}  >
                      <Text  style={{ fontSize: 18, marginBottom: 10, color: "white" }} >  Two  </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{  flex: 2,  alignSelf: "flex-end",  alignItems: "center"  }}  onPress={this.ImageThreePic}  >
                      <Text  style={{ fontSize: 18, marginBottom: 10, color: "white" }} >  Three  </Text>
                    </TouchableOpacity>


                    
                    <TouchableOpacity
                      style={{  flex: 2,  alignSelf: "flex-end",  alignItems: "center"  }}  onPress={this.ImageFourPic}  >
                      <Text  style={{ fontSize: 18, marginBottom: 10, color: "white" }} >  Four  </Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                      style={{   flex: 1,  alignSelf: "flex-end", alignItems: "center" }}
                      onPress={this._closeCamera}    >
                      <Text style={{  fontSize: 18,  marginBottom: 10, color: "white"  }} >
                        Close  </Text>
                    </TouchableOpacity>
                  </View>
                </Camera>
              </Modal>
    
    </CollapseBody>
    </Collapse>

<Divider style={{ backgroundColor: 'red' }} />
<ActivityIndicator
                animating={false}
                color="black"
                size="large"
               // style={styles.activityIndicator}
              />
<Button  type="outline"  title="Save" disabled={this.state.loader}  onPress={this.SaveLocation} />
</ScrollView>
      </View>
)};
  
}

AddLocationScreen.navigationOptions = {
  title: "Location ",
  headerStyle: {
    backgroundColor: "#f4511e"
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold"
  }
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  panel: {
   
    height: 14,
  },

  panel_header : {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    borderTopColor:'red',
    borderBottomColor:'red',
    borderBottomWidth:1,
  },
  panel_header_text : {
    backgroundColor: '#fbfbfb',
    color: 'rgba(0,0,0,0.4)',
    fontSize: 35,
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  AddLocationScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  //  height: 80
},
});





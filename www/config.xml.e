<?xml version="1.0" encoding="UTF-8" ?>
<widget xmlns = "http://www.w3.org/ns/widgets"
xmlns:gap = "http://phonegap.com/ns/1.0"
id = "com.porevil.myjourney" versionCode = "10" version = "0.1" >

    <!-- versionCode is optional and Android only -->
    <name>My Journey</name>
    <description>
        An awesome Journey app.
    </description>
    <author href="http://www.myjourney.com" email="porevil@yahoo.com">porevil</author>

  <plugin name="cordova-sqlite-storage" spec="1.2.1" />
  <plugin name="cordova-plugin-device" spec="~1.1.3"/>
  <plugin name="cordova-plugin-console" spec="~1.0.4"/>
  <plugin name="cordova-plugin-whitelist" spec="~1.3.0"/>
  <plugin name="cordova-plugin-splashscreen" spec="~4.0.0"/>
  <plugin name="cordova-plugin-statusbar" spec="~2.2.0"/>
  <plugin name="ionic-plugin-keyboard" spec="~2.2.1"/>
  <plugin name="cordova-plugin-crosswalk-webview" source="npm" />
  <plugin name="cordova-plugin-network-information" source="npm" />
  <plugin name="cordova-plugin-inappbrowser" source="npm" />
  <plugin name="cordova-plugin-datepicker" source="npm" />
  <plugin name="cordova-plugin-camera" source="npm" />
  
<icon src="resources/android/icon/drawable-ldpi-icon.png" gap:platform="android" gap:qualifier="ldpi"/>
<icon src="resources/android/icon/drawable-mdpi-icon.png" gap:platform="android" gap:qualifier="mdpi"/>
<icon src="resources/android/icon/drawable-hdpi-icon.png" gap:platform="android" gap:qualifier="hdpi"/>
<icon src="resources/android/icon/drawable-xhdpi-icon.png" gap:platform="android" gap:qualifier="xhdpi"/>
<icon src="resources/android/icon/drawable-xxhdpi-icon.png" gap:platform="android" gap:qualifier="xxhdpi"/>
<icon src="resources/android/icon/drawable-xxxhdpi-icon.png" gap:platform="android" gap:qualifier="xxxhdpi"/>
<icon src="resources/ios/icon/icon.png" gap:platform="ios" width="57" height="57"/>
<icon src="resources/ios/icon/icon@2x.png" gap:platform="ios" width="114" height="114"/>
<icon src="resources/ios/icon/icon-40.png" gap:platform="ios" width="40" height="40"/>
<icon src="resources/ios/icon/icon-40@2x.png" gap:platform="ios" width="80" height="80"/>
<icon src="resources/ios/icon/icon-50.png" gap:platform="ios" width="50" height="50"/>
<icon src="resources/ios/icon/icon-50@2x.png" gap:platform="ios" width="100" height="100"/>
<icon src="resources/ios/icon/icon-60.png" gap:platform="ios" width="60" height="60"/>
<icon src="resources/ios/icon/icon-60@2x.png" gap:platform="ios" width="120" height="120"/>
<icon src="resources/ios/icon/icon-60@3x.png" gap:platform="ios" width="180" height="180"/>
<preference name="prerendered-icon" value="true" />
<preference name="target-device" value="universal" />
<preference name="android-windowSoftInputMode" value="stateAlwaysHidden" />

<icon src="resources/ios/icon/icon-72.png" gap:platform="ios" width="72" height="72"/>
<icon src="resources/ios/icon/icon-72@2x.png" gap:platform="ios" width="144" height="144"/>
<icon src="resources/ios/icon/icon-76.png" gap:platform="ios" width="76" height="76"/>
<icon src="resources/ios/icon/icon-76@2x.png" gap:platform="ios" width="152" height="152"/>
<icon src="resources/ios/icon/icon-small.png" gap:platform="ios" width="29" height="29"/>
<icon src="resources/ios/icon/icon-small@2x.png" gap:platform="ios" width="58" height="58"/>
<gap:splash src="resources/android/splash/drawable-land-ldpi-screen.png" gap:platform="android" gap:qualifier="land-ldpi"/>
<gap:splash src="resources/android/splash/drawable-land-mdpi-screen.png" gap:platform="android" gap:qualifier="land-mdpi"/>
<gap:splash src="resources/android/splash/drawable-land-hdpi-screen.png" gap:platform="android" gap:qualifier="land-hdpi"/>
<gap:splash src="resources/android/splash/drawable-land-xhdpi-screen.png" gap:platform="android" gap:qualifier="land-xhdpi"/>
<gap:splash src="resources/android/splash/drawable-land-xxhdpi-screen.png" gap:platform="android" gap:qualifier="land-xxhdpi"/>
<gap:splash src="resources/android/splash/drawable-land-xxxhdpi-screen.png" gap:platform="android" gap:qualifier="land-xxxhdpi"/>
<gap:splash src="resources/android/splash/drawable-port-ldpi-screen.png" gap:platform="android" gap:qualifier="port-ldpi"/>
<gap:splash src="resources/android/splash/drawable-port-mdpi-screen.png" gap:platform="android" gap:qualifier="port-mdpi"/>
<gap:splash src="resources/android/splash/drawable-port-hdpi-screen.png" gap:platform="android" gap:qualifier="port-hdpi"/>
<gap:splash src="resources/android/splash/drawable-port-xhdpi-screen.png" gap:platform="android" gap:qualifier="port-xhdpi"/>
<gap:splash src="resources/android/splash/drawable-port-xxhdpi-screen.png" gap:platform="android" gap:qualifier="port-xxhdpi"/>
<gap:splash src="resources/android/splash/drawable-port-xxxhdpi-screen.png" gap:platform="android" gap:qualifier="port-xxxhdpi"/>
<gap:splash src="resources/ios/splash/Default-568h@2x~iphone.png" gap:platform="ios" width="640" height="1136"/>
<gap:splash src="resources/ios/splash/Default-667h.png" width="750" gap:platform="ios" height="1334"/>
<gap:splash src="resources/ios/splash/Default-736h.png" width="1242" gap:platform="ios" height="2208"/>
<gap:splash src="resources/ios/splash/Default-Landscape-736h.png" gap:platform="ios" width="2208" height="1242"/>
<gap:splash src="resources/ios/splash/Default-Landscape@2x~ipad.png" gap:platform="ios" width="2048" height="1536"/>
<gap:splash src="resources/ios/splash/Default-Landscape~ipad.png" gap:platform="ios" width="1024" height="768"/>
<gap:splash src="resources/ios/splash/Default-Portrait@2x~ipad.png" gap:platform="ios" width="1536" height="2048"/>
<gap:splash src="resources/ios/splash/Default-Portrait~ipad.png" gap:platform="ios" width="768" height="1024"/>
<gap:splash src="resources/ios/splash/Default@2x~iphone.png" gap:platform="ios" width="640" height="960"/>
<gap:splash src="resources/ios/splash/Default~iphone.png" gap:platform="ios" width="320" height="480"/>


    <!-- Default Icon and Splash -->
    <icon src="resources/icon.png" />
    <gap:splash src="resources/splash.png" />
    <access origin="*"/>

</widget>
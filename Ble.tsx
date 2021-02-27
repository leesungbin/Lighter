import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import BleManager from 'react-native-ble-manager';
import { stringToBytes } from 'convert-string';
type BleProps = {};

type State = {
  on: boolean,
  connected: boolean,
};

const DEVICE_ID = "779F20CE-B9C2-F2E6-577F-2347A93055E9";
const SERVICE = "FFE0";
const CHARACTERISTIC = "FFE1";

class Ble extends React.Component<BleProps, State> {
  constructor(props: BleProps) {
    super(props);
    this.state = {
      on: false,
      connected: false,
    };
  }

  componentDidMount = async () => {
    try {
      await BleManager.start();
      setTimeout(async () => {
        await BleManager.connect(DEVICE_ID);
        this.setState({ connected: true });
      }, 1000);

    } catch (err) {
      console.error(err);
      await BleManager.connect(DEVICE_ID);
    }
  }
  switchLight = async () => {
    const { on } = this.state;
    this.setState({ on: !on });
    await BleManager.retrieveServices(DEVICE_ID);
    const data = stringToBytes(on ? "0" : "1");
    await BleManager.writeWithoutResponse(DEVICE_ID, SERVICE, CHARACTERISTIC, data);
  }
  render() {
    return (
      <TouchableOpacity onPress={() => this.switchLight()} style={styles.box}>
        {this.state.connected ?
          <Text style={styles.text} >{this.state.on ? "불을 꺼라" : "불 켜"}</Text>
          : <Text style={styles.text}>연결 중..</Text>}
      </TouchableOpacity>
    )
  }
}
export default Ble;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: 'white',
    fontSize: 40,
  },
});
import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView
} from "react-native";
import { ListItem } from "react-native-elements";
import axios from "axios";

//Creates a class
export default class HomeScreen extends Component {
    //Creates constructor
    constructor(props) {
        super(props);
        //Creates states
        this.state = {
          listData: [],
          url: "http://localhost:5000/"
        };
    }

    //Creates a function get planets
    getPlanets = () => {
        //Creates a constant to make the code short,optional
        const { url } = this.state;
        //Gets data of all planets
        axios.get(url).then(response => {
            return this.setState({
                //WHy two data?
                //First data is the argument
                //Second is the variable 
                listData : response.data.data
            })
        })
        .catch(error => {
            Alert.alert(error.message)
        })
    }

    componentDidMount() {
        this.getPlanets();
    }

    renderItem = ({ item, index }) => (
        <ListItem
          key={index}
          title={`Planet : ${item.name}`}
          subtitle={`Distance from earth : ${item.distance_from_earth}`}
          titleStyle={styles.title}
          containerStyle={styles.listContainer}
          bottomDivider
          chevron
          onPress={() =>
            this.props.navigation.navigate("Details", { planet_name: item.name })
          }
        />
    );
    
    keyExtractor = (item, index) => index.toString();

    render(){
        const { listData } = this.state;

        if (listData.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                <Text>Loading</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <SafeAreaView />
                <View style={styles.upperContainer}>
                    <Text style={styles.headerText}>Planets World</Text>
                </View>
                <View style={styles.lowerContainer}>
                    <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.listData}
                    renderItem={this.renderItem}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#edc988"
    },
    upperContainer: {
      flex: 0.1,
      justifyContent: "center",
      alignItems: "center"
    },
    headerText: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#132743"
    },
    lowerContainer: {
      flex: 0.9
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    emptyContainerText: {
      fontSize: 20
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#d7385e"
    },
    listContainer: {
      backgroundColor: "#eeecda"
    }
  });
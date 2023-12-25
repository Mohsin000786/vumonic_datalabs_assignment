import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import Carousel from 'react-native-snap-carousel';
import {
  Mountain_2,
  Mountain_3,
  Mountain_4,
  Mountain_5,
  Mountain_6,
} from "../assets/screen-assets/index.js";

const Dashboard = () => {
  const carousalRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0)
  const { width } = Dimensions.get("window")

  const data = [
    Mountain_2,
    Mountain_3,
    Mountain_4,
    Mountain_5,
    Mountain_6,
  ];

  const renderItem = ({item, index}) => {
    const isFrontCard = index === activeIndex;
    const tiltAngle = isFrontCard ? '0deg' : index % 2 === 0 ? '-15deg' : '15deg';
    return(
    <View key={index}  style={[
      styles.cardContainer,
      {
        transform: [{ rotateY: tiltAngle }],
      },
    ]}>
      <Image source={item} style={{ width: 400, height: 400 }} />
    </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#87CEEB",
      }}
    >
      <Text style={{ fontSize: 20, color: "#fff", marginVertical: 20 }}>
        Dashboard
      </Text>

      <View style={{ marginVertical: 20 }}>
        <Carousel
          ref={carousalRef}
          layout="stack"
          data={data}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width - 70}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87CEEB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
});

export default Dashboard;

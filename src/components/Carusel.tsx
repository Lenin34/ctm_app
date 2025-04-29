import React from 'react';
import {Dimensions, View, Image, StyleSheet} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {useSharedValue} from 'react-native-reanimated';
import {vs} from "react-native-size-matters";

const {width} = Dimensions.get('window');
const carouselHeight = vs(100);
const imageWidth = vs(100);
const imageHeight = vs(100);

interface Post {
    "id": number,
    "title": string,
    "description": string,
    "image": string,
    "url": string,
    "platform": string,
    "start_date": string,
    "end_date": string,
}

interface Props {
    posts: Post[];
}


const PostCarousel: React.FC = ({posts}: Props) => {
    const progress = useSharedValue<number>(0);

    return (
        <View style={styles.container}>
            <Carousel
                width={width}
                height={carouselHeight}
                data={posts}
                loop={true}
                autoPlay={true}
                autoPlayInterval={3000}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.95,
                    parallaxScrollingOffset: 260,
                }}
                onProgressChange={(_, absoluteProgress) => {
                    progress.value = absoluteProgress;
                }}
                renderItem={({item}) => (
                    <View style={styles.itemContainer}>
                        <Image source={{uri: item.image}} style={styles.image} resizeMode="cover"/>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width,
        height: carouselHeight,
    },
    itemContainer: {
        width,
        height: carouselHeight,
    },
    image: {
        width: imageWidth,
        height: imageHeight,
        borderRadius: 10,
    },
});

export default PostCarousel;

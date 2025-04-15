import React from 'react';
import { Dimensions, View, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const carouselHeight = 258;
const imageWidth = width * 0.8;
const imageHeight = carouselHeight * 0.8;

// Array de imágenes para el carrusel
const posts = [
    require('../../assets/images/1.jpg'),
    require('../../assets/images/1.jpg'),
    require('../../assets/images/1.jpg'),
    require('../../assets/images/1.jpg'),
];

const PostCarousel: React.FC = () => {
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
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 120,
                }}
                onProgressChange={(_, absoluteProgress) => {
                    progress.value = absoluteProgress;
                }}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image source={item} style={styles.image} resizeMode="cover" />
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

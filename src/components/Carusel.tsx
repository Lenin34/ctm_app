import React, { useState } from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { vs } from "react-native-size-matters";  // Importamos la librería

const { width } = Dimensions.get('window');

interface Post {
    id: number;
    title: string;
    description: string;
    image: string;
    url: string;
    platform: string;
    start_date: string;
    end_date: string;
}

interface Props {
    posts: Post[];
}

const CarouselComponent = ({ posts }: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <View style={styles.container}>
            <Carousel
                loop={true}  // Carrusel infinito
                autoPlay={true}  // AutoPlay habilitado
                autoPlayInterval={3000}  // Intervalo de 3 segundos entre cada imagen
                onSnapToItem={(index) => setCurrentIndex(index)}  // Actualizamos el índice actual
                width={width}  // Establece el ancho del carrusel
                height={vs(100)}  // Establece la altura de las imágenes
                data={posts}
                renderItem={({ item }) => (
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                    </View>
                )}
                scrollAnimationDuration={1000}  // Duración de la animación de desplazamiento
                // Ajuste para que el espacio entre imágenes sea de 5px
                mode={"parallax"}
                modeConfig={{
                    parallaxScrollingScale: 1,
                    parallaxScrollingOffset: vs(210),
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: vs(100),  // Ajusta el tamaño de la imagen
        height: vs(100),  // Ajusta el tamaño de la imagen
        borderRadius: 10,
        resizeMode: 'cover',
    },
    carouselContent: {
        marginHorizontal: 5,  // Espacio de 5px entre las imágenes
    },
});

export default CarouselComponent;

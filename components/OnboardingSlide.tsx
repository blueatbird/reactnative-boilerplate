import React from "react";
import { View, Text, Image, useWindowDimensions } from "react-native";

interface OnboardingSlideProps {
    title: string;
    subtitle: string;
    image: any;
}

export default function OnboardingSlide({
    title,
    subtitle,
    image,
}: OnboardingSlideProps) {
    const { width } = useWindowDimensions();

    return (
        <View className="flex-1 items-center justify-center px-8" style={{ width }}>
            <View className="w-64 h-64 mb-8 items-center justify-center">
                <Image
                    source={image}
                    className="w-full h-full"
                    resizeMode="contain"
                />
            </View>
            <Text className="text-2xl font-bold text-gray-900 text-center mb-3">
                {title}
            </Text>
            <Text className="text-base text-gray-500 text-center leading-6 px-4">
                {subtitle}
            </Text>
        </View>
    );
}

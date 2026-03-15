import React, { useState, useRef } from "react";
import { View, Text, ScrollView, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import OnboardingSlide from "@/components/OnboardingSlide";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";

const slides = [
    {
        title: "Explore Trusted Workshops",
        subtitle:
            "Myanmar's first platform connecting car owner with verified car workshops.",
        image: require("../assets/icon.png"),
    },
    {
        title: "Fuel, Gas & EV — All Nearby",
        subtitle:
            "One platform to find oil stations, gas stations, and EV charging points across Myanmar.",
        image: require("../assets/icon.png"),
    },
];

export default function OnboardingScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const scrollRef = useRef<ScrollView>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / width);
        setActiveIndex(index);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1">
                {/* Slides */}
                <ScrollView
                    ref={scrollRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={handleScroll}
                    className="flex-1"
                >
                    {slides.map((slide, index) => (
                        <OnboardingSlide
                            key={index}
                            title={slide.title}
                            subtitle={slide.subtitle}
                            image={slide.image}
                        />
                    ))}
                </ScrollView>

                {/* Bottom Section */}
                <View className="px-6 pb-6">
                    {/* Pagination Dots */}
                    <View className="flex-row justify-center mb-8">
                        {slides.map((_, index) => (
                            <View
                                key={index}
                                className={`h-2 rounded-full mx-1.5 ${index === activeIndex
                                    ? "w-8 bg-primary"
                                    : "w-2 bg-gray-300"
                                    }`}
                            />
                        ))}
                    </View>

                    {/* Buttons */}
                    <View className="gap-3">
                        <PrimaryButton
                            title="Create Account"
                            onPress={() => router.push("/register")}
                        />
                        <SecondaryButton
                            title="Login Your Account"
                            onPress={() => router.push("/login")}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";

export default function SplashScreen() {
    const router = useRouter();
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isAuthenticated) {
                router.replace("/(home)");
            } else {
                router.replace("/onboarding");
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [isAuthenticated, router]);

    return (
        <View className="flex-1 bg-primary items-center justify-center">
            <View className="items-center">
                {/* Logo placeholder */}
                <View className="w-20 h-20 rounded-2xl bg-white/20 items-center justify-center mb-4">
                    <Text className="text-white text-3xl font-bold">🚗</Text>
                </View>
                <Text className="text-white text-2xl font-bold tracking-wider">
                    AutoConnect
                </Text>
                <Text className="text-white/70 text-sm mt-1">
                    Myanmar's Auto Platform
                </Text>
            </View>
        </View>
    );
}

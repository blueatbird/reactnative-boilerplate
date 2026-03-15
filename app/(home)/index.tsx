import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/authStore";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function HomeScreen() {
    const router = useRouter();
    const { token, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        router.replace("/onboarding");
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 items-center justify-center px-6">
                {/* Welcome Card */}
                <View className="bg-primary/5 rounded-3xl p-8 items-center w-full mb-8">
                    <View className="w-16 h-16 rounded-full bg-primary/10 items-center justify-center mb-4">
                        <Text className="text-3xl">👋</Text>
                    </View>
                    <Text className="text-2xl font-bold text-gray-900 mb-2">
                        Welcome!
                    </Text>
                    <Text className="text-gray-500 text-sm text-center">
                        You are successfully logged in.
                    </Text>
                </View>

                {/* Token Display */}
                <View className="bg-gray-50 rounded-xl p-4 w-full mb-8">
                    <Text className="text-xs text-gray-400 mb-1">Auth Token</Text>
                    <Text className="text-xs text-gray-600 font-mono" numberOfLines={2}>
                        {token}
                    </Text>
                </View>

                {/* Logout Button */}
                <View className="w-full">
                    <PrimaryButton title="Logout" onPress={handleLogout} />
                </View>
            </View>
        </SafeAreaView>
    );
}

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface TabSwitcherProps {
    tabs: string[];
    activeIndex: number;
    onTabChange: (index: number) => void;
}

export default function TabSwitcher({
    tabs,
    activeIndex,
    onTabChange,
}: TabSwitcherProps) {
    return (
        <View className="flex-row bg-gray-200 rounded p-1 mb-6">
            {tabs.map((tab, index) => {
                const isActive = index === activeIndex;
                return (
                    <TouchableOpacity
                        key={tab}
                        activeOpacity={0.7}
                        onPress={() => onTabChange(index)}
                        className={`flex-1 py-3 rounded items-center justify-center ${isActive ? "bg-white" : ""
                            }`}
                    >
                        <Text
                            className={`text-sm font-bold ${isActive ? "text-black" : "text-gray-500"
                                }`}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

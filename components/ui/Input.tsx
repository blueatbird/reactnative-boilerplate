import React from "react";
import {
    TextInput as RNTextInput,
    View,
    Text,
    TextInputProps,
} from "react-native";

interface InputProps extends TextInputProps {
    label: string;
    error?: string;
}

export default function Input({ label, error, ...rest }: InputProps) {
    return (
        <View className="mb-4">
            <Text className="text-sm font-bold text-gray-700 mb-1.5">{label}</Text>
            <RNTextInput
                className={`bg-gray-50 border rounded px-4 py-3.5 text-base text-gray-900 ${error ? "border-red-400" : "border-gray-200"
                    }`}
                placeholderTextColor="#9CA3AF"
                {...rest}
            />
            {error ? (
                <Text className="text-red-500 text-xs mt-1">{error}</Text>
            ) : null}
        </View>
    );
}

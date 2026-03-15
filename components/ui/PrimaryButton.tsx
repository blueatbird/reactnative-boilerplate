import React from "react";
import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    TouchableOpacityProps,
} from "react-native";

interface PrimaryButtonProps extends TouchableOpacityProps {
    title: string;
    loading?: boolean;
    bgColor?: string;
    textColor?: string;
}

export default function PrimaryButton({
    title,
    loading,
    disabled,
    bgColor = "primary",
    textColor = "white",
    ...rest
}: PrimaryButtonProps) {
    return (
        <TouchableOpacity
            className={`rounded py-4 border border-primary items-center justify-center ${disabled || loading ? `bg-${bgColor} opacity-70` : `bg-${bgColor}`}
                `}
            activeOpacity={0.8}
            disabled={disabled || loading}
            {...rest}
        >
            {loading ? (
                <ActivityIndicator color="#ffffff" />
            ) : (
                <Text className={`text-${textColor} font-semibold text-base`}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

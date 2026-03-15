import React from "react";
import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    TouchableOpacityProps,
} from "react-native";

interface SecondaryButtonProps extends TouchableOpacityProps {
    title: string;
    loading?: boolean;
}

export default function SecondaryButton({
    title,
    loading,
    disabled,
    ...rest
}: SecondaryButtonProps) {
    return (
        <TouchableOpacity
            className={`rounded py-4 items-center justify-center border border-primary bg-white ${disabled || loading ? "opacity-50" : ""
                }`}
            activeOpacity={0.8}
            disabled={disabled || loading}
            {...rest}
        >
            {loading ? (
                <ActivityIndicator color="#2563EB" />
            ) : (
                <Text className="text-primary font-semibold text-base">{title}</Text>
            )}
        </TouchableOpacity>
    );
}

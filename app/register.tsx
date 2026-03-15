import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TabSwitcher from "@/components/ui/TabSwitcher";
import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useRegister } from "@/hooks/useAuth";
import { ChevronLeft } from "lucide-react-native";
import {
    registerEmailSchema,
    registerPhoneSchema,
    RegisterEmailFormData,
    RegisterPhoneFormData,
} from "@/schemas/auth";
import SecondaryButton from "@/components/ui/SecondaryButton";

const TABS = ["Register With Email", "Register With Phone"];

export default function RegisterScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(0);
    const isEmail = activeTab === 0;

    const registerMutation = useRegister();

    const emailForm = useForm<RegisterEmailFormData>({
        resolver: zodResolver(registerEmailSchema),
        defaultValues: { name: "", email: "", password: "" },
    });

    const phoneForm = useForm<RegisterPhoneFormData>({
        resolver: zodResolver(registerPhoneSchema),
        defaultValues: { name: "", phone: "", password: "" },
    });

    const apiError = registerMutation.error?.message || "";

    const onSubmitEmail = (data: RegisterEmailFormData) => {
        registerMutation.mutate(data, {
            onSuccess: () => {
                Alert.alert("Success", "Account created successfully!", [
                    { text: "OK", onPress: () => router.push("/login") },
                ]);
            },
        });
    };

    const onSubmitPhone = (data: RegisterPhoneFormData) => {
        registerMutation.mutate(data, {
            onSuccess: () => {
                Alert.alert("Success", "Account created successfully!", [
                    { text: "OK", onPress: () => router.push("/login") },
                ]);
            },
        });
    };

    const handleTabChange = (index: number) => {
        setActiveTab(index);
        registerMutation.reset();
        emailForm.reset();
        phoneForm.reset();
    };

    const handleSubmit = isEmail
        ? emailForm.handleSubmit(onSubmitEmail)
        : phoneForm.handleSubmit(onSubmitPhone);

    return (
        <SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
            {/* Blue Header */}
            <View className="bg-primary pt-20 pb-6 px-5">
                <View className="flex flex-col items-start gap-4">
                    <ChevronLeft color="white" onPress={() => router.push("/onboarding")} size={24} />
                    <Text className="text-white text-2xl font-bold">Register</Text>
                    <Text className="text-white text-base font-normal">Find trusted workshops and nearby fuel stations in just a few taps.</Text>
                </View>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView
                    className="flex-1 px-6 pt-6"
                    contentContainerStyle={{ paddingBottom: 24 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <TabSwitcher
                        tabs={TABS}
                        activeIndex={activeTab}
                        onTabChange={handleTabChange}
                    />

                    {apiError ? (
                        <View className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
                            <Text className="text-red-600 text-sm text-center">
                                {apiError}
                            </Text>
                        </View>
                    ) : null}

                    {/* Email Form */}
                    {isEmail ? (
                        <View key="email-reg-form">
                            <Controller
                                control={emailForm.control}
                                name="name"
                                render={({ field, fieldState }) => (
                                    <Input
                                        label="Name"
                                        placeholder="Enter your full name"
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        error={fieldState.error?.message}
                                        autoCapitalize="words"
                                    />
                                )}
                            />
                            <Controller
                                control={emailForm.control}
                                name="email"
                                render={({ field, fieldState }) => (
                                    <Input
                                        label="Email"
                                        placeholder="Enter your email"
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        error={fieldState.error?.message}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                )}
                            />
                            <Controller
                                control={emailForm.control}
                                name="password"
                                render={({ field, fieldState }) => (
                                    <Input
                                        label="Password"
                                        placeholder="Enter your password"
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        error={fieldState.error?.message}
                                        secureTextEntry
                                    />
                                )}
                            />
                        </View>
                    ) : (
                        /* Phone Form */
                        <View key="phone-reg-form">
                            <Controller
                                control={phoneForm.control}
                                name="name"
                                render={({ field, fieldState }) => (
                                    <Input
                                        label="Full Name"
                                        placeholder="Enter your full name"
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        error={fieldState.error?.message}
                                        autoCapitalize="words"
                                    />
                                )}
                            />
                            <Controller
                                control={phoneForm.control}
                                name="phone"
                                render={({ field, fieldState }) => (
                                    <Input
                                        label="Phone Number"
                                        placeholder="+959xxxxxxxxx"
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        error={fieldState.error?.message}
                                        keyboardType="phone-pad"
                                    />
                                )}
                            />
                            <Controller
                                control={phoneForm.control}
                                name="password"
                                render={({ field, fieldState }) => (
                                    <Input
                                        label="Password"
                                        placeholder="Enter your password"
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        error={fieldState.error?.message}
                                        secureTextEntry
                                    />
                                )}
                            />
                        </View>
                    )}
                </ScrollView>

                {/* Bottom Buttons Container */}
                <View className="px-6 pb-6 gap-3 bg-white">
                    <PrimaryButton
                        title="Create Account"
                        loading={registerMutation.isPending}
                        onPress={handleSubmit}
                    />

                    <SecondaryButton
                        title="Login Your Account"
                        loading={registerMutation.isPending}
                        onPress={() => router.push("/login")}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
}

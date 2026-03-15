import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TabSwitcher from "@/components/ui/TabSwitcher";
import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import { useLogin } from "@/hooks/useAuth";
import { ChevronLeft } from "lucide-react-native";
import {
    loginEmailSchema,
    loginPhoneSchema,
    LoginEmailFormData,
    LoginPhoneFormData,
} from "@/schemas/auth";

const TABS = ["Login With Email", "Login With Phone"];

export default function LoginScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(0);
    const isEmail = activeTab === 0;

    const {
        mutate,
        isPending,
        error: apiError,
        isLockedOut,
        lockoutMessage,
        reset: resetMutation,
    } = useLogin();

    const emailForm = useForm<LoginEmailFormData>({
        resolver: zodResolver(loginEmailSchema),
        defaultValues: { email: "", password: "" },
    });

    const phoneForm = useForm<LoginPhoneFormData>({
        resolver: zodResolver(loginPhoneSchema),
        defaultValues: { phone: "", password: "" },
    });

    const errorMessage = isLockedOut
        ? lockoutMessage
        : apiError?.message || "";

    const onSubmitEmail = (data: LoginEmailFormData) => {
        mutate(data, {
            onSuccess: () => {
                router.replace("/(home)");
            },
        });
    };

    const onSubmitPhone = (data: LoginPhoneFormData) => {
        mutate(data, {
            onSuccess: () => {
                router.replace("/(home)");
            },
        });
    };

    const handleTabChange = (index: number) => {
        setActiveTab(index);
        resetMutation();
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
                    <Text className="text-white text-2xl font-bold">Login</Text>
                    <Text className="text-white text-base font-normal">Find trusted workshops and nearby fuel stations in just a few taps.</Text>
                </View>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView
                    className="flex-1 px-6 pt-6"
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <TabSwitcher
                        tabs={TABS}
                        activeIndex={activeTab}
                        onTabChange={handleTabChange}
                    />

                    {errorMessage ? (
                        <View
                            className={`border rounded-xl p-3 mb-4 ${isLockedOut
                                ? "bg-amber-50 border-amber-200"
                                : "bg-red-50 border-red-200"
                                }`}
                        >
                            <Text
                                className={`text-sm text-center ${isLockedOut ? "text-amber-700" : "text-red-600"
                                    }`}
                            >
                                {errorMessage}
                            </Text>
                        </View>
                    ) : null}

                    {/* Email Form */}
                    {isEmail ? (
                        <View key="email-form">
                            <Controller
                                control={emailForm.control}
                                name="email"
                                render={({ field, fieldState }) => (
                                    <Input
                                        label="Email Address"
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
                        <View key="phone-form">
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

                    <View className="items-end -mt-2 mb-6">
                        <TouchableOpacity>
                            <Text className="text-primary text-sm font-bold">
                                Forgot Password ?
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                {/* Bottom Buttons Container */}
                <View className="px-6 pb-6 gap-3 bg-white">
                    <PrimaryButton
                        title="Login Your Account"
                        loading={isPending}
                        disabled={isLockedOut}
                        onPress={handleSubmit}
                    />

                    <SecondaryButton
                        title="Create Account"
                        onPress={() => router.push("/register")}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

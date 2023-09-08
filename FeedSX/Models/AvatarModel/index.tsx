import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export interface AvatarStateProps {
    avatarStyle?: ImageStyle;
    avatarUrl: string,
    nameInitialViewStyle? : ViewStyle,
    nameInitialTextStyle? : TextStyle   
}

export declare type AvatarUI = AvatarStateProps;

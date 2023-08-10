// Functions to handle user interactions
export interface IconCallbacks {
    onIconPress?: () => void;
    displayIcon: () => React.ReactNode;
}

export declare type IconUI = IconCallbacks;

  
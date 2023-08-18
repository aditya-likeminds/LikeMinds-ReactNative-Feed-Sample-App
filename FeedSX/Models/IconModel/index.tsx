// Functions to handle user interactions
export interface IconCallbacks {
    onIconPress?: (val:any) => void;
    displayIcon: () => React.ReactNode;
}

export declare type IconUI = IconCallbacks;

  
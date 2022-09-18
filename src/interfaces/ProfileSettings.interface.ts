export interface Amenity {
    icon: React.ReactNode;
    text: string;
    selected: boolean;
}

export interface Location {
    address: string;
    radius: number;
}

export interface Room {
    icon: React.ReactElement;
    name: string;
    num: number;
}

export interface ProfileSettings {
    price: {
        lower: number;
        higher: number;
    };
    duration: {
        lower: number;
        higher: number;
    };
    locations: Location[];
    amenities: Amenity[];
    rooms: Room[];
}

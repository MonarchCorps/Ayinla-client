export type StateType = {
    lgas: {
        name: string;
    }[];
    name: string;
}

export type StateResponseType = {
    states: StateType[];
}
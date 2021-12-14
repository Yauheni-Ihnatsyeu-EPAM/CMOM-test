export interface Currency{

    id: string;
    image: string;
    name: string;
    symbol: "btc";
    current_price: number;
    high_24h: number;
    low_24h: number;
}


export interface CurrencyInfo extends Currency {
    hashing_algorithm: "SHA-256";
    description: Record<string, string>;
    market_cap: Record<string, number>;
    links: string;
    genesis_date: Date;
}
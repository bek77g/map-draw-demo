export interface Address {
	display_name: string;
	tags?: {
		'addr:housenumber'?: string;
		'addr:street'?: string;
		'addr:city'?: string;
		amenity?: string;
		'name:en'?: string;
		opening_hours?: string;
	};
}

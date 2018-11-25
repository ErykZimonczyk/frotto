export class Bet {
	public position: {
		lng: number;
		lat: number;
	};
	public friendBetId: string;
	public distanceFactor: number;
	public area: 1 | 0;
	public type: 1 | 0;

	constructor(lat, lng, factor, area, type) {
		this.position = {
			lat,
			lng,
		};

		this.distanceFactor = factor;
		this.area = area;
		this.type = type;
	}
	public getTypeLabel(): string {
		switch (this.area) {
			case 1:
				return 'krajowy';
			case 0:
				return 'mazowiecki';
		}
	}

	public getLat() {
		return this.position.lat.toFixed(2);
	}

	public getLng() {
		return this.position.lng.toFixed(2);
	}

	public mapToApi() {
		return {
			userId: 1,
			position: {
				lon: this.position.lng,
				lat: this.position.lat,
			},
			friendBetId: this.friendBetId,
			distanceFactor: this.distanceFactor / 100.0,
			area: this.area,
		};
	}
}

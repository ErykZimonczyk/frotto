export class Bet {
	public position: {
		lon: number;
		lat: number;
	};
	public distanceFactor: number;
	public area: 1 | 0;
	public type: 1 | 0;

	constructor(lat, lon, factor, area, type) {
		this.position = {
			lat,
			lon,
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
}



export default class Restaurant {
	constructor(restaurantid, name, address, description) {
		this.restaurantid = restaurantid;
		this.name = name;
		this.address = address;
		this.description = description;
		this.imageUrl = '';
	}

	setImageUrl(imageUrl) {
		this.imageUrl = imageUrl;
	}
}
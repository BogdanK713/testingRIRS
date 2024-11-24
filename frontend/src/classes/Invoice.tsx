export class Invoice {
	_id: string = "";
	user: string = "";
	name: string = "";
	amount: number = 0;
	date: Date = new Date();
	dueDate: Date = new Date();
	payer: string = "";
	statusSent: boolean = false;
	statusPaid: boolean = false;

	constructor(
		_id: string,
		user: string,
		name: string,
		amount: number,
		date: Date,
		dueDate: Date,
		payer: string,
		statusSent: boolean,
		statusPaid: boolean
	) {
		this._id = _id;
		this.user = user;
		this.name = name;
		this.amount = amount;
		this.date = date;
		this.dueDate = dueDate;
		this.payer = payer;
		this.statusSent = statusSent;
		this.statusPaid = statusPaid;
	}

	static fromJSON(data: any): Invoice {
		return new Invoice(
			data._id,
			data.user,
			data.name,
			data.amount,
			new Date(data.date),
			new Date(data.dueDate),
			data.payer,
			data.statusSent,
			data.statusPaid
		);
	}
}

import mongoose from 'mongoose';

const cgrdTestTask = await connectToDatabase();
const newsposts = await connectToCollection(cgrdTestTask);

// Page load
export const load = async () => {
	try {
		let newsfeed = [];

		let news = await newsposts.find();
		news.forEach((newspost) => {
			newsfeed.push({
				id: newspost.id,
				title: newspost.title,
				description: newspost.description
			});
		});

		return { news: newsfeed };
	} catch (error) {
		console.log(error);
		return { news: [] };
	}
};

export const actions = {
	login: async ({ request }) => {
		try {
			const formData = await request.formData();

			let inputUsername = formData.get('username');
			let inputPassword = formData.get('password');

			if (inputUsername === 'admin' && inputPassword === 'test') {
				return { validUser: true };
			} else {
				return { validUser: false };
			}
		} catch (error) {
			console.log(error);
			return { validUser: false };
		}
	},

	logout: async () => {
		return { logout: true };
	},

	addPost: async ({ request }) => {
		try {
			const formData = await request.formData();
			await new newsposts({
				id: crypto.randomUUID(),
				title: formData.get('title'),
				description: formData.get('description')
			}).save();
			return { addedPost: 'success' };
		} catch (error) {
			console.log(error);
			return { addedPost: 'failed' };
		}
	},

	updatePost: async ({ request }) => {
		try {
			const formData = await request.formData();
			await newsposts.findOneAndUpdate(
				{ id: formData.get('id') },
				{ title: formData.get('title'), description: formData.get('description') }
			);
			return { updatedPost: 'success' };
		} catch (error) {
			console.log(error);
			return { updatedPost: 'failed' };
		}
	},

	deletePost: async ({ request }) => {
		try {
			const formData = await request.formData();
			await newsposts.findOneAndDelete({ id: formData.get('id') });
			return { deletedPost: 'success' };
		} catch (error) {
			console.log(error);
			return { deletedPost: 'failed' };
		}
	}
};

async function connectToDatabase() {
	try {
		let connectionString = 'mongodb://localhost:27017/';
		let database = 'cgrd_testtask';

		const mongoDbInstance = mongoose.createConnection(connectionString, { dbName: database });

		mongoDbInstance.on('open', () => {
			console.log('Established database connection');
		});
		mongoDbInstance.on('error', () => {
			console.log('Database connection failed');
		});
		return mongoDbInstance;
	} catch (error) {
		console.log(error);
	}
}

async function connectToCollection(mongoDbInstance: any) {
	try {
		const { Schema } = mongoose;
		const schema = new Schema({
			id: { type: String },
			title: { type: String },
			description: { type: String }
		});
		const buildModel = mongoDbInstance.model('Newsposts', schema);
		return buildModel;
	} catch (error) {
		console.log(error);
	}
}

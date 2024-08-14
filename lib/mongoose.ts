import mongoose, { ConnectOptions } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface Cached {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// Add type to global.mongoose if not already defined
declare global {
    var mongoose: Cached;
}

let cached: Cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    console.log('connectToDatabase function called'); // Log when function is called
    if (cached.conn) {
        console.log('Using cached database connection.');
        return cached.conn;
    }

    if (!cached.promise) {
        console.log('Creating a new database connection promise.');
        const opts: ConnectOptions = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log('DB connected'); // Confirm successful connection
            return mongoose;
        }).catch((err) => {
            console.error('DB connection error:', err); // Log any connection errors
            cached.promise = null; // Reset the promise to allow retries
            throw err;
        });
    } else {
        console.log('Using existing database connection promise.');
    }

    cached.conn = await cached.promise;
    console.log('Database connection established.');
    return cached.conn;
}

export default connectToDatabase;












































// import mongoose, { ConnectOptions } from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI as string;

// if (!MONGODB_URI) {
//     throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
// }

// interface Cached {
//     conn: typeof mongoose | null;
//     promise: Promise<typeof mongoose> | null;
// }

// // Add type to global.mongoose if not already defined
// declare global {
//     var mongoose: Cached;
// }

// let cached: Cached = global.mongoose;

// if (!cached) {
//     cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectToDatabase() {
//     console.log('connectToDatabase function called'); // Log when function is called
//     if (cached.conn) {
//         console.log('Using cached database connection.');
//         return cached.conn;
//     }

//     if (!cached.promise) {
//         console.log('Creating a new database connection promise.');
//         const opts: ConnectOptions = {
//             bufferCommands: false,
//             // useNewUrlParser and useUnifiedTopology are no longer needed in Mongoose v6 and above
//         };

//         cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//             console.log('DB connected'); // Confirm successful connection
//             return mongoose;
//         }).catch((err) => {
//             console.error('DB connection error:', err); // Log any connection errors
//             cached.promise = null; // Reset the promise to allow retries
//             throw err;
//         });
//     } else {
//         console.log('Using existing database connection promise.');
//     }

//     cached.conn = await cached.promise;
//     console.log('Database connection established.');
//     return cached.conn;
// }

// export default connectToDatabase;












































// import mongoose, { ConnectOptions } from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI as string;

// if (!MONGODB_URI) {
//     throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
// }

// interface Cached {
//     conn: typeof mongoose | null;
//     promise: Promise<typeof mongoose> | null;
// }

// // Add type to global.mongoose if not already defined
// declare global {
//     var mongoose: Cached;
// }

// let cached: Cached = global.mongoose;

// if (!cached) {
//     cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectToDatabase() {
//     if (cached.conn) {
//         return cached.conn;
//     }

//     if (!cached.promise) {
//         const opts: ConnectOptions = {
//             bufferCommands: false,
//             // useNewUrlParser and useUnifiedTopology are no longer needed in Mongoose v6 and above
//         };

//         cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//             console.log('DB connected'); // Confirm successful connection
//             return mongoose;
//         }).catch((err) => {
//             console.error('DB connection error:', err); // Log any connection errors
//             cached.promise = null; // Reset the promise to allow retries
//             throw err;
//         });
//     }
    
//     cached.conn = await cached.promise;
//     return cached.conn;
// }

// export default connectToDatabase;















































// import mongoose, { mongo } from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI as string;

// if (!MONGODB_URI) {
//     throw new Error('please input the MONGODB_URI environment variable');
// }

// interface Cached {
//     conn: typeof mongoose | null;
//     promise: Promise<typeof mongoose> | null;
// }

// type Opts = {
//     useNewUrlParser: boolean,
//     useUnifiedTopology: boolean
// }

// declare global {
//     var mongoose: Cached;
// }

// let cached = global.mongoose;

// if (!cached) {
//     cached = global.mongoose = {conn: null, promise: null};
// }

// async function connectToDatabase() {
//     if(cached.conn) {
//         return cached.conn;
//     }

//     if(!cached) {
//         const opts: Opts = {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         }

//         cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//             return mongoose;
//         })
//     }
    
//     cached.conn = await cached.promise;

//     return cached.conn;
// }

// export default connectToDatabase;
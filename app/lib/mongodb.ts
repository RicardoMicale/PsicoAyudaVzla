import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_TLS_INSECURE = process.env.MONGODB_TLS_INSECURE === "true";

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI environment variable.");
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached = global.mongooseCache ?? { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const connectionOptions: Parameters<typeof mongoose.connect>[1] = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    };

    if (MONGODB_TLS_INSECURE) {
      connectionOptions.tls = true;
      connectionOptions.tlsAllowInvalidCertificates = true;
      connectionOptions.tlsAllowInvalidHostnames = true;
    }

    cached.promise = mongoose.connect(MONGODB_URI, connectionOptions);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

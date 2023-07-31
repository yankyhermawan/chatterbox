import jwt, { JwtPayload } from "jsonwebtoken";

export class UserGuard {
	checkTokenValid(token: string) {
		try {
			return jwt.verify(
				token,
				process.env["JWT_KEY"] ||
					"0e263e99692d725f0a2335f0dd7cfe080b2d4793d2793d6439e4d6a69daa5e5d"
			) as JwtPayload;
		} catch (err) {
			return false;
		}
	}

	authorization(userID: string, token: string) {
		try {
			const decodedToken = this.checkTokenValid(token);
			if (typeof decodedToken === "boolean") {
				return false; // Invalid token, return false or handle the error accordingly
			}
			if (decodedToken.id === userID) {
				return true;
			}
			return false;
		} catch (err) {
			return false;
		}
	}
}

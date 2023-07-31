import jwt from "jsonwebtoken";

export class UserGuard {
	checkTokenValid(token: string) {
		try {
			return jwt.verify(
				token,
				process.env["JWT_KEY"] ||
					"0e263e99692d725f0a2335f0dd7cfe080b2d4793d2793d6439e4d6a69daa5e5d"
			);
		} catch (err) {
			return false;
		}
	}
}

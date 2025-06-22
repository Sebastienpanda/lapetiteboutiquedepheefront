import { Injectable } from "@angular/core";
import { type Socket, io } from "socket.io-client";

@Injectable({ providedIn: "root" })
export class SocketService {
	private readonly socket: Socket;

	constructor() {
		this.socket = io("http://localhost:1337");
	}

	joinRoom(room: string) {
		this.socket.emit("join-room", room);
	}

	sendMessage(message: string, room: string) {
		this.socket.emit("send-message", { message, room });
	}

	onMessage(callback: (data: { message: string }) => void) {
		this.socket.on("receive-message", callback);
	}
}

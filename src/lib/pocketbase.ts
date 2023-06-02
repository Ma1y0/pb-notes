import PocketBase from "pocketbase";
import { INote } from "./types";

const pb = new PocketBase("http://localhost:8090");

export async function getNotes(): Promise<INote[]> {
	return await pb.collection("notes").getFullList();
}

export function subscribeToNotes(callback: (note: INote) => void) {
	pb.collection("notes").subscribe<INote>("*", (e) => {
		if (e.action == "create") {
			callback(e.record);
		}
	});
}

export async function createNote(title: string, content: string): Promise<INote> {
	return await pb.collection("notes").create<INote>({ title, content });
}

import { INote } from "~/lib/types";

export default function Note({ note }: { note: INote }) {
	return (
		<div class="card w-96 bg-base-300 shadow-xl">
			<div class="card-body">
				<h2 class="card-title text-2xl mb-2">{note.title}</h2>
				<p innerHTML={note.content}></p>
			</div>
		</div>
	);
}

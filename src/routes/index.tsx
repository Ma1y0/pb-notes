import { For, createSignal, onMount } from "solid-js";
import Note from "~/components/Note";
import { createNote, getNotes, subscribeToNotes } from "~/lib/pocketbase";
import { INote, IWindow } from "~/lib/types";

export default function Home() {
	const [notes, setNotes] = createSignal([] as INote[]);
	const [opendNote, setOpenNote] = createSignal<INote | null>(null);
	const [title, setTitle] = createSignal<string>("");
	const [content, setContent] = createSignal<string>("");

	const onCreateNote = async (e: Event) => {
		setNotes([...notes(), await createNote(title(), content())]);
		setTitle("");
		setContent("");
	};

	const onOpenNote = (note: INote) => {
		setOpenNote(note);
		let w = window as unknown as IWindow;
		w.note_modal.showModal();
	};

	onMount(async () => {
		setNotes(await getNotes());
		subscribeToNotes((note: INote) => {
			if (!notes().find((a) => a.id == note.id)) {
				setNotes([note, ...notes()]);
			}
		});
	});

	return (
		<main class="m-10">
			{/* modal button */}
			<button
				class="btn btn-success btn-o px-4 ml-10 w-20"
				onClick={() => {
					let w = window as unknown as IWindow;
					w.new_modal.showModal();
				}}
			>
				New
			</button>
			{/* Modal */}
			<dialog id="new_modal" class="modal" onSubmit={onCreateNote}>
				<form method="dialog" class="modal-box">
					<h3 class="font-bold text-lg">New Note</h3>
					<input
						class="h-12 p-4 my-3 input input-bordered w-full max-w-xs"
						type="text"
						placeholder="Title"
						value={title()}
						onInput={(e) => setTitle(e.currentTarget.value)}
						required
					/>
					<textarea
						class="p-4 textarea textarea-bordered w-full max-w-xs"
						placeholder="Content"
						value={content()}
						onInput={(e) => setContent(e.currentTarget.value)}
						required
					/>
					<div class="modal-action">
						<button class="btn btn-success" type="submit">
							Create
						</button>
					</div>
				</form>
			</dialog>
			{/* Modal */}
			<dialog id="note_modal" class="modal">
				<form method="dialog" class="modal-box">
					<h3 class="font-bold text-lg">{opendNote()?.title}</h3>
					<p innerHTML={opendNote()?.content} />
					<div class="modal-action">
						<button class="btn">Close</button>
					</div>
				</form>
			</dialog>

			{/* Notes */}
			<div class="flex gap-3 flex-wrap m-10">
				<For each={notes()}>
					{(note: INote) => (
						<div onClick={() => onOpenNote(note)}>
							<Note note={note} />
						</div>
					)}
				</For>
			</div>
		</main>
	);
}

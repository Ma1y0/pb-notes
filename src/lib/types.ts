export interface INote {
	id: string;
	title: string;
	content: string;
	date?: any;
}

export interface IWindow {
	note_modal: {
		showModal: () => void;
	};
	new_modal: {
		showModal: () => void;
	};
}

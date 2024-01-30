
export const ArticleInterface = (item = false) => {
	return {
		id: item?.id ?? 0,
		title: item?.title ?? '',
		content: item?.content ?? '',
		user_id: item?.user_id ?? 0,
		project_id: item?.project_id ?? 0,
		chapter_id: item?.chapter_id ?? 0,
		words: item?.words ?? 0,
		chars: item?.chars ?? 0,
	};
}

export const ArticleErrorInterface = (item = false) => {
	return {
		title: item?.title ?? '',
		content: item?.content ?? '',
		user_id: item?.user_id ?? 0,
		project_id: item?.project_id ?? 0,
		chapter_id: item?.chapter_id ?? 0,
		words: item?.words ?? '',
		chars: item?.chars ?? '',
	};
}

export const ChecksInterface = (item) => {
	return {
		id: item?.id ?? 0,
		article_id: item?.article_id ?? 0,
		ortography: item?.ortography ?? 0,
		grammar: item?.grammar ?? 0,
		review: item?.review ?? 0
	};
};

export const ProjectInterface = (item = false) => {
	return {
		id: item?.id ?? 0,
		name: item?.name ?? '',
		description: item?.description ?? '',
		user_id: item?.user_id ?? 0
	};
}

export const ProjectErrorInterface = (item = false) => {
	return {
		name: item?.name ? item?.name[0] : '',
		description: item?.description ? item?.description[0] : '',
		user_id: item?.user_id ? item?.user_id[0] : ''
	};
}

export const CollaboratorInterface = (item) => {
	return {
		id: item.id ?? 0,
		user_id: item.user_id ?? 0,
		project_id: item.project_id ?? 0,
	};
};
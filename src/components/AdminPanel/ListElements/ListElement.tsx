const ListElement = () => {
	return (
		<div className={"bg-white flex mx-10 mt-6 "}>
			<div className={"w-[48px] h-[48px] p-3 check-wrapper "}>
				<label className="custom-checkbox">
					<input type="checkbox" className={'hidden'} />
					<span className="checkmark"></span>
				</label>
			</div>
			<div>Назва проекту</div>
			<div>активний</div>
			<div>16.08.2023</div>
			<div>
				<div>
				</div>
				<div>
					<img src="/images/admin/bin.svg" alt="bin" />
				</div>
			</div>
		</div>
	);
};

export default ListElement;
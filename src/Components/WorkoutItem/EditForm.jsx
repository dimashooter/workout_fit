import React from 'react';
import DashboardItem from '../../Pages/DashboardItem';

const EditForm = ({ handleSubmit, formSubmit, item, register, control }) => {
	console.log(item);
	return (
		<form onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-5">
			<label htmlFor="">
				<input
					className="p-2 w-[100%] outline-none rounded-md"
					type="text"
					defaultValue={item.name}
					placeholder="Change name"
					{...register('name')}
				/>
			</label>
			<DashboardItem item={item} control={control} register={register} />
			<input type="submit" value="edit" />
		</form>
	);
};

export default EditForm;

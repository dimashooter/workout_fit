import React from 'react';
import { Controller } from 'react-hook-form';

const DashboardItem = ({ item, control, register }) => {
	return (
		<>
			{item?.approaches?.map((el, idx) => {
				return (
					<div key={el.id}>
						<div>{`${idx + 1} Подход:`}</div>
						<Controller
							control={control}
							name={`count-${idx}`}
							shouldUnregister={true}
							render={({ field: { value, onChange } }) => (
								<>
									<div className="flex gap-5 items-center justify-between">
										<span className=" font-bold text-cyan-50 text-lg ">Число повторений:</span>
										<input
											name={`count-${idx}`}
											type="number"
											{...register(`count-${idx}`)}
											onChange={onChange}
											value={value}
											defaultValue={el.count}
											className="max-w-[100px] p-2 outline-none"
										/>
									</div>
								</>
							)}
						/>
						<Controller
							control={control}
							name={`kg-${idx}`}
							shouldUnregister={true}
							render={({ field: { value, onChange } }) => (
								<div className="flex gap-5 items-center justify-between">
									<span className="font-bold text-cyan-50 text-lg">Вес:</span>
									<input
										type="number"
										{...register(`kg-${idx}`)}
										onChange={onChange}
										value={value}
										defaultValue={el.kg}
										className="max-w-[100px] p-2 outline-none"
									/>
								</div>
							)}
						/>
					</div>
				);
			})}
		</>
	);
};

export default DashboardItem;

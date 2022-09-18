import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearDashboard, deleteFilteredDashboard, editedDashboard, editFilteredDashboard } from '../redux/dashboardSlice';
import { camelCase } from '../utils/camelCase';
import { CgGym } from 'react-icons/cg';
import { MdEdit } from 'react-icons/md';
import Modal from '../Components/modal';
import { useForm } from 'react-hook-form';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import EditForm from '../Components/WorkoutItem/EditForm';

const buttons = [
	{ id: 1, name: 'Monday' },
	{ id: 2, name: 'Tuesday' },
	{ id: 3, name: 'Wednesday' },
	{ id: 4, name: 'Thursday' },
	{ id: 5, name: 'Friday' },
	{ id: 6, name: 'Saturday' },
	{ id: 7, name: 'Sunday' },
];

const Dashboard = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	const state = useSelector(store => store.dashboardSlice);

	const dispatch = useDispatch();
	const [activeMenuItem, setActiveMenuItem] = useState(1);
	const [activeDay, setActiveDay] = useState('Monday');
	const [editCurrentItem, setEditCurrentItem] = useState(false);

	const deleteDashboard = () => {
		dispatch(clearDashboard());
		localStorage.removeItem('item');
	};
	const saveDashboard = () => {
		localStorage.setItem('item', JSON.stringify({ dashboard: state.dashboard, saveTime: state.saveTime }));
	};

	const handleDay = e => {
		if (e.target.value) {
			setActiveDay(e.target.value);
		}
	};

	const filteredDashboard = state.dashboard.filter(el => el.day === activeDay);
	const openModal = currentItem => {
		dispatch(editedDashboard(currentItem));
		setEditCurrentItem(true);
	};
	const formSubmit = data => {
		const approaches = state.editedDashboard?.approaches.map((el, idx) => {
			return {
				id: el.id,
				kg: data[`kg-${idx}`],
				count: data[`count-${idx}`],
				done: false,
			};
		});
		const obj = {
			id: state.editedDashboard.id,
			name: data.name,
			approaches: approaches,
		};
		dispatch(editFilteredDashboard(obj));
		setEditCurrentItem(false);
	};
	const handleDeleteCurrentItem = id => {
		if (window.confirm('Are you sure you want to delete ?' === true)) {
			dispatch(deleteFilteredDashboard(id));
			saveDashboard();
		} else {
			return;
		}
	};
	return (
		<>
			<div>
				<div className="flex gap-2 w-full  justify-start mb-2 flex-wrap" onClick={handleDay}>
					{buttons.map(btn => {
						const styles =
							activeMenuItem === btn.id
								? {
										background: '#340075',
										color: '#ffffff',
								  }
								: {
										background: '#ffffff',
										color: '#340075',
								  };

						return (
							<button
								style={{ ...styles, padding: '10px 20px', borderRadius: '8px' }}
								key={btn.id}
								value={btn.name}
								onClick={() => setActiveMenuItem(btn.id)}>
								{btn.name}
							</button>
						);
					})}
				</div>
				{filteredDashboard.map(item => {
					return (
						<div key={item.id}>
							<div className="flex gap-3 items-center">
								<span className="text-2xl font-bold text-[#340075]">{camelCase(item.name)}</span>
								<MdEdit
									className="bg-slate-500 px-3 py-2 rounded-md"
									color="#FFFFFF"
									size={50}
									onClick={() => openModal(item)}
									style={{ cursor: 'pointer' }}
								/>
								<button className="bg-[#ffdde1] px-3 py-2 rounded-md" onClick={() => handleDeleteCurrentItem(item.id)}>
									<AiOutlineMinusCircle color="#f69ca5" size={'30px'} />
								</button>
							</div>
							<div className="">
								<div className="flex gap-5">
									<span>Weight</span>
									<span>Count</span>
								</div>
								{item.approaches.map(el => (
									<div key={el.id} className="flex gap-5 p-2">
										<span
											className="min-w-[50px] bg-slate-400 p-2 text-white rounded-sm
                  text-center">
											{el.kg}
										</span>
										<span
											className="min-w-[50px] bg-slate-400 p-2 text-white rounded-sm
                  text-center">
											{el.count}
										</span>
									</div>
								))}
							</div>
						</div>
					);
				})}
				<span>{state.saveTime}</span>
				{filteredDashboard.length === 0 && (
					<h3 className="flex gap-3 items-center pt-5">
						Упс... Самое время задать тренировку на данный день
						<span>
							<CgGym size={30} />
						</span>
					</h3>
				)}
			</div>
			<div className="flex gap-10 mt-3">
				<button className="px-4 py-2 bg-[#340075] text-white rounded-md" onClick={deleteDashboard}>
					delete dashboard
				</button>
				<button className="px-4 py-2 bg-[#340075] text-white rounded-md active:bg-[#ffffff] active:text-[#340075]" onClick={saveDashboard}>
					save dashboard
				</button>
			</div>
			<Modal open={editCurrentItem} onClose={() => setEditCurrentItem(false)}>
				<EditForm control={control} formSubmit={formSubmit} handleSubmit={handleSubmit} item={state.editedDashboard} register={register} />
			</Modal>
		</>
	);
};

export default Dashboard;

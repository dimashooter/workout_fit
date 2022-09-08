import React, { useState } from 'react';
import { AiOutlineMinusCircle, AiOutlineCheckCircle, AiFillCheckCircle } from 'react-icons/ai';
import { MdContentCopy } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

import Modal from '../modal';

import { useDispatch } from 'react-redux';
import { addApproach, deleteApproach, doneApproach, dublicateExecise } from '../../redux/slice';

const WorkoutItem = ({ item, deleteItem }) => {
  const [openModal, setOpenModal] = useState(false);
  const [kg, setKg] = useState('');
  const [count, setCount] = useState('');
  const dispatch = useDispatch();

  const handleValue = (e) => {
    setKg(e.target.value);
  };
  const handleCount = (e) => {
    setCount(e.target.value);
  };
  const submiteValue = (e) => {
    e.stopPropagation();
    const obj = {
      id: uuidv4(),
      kg,
      count,
      done: false,
    };

    dispatch(addApproach({ id: item.id, obj }));
    setOpenModal(false);
    setKg('');
    setCount('');
  };
  return (
    <>
      <div className="flex gap-2 p-3 flex-col ">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-2xl text-[#340075]">{item.name}</h3>
          <button className="bg-[#ffdde1] px-3 py-2 rounded-md" onClick={() => deleteItem(item.id)}>
            <AiOutlineMinusCircle color="#f69ca5" size={'30px'} />
          </button>
          <button
            className="text-white bg-[#340075] px-5 py-2 rounded-md"
            onClick={() => setOpenModal(true)}>
            Задать количество подходов
          </button>
        </div>
        {item.approaches && (
          <table className="max-w-md ">
            <thead>
              <th>Kg</th>
              <th>Reps</th>
            </thead>
            <tbody>
              {item.approaches?.map((el) => (
                <tr key={el.id}>
                  <td
                    className="p-2 bg-white border border-slate-300 "
                    style={{
                      background: el.done ? '#51a482' : 'transparent',
                      color: el.done ? '#ffffff' : '#340075',
                    }}>
                    {el.kg}
                  </td>
                  <td
                    className="p-2 bg-white  border border-slate-300"
                    style={{
                      background: el.done ? '#51a482' : 'transparent',
                      color: el.done ? '#ffffff' : '#340075',
                    }}>
                    {el.count}
                  </td>
                  <td className="flex gap-2">
                    <button
                      className="bg-[#ffdde1] px-3 py-2 rounded-md"
                      onClick={() => dispatch(deleteApproach({ id: item.id, approacheId: el.id }))}>
                      <AiOutlineMinusCircle color="#f69ca5" size={'30px'} />
                    </button>
                    <button
                      onClick={() => dispatch(doneApproach({ id: item.id, approacheId: el.id }))}>
                      {el.done ? (
                        <AiFillCheckCircle color="#51a482" size={'30px'} />
                      ) : (
                        <AiOutlineCheckCircle color="#51a482" size={'30px'} />
                      )}
                    </button>
                    <button
                      className="bg-[#ffffff] px-3 py-2 rounded-md"
                      onClick={() =>
                        dispatch(dublicateExecise({ id: item.id, approacheId: el.id }))
                      }>
                      <MdContentCopy color="#340075" size={'30px'} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="flex-col flex gap-5">
          <input
            className="p-4 rounded-md outline-none"
            name="weight"
            type="text"
            placeholder="kg"
            onChange={handleValue}
          />
          <input
            className="p-4 rounded-md outline-none"
            name="count"
            type="text"
            placeholder="count"
            onChange={handleCount}
          />
          <button onClick={submiteValue}>добавить</button>
        </div>
      </Modal>
    </>
  );
};

export default WorkoutItem;

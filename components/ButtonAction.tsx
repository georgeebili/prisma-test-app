import React, {useState, Dispatch, SetStateAction} from 'react';
import { StudentType } from '../types';
type stList = StudentType[][]
type stateAction = Dispatch<SetStateAction<StudentType[][]>>
type actionParam = {
  items: stList,
  noneItems: stList,
  ageItems: stList,
  classItems: stList,
  genderItems: stList,
  setItem: stateAction,
  setNoneItem?: stateAction,
  setAgeItem?: stateAction,
  setClassItem?: stateAction,
  setGenderItem?: stateAction
}
export default function ButtonAction({
  items,
  noneItems,
  ageItems,
  classItems,
  genderItems,
  setItem,} : actionParam ) {
  
  const [noneValue, setNone ] = useState(true)
  const [ageValue, setAge ] = useState(false)
  const [classValue, setClass ] = useState(false)
  const [genderValue, setGender ] = useState(false)
  const onChange = () => {}
  const onClick = (e: any) => {
    const target: HTMLInputElement = e.target;
    if (target.value === 'none') {
      setItem(noneItems)
      setNone(true)
      setAge(false)
      setClass(false)
      setGender(false)
    } else if (target.value === 'age') {
      setItem(ageItems)
      setAge(true)
      setNone(false)
      setClass(false)
      setGender(false)
    } else if (target.value === 'gender') {
      setItem(genderItems)
      setGender(true)
      setAge(false)
      setClass(false)
      setNone(false)
    } else if (target.value === 'group') {
      setItem(classItems)
      setClass(true)
      setAge(false)
      setNone(false)
      setGender(false)
    }
  }
    return (
      <div className='af-gap af-row by-space'>
        <div className='af-column'>None<input type="radio" value={'none'} checked={noneValue} onChange={onChange} onClick={onClick}/></div>
        <div className='af-column'>Age<input type="radio" value={'age'} checked={ageValue} onChange={onChange} onClick={onClick}/></div>
        <div className='af-column'>Gender<input type="radio" value={'gender'} checked={genderValue} onChange={onChange} onClick={onClick}/></div>
        <div className='af-column'>Class<input type="radio" value={'group'} checked={classValue} onChange={onChange} onClick={onClick}/></div>
      </div>
    )
}

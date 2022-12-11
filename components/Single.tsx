import React from 'react';
import { StudentType } from '../types';
export default function Single({id, name, age, gender, group}: StudentType) {
    return (
      <div className='af-row by-space box'>
        <div className='af-column'>{id}</div>
        <div className='af-column'>{name}</div>
        <div className='af-column'>{age}</div>
        <div className='af-column'>{gender}</div>
        <div className='af-column'>{group}</div>
      </div>
    )
}
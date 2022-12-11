import React from 'react';
import { StudentType } from '../types';
import Single from './Single';

export default function Group(items: {items: StudentType[]}) {
    return (
      <>
      <div className='table-container'>
          {items.items.map(({id, gender, age, group, name}, index) => (
            <Single key={index}
              id={id}
              name={name}
              age={age}
              gender={gender}
              group={group}
            />
          ))}
        </div>
        <div className='items-align-end by-space af-gap'>
          Total: {items.items.length}
        </div>
      </>
        
    )
}

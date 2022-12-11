import type { NextPage } from 'next'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { StudentType } from '../types'
import ButtonAction from '../components/ButtonAction'
import Single from '../components/Single'
import Group from '../components/Group'
import StateStore from '../components/StateStore'

const Home: NextPage = () => {
  
  const {
    Items: items,
    NoneItems: noneItems,
    AgeItems: ageItems,
    ClassItems: classItems,
    GenderItems: genderItems,
    setItem,
    setNoneItem,
    setAgeItem,
    setClassItem,
    setGenderItem,
    arrangeStudentByName,
  } = StateStore()

  useEffect(() => {
    const handler = async () => {
      try {
        const response = await fetch('/api/students', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const result = await response.json();
        const data:StudentType[][] = [result.data];
        //Set main item
        setItem(data)
        arrangeStudentByName(setItem)
        
        // Set none Item
        setNoneItem(data)
        arrangeStudentByName(setNoneItem)

        data.forEach((item) => {
          // Age Arrangement
          const ageGroup:{ [key: string]: StudentType[]; } = {};
          const ageList = [...item]
          ageList.sort((a: {age: number}, b: {age: number}) => (a.age > b.age) ? 1 : -1)
          ageList.forEach((stu) => {
            if (!Object.keys(ageGroup).includes(String(stu.age))) ageGroup[String(stu.age)] = [stu];
            else ageGroup[String(stu.age)].push(stu)
          })

          // Class arragement
          const classGroup: { [key: string]: StudentType[]; } = {};
          const classList = [...item]
          classList.sort((a: {group: string}, b: {group: string}) => a.group.localeCompare(b.group))
          classList.forEach((stu) => {
            if (!Object.keys(classGroup).includes(stu.group)) classGroup[stu.group] = [stu];
            else classGroup[stu.group].push(stu)
          })

          // gender Arrangement
          const genderGroup: { [key: string]: StudentType[]; } = {};
          const genderList = [...item]
          genderList.sort((a: {gender: string}, b: {gender: string}) => a.gender.localeCompare(b.gender))
          genderList.forEach((stu) => {
            if (!Object.keys(genderGroup).includes(stu.gender)) genderGroup[stu.gender] = [stu];
            else genderGroup[stu.gender].push(stu)
          })

          // render age items
          const ageItems: StudentType[][] = []
          Object.keys(ageGroup).forEach((key) => ageItems.push(ageGroup[key]) )
          setAgeItem(ageItems)
          arrangeStudentByName(setAgeItem)

          // render class items
          const classItems: StudentType[][] = []
          Object.keys(classGroup).forEach((key) => classItems.push(classGroup[key]) )
          setClassItem(classItems)
          arrangeStudentByName(setClassItem)

          // render gender items
          const genderItems: StudentType[][] = []
          Object.keys(genderGroup).forEach((key) => genderItems.push(genderGroup[key]) )
          setGenderItem(genderItems)
          arrangeStudentByName(setGenderItem)
        })
      } catch (error) {
        console.log(error)
      }
    }
    handler()
  }, [])

  function updateByAge() {
    const ageList = [...ageItems]
    setItem(ageItems)
  }

  return (
    <main>
      <h1 className='af-gap fw-bold' onClick={updateByAge}>Student gruppering</h1>
      <ButtonAction
        items={items} 
        noneItems={noneItems}
        ageItems={ageItems}
        classItems={classItems}
        genderItems={genderItems}
        setItem = {setItem}
      />
      <div className='table-container'>
        {items.map((item, index) => {
            return <Group key={index} items={item} />
          }
        )}
      </div>
    </main>
  )
}

export default Home
